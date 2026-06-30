import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAllSharedKeys, getAllPurchases, upsertSharedKey, deleteSharedKey, grantTokens } from '../../utils/subscription';
import { useToast } from '../../contexts/ToastContext';
import SEOHead from '../../components/SEOHead';
import type { SharedKey, TokenPurchase } from '../../types';

export default function AdminPlans() {
  const { language } = useLanguage();
  const toast = useToast();
  const isKo = language === 'ko';

  const [sharedKeys, setSharedKeys] = useState<SharedKey[]>([]);
  const [purchases, setPurchases] = useState<TokenPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'keys' | 'purchases' | 'grant'>('keys');

  // Shared key form
  const [keyForm, setKeyForm] = useState({ provider: 'openai', apiKey: '', label: '' });
  const [saving, setSaving] = useState(false);

  // Grant form
  const [grantForm, setGrantForm] = useState({ userId: '', planSlug: 'starter' });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [keys, purch] = await Promise.all([
        getAllSharedKeys(),
        getAllPurchases(),
      ]);
      setSharedKeys(keys);
      setPurchases(purch);
    } catch (err) {
      toast.error((err as Error).message);
    }
    setLoading(false);
  }

  async function handleSaveKey() {
    if (!keyForm.apiKey.trim()) {
      toast.warning(isKo ? 'API 키를 입력하세요.' : 'Please enter an API key.');
      return;
    }
    setSaving(true);
    try {
      await upsertSharedKey(keyForm.provider, keyForm.apiKey, keyForm.label);
      toast.success(isKo ? '공유 키가 저장되었습니다.' : 'Shared key saved.');
      setKeyForm({ provider: 'openai', apiKey: '', label: '' });
      await loadData();
    } catch (err) {
      toast.error((err as Error).message);
    }
    setSaving(false);
  }

  async function handleDeleteKey(id: string) {
    if (!confirm(isKo ? '이 키를 삭제하시겠습니까?' : 'Delete this key?')) return;
    try {
      await deleteSharedKey(id);
      toast.success(isKo ? '삭제되었습니다.' : 'Deleted.');
      await loadData();
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  async function handleGrant() {
    if (!grantForm.userId.trim()) {
      toast.warning(isKo ? '사용자 ID를 입력하세요.' : 'Please enter user ID.');
      return;
    }
    try {
      await grantTokens(grantForm.userId, grantForm.planSlug);
      toast.success(isKo ? '토큰이 부여되었습니다.' : 'Tokens granted.');
      setGrantForm({ userId: '', planSlug: 'starter' });
      await loadData();
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <div className="community-page">
      <SEOHead title="Admin - Plans" />
      <div className="container">
        <div className="page-header">
          <h1>{isKo ? '토큰 & 공유 키 관리' : 'Tokens & Shared Keys'}</h1>
          <p className="page-desc">{isKo ? '공유 API 키와 토큰 충전 내역을 관리합니다.' : 'Manage shared API keys and token purchases.'}</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {(['keys', 'purchases', 'grant'] as const).map(t => (
            <button
              key={t}
              className={`btn btn-sm ${tab === t ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setTab(t)}
            >
              {t === 'keys' ? (isKo ? '공유 키' : 'Shared Keys')
                : t === 'purchases' ? (isKo ? '충전 내역' : 'Purchases')
                : (isKo ? '토큰 부여' : 'Grant')}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}><div className="loading-spinner" /></div>
        ) : (
          <>
            {tab === 'keys' && (
              <div>
                <div className="settings-card" style={{ marginBottom: '24px' }}>
                  <h3>{isKo ? '공유 키 추가/수정' : 'Add/Update Shared Key'}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr 150px', gap: '12px', marginTop: '12px' }}>
                    <select className="form-select" value={keyForm.provider} onChange={e => setKeyForm(f => ({ ...f, provider: e.target.value }))}>
                      <option value="openai">OpenAI</option>
                      <option value="anthropic">Anthropic</option>
                      <option value="google">Google</option>
                    </select>
                    <input className="form-input" placeholder="API Key" value={keyForm.apiKey} onChange={e => setKeyForm(f => ({ ...f, apiKey: e.target.value }))} />
                    <input className="form-input" placeholder={isKo ? '라벨 (선택)' : 'Label (optional)'} value={keyForm.label} onChange={e => setKeyForm(f => ({ ...f, label: e.target.value }))} />
                  </div>
                  <button className="btn btn-primary btn-sm" style={{ marginTop: '12px' }} onClick={handleSaveKey} disabled={saving}>
                    {saving ? '...' : (isKo ? '저장' : 'Save')}
                  </button>
                </div>

                <div className="settings-card">
                  <h3>{isKo ? '등록된 공유 키' : 'Registered Shared Keys'}</h3>
                  {sharedKeys.length === 0 ? (
                    <p style={{ color: 'var(--text-light)', marginTop: '12px' }}>{isKo ? '등록된 키가 없습니다.' : 'No keys registered.'}</p>
                  ) : (
                    <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse', marginTop: '12px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <th style={{ padding: '8px', textAlign: 'left' }}>Provider</th>
                          <th style={{ padding: '8px', textAlign: 'left' }}>Key</th>
                          <th style={{ padding: '8px', textAlign: 'left' }}>Label</th>
                          <th style={{ padding: '8px', textAlign: 'center' }}>Status</th>
                          <th style={{ padding: '8px', textAlign: 'center' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {sharedKeys.map(k => (
                          <tr key={k.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '8px' }}>{k.provider}</td>
                            <td style={{ padding: '8px', fontFamily: 'monospace' }}>{k.api_key.slice(0, 8)}...{k.api_key.slice(-4)}</td>
                            <td style={{ padding: '8px' }}>{k.label || '-'}</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>
                              <span className={`api-key-status ${k.is_active ? 'valid' : 'empty'}`}>{k.is_active ? 'Active' : 'Inactive'}</span>
                            </td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>
                              <button className="btn btn-sm" style={{ color: '#ef4444', fontSize: '12px' }} onClick={() => handleDeleteKey(k.id)}>
                                <i className="fa-solid fa-trash" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {tab === 'purchases' && (
              <div className="settings-card">
                <h3>{isKo ? '충전 내역' : 'Purchase History'} ({purchases.length})</h3>
                {purchases.length === 0 ? (
                  <p style={{ color: 'var(--text-light)', marginTop: '12px' }}>{isKo ? '충전 내역이 없습니다.' : 'No purchases.'}</p>
                ) : (
                  <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse', marginTop: '12px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <th style={{ padding: '8px', textAlign: 'left' }}>User ID</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>{isKo ? '패키지' : 'Package'}</th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>{isKo ? '토큰' : 'Tokens'}</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>{isKo ? '날짜' : 'Date'}</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>{isKo ? '주문번호' : 'Order'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.map(p => (
                        <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td style={{ padding: '8px', fontFamily: 'monospace', fontSize: '11px' }}>{p.user_id.slice(0, 8)}...</td>
                          <td style={{ padding: '8px' }}>{isKo ? p.plan?.name_ko : p.plan?.name_en}</td>
                          <td style={{ padding: '8px', textAlign: 'right' }}>{(p.token_amount || 0).toLocaleString()}</td>
                          <td style={{ padding: '8px' }}>{new Date(p.created_at).toLocaleDateString()}</td>
                          <td style={{ padding: '8px', fontSize: '11px' }}>{p.order_number || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {tab === 'grant' && (
              <div className="settings-card">
                <h3>{isKo ? '토큰 수동 부여' : 'Grant Tokens'}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-light)', marginBottom: '16px' }}>
                  {isKo ? '특정 사용자에게 토큰을 직접 부여합니다.' : 'Manually grant tokens to a user.'}
                </p>
                <div style={{ display: 'grid', gap: '12px', maxWidth: '500px' }}>
                  <div className="form-group">
                    <label className="form-label">User ID (UUID)</label>
                    <input className="form-input" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" value={grantForm.userId} onChange={e => setGrantForm(f => ({ ...f, userId: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{isKo ? '패키지' : 'Package'}</label>
                    <select className="form-select" value={grantForm.planSlug} onChange={e => setGrantForm(f => ({ ...f, planSlug: e.target.value }))}>
                      <option value="starter">Starter (100,000)</option>
                      <option value="standard">Standard (180,000)</option>
                      <option value="pro">Pro (400,000)</option>
                    </select>
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={handleGrant}>
                    {isKo ? '토큰 부여' : 'Grant Tokens'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
