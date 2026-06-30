import { supabase, TABLES } from './supabase';

const TABLE = TABLES.practice_scores; // mju_practice_scores

export async function saveScore({ userId, userName, quizScore, evalScore, writeScore, totalScore, grade, detail }: {
  userId: string;
  userName: string;
  quizScore: number;
  evalScore: number;
  writeScore: number;
  totalScore: number;
  grade: string;
  detail: any;
}) {
  const { data, error } = await supabase.from(TABLE).insert({
    user_id: userId,
    user_name: userName,
    quiz_score: quizScore,
    eval_score: evalScore,
    write_score: writeScore,
    total_score: totalScore,
    grade,
    detail,
  }).select().single();
  if (error) throw error;
  return data;
}

export async function getHistory(userId: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);
  if (error) throw error;
  return data || [];
}

export function calcGrade(total: number) {
  if (total >= 225) return 'S';
  if (total >= 200) return 'A';
  if (total >= 175) return 'B';
  if (total >= 150) return 'C';
  return 'D';
}
