import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { AI_TOOLS } from '../config/site';
import { supabase } from '../utils/supabase';
import SEOHead from '../components/SEOHead';

interface RecentItem {
  id: string;
  title: string;
  created_at: string;
  type: string;
}

export default function Dashboard() {
  const { user, profile } = useAuth();
  const { language, t } = useLanguage();
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);

  const displayName = profile?.display_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || '';

  useEffect(() => {
    if (user) loadRecent();
  }, [user]);

  async function loadRecent() {
    try {
      const tables = ['teaching_syllabi', 'teaching_rubrics', 'teaching_assignments', 'teaching_feedback', 'teaching_evaluations'];
      const results = await Promise.all(
        tables.map(table =>
          supabase.from(table).select('id, title, created_at').eq('user_id', user!.id).order('created_at', { ascending: false }).limit(3)
        )
      );
      const all = results.flatMap((r, i) =>
        (r.data || []).map(item => ({ ...item, type: ['syllabus', 'rubric', 'assignment', 'feedback', 'evaluation'][i] }))
      );
      all.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setRecentItems(all.slice(0, 10));
    } catch {
      // silently fail
    }
  }

  const typeIcons: Record<string, string> = { syllabus: 'fa-calendar-days', rubric: 'fa-table-cells', assignment: 'fa-file-pen', feedback: 'fa-comments', evaluation: 'fa-check-double' };

  return (
    <div className="dashboard-page">
      <SEOHead title={t('nav.dashboard')} path="/dashboard" />
      <div className="container">
        <div className="dashboard-welcome">
          <h1>{displayName}{t('dashboard.welcome')}</h1>
          <p>{language === 'ko' ? 'AI 교수학습 도구로 더 효과적인 수업을 설계하세요.' : 'Design more effective classes with AI teaching tools.'}</p>
        </div>

        <div className="quick-access">
          <h2>{t('dashboard.quickAccess')}</h2>
          <div className="quick-access-grid">
            {AI_TOOLS.map(tool => (
              <Link key={tool.id} to={tool.path} className="quick-access-card">
                <div className="quick-access-icon"><i className={`fa-solid ${tool.icon}`} /></div>
                <span className="quick-access-label">{language === 'ko' ? tool.nameKo : tool.nameEn}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3><i className="fa-solid fa-clock-rotate-left" /> {t('dashboard.recentCreations')}</h3>
            {recentItems.length > 0 ? (
              <ul className="recent-list">
                {recentItems.map(item => (
                  <li key={`${item.type}-${item.id}`} className="recent-item">
                    <div className="recent-item-info">
                      <span className="recent-item-icon"><i className={`fa-solid ${typeIcons[item.type]}`} /></span>
                      <div>
                        <div className="recent-item-title">{item.title || `${item.type} #${item.id}`}</div>
                        <div className="recent-item-date">{new Date(item.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <span className="recent-item-type">{item.type}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="dashboard-empty">
                <div className="dashboard-empty-icon"><i className="fa-solid fa-file-circle-plus" /></div>
                <p>{t('dashboard.noRecent')}</p>
              </div>
            )}
          </div>

          <div className="dashboard-card">
            <h3><i className="fa-solid fa-chart-simple" /> {t('dashboard.usageStats')}</h3>
            <div className="usage-stats-list">
              <div className="usage-stat-item">
                <span className="usage-stat-label">{language === 'ko' ? '총 생성 수' : 'Total Generations'}</span>
                <span className="usage-stat-value">{recentItems.length}</span>
              </div>
              <div className="usage-stat-item">
                <span className="usage-stat-label">{language === 'ko' ? '이번 달' : 'This Month'}</span>
                <span className="usage-stat-value">
                  {recentItems.filter(i => {
                    const d = new Date(i.created_at);
                    const now = new Date();
                    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                  }).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
