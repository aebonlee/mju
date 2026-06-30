import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useApiKeys } from '../hooks/useApiKeys';
import { useSubscriptionContext } from '../contexts/SubscriptionContext';
import { useUsageLog } from '../hooks/useUsageLog';
import { useToast } from '../contexts/ToastContext';
import { PROVIDER_LIST } from '../config/ai-providers';
import SEOHead from '../components/SEOHead';
import ApiKeyInput from '../components/ai/ApiKeyInput';

export default function Settings() {
  const { user, profile, updateProfile } = useAuth();
  const { language, t } = useLanguage();
  const { getApiKey, setApiKey, hasApiKey } = useApiKeys();
  const { tokenBalance, hasTokens } = useSubscriptionContext();
  const { logs, monthlyUsage, loading: usageLoading } = useUsageLog();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState('apiKeys');
  const [displayName, setDisplayName] = useState(profile?.display_name || user?.user_metadata?.full_name || '');
  const [saving, setSaving] = useState(false);

  async function handleSaveProfile() {
    setSaving(true);
    try {
      await updateProfile({ display_name: displayName });
      toast.success(t('settings.saved'));
    } catch (err) {
      toast.error((err as Error).message || 'Error saving profile');
    }
    setSaving(false);
  }

  const tabs = [
    { id: 'apiKeys', icon: 'fa-key', label: t('settings.apiKeys') },
    { id: 'subscription', icon: 'fa-crown', label: t('settings.subscription') },
    { id: 'profile', icon: 'fa-user', label: t('settings.profile') },
    { id: 'usage', icon: 'fa-chart-simple', label: t('settings.usage') },
  ];

  return (
    <div className="settings-page">
      <SEOHead title={t('settings.title')} path="/settings" />
      <div className="container">
        <h1>{t('settings.title')}</h1>
        <div className="settings-layout">
          <nav>
            <ul className="settings-nav">
              {tabs.map(tab => (
                <li key={tab.id}>
                  <button
                    className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <i className={`fa-solid ${tab.icon}`} /> {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            {activeTab === 'apiKeys' && (
              <div className="settings-card">
                <h2>{t('settings.apiKeys')}</h2>
                <p className="settings-card-desc">{t('settings.apiKeysDesc')}</p>
                <div className="api-key-cards">
                  {PROVIDER_LIST.map(provider => (
                    <div key={provider.id} className="api-key-card">
                      <div className="api-key-provider">
                        <span className="dot" style={{ background: provider.color }} />
                        <span>{provider.name}</span>
                      </div>
                      <ApiKeyInput
                        value={getApiKey(provider.id)}
                        onChange={(val) => setApiKey(provider.id, val)}
                        placeholder={provider.keyPrefix ? `${provider.keyPrefix}...` : 'API Key'}
                      />
                      <span className={`api-key-status ${hasApiKey(provider.id) ? 'valid' : 'empty'}`}>
                        {hasApiKey(provider.id) ? '✓ Set' : 'Empty'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="settings-card">
                <h2>{t('settings.profile')}</h2>
                <p className="settings-card-desc">{t('settings.profileDesc')}</p>
                <div className="profile-avatar-section">
                  <div className="profile-avatar">
                    {profile?.avatar_url ? <img src={profile.avatar_url} alt="" /> : (displayName || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>{displayName || 'User'}</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>{user?.email}</div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">{t('auth.name')}</label>
                  <input className="form-input" value={displayName} onChange={e => setDisplayName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('auth.email')}</label>
                  <input className="form-input" value={user?.email || ''} disabled />
                </div>
                <div className="settings-btn-group">
                  <button className="btn btn-primary btn-sm" onClick={handleSaveProfile} disabled={saving}>
                    {saving ? '...' : t('settings.save')}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'subscription' && (
              <div className="settings-card">
                <h2>{language === 'ko' ? '토큰 잔액' : 'Token Balance'}</h2>
                <p className="settings-card-desc">{language === 'ko' ? '충전된 토큰 잔액과 사용 현황입니다.' : 'Your token balance and usage overview.'}</p>
                <div style={{ marginTop: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: hasTokens ? 'var(--primary-blue)' : 'var(--text-light)' }}>{tokenBalance.toLocaleString()}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>{language === 'ko' ? '잔여 토큰' : 'Remaining'}</div>
                    </div>
                    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-blue)' }}>{monthlyUsage.tokens.toLocaleString()}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>{language === 'ko' ? '이번 달 사용' : 'Used This Month'}</div>
                    </div>
                    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-blue)' }}>{monthlyUsage.requests}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>{language === 'ko' ? '이번 달 요청' : 'Requests'}</div>
                    </div>
                  </div>
                  {!hasTokens && (
                    <div style={{ textAlign: 'center', padding: '20px', background: 'var(--bg-alt)', borderRadius: '10px', marginBottom: '16px' }}>
                      <p style={{ color: 'var(--text-light)', marginBottom: '12px', fontSize: '14px' }}>
                        {language === 'ko' ? '토큰을 충전하면 개인 API 키 없이도 AI 도구를 사용할 수 있습니다.' : 'Recharge tokens to use AI tools without your own API keys.'}
                      </p>
                    </div>
                  )}
                  <Link to="/pricing" className="btn btn-primary btn-sm">
                    {language === 'ko' ? '토큰 충전하기' : 'Recharge Tokens'}
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="settings-card">
                <h2>{t('settings.usage')}</h2>
                <p className="settings-card-desc">{t('settings.usageDesc')}</p>
                {usageLoading ? (
                  <div style={{ textAlign: 'center', padding: '40px' }}><div className="loading-spinner" /></div>
                ) : logs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-light)' }}>
                    <p style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.15 }}><i className="fa-solid fa-chart-simple" /></p>
                    <p>{language === 'ko' ? '사용 이력은 AI 도구를 사용한 후 표시됩니다.' : 'Usage history will appear after using AI tools.'}</p>
                  </div>
                ) : (
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-blue)' }}>{monthlyUsage.tokens.toLocaleString()}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>{language === 'ko' ? '이번 달 토큰' : 'Tokens This Month'}</div>
                      </div>
                      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-blue)' }}>{monthlyUsage.requests}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>{language === 'ko' ? '이번 달 요청' : 'Requests This Month'}</div>
                      </div>
                    </div>
                    <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <th style={{ padding: '8px 4px', textAlign: 'left' }}>{language === 'ko' ? '날짜' : 'Date'}</th>
                          <th style={{ padding: '8px 4px', textAlign: 'left' }}>{language === 'ko' ? '도구' : 'Tool'}</th>
                          <th style={{ padding: '8px 4px', textAlign: 'left' }}>{language === 'ko' ? '모델' : 'Model'}</th>
                          <th style={{ padding: '8px 4px', textAlign: 'right' }}>{language === 'ko' ? '토큰' : 'Tokens'}</th>
                          <th style={{ padding: '8px 4px', textAlign: 'center' }}>{language === 'ko' ? '키' : 'Key'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs.slice(0, 20).map(log => (
                          <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '8px 4px' }}>{new Date(log.created_at).toLocaleDateString()}</td>
                            <td style={{ padding: '8px 4px' }}>{log.tool_id || '-'}</td>
                            <td style={{ padding: '8px 4px' }}>{log.model}</td>
                            <td style={{ padding: '8px 4px', textAlign: 'right' }}>{(log.input_tokens + log.output_tokens).toLocaleString()}</td>
                            <td style={{ padding: '8px 4px', textAlign: 'center' }}>
                              <span className={`key-source ${log.key_source}`} style={{ fontSize: '11px' }}>
                                {log.key_source === 'personal' ? (language === 'ko' ? '개인' : 'Personal') : (language === 'ko' ? '공유' : 'Shared')}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
