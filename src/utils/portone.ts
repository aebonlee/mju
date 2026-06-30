/**
 * PortOne V1 (iamport) Payment Utility
 * KG이니시스 경유 카드결제/계좌이체
 */

import type { PaymentRequest, PaymentResult } from '../types';

// env 누락 시 fallback (아임포트 가맹점 식별코드 / KG이니시스 PG)
const IMP_CODE = import.meta.env.VITE_IMP_CODE || 'imp61949262';
const PG_PROVIDER = import.meta.env.VITE_PG_PROVIDER || 'html5_inicis.MOIkorcom1';

let initialized = false;

function getIMP() {
  if (!window.IMP) {
    console.error('iamport SDK not loaded');
    return null;
  }
  if (!initialized && IMP_CODE) {
    window.IMP.init(IMP_CODE);
    initialized = true;
  }
  return window.IMP;
}

/**
 * Request payment via PortOne V1 SDK
 */
export const requestPayment = ({
  orderId,
  orderName,
  totalAmount,
  payMethod,
  customer
}: PaymentRequest): Promise<PaymentResult> => {
  return new Promise((resolve) => {
    const IMP = getIMP();

    if (!IMP || !IMP_CODE) {
      console.warn('PortOne credentials not configured. Running in demo mode.');
      resolve({
        paymentId: `demo-pay-${Date.now()}`,
        txId: `demo-tx-${Date.now()}`
      });
      return;
    }

    const payMethodMap: Record<string, string> = { CARD: 'card', TRANSFER: 'trans' };

    IMP.request_pay(
      {
        pg: PG_PROVIDER,
        pay_method: payMethodMap[payMethod] || 'card',
        merchant_uid: `order_${orderId}_${Date.now()}`,
        name: orderName,
        amount: totalAmount,
        buyer_email: customer.email,
        buyer_name: customer.fullName,
        buyer_tel: customer.phoneNumber,
      },
      (response) => {
        if (response.success) {
          resolve({
            paymentId: response.imp_uid!,
            txId: response.merchant_uid!,
          });
        } else {
          resolve({
            code: response.error_code || 'PAYMENT_FAILED',
            message: response.error_msg || '결제가 취소되었습니다.',
          });
        }
      }
    );
  });
};
