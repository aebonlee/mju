import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { getBoardById, BOARD_CATEGORIES } from '../../config/boards';
import { getPosts } from '../../utils/posts';
import SEOHead from '../../components/SEOHead';
import Pagination from '../../components/Pagination';

const PER_PAGE = 15;

export default function Board() {
  const { board: boardId } = useParams();
  const { language, t } = useLanguage();
  const { isLoggedIn: isAuthenticated } = useAuth();
  const isKo = language === 'ko';

  const board = getBoardById(boardId || '');
  const [posts, setPosts] = useState<any[]>([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPosts({ board: boardId, category, search })
      .then(data => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [boardId, category, search]);

  const totalPages = Math.ceil(posts.length / PER_PAGE);
  const paginated = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="board-page">
      <SEOHead title={board ? (isKo ? board.nameKo : board.nameEn) : 'Board'} />
      <div className="container">
        <Link to="/community" className="board-back">
          <i className="fa-solid fa-arrow-left" /> {t('community.title')}
        </Link>

        <div className="board-header">
          <h1>{board ? (isKo ? board.nameKo : board.nameEn) : boardId}</h1>
          {isAuthenticated && (
            <Link to={`/community/${boardId}/write`} className="btn btn-primary btn-sm">
              {t('community.writePost')}
            </Link>
          )}
        </div>

        <div className="board-filters">
          {BOARD_CATEGORIES.map(cat => (
            <button
              key={cat.key}
              className={`chip ${category === cat.key ? 'active' : ''}`}
              onClick={() => { setCategory(cat.key); setPage(1); }}
            >
              {isKo ? cat.labelKo : cat.labelEn}
            </button>
          ))}
          <input
            className="board-search"
            placeholder={t('community.search')}
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        {loading ? (
          <div className="loading-page"><div className="loading-spinner" /></div>
        ) : paginated.length === 0 ? (
          <p className="text-center mt-4" style={{ color: 'var(--text-secondary)' }}>{t('community.noPost')}</p>
        ) : (
          <>
            <div className="post-list">
              {paginated.map(post => (
                <Link to={`/community/${boardId}/${post.id}`} className="post-item" key={post.id}>
                  <span className={`post-category ${post.category}`}>
                    {post.category}
                  </span>
                  <span className="post-title">{post.title}</span>
                  <div className="post-meta">
                    <span>{post.author_name}</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    <span><i className="fa-solid fa-eye" /> {post.view_count || 0}</span>
                    <span><i className="fa-solid fa-comment" /> {post.comment_count}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  );
}
