import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { BOARD_CATEGORIES } from '../../config/boards';
import { createPost } from '../../utils/posts';
import SEOHead from '../../components/SEOHead';

export default function BoardWrite() {
  const { board } = useParams();
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const toast = useToast();
  const navigate = useNavigate();
  const isKo = language === 'ko';

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('free');
  const [loading, setLoading] = useState(false);

  const categories = BOARD_CATEGORIES.filter(c => c.key !== 'all' && c.key !== 'notice');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    try {
      const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
      await createPost({ board: board || 'foundation', category, title, content, authorId: user.id, authorName: displayName });
      toast.success('Post created!');
      navigate(`/community/${board}`);
    } catch (err: any) {
      toast.error(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="write-page">
      <SEOHead title={t('community.writePost')} />
      <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1>{t('community.writePost')}</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{t('community.categoryLabel')}</label>
            <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
              {categories.map(c => (
                <option key={c.key} value={c.key}>{isKo ? c.labelKo : c.labelEn}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">{t('community.titleLabel')}</label>
            <input type="text" className="form-input" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">{t('community.contentLabel')}</label>
            <textarea className="form-textarea" style={{ minHeight: 300 }} value={content} onChange={e => setContent(e.target.value)} required />
          </div>
          <div className="write-actions">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => navigate(-1)}>
              {t('community.cancel')}
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
              {loading ? '...' : t('community.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
