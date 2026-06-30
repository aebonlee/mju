import { useState, useEffect, type ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useSubscriptionContext } from '../contexts/SubscriptionContext';
import { useUsageLog } from '../hooks/useUsageLog';
import { getPurchaseHistory } from '../utils/subscription';
import { updateProfile } from '../utils/auth';
import SEOHead from '../components/SEOHead';
import type { TokenPurchase } from '../types';
import '../styles/auth.css';

const MyPage = (): ReactElement => {
  const { t, language } = useLanguage();
  const { user, profile, signOut, refreshProfile } = useAuth();
  const { tokenBalance, hasTokens } = useSubscriptionContext();
  const { logs, monthlyUsage } = useUsageLog();
  const navigate = useNavigate();
  const isKo = language === 'ko';

  const [purchases, setPurchases] = useState<TokenPurchase[]>([]);

  useEffect(() => {
    if (user) {
      getPurchaseHistory(user.id).then(setPurchases).catch(() => {});
    }
  }, [user]);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ displayName: '', phone: '', avatarUrl: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setForm({
        displayName: profile.display_name || '',
        phone: profile.phone || '',
        avatarUrl: profile.avatar_url || ''
      });
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await updateProfile(user!.id, {
        display_name: form.displayName,
        phone: form.phone,
        avatar_url: form.avatarUrl
      });
      await refreshProfile();
      setEditing(false);
      setMessage(t('auth.profileUpdated'));
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <SEOHead title="마이페이지" path="/mypage" noindex />
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">{t('auth.myPage')}</h1>
        </div>
      </section>

      <section className="auth-section">
        <div className="container">
          <div className="mypage-card">
            <div className="mypage-avatar">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.display_name} loading="lazy" />
              ) : (
                <div className="mypage-avatar-placeholder">
                  {(profile?.display_name || user?.email || '?')[0].toUpperCase()}
                </div>
              )}
            </div>

            <div className="mypage-info">
              {editing ? (
                <div className="mypage-edit-form">
                  <div className="auth-form-group">
                    <label>{t('auth.displayName')}</label>
                    <input
                      type="text"
                      value={form.displayName}
                      onChange={e => setForm({ ...form, displayName: e.target.value })}
                    />
                  </div>
                  <div className="auth-form-group">
                    <label>{t('auth.phone')}</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="010-0000-0000"
                    />
                  </div>
                  <div className="mypage-edit-actions">
                    <button className="board-btn primary" onClick={handleSave} disabled={saving}>
                      {saving ? t('auth.saving') : t('auth.save')}
                    </button>
                    <button className="board-btn" onClick={() => setEditing(false)}>
                      {t('community.cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="mypage-name">{profile?.display_name || t('auth.noName')}</h2>
                  <p className="mypage-email">{user?.email}</p>
                  {profile?.phone && (
                    <p className="mypage-phone"><i className="fa-solid fa-phone" /> {profile.phone}</p>
                  )}
                  <p className="mypage-provider">
                    {profile?.provider ? `${t('auth.loginWith')} ${profile.provider}` : t('auth.emailAccount')}
                  </p>
                  {profile?.role === 'admin' && (
                    <span className="mypage-role-badge">{t('auth.admin')}</span>
                  )}
                  <button className="board-btn" onClick={() => setEditing(true)} style={{ marginTop: '16px' }}>
                    {t('auth.editProfile')}
                  </button>
                </>
              )}

              {message && <div className="auth-message">{message}</div>}
            </div>

            {/* 토큰 잔액 & 사용량 */}
            <div className="mypage-token-section">
              <h3 className="mypage-section-title">
                <i className="fa-solid fa-coins" />
                {isKo ? '토큰 현황' : 'Token Status'}
              </h3>
              <div className="mypage-token-grid">
                <div className="mypage-token-card">
                  <div className={`mypage-token-value ${hasTokens ? 'has-balance' : ''}`}>
                    {tokenBalance.toLocaleString()}
                  </div>
                  <div className="mypage-token-label">{isKo ? '잔여 토큰' : 'Remaining'}</div>
                </div>
                <div className="mypage-token-card">
                  <div className="mypage-token-value">{monthlyUsage.tokens.toLocaleString()}</div>
                  <div className="mypage-token-label">{isKo ? '이번 달 사용' : 'Used This Month'}</div>
                </div>
                <div className="mypage-token-card">
                  <div className="mypage-token-value">{monthlyUsage.requests}</div>
                  <div className="mypage-token-label">{isKo ? '이번 달 요청' : 'Requests'}</div>
                </div>
              </div>
              <div className="mypage-token-actions">
                <Link to="/pricing" className="board-btn primary">
                  <i className="fa-solid fa-plus" /> {isKo ? '토큰 충전' : 'Recharge'}
                </Link>
                <Link to="/settings" className="board-btn">
                  <i className="fa-solid fa-chart-simple" /> {isKo ? '상세 이력' : 'Details'}
                </Link>
              </div>

              {/* 충전 & 사용 로그 */}
              {(purchases.length > 0 || logs.length > 0) && (
                <div className="mypage-token-log">
                  <h4 className="mypage-log-title">{isKo ? '최근 내역' : 'Recent Activity'}</h4>
                  <div className="mypage-log-list">
                    {/* 충전 내역 + 사용 내역을 시간순으로 합쳐서 표시 */}
                    {[
                      ...purchases.map(p => ({
                        type: 'charge' as const,
                        date: p.created_at,
                        label: isKo ? `토큰 충전 (${p.plan?.name_ko || ''})` : `Token Recharge (${p.plan?.name_en || ''})`,
                        amount: `+${(p.token_amount || 0).toLocaleString()}`,
                        positive: true,
                      })),
                      ...logs.slice(0, 20).map(l => ({
                        type: 'usage' as const,
                        date: l.created_at,
                        label: isKo
                          ? `${l.tool_id || 'AI 도구'} (${l.model})`
                          : `${l.tool_id || 'AI Tool'} (${l.model})`,
                        amount: l.key_source === 'shared'
                          ? `-${(l.input_tokens + l.output_tokens).toLocaleString()}`
                          : `${(l.input_tokens + l.output_tokens).toLocaleString()}`,
                        positive: l.key_source !== 'shared',
                      })),
                    ]
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 15)
                      .map((item, idx) => (
                        <div key={idx} className="mypage-log-item">
                          <div className="mypage-log-icon">
                            <i className={`fa-solid ${item.type === 'charge' ? 'fa-circle-plus' : 'fa-circle-minus'}`} />
                          </div>
                          <div className="mypage-log-info">
                            <span className="mypage-log-label">{item.label}</span>
                            <span className="mypage-log-date">{new Date(item.date).toLocaleDateString()}</span>
                          </div>
                          <span className={`mypage-log-amount ${item.positive ? 'positive' : 'negative'}`}>
                            {item.amount}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mypage-sections">
              <Link to="/mypage/orders" className="mypage-link-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>{t('auth.orderHistory')}</span>
              </Link>
              <Link to="/settings" className="mypage-link-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                <span>{isKo ? '설정 (API 키 / 사용 이력)' : 'Settings (API Keys / Usage)'}</span>
              </Link>
            </div>

            <div className="mypage-footer">
              <button className="board-btn danger" onClick={handleSignOut}>
                {t('auth.logout')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyPage;
