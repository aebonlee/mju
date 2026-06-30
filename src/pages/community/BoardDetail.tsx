import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { getPostById, deletePost, createComment, deleteComment } from '../../utils/posts';
import SEOHead from '../../components/SEOHead';

export default function BoardDetail() {
  const { board, id } = useParams();
  const { user, isLoggedIn: isAuthenticated, isAdmin } = useAuth();
  const { t } = useLanguage();
  const toast = useToast();
  const navigate = useNavigate();

  const [post, setPost] = useState<any>(null);
  const [commentBody, setCommentBody] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPostById(Number(id))
        .then(data => { setPost(data); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [id]);

  async function handleDeletePost() {
    if (!window.confirm(t('community.deleteConfirm'))) return;
    await deletePost(Number(id));
    toast.success('Deleted');
    navigate(`/community/${board}`);
  }

  async function handleAddComment() {
    if (!commentBody.trim()) return;
    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
    const comment = await createComment({ postId: Number(id), body: commentBody, authorId: user.id, authorName: displayName });
    setPost((prev: any) => ({ ...prev, comments: [...(prev.comments || []), comment] }));
    setCommentBody('');
  }

  async function handleDeleteComment(commentId: number) {
    if (!window.confirm(t('community.deleteConfirm'))) return;
    await deleteComment(commentId);
    setPost((prev: any) => ({ ...prev, comments: prev.comments.filter((c: any) => c.id !== commentId) }));
  }

  if (loading) return <div className="loading-page"><div className="loading-spinner" /></div>;
  if (!post) return <div className="post-detail"><div className="container"><p>Post not found</p></div></div>;

  const isOwner = user?.id === post.author_id;

  return (
    <div className="post-detail">
      <SEOHead title={post.title} />
      <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
        <Link to={`/community/${board}`} className="board-back">
          <i className="fa-solid fa-arrow-left" /> {t('community.title')}
        </Link>

        <div className="post-detail-header">
          <span className={`post-category ${post.category}`}>{post.category}</span>
          <h1>{post.title}</h1>
          <div className="post-detail-meta">
            <span>{post.author_name}</span>
            <span>{new Date(post.created_at).toLocaleString()}</span>
            <span><i className="fa-solid fa-eye" /> {post.view_count}</span>
          </div>
        </div>

        <div className="post-detail-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        {(isOwner || isAdmin) && (
          <div className="post-actions">
            <button className="danger" onClick={handleDeletePost}>
              <i className="fa-solid fa-trash" /> Delete
            </button>
          </div>
        )}

        {/* Comments */}
        <div className="comments-section">
          <h3>{t('community.comments')} ({post.comments?.length || 0})</h3>
          <div className="comment-list">
            {(post.comments || []).map((c: any) => (
              <div className="comment-item" key={c.id}>
                <div className="comment-header">
                  <span className="comment-author">{c.author_name}</span>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className="comment-date">{new Date(c.created_at).toLocaleString()}</span>
                    {(user?.id === c.author_id || isAdmin) && (
                      <button className="comment-delete" onClick={() => handleDeleteComment(c.id)}>
                        <i className="fa-solid fa-trash" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="comment-body">{c.body}</div>
              </div>
            ))}
          </div>

          {isAuthenticated ? (
            <div className="comment-form">
              <textarea
                value={commentBody}
                onChange={e => setCommentBody(e.target.value)}
                placeholder={t('community.commentPlaceholder')}
              />
              <button className="btn btn-primary btn-sm" onClick={handleAddComment}>
                {t('community.submit')}
              </button>
            </div>
          ) : (
            <p className="text-center mt-2" style={{ color: 'var(--text-secondary)' }}>
              <Link to="/login" style={{ color: 'var(--primary-blue)' }}>{t('community.loginRequired')}</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
