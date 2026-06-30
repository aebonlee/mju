import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { getPlans } from '../utils/subscription';
import useAOS from '../hooks/useAOS';
import SEOHead from '../components/SEOHead';
import type { Plan } from '../types';
import '../styles/pricing.css';

export default function Pricing() {
  const { language, t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const { addItem } = useCart();
  const toast = useToast();
  const navigate = useNavigate();
  const isKo = language === 'ko';
  useAOS();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlans()
      .then(setPlans)
      .catch(() => toast.error(isKo ? '요금제를 불러올 수 없습니다.' : 'Failed to load plans.'))
      .finally(() => setLoading(false));
  }, []);

  function handlePurchase(plan: Plan) {
    if (!isLoggedIn) {
      toast.warning(isKo ? '로그인이 필요합니다.' : 'Please log in first.');
      navigate('/login');
      return;
    }

    const product = {
      id: Date.now(),
      slug: `token-${plan.slug}`,
      category: 'subscription',
      title: `${plan.name_ko} (${plan.token_amount.toLocaleString()} 토큰)`,
      titleEn: `${plan.name_en} (${plan.token_amount.toLocaleString()} tokens)`,
      description: plan.description_ko || '',
      descriptionEn: plan.description_en || '',
      price: plan.price,
      imageUrl: '',
      isSoldOut: false,
      isActive: true,
      sortOrder: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addItem(product);
    navigate('/checkout');
  }

  const formatPrice = (price: number) => {
    return isKo ? `${price.toLocaleString()}원` : `₩${price.toLocaleString()}`;
  };

  const getPlanIcon = (slug: string) => {
    switch (slug) {
      case 'starter': return 'fa-coins';
      case 'standard': return 'fa-bolt';
      case 'pro': return 'fa-gem';
      default: return 'fa-coins';
    }
  };

  return (
    <>
      <SEOHead title={t('pricing.title')} path="/pricing" />
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">{t('pricing.title')}</h1>
          <p className="page-subtitle">{t('pricing.subtitle')}</p>
        </div>
      </section>

      <section className="pricing-section">
        <div className="container">

          {loading ? (
            <div className="text-center" style={{ padding: '60px 0' }}>
              <div className="loading-spinner" />
            </div>
          ) : (
            <div className="pricing-grid" data-aos="fade-up">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`pricing-card ${plan.slug === 'standard' ? 'featured' : ''}`}
                >
                  {plan.bonus_label_ko && (
                    <div className="pricing-badge">
                      {isKo ? plan.bonus_label_ko : plan.bonus_label_en}
                    </div>
                  )}
                  <div className="pricing-icon">
                    <i className={`fa-solid ${getPlanIcon(plan.slug)}`} />
                  </div>
                  <h3 className="pricing-name">{isKo ? plan.name_ko : plan.name_en}</h3>
                  <p className="pricing-desc">{isKo ? plan.description_ko : plan.description_en}</p>
                  <div className="pricing-price">{formatPrice(plan.price)}</div>
                  <div className="pricing-tokens">
                    <span className="token-amount">{plan.token_amount.toLocaleString()}</span>
                    <span className="token-unit">{isKo ? '토큰' : 'tokens'}</span>
                  </div>

                  <ul className="pricing-features">
                    <li><i className="fa-solid fa-check" /> {isKo ? '공유 API 키 사용' : 'Use shared API keys'}</li>
                    <li><i className="fa-solid fa-check" /> {isKo ? '모든 AI 도구 접근' : 'Access all AI tools'}</li>
                    <li><i className="fa-solid fa-check" /> {isKo ? '토큰 만료 없음' : 'Tokens never expire'}</li>
                    <li><i className="fa-solid fa-check" /> {isKo ? '사용한 만큼만 차감' : 'Pay as you use'}</li>
                  </ul>

                  <button
                    className={`btn pricing-btn ${plan.slug === 'standard' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handlePurchase(plan)}
                  >
                    {isKo ? '충전하기' : 'Recharge'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Free tier info */}
          <div className="pricing-free-tier" data-aos="fade-up" data-aos-delay="100">
            <div className="free-tier-icon"><i className="fa-solid fa-key" /></div>
            <div className="free-tier-content">
              <h3>{isKo ? '무료로 시작하기' : 'Start for Free'}</h3>
              <p>{isKo
                ? '개인 API 키(OpenAI, Claude, Gemini)를 Settings에서 입력하면 토큰 충전 없이도 무제한으로 AI 도구를 사용할 수 있습니다.'
                : 'Enter your own API keys (OpenAI, Claude, Gemini) in Settings to use AI tools unlimited without purchasing tokens.'}</p>
              <button className="btn btn-outline btn-sm" onClick={() => navigate('/settings')}>
                {isKo ? 'API 키 설정하기' : 'Set API Keys'}
              </button>
            </div>
          </div>

          <div className="pricing-faq" data-aos="fade-up" data-aos-delay="200">
            <h2>{isKo ? '자주 묻는 질문' : 'FAQ'}</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h4>{isKo ? '토큰이란?' : 'What are tokens?'}</h4>
                <p>{isKo ? 'AI가 텍스트를 처리하는 단위입니다. 한글 1글자 ≈ 2~3토큰, 영어 1단어 ≈ 1토큰입니다. 1회 생성에 약 3,000~5,000 토큰이 사용됩니다.' : 'Units that AI uses to process text. ~1 token per English word. One generation uses about 3,000-5,000 tokens.'}</p>
              </div>
              <div className="faq-item">
                <h4>{isKo ? '토큰은 만료되나요?' : 'Do tokens expire?'}</h4>
                <p>{isKo ? '아니요. 충전한 토큰은 만료 없이 사용할 수 있습니다.' : 'No. Purchased tokens never expire and can be used anytime.'}</p>
              </div>
              <div className="faq-item">
                <h4>{isKo ? '개인 API 키와 차이점은?' : 'Difference from personal API keys?'}</h4>
                <p>{isKo ? '개인 키를 입력하면 토큰 소모 없이 무제한으로 사용 가능합니다. 토큰 충전은 키 발급이 어려운 분을 위한 옵션입니다.' : 'Personal keys allow unlimited usage without token deduction. Token purchase is for those who prefer not to manage their own API keys.'}</p>
              </div>
              <div className="faq-item">
                <h4>{isKo ? '환불은 가능한가요?' : 'Can I get a refund?'}</h4>
                <p>{isKo ? '결제 후 7일 이내 사용량이 없는 경우 환불이 가능합니다. 자세한 내용은 고객센터로 문의하세요.' : 'Refunds are available within 7 days if no usage occurred. Contact support for details.'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
