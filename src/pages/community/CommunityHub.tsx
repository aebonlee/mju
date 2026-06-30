import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { BOARDS } from '../../config/boards';
import SEOHead from '../../components/SEOHead';

export default function CommunityHub() {
  const { language, t } = useLanguage();
  const isKo = language === 'ko';

  return (
    <div className="community-page">
      <SEOHead title={t('community.title')} />
      <div className="container">
        <div className="section-header" style={{ marginTop: 20 }}>
          <h1 className="section-title">{t('community.title')}</h1>
          <p className="section-subtitle">{t('community.subtitle')}</p>
        </div>

        <div className="community-hub-grid">
          {BOARDS.map(board => (
            <Link to={`/community/${board.id}`} className="board-card" key={board.id}>
              <div className="board-card-icon" style={{ background: board.color }}>
                <i className={`fa-solid ${board.icon}`} />
              </div>
              <h3>{isKo ? board.nameKo : board.nameEn}</h3>
              <p>{isKo ? board.descKo : board.descEn}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
