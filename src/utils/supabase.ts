import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { OrderData, Order, PaymentStatus } from '../types';
import site from '../config/site';

// 클린 빌드(예: gh-pages)에서 env 누락 시 로그인이 깨지지 않도록 fallback 하드코딩
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hcmgdztsgjvzcyxyayaj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjbWdkenRzZ2p2emN5eHlheWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MzU4ODcsImV4cCI6MjA4NzAxMTg4N30.gznaPzY1l8qDAPsEyYNR9KS7f7VqS3xaw-_2HTSwSZw';

/** Supabase 테이블명 (site.dbPrefix 기반) */
export const TABLES = {
  orders: `${site.dbPrefix}orders`,
  order_items: `${site.dbPrefix}order_items`,
  posts: `${site.dbPrefix}posts`,
  comments: `${site.dbPrefix}comments`,
  practice_scores: `${site.dbPrefix}practice_scores`,
  syllabi: `${site.dbPrefix}syllabi`,
  rubrics: `${site.dbPrefix}rubrics`,
  assignments: `${site.dbPrefix}assignments`,
  feedback: `${site.dbPrefix}feedback`,
  evaluations: `${site.dbPrefix}evaluations`,
  courses: `${site.dbPrefix}courses`,
  plans: `${site.dbPrefix}plans`,
  subscriptions: `${site.dbPrefix}subscriptions`,
  shared_keys: `${site.dbPrefix}shared_keys`,
  usage_log: `${site.dbPrefix}usage_log`,
} as const;

let _supabase: SupabaseClient | null = null;
let _memoryOrders: Order[] = [];

const getSupabase = (): SupabaseClient | null => {
  if (!_supabase && supabaseUrl && supabaseAnonKey) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        autoRefreshToken: true,
        persistSession: true,
      }
    });
  }
  return _supabase;
};

/** named export for direct usage */
export const supabase = getSupabase()!;

// user_id 제외 — auth.users FK "permission denied" 방지, DB에서 DEFAULT auth.uid() 사용
export const createOrder = async (orderData: OrderData): Promise<Order> => {
  const client = getSupabase();

  if (!client) {
    const order: Order = {
      id: crypto.randomUUID(),
      ...orderData,
      payment_status: 'pending',
      created_at: new Date().toISOString()
    };
    _memoryOrders.push(order);
    return order;
  }

  const orderPayload: Record<string, unknown> = {
    order_number: orderData.order_number,
    user_email: orderData.user_email,
    user_name: orderData.user_name,
    user_phone: orderData.user_phone,
    total_amount: orderData.total_amount,
    payment_method: orderData.payment_method
  };

  const { error: orderError } = await client
    .from(TABLES.orders)
    .insert(orderPayload);

  if (orderError) throw orderError;

  if (orderData.items && orderData.items.length > 0) {
    try {
      const { data: row } = await client
        .from(TABLES.orders)
        .select('id')
        .eq('order_number', orderData.order_number)
        .maybeSingle();

      if (row?.id) {
        await client
          .from(TABLES.order_items)
          .insert(
            orderData.items.map(item => ({
              order_id: row.id,
              product_title: item.product_title,
              quantity: item.quantity,
              unit_price: item.unit_price,
              subtotal: item.subtotal
            }))
          );
      }
    } catch {
      /* order_items 실패해도 결제 플로우는 계속 진행 */
    }
  }

  return { id: orderData.order_number, order_number: orderData.order_number } as unknown as Order;
};

export const getOrderByNumber = async (orderNumber: string): Promise<Order | null> => {
  const client = getSupabase();

  if (!client) {
    return _memoryOrders.find(o => o.order_number === orderNumber) || null;
  }

  const { data: orders, error } = await client
    .from(TABLES.orders)
    .select('*')
    .eq('order_number', orderNumber)
    .limit(1);

  if (error) throw error;
  if (!orders || orders.length === 0) return null;

  const order = orders[0];

  const { data: items } = await client
    .from(TABLES.order_items)
    .select('*')
    .eq('order_id', order.id);

  return { ...order, items: items || [] } as Order;
};

export const updateOrderStatus = async (
  orderId: string,
  status: PaymentStatus,
  paymentId?: string,
  cancelReason?: string
): Promise<Order | null | undefined> => {
  const client = getSupabase();

  if (!client) {
    const idx = _memoryOrders.findIndex(o => o.id === orderId || o.order_number === orderId);
    if (idx >= 0) {
      _memoryOrders[idx].payment_status = status;
      if (paymentId) _memoryOrders[idx].portone_payment_id = paymentId;
      if (status === 'paid') _memoryOrders[idx].paid_at = new Date().toISOString();
      if (status === 'cancelled') {
        _memoryOrders[idx].cancelled_at = new Date().toISOString();
        if (cancelReason) _memoryOrders[idx].cancel_reason = cancelReason;
      }
    }
    return _memoryOrders[idx];
  }

  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-/.test(orderId);
  const filterCol = isUUID ? 'id' : 'order_number';

  const updatePayload: Record<string, unknown> = { payment_status: status };
  if (status === 'paid') updatePayload.paid_at = new Date().toISOString();
  if (status === 'cancelled') {
    updatePayload.cancelled_at = new Date().toISOString();
    if (cancelReason) updatePayload.cancel_reason = cancelReason;
  }

  const extras: Record<string, unknown> = {};
  if (paymentId) extras.portone_payment_id = paymentId;

  let result: Order[] | null = null;

  try {
    const { data, error } = await client
      .from(TABLES.orders)
      .update({ ...updatePayload, ...extras })
      .eq(filterCol, orderId)
      .select();

    if (error) throw error;
    result = data as Order[] | null;
  } catch {
    try {
      const { data, error } = await client
        .from(TABLES.orders)
        .update(updatePayload)
        .eq(filterCol, orderId)
        .select();

      if (error) throw error;
      result = data as Order[] | null;
    } catch {
      console.warn('updateOrderStatus: fallback update also failed for', filterCol, orderId);
      return null;
    }
  }

  if (!result || result.length === 0) {
    console.warn('updateOrderStatus: no rows updated for', filterCol, orderId);
    return null;
  }

  return result[0];
};

export const verifyPayment = async (
  paymentId: string,
  orderId: string
): Promise<{ verified: boolean }> => {
  const client = getSupabase();
  if (!client) {
    await updateOrderStatus(orderId, 'paid', paymentId);
    return { verified: true };
  }

  const { data, error } = await client.functions.invoke('verify-payment', {
    body: { paymentId, orderId }
  });

  if (error) throw error;
  return data as { verified: boolean };
};

export const getOrdersByUser = async (userId: string): Promise<Order[]> => {
  const client = getSupabase();
  if (!client) return [];

  const selectQuery = `*, ${TABLES.order_items}(*)`;
  const { data, error } = await client
    .from(TABLES.orders)
    .select(selectQuery)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getOrdersByUser error:', error);
    return [];
  }
  return (data || []) as unknown as Order[];
};

export default getSupabase;
