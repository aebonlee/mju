import { supabase, TABLES } from './supabase';
import type { Plan, TokenPurchase, SharedKey, UsageLog } from '../types';

// ─── Plans (Token Packages) ───

export async function getPlans(): Promise<Plan[]> {
  const { data, error } = await supabase
    .from(TABLES.plans)
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;
  return (data || []) as Plan[];
}

// ─── Token Balance ───

export async function getTokenBalance(userId: string): Promise<number> {
  // Total purchased tokens
  const { data: purchases, error: purchaseErr } = await supabase
    .from(TABLES.subscriptions)
    .select('token_amount')
    .eq('user_id', userId);

  if (purchaseErr) throw purchaseErr;
  const totalPurchased = (purchases || []).reduce((sum, row) => sum + (row.token_amount || 0), 0);

  // Total used tokens (only shared key usage counts against balance)
  const { data: usage, error: usageErr } = await supabase
    .from(TABLES.usage_log)
    .select('input_tokens, output_tokens')
    .eq('user_id', userId)
    .eq('key_source', 'shared');

  if (usageErr) throw usageErr;
  const totalUsed = (usage || []).reduce((sum, row) => sum + (row.input_tokens || 0) + (row.output_tokens || 0), 0);

  return totalPurchased - totalUsed;
}

export async function getPurchaseHistory(userId: string): Promise<TokenPurchase[]> {
  const { data, error } = await supabase
    .from(TABLES.subscriptions)
    .select(`*, plan:${TABLES.plans}(*)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []) as unknown as TokenPurchase[];
}

// ─── Token Purchase ───

export async function purchaseTokens(
  userId: string,
  planId: string,
  orderNumber: string
): Promise<TokenPurchase> {
  // Get plan to determine token amount
  const { data: planData } = await supabase
    .from(TABLES.plans)
    .select('token_amount')
    .eq('id', planId)
    .limit(1);

  const tokenAmount = planData?.[0]?.token_amount || 0;

  const { data, error } = await supabase
    .from(TABLES.subscriptions)
    .insert({
      user_id: userId,
      plan_id: planId,
      token_amount: tokenAmount,
      order_number: orderNumber,
    })
    .select()
    .single();

  if (error) throw error;
  return data as TokenPurchase;
}

export async function purchaseTokensBySlug(
  userId: string,
  planSlug: string,
  orderNumber: string
): Promise<TokenPurchase> {
  const { data: plans } = await supabase
    .from(TABLES.plans)
    .select('id')
    .eq('slug', planSlug)
    .limit(1);

  if (!plans || plans.length === 0) {
    throw new Error(`Plan not found: ${planSlug}`);
  }

  return purchaseTokens(userId, plans[0].id, orderNumber);
}

// ─── Shared Keys ───

export async function getSharedKeys(): Promise<SharedKey[]> {
  const { data, error } = await supabase
    .from(TABLES.shared_keys)
    .select('*')
    .eq('is_active', true);

  if (error) throw error;
  return (data || []) as SharedKey[];
}

export async function getSharedKeyForProvider(provider: string): Promise<string | null> {
  const { data, error } = await supabase
    .from(TABLES.shared_keys)
    .select('api_key')
    .eq('provider', provider)
    .eq('is_active', true)
    .limit(1);

  if (error) return null;
  return data?.[0]?.api_key || null;
}

// ─── Usage Logging ───

export async function logUsage(entry: Omit<UsageLog, 'id' | 'created_at'>): Promise<void> {
  try {
    await supabase
      .from(TABLES.usage_log)
      .insert(entry);
  } catch {
    // Non-critical: don't break the flow if logging fails
  }
}

export async function getUsageLogs(
  userId: string,
  limit = 50,
  offset = 0
): Promise<UsageLog[]> {
  const { data, error } = await supabase
    .from(TABLES.usage_log)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) return [];
  return (data || []) as UsageLog[];
}

export async function getMonthlyUsage(userId: string): Promise<{ tokens: number; requests: number }> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { data, error } = await supabase
    .from(TABLES.usage_log)
    .select('input_tokens, output_tokens')
    .eq('user_id', userId)
    .gte('created_at', startOfMonth);

  if (error || !data) return { tokens: 0, requests: 0 };

  const tokens = data.reduce((sum, row) => sum + (row.input_tokens || 0) + (row.output_tokens || 0), 0);
  return { tokens, requests: data.length };
}

// ─── Admin helpers ───

export async function getAllPurchases(): Promise<TokenPurchase[]> {
  const { data, error } = await supabase
    .from(TABLES.subscriptions)
    .select(`*, plan:${TABLES.plans}(*)`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []) as unknown as TokenPurchase[];
}

export async function getAllSharedKeys(): Promise<SharedKey[]> {
  const { data, error } = await supabase
    .from(TABLES.shared_keys)
    .select('*')
    .order('provider');

  if (error) throw error;
  return (data || []) as SharedKey[];
}

export async function upsertSharedKey(
  provider: string,
  apiKey: string,
  label?: string
): Promise<void> {
  const { error } = await supabase
    .from(TABLES.shared_keys)
    .upsert(
      { provider, api_key: apiKey, is_active: true, label: label || null, updated_at: new Date().toISOString() },
      { onConflict: 'provider' }
    );
  if (error) throw error;
}

export async function deleteSharedKey(id: string): Promise<void> {
  const { error } = await supabase
    .from(TABLES.shared_keys)
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function grantTokens(
  userId: string,
  planSlug: string
): Promise<void> {
  const { data: plans } = await supabase
    .from(TABLES.plans)
    .select('id, token_amount')
    .eq('slug', planSlug)
    .limit(1);

  if (!plans || plans.length === 0) throw new Error('Plan not found');

  await supabase
    .from(TABLES.subscriptions)
    .insert({
      user_id: userId,
      plan_id: plans[0].id,
      token_amount: plans[0].token_amount,
      order_number: `ADMIN-${Date.now()}`,
    });
}
