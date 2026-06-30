// 3개 연수과정별 게시판 (교육과정·학습자료와 동일한 id 체계)
export const BOARDS = [
  {
    id: 'basic',
    icon: 'fa-seedling',
    nameKo: '기초과정 — AI 도구 이해',
    nameEn: 'Basic — Understanding AI Tools',
    descKo: '기초과정 수강 교수자들이 산출물·질문·후기를 나누는 게시판입니다.',
    descEn: 'For faculty taking the Basic course.',
    color: '#0072CE',
  },
  {
    id: 'intermediate',
    icon: 'fa-diagram-project',
    nameKo: '심화과정 — 수업 활용·전공 융합',
    nameEn: 'Intermediate — Classroom Use & Fusion',
    descKo: '심화과정 수강 교수자들의 산출물·질문·토론 공간입니다.',
    descEn: 'For faculty taking the Intermediate course.',
    color: '#2E5BA8',
  },
  {
    id: 'advanced',
    icon: 'fa-rocket',
    nameKo: '전문과정 — 전공 융합·연구 적용',
    nameEn: 'Advanced — Fusion & Research Application',
    descKo: '전문과정 수강 교수자들의 산출물·질문·토론 공간입니다.',
    descEn: 'For faculty taking the Advanced course.',
    color: '#1A2A5E',
  },
];

export const BOARD_CATEGORIES = [
  { key: 'all', labelKo: '전체', labelEn: 'All' },
  { key: 'question', labelKo: 'Q&A', labelEn: 'Q&A' },
  { key: 'resource', labelKo: '자료공유', labelEn: 'Resources' },
  { key: 'free', labelKo: '자유', labelEn: 'Free' },
  { key: 'notice', labelKo: '공지', labelEn: 'Notice' },
];

export function getBoardById(id: string) {
  return BOARDS.find(b => b.id === id);
}

export function getCategoriesForBoard(_boardId: string) {
  return BOARD_CATEGORIES;
}
