import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { PROGRAMS } from '../../data/courses';
import type { ReactElement } from 'react';

export default function CourseCatalog(): ReactElement {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <>
      <SEOHead
        title={language === 'ko' ? '교육과정' : 'Courses'}
        path="/courses"
      />

      <section className="page-header">
        <div className="container">
          <div className="eyebrow">Programs</div>
          <h1>{language === 'ko' ? '연수과정' : 'Courses'}</h1>
          <p>{language === 'ko'
            ? '기초·심화·전문 3과정 · 각 5차시 이내 · 마이크로러닝'
            : 'Three staged courses · up to 5 microlearning sessions each (ADDIE · TPACK · Bloom).'}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="program-grid">
            {PROGRAMS.map((p) => {
              const totalSessions = p.curriculum.reduce((s, d) => s + d.sessions.length, 0);
              return (
                <article
                  key={p.id}
                  className="program-card"
                  onClick={() => navigate(`/courses/${p.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="program-card-top" style={{ borderTopColor: p.color }}>
                    <div className="program-icon" style={{ background: p.color }}>
                      <i className={`fa-solid ${p.icon}`} />
                    </div>
                    <div className="program-order">{String(p.order).padStart(2, '0')}</div>
                  </div>
                  <div className="program-card-body">
                    <span className="program-duration"><i className="fa-regular fa-clock" /> {p.duration}</span>
                    <h3>{language === 'ko' ? p.nameKo : p.nameEn}</h3>
                    <p className="program-tagline">{p.tagline}</p>
                    <p className="program-desc">{language === 'ko' ? p.descKo : p.descEn}</p>

                    <div className="program-audience">
                      <i className="fa-solid fa-user-check" /> {p.audience}
                    </div>

                    <div className="program-tags">
                      {p.highlights.map((h) => (
                        <span key={h} className="program-tag">{h}</span>
                      ))}
                    </div>

                    <div className="program-meta">
                      <span><i className="fa-solid fa-layer-group" /> {language === 'ko' ? `${totalSessions}개 실습 교시` : `${totalSessions} sessions`}</span>
                      <span><i className="fa-solid fa-signal" /> {p.level}</span>
                    </div>
                  </div>
                  <div className="program-card-footer">
                    <span className="btn btn-primary btn-sm">
                      {language === 'ko' ? '커리큘럼 보기' : 'View Curriculum'} <i className="fa-solid fa-arrow-right" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
