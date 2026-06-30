import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase } from '../../utils/supabase';
import SEOHead from '../../components/SEOHead';

export default function AdminUsers() {
  const { language } = useLanguage();
  const isKo = language === 'ko';
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from('univ_profiles').select('*').order('created_at', { ascending: false });
        setUsers(data || []);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="community-page">
      <SEOHead title={isKo ? '회원 관리' : 'User Management'} />
      <div className="container">
        <Link to="/admin" className="board-back">
          <i className="fa-solid fa-arrow-left" /> {isKo ? '대시보드' : 'Dashboard'}
        </Link>

        <div className="page-header">
          <h1>{isKo ? '회원 목록' : 'User List'}</h1>
          <p className="page-desc">{isKo ? `총 ${users.length}명` : `Total ${users.length} users`}</p>
        </div>

        {loading ? (
          <div className="loading-page"><div className="loading-spinner" /></div>
        ) : (
          <div className="post-list">
            {users.map(user => (
              <div className="post-item" key={user.id} style={{ cursor: 'default' }}>
                <span className="post-title">
                  <strong>{user.name || 'N/A'}</strong>
                  <span style={{ marginLeft: 12, color: 'var(--text-light)', fontSize: 13 }}>{user.email}</span>
                </span>
                <div className="post-meta">
                  <span className="badge">{user.role || 'user'}</span>
                  <span>{new Date(user.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <p className="text-center mt-3" style={{ color: 'var(--text-secondary)' }}>
                {isKo ? '등록된 회원이 없습니다.' : 'No users found.'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
