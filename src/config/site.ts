/**
 * ============================================================
 *  명지대학교 교수자 AI 역량 강화 온라인 연수 — 사이트 설정
 * ============================================================
 */

import type { SiteConfig } from '../types';

const site: SiteConfig = {
  id: 'mju',
  name: 'Myongji Faculty AI',
  nameKo: '명지대학교 교수자 AI 역량 강화 연수',
  description: '명지대학교 교수자 AI 역량 강화 온라인 기본 연수과정 — 생성형 AI 도구 활용과 AI 융합 교수설계 역량을 함양하는 기초·심화·전문 3단계 마이크로러닝 과정(ADDIE·TPACK·Bloom 기반)',
  url: 'https://mju.dreamitbiz.com',
  dbPrefix: 'mju_',

  parentSite: {
    name: 'DreamIT Biz',
    url: 'https://www.dreamitbiz.com'
  },

  brand: {
    parts: [
      { text: '명지대', className: 'brand-dream' },
      { text: ' 교수자', className: 'brand-it' },
      { text: ' AI', className: 'brand-biz' }
    ]
  },

  themeColor: '#1A2A5E',

  company: {
    name: '드림아이티비즈(DreamIT Biz)',
    ceo: '이애본',
    bizNumber: '601-45-20154',
    salesNumber: '제2024-수원팔달-0584호',
    publisherNumber: '제2026-000026호',
    address: '경기도 수원시 팔달구 매산로 45, 419호',
    email: 'aebon@dreamitbiz.com',
    phone: '010-3700-0629',
    kakao: 'aebon',
    businessHours: '평일: 09:00 ~ 18:00',
  },

  features: {
    shop: true,
    community: true,
    search: true,
    auth: true,
    license: false,
  },

  // 기본 컬러셋 = mju(명지대 다크 블루 + 블루). 나머지는 후보 컬러셋
  colors: [
    { name: 'mju', color: '#1A2A5E' },       // 명지대 다크 블루 (기본)
    { name: 'academic', color: '#C8A04A' }, // 네이비+골드
    { name: 'research', color: '#14B8A6' },  // 딥네이비+틸
    { name: 'vibe', color: '#6D28D9' },      // 모던 바이올렛
  ],

  // 3개 연수과정명을 각각 상단 메뉴(링크)로 — 과정 내부는 좌측 사이드바로 이동
  menuItems: [
    { path: '/courses/basic', activePath: '/courses/basic', labelKey: 'site.nav.progBasic' },
    { path: '/courses/intermediate', activePath: '/courses/intermediate', labelKey: 'site.nav.progIntermediate' },
    { path: '/courses/advanced', activePath: '/courses/advanced', labelKey: 'site.nav.progAdvanced' },
    { path: '/prompt-eval', activePath: '/prompt-eval', labelKey: 'site.nav.promptPractice' },
    { path: '/appendix', activePath: '/appendix', labelKey: 'site.nav.appendix' },
    { path: '/recommended', labelKey: 'site.nav.recommended' },
  ],

  footerLinks: [
    { path: '/courses', labelKey: 'nav.education' },
    { path: '/prompt-eval', labelKey: 'site.nav.promptPractice' },
    { path: '/community', labelKey: 'nav.community' },
    { path: '/about', labelKey: 'nav.about' },
  ],

  familySites: [
    { name: 'DreamIT Biz (본사이트)', url: 'https://www.dreamitbiz.com' },
    { name: '대학교육 AI', url: 'https://university.dreamitbiz.com' },
    { name: '교수학습 AI 도구', url: 'https://teaching.dreamitbiz.com' },
    { name: 'AI 프롬프트 가이드', url: 'https://ai-prompt.dreamitbiz.com' },
  ]
};

export default site;

/** AI 도구 정의 */
export interface AITool {
  id: string;
  path: string;
  icon: string;
  nameKo: string;
  nameEn: string;
  descKo: string;
  descEn: string;
}

export const AI_TOOLS: AITool[] = [
  {
    id: 'syllabus',
    path: '/tools/syllabus',
    icon: 'fa-calendar-days',
    nameKo: '강의계획서 생성기',
    nameEn: 'Syllabus Generator',
    descKo: 'AI를 활용하여 체계적인 강의계획서를 자동 생성합니다.',
    descEn: 'Generate structured syllabi automatically using AI.',
  },
  {
    id: 'rubric',
    path: '/tools/rubric',
    icon: 'fa-table-cells',
    nameKo: '루브릭 생성기',
    nameEn: 'Rubric Builder',
    descKo: '평가 기준표를 체계적으로 설계하고 생성합니다.',
    descEn: 'Design and generate structured assessment rubrics.',
  },
  {
    id: 'assignment',
    path: '/tools/assignment',
    icon: 'fa-file-pen',
    nameKo: '과제 생성기',
    nameEn: 'Assignment Generator',
    descKo: '난이도와 유형에 맞는 과제를 자동 생성합니다.',
    descEn: 'Auto-generate assignments by difficulty and type.',
  },
  {
    id: 'feedback',
    path: '/tools/feedback',
    icon: 'fa-comments',
    nameKo: '피드백 생성기',
    nameEn: 'Feedback Generator',
    descKo: '학생에게 개인화된 피드백을 자동 생성합니다.',
    descEn: 'Generate personalized feedback for students.',
  },
  {
    id: 'evaluator',
    path: '/tools/evaluator',
    icon: 'fa-check-double',
    nameKo: '학생 과제 평가',
    nameEn: 'Student Evaluator',
    descKo: '루브릭 기반으로 학생 과제를 AI가 평가합니다.',
    descEn: 'AI evaluates student work based on rubrics.',
  },
];
