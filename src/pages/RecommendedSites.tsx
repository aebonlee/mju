import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';
import type { ReactElement } from 'react';

interface SiteItem {
  name: string;
  nameEn: string;
  url: string;
  icon: string;
  iconStyle?: string; // 기본 fa-solid, 브랜드 로고는 fa-brands
  descKo: string;
  descEn: string;
  category: 'ai' | 'company';
}

const SITES: SiteItem[] = [
  {
    name: 'ChatGPT',
    nameEn: 'ChatGPT',
    url: 'https://chat.openai.com',
    icon: 'fa-robot',
    descKo: 'OpenAI의 대화형 AI. 텍스트 생성, 번역, 코딩, 분석 등 다양한 작업을 수행합니다.',
    descEn: 'OpenAI\'s conversational AI for text generation, translation, coding, and analysis.',
    category: 'ai',
  },
  {
    name: 'Claude',
    nameEn: 'Claude',
    url: 'https://claude.ai',
    icon: 'fa-brain',
    descKo: 'Anthropic의 AI 어시스턴트. 긴 문서 분석, 논리적 추론, 학술 작문에 강점이 있습니다.',
    descEn: 'Anthropic\'s AI assistant excelling at document analysis, logical reasoning, and academic writing.',
    category: 'ai',
  },
  {
    name: 'Gemini',
    nameEn: 'Gemini',
    url: 'https://gemini.google.com',
    icon: 'fa-gem',
    descKo: 'Google의 AI. 검색 연동, 이미지 분석, 멀티모달 기능을 제공합니다.',
    descEn: 'Google\'s AI with search integration, image analysis, and multimodal capabilities.',
    category: 'ai',
  },
  {
    name: 'Copilot',
    nameEn: 'Copilot',
    url: 'https://copilot.microsoft.com',
    icon: 'fa-microchip',
    descKo: 'Microsoft의 AI 코파일럿. Office 통합, 웹 검색, 이미지 생성을 지원합니다.',
    descEn: 'Microsoft\'s AI copilot with Office integration, web search, and image generation.',
    category: 'ai',
  },
  {
    name: 'Perplexity AI',
    nameEn: 'Perplexity AI',
    url: 'https://www.perplexity.ai',
    icon: 'fa-magnifying-glass',
    descKo: 'AI 기반 검색 엔진. 실시간 웹 검색과 출처 기반 답변을 제공합니다.',
    descEn: 'AI-powered search engine providing real-time web search with source-backed answers.',
    category: 'ai',
  },
  {
    name: 'NotebookLM',
    nameEn: 'NotebookLM',
    url: 'https://notebooklm.google.com',
    icon: 'fa-book-open-reader',
    descKo: 'Google의 AI 노트북. 문서를 업로드하면 요약, Q&A, 연결 분석을 수행합니다.',
    descEn: 'Google\'s AI notebook for document summarization, Q&A, and connection analysis.',
    category: 'ai',
  },
  {
    name: 'DreamIT Biz',
    nameEn: 'DreamIT Biz',
    url: 'https://www.dreamitbiz.com',
    icon: 'fa-building',
    descKo: '드림아이티비즈 본사이트. IT서비스, 교육, 출판, 컨설팅 종합 플랫폼입니다.',
    descEn: 'DreamIT Biz main site. IT services, education, publishing, and consulting platform.',
    category: 'company',
  },
  {
    name: '교수학습 AI 도구',
    nameEn: 'AI Teaching Tools',
    url: 'https://teaching.dreamitbiz.com',
    icon: 'fa-chalkboard-user',
    descKo: '교수학습에 특화된 AI 도구 모음. 강의계획서, 루브릭, 과제 생성기 등을 제공합니다.',
    descEn: 'AI tools specialized for teaching. Syllabus, rubric, and assignment generators.',
    category: 'company',
  },
  {
    name: '대학교육 AI',
    nameEn: 'University AI',
    url: 'https://university.dreamitbiz.com',
    icon: 'fa-graduation-cap',
    descKo: '대학 교육에 특화된 AI 활용 가이드와 교육 콘텐츠를 제공합니다.',
    descEn: 'AI utilization guides and educational content specialized for university education.',
    category: 'company',
  },
  {
    name: 'AI 프롬프트 가이드',
    nameEn: 'AI Prompt Guide',
    url: 'https://ai-prompt.dreamitbiz.com',
    icon: 'fa-terminal',
    descKo: 'AI 프롬프트 작성법 가이드. 효과적인 프롬프트 패턴과 실전 예시를 제공합니다.',
    descEn: 'AI prompt writing guide with effective patterns and practical examples.',
    category: 'company',
  },
];

export default function RecommendedSites(): ReactElement {
  const { language } = useLanguage();
  const isKo = language === 'ko';
  useAOS();

  const aiSites = SITES.filter(s => s.category === 'ai');
  const companySites = SITES.filter(s => s.category === 'company');

  return (
    <>
      <SEOHead
        title={isKo ? '추천사이트' : 'Recommended Sites'}
        path="/recommended"
      />

      <section className="page-header">
        <div className="container">
          <h1>{isKo ? '추천사이트' : 'Recommended Sites'}</h1>
          <p>{isKo
            ? '교육과 업무에 유용한 AI 서비스와 관련 사이트를 소개합니다.'
            : 'Useful AI services and related sites for education and work.'}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* AI Services */}
          <div className="recommended-section" data-aos="fade-up">
            <h2 className="recommended-section-title">
              <i className="fa-solid fa-wand-magic-sparkles" />
              {isKo ? 'AI 서비스' : 'AI Services'}
            </h2>
            <div className="recommended-grid">
              {aiSites.map(site => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="recommended-card"
                >
                  <div className="recommended-card-icon">
                    <i className={`${site.iconStyle || 'fa-solid'} ${site.icon}`} />
                  </div>
                  <div className="recommended-card-content">
                    <h3>{isKo ? site.name : site.nameEn}</h3>
                    <p>{isKo ? site.descKo : site.descEn}</p>
                    <span className="recommended-card-url">
                      {site.url.replace('https://', '')}
                      <i className="fa-solid fa-arrow-up-right-from-square" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Company Sites */}
          <div className="recommended-section" data-aos="fade-up" data-aos-delay="100">
            <h2 className="recommended-section-title">
              <i className="fa-solid fa-globe" />
              {isKo ? '관련 사이트' : 'Related Sites'}
            </h2>
            <div className="recommended-grid">
              {companySites.map(site => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="recommended-card"
                >
                  <div className="recommended-card-icon company">
                    <i className={`${site.iconStyle || 'fa-solid'} ${site.icon}`} />
                  </div>
                  <div className="recommended-card-content">
                    <h3>{isKo ? site.name : site.nameEn}</h3>
                    <p>{isKo ? site.descKo : site.descEn}</p>
                    <span className="recommended-card-url">
                      {site.url.replace('https://', '')}
                      <i className="fa-solid fa-arrow-up-right-from-square" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
