import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { getPostStats } from '../../utils/posts';
import SEOHead from '../../components/SEOHead';

export default function AdminDashboard() {
  const { language } = useLanguage();
  const isKo = language === 'ko';
  const [stats, setStats] = useState({ posts: 0, comments: 0, views: 0 });

  useEffect(() => {
    getPostStats().then(setStats).catch(() => {});
  }, []);

  return (
    <div className="community-page">
      <SEOHead title="Admin Dashboard" />
      <div className="container">
        <div className="page-header">
          <h1>{isKo ? '관리자 대시보드' : 'Admin Dashboard'}</h1>
          <p className="page-desc">{isKo ? '사이트 운영 현황을 확인합니다' : 'Check site operations status'}</p>
        </div>

        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="card text-center">
            <div className="feature-icon" style={{ margin: '0 auto 16px' }}>
              <i className="fa-solid fa-file-lines" />
            </div>
            <h3>{stats.posts}</h3>
            <p>{isKo ? '게시글' : 'Posts'}</p>
          </div>
          <div className="card text-center">
            <div className="feature-icon" style={{ margin: '0 auto 16px' }}>
              <i className="fa-solid fa-comments" />
            </div>
            <h3>{stats.comments}</h3>
            <p>{isKo ? '댓글' : 'Comments'}</p>
          </div>
          <div className="card text-center">
            <div className="feature-icon" style={{ margin: '0 auto 16px' }}>
              <i className="fa-solid fa-eye" />
            </div>
            <h3>{stats.views}</h3>
            <p>{isKo ? '조회수' : 'Views'}</p>
          </div>
        </div>

        <div className="mt-4" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link to="/admin/users" className="btn btn-primary btn-sm">
            <i className="fa-solid fa-users" /> {isKo ? '회원 관리' : 'User Management'}
          </Link>
          <Link to="/admin/plans" className="btn btn-primary btn-sm">
            <i className="fa-solid fa-crown" /> {isKo ? '요금제/공유키 관리' : 'Plans & Shared Keys'}
          </Link>
        </div>
      </div>
    </div>
  );
}
