import { supabase, TABLES } from './supabase';
import site from '../config/site';

const POSTS = TABLES.posts;       // mju_posts
const COMMENTS = TABLES.comments; // mju_comments

export async function getPosts({ board, category, search, limit }: { board?: string; category?: string; search?: string; limit?: number } = {}) {
  let query = supabase
    .from(POSTS)
    .select('*, comment_count:mju_comments(count)')
    .order('created_at', { ascending: false });

  if (board) query = query.eq('board', board);
  if (category && category !== 'all') query = query.eq('category', category);
  if (search && search.trim()) {
    const q = search.trim();
    query = query.or(`title.ilike.%${q}%,author_name.ilike.%${q}%`);
  }
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;

  return (data || []).map(post => ({
    ...post,
    comment_count: post.comment_count?.[0]?.count ?? 0,
  }));
}

export async function getPostById(id: number) {
  try { await supabase.rpc(`increment_${site.dbPrefix}view_count`, { post_id: Number(id) }); } catch { /* ignore */ }

  const { data: post, error } = await supabase
    .from(POSTS)
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  const { data: comments } = await supabase
    .from(COMMENTS)
    .select('*')
    .eq('post_id', id)
    .order('created_at', { ascending: true });

  return { ...post, comments: comments || [] };
}

export async function createPost({ board, category, title, content, authorId, authorName }: {
  board: string; category: string; title: string; content: string; authorId: string; authorName: string;
}) {
  const { data, error } = await supabase
    .from(POSTS)
    .insert({ author_id: authorId, author_name: authorName, board, category, title, content })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePost(id: number) {
  const { error } = await supabase.from(POSTS).delete().eq('id', id);
  if (error) throw error;
}

export async function createComment({ postId, body, authorId, authorName }: {
  postId: number; body: string; authorId: string; authorName: string;
}) {
  const { data, error } = await supabase
    .from(COMMENTS)
    .insert({ post_id: postId, author_id: authorId, author_name: authorName, body })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteComment(id: number) {
  const { error } = await supabase.from(COMMENTS).delete().eq('id', id);
  if (error) throw error;
}

export async function getPostStats() {
  const [postsRes, commentsRes, viewsRes] = await Promise.all([
    supabase.from(POSTS).select('id', { count: 'exact', head: true }),
    supabase.from(COMMENTS).select('id', { count: 'exact', head: true }),
    supabase.from(POSTS).select('view_count'),
  ]);
  const totalViews = (viewsRes.data || []).reduce((sum, p) => sum + (p.view_count || 0), 0);
  return { posts: postsRes.count ?? 0, comments: commentsRes.count ?? 0, views: totalViews };
}
