import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { COURSE_CATEGORIES } from '../data/courses';
import useCountUp from '../hooks/useCountUp';
import useAOS from '../hooks/useAOS';
import type { ReactElement } from 'react';

export default function Home(): ReactElement {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  useAOS();

  const stat0 = useCountUp(3);
  const stat1 = useCountUp(15);
  const stat2 = useCountUp(30);
  const stat3 = useCountUp(80);

  const stats = [
    { value: stat0.count, label: language === 'ko' ? '연수과정' : 'Courses', suffix: '' },
    { value: stat1.count, label: language === 'ko' ? '전체 차시' : 'Sessions', suffix: '' },
    { value: stat2.count, label: language === 'ko' ? '실습 사례' : 'Practice Cases', suffix: '+' },
    { value: stat3.count, label: language === 'ko' ? '이수 기준 진도율' : 'Completion', suffix: '%' },
  ];

  const isKo = language === 'ko';
  const marqueeWords = (isKo
    ? '생성형 AI · 프롬프트 · 강의설계 · 평가 루브릭 · PBL · AI 튜터 · 학습분석 · 교수법 혁신'
    : 'Generative AI · Prompts · Course Design · Rubrics · PBL · AI Tutor · Analytics · Teaching Innovation'
  ).split(' · ');

  // 연수 특징 (Overview band)
  const features = [
    { no: '01', icon: 'fa-cubes', title: isKo ? '마이크로러닝' : 'Microlearning', desc: isKo ? '과정별 5차시 이내, 차시당 15~25분. 바쁜 교수자도 LMS에서 자율적으로 수강합니다.' : 'Up to 5 sessions per course, 15–25 min each — self-paced on the LMS.' },
    { no: '02', icon: 'fa-layer-group', title: isKo ? '단계별 위계' : 'Staged Levels', desc: isKo ? 'AI 도구 이해→수업 활용→전공 융합→연구·산학 적용(Lv1~Lv4)으로 위계화했습니다.' : 'Tool literacy → classroom use → discipline fusion → research application (Lv1–Lv4).' },
    { no: '03', icon: 'fa-flask-vial', title: isKo ? '검증된 설계' : 'Proven Design', desc: isKo ? 'ADDIE 교수체계설계, TPACK, Bloom 신교육목표분류에 근거해 학습목표를 설계했습니다.' : 'Built on ADDIE, TPACK, and Bloom’s revised taxonomy.' },
    { no: '04', icon: 'fa-box-open', title: isKo ? '산출물 중심' : 'Deliverable-first', desc: isKo ? '차시마다 강의계획서·루브릭·활동지 등 바로 쓰는 산출물을 만들어 수업에 즉시 적용합니다.' : 'Every session produces a ready-to-use deliverable — syllabi, rubrics, activity sheets.' },
  ];

  // 수강 안내 (How it works)
  const prep = [
    { no: '1', title: isKo ? '자가진단' : 'Self-diagnosis', desc: isKo ? 'AI 활용 수준을 자가진단하고 본인에게 맞는 과정(기초·심화·전문)부터 시작하세요.' : 'Self-assess your AI level and start from the right course.' },
    { no: '2', title: isKo ? '자율 수강' : 'Self-paced', desc: isKo ? '교내 LMS에서 시간·장소 제약 없이 영상·워크북·확인퀴즈로 자율 수강합니다.' : 'Learn anytime on the campus LMS with videos, workbooks, and quizzes.' },
    { no: '3', title: isKo ? '멀티 LLM 실습' : 'Multi-LLM practice', desc: isKo ? 'ChatGPT·Claude·Gemini 등 주요 생성형 AI에 예시 프롬프트를 직접 입력해 비교 실습합니다.' : 'Compare ChatGPT, Claude, and Gemini with ready-to-use prompts.' },
    { no: '4', title: isKo ? '이수·인정' : 'Completion', desc: isKo ? '진도율 80% 이상 + 차시별 산출물 제출 시 이수 인정, 이수증·교수법 마일리지와 연계됩니다.' : 'Complete 80%+ and submit deliverables for a certificate and teaching mileage.' },
  ];

  // 연수 안내 (Info cards)
  const infoCards = [
    { kicker: 'Format', rows: [
      { k: isKo ? '운영 형태' : 'Format', v: isKo ? '온라인 LMS · 자율 수강(상시)' : 'Online LMS · self-paced' },
      { k: isKo ? '과정 구성' : 'Structure', v: isKo ? '기초·심화·전문 3과정 / 각 5차시' : '3 courses / 5 sessions each' },
      { k: isKo ? '차시 분량' : 'Per session', v: isKo ? '15~25분 · 마이크로러닝' : '15–25 min · microlearning' },
    ] },
    { kicker: 'Who', rows: [
      { k: isKo ? '대상' : 'Audience', v: isKo ? '강의 담당 교원·강사 전체' : 'All faculty & instructors' },
      { k: isKo ? '역량 단계' : 'Levels', v: isKo ? 'Lv1 이해 ~ Lv4 연구·산학' : 'Lv1 → Lv4' },
      { k: isKo ? '실습 환경' : 'Practice', v: isKo ? '멀티 LLM(ChatGPT·Claude·Gemini)' : 'Multi-LLM' },
    ] },
    { kicker: 'Completion', rows: [
      { k: isKo ? '이수 기준' : 'Criteria', v: isKo ? '진도율 80% + 산출물 제출' : '80% + deliverables' },
      { k: isKo ? '인정·연계' : 'Recognition', v: isKo ? '이수증 · 교수법 마일리지' : 'Certificate · mileage' },
      { k: isKo ? '문의' : 'Contact', v: 'aebon@dreamitbiz.com' },
    ] },
  ];

  return (
    <>
      <SEOHead title={t('site.home.title')} />

      {/* Hero — Editorial */}
      <section className="hero-ed">
        <div className="hero-ed-bg" aria-hidden="true" />
        <div className="container">
          <div className="hero-ed-grid">
            <div className="hero-ed-main">
              <div className="hero-ed-eyebrow" data-aos="fade-up">
                <span>{isKo ? '명지대학교 · 2026 · 교수학습개발센터' : 'Myongji University · 2026 · CTL'}</span>
              </div>
              <h1 className="hero-ed-title" data-aos="fade-up" data-aos-delay="50">
                {isKo ? '가르치는 교수자를 위한' : 'For Faculty Who Teach'}<br />
                <span className="accent">{isKo ? '교수자 AI 역량 강화' : 'Faculty AI Competency'}</span><br />
                <span className="accent">{isKo ? '기초·심화·전문 3과정' : '3-Stage Online Training'}</span>
              </h1>
              <p className="hero-ed-lead" data-aos="fade-up" data-aos-delay="100">
                {isKo
                  ? 'AI 도구 활용과 교수설계 역량을 함양하는 단계별 온라인 연수. ADDIE·TPACK·Bloom에 근거해 설계한 기초·심화·전문 3과정을 LMS에서 자율 수강하고, 차시마다 강의계획서·루브릭·활동지 등 바로 쓰는 산출물을 만듭니다.'
                  : 'A staged online program building AI tool fluency and instructional design competency. Self-pace three courses on the LMS, designed on ADDIE, TPACK, and Bloom — every session yields a ready-to-use deliverable.'}
              </p>
              <div className="hero-ed-actions" data-aos="fade-up" data-aos-delay="150">
                <button className="btn btn-primary btn-lg" onClick={() => navigate('/courses')}>
                  <i className="fa-solid fa-graduation-cap" /> {isKo ? '연수과정 보기' : 'View Courses'}
                </button>
                <button className="btn btn-accent btn-lg" onClick={() => navigate('/prompt-eval')}>
                  <i className="fa-solid fa-clipboard-check" /> {isKo ? '프롬프트 실습·평가' : 'Prompt Lab'}
                </button>
              </div>
            </div>

            <aside className="hero-ed-side" data-aos="fade-left" data-aos-delay="100">
              <div className="hero-ed-metrics">
                <div className="hero-metric">
                  <div className="hero-metric-num accent">3</div>
                  <div className="hero-metric-label">{isKo ? '연수과정' : 'Courses'}</div>
                </div>
                <div className="hero-metric">
                  <div className="hero-metric-num">15</div>
                  <div className="hero-metric-label">{isKo ? '전체 차시' : 'Sessions'}</div>
                </div>
                <div className="hero-metric">
                  <div className="hero-metric-num">Lv<span className="small">4</span></div>
                  <div className="hero-metric-label">{isKo ? '역량 단계' : 'Levels'}</div>
                </div>
                <div className="hero-metric">
                  <div className="hero-metric-num accent">80<span className="small">%</span></div>
                  <div className="hero-metric-label">{isKo ? '이수 기준' : 'Completion'}</div>
                </div>
              </div>
              <div className="hero-ed-card">
                <div className="hero-ed-card-eyebrow">2026 · Faculty AI Training</div>
                <div className="hero-ed-card-title">{isKo ? '기초·심화·전문 3과정' : 'Three Staged Courses'}</div>
                <ul className="hero-ed-card-list">
                  {COURSE_CATEGORIES.map((p) => (
                    <li key={p.id}>
                      <span className="hero-card-name">{isKo ? p.nameKo : p.nameEn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="marquee-group">
              {marqueeWords.map((w, j) => (
                <span key={`${i}-${j}`}>{w}<span className="dot">&#10022;</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Course Categories */}
      <section className="section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>{t('site.home.coursesTitle')}</h2>
            <p>{t('site.home.coursesDesc')}</p>
          </div>
          <div className="course-category-grid">
            {COURSE_CATEGORIES.map((cat, i) => (
              <div
                key={cat.id}
                className="course-category-card"
                data-aos="fade-up"
                data-aos-delay={i * 100}
                onClick={() => navigate(`/courses/${cat.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="category-icon" style={{ background: cat.color }}>
                  <i className={`fa-solid ${cat.icon}`} />
                </div>
                <span className="category-duration"><i className="fa-regular fa-clock" /> {cat.duration}</span>
                <h3>{language === 'ko' ? cat.nameKo : cat.nameEn}</h3>
                <p className="category-tagline">{cat.tagline}</p>
                <p>{language === 'ko' ? cat.descKo : cat.descEn}</p>
                <div className="category-tags">
                  {cat.highlights.slice(0, 3).map((h) => (
                    <span key={h} className="category-tag">{h}</span>
                  ))}
                </div>
                <span className="category-link">
                  {language === 'ko' ? '커리큘럼 보기' : 'View Curriculum'} <i className="fa-solid fa-arrow-right" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview band — 교육 특징 */}
      <section className="overview-band">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-intro" data-aos="fade-up">
              <div className="overview-eyebrow">Overview</div>
              <h2>{isKo ? '계열을 막론한\n교수자 AI 연수' : 'AI training\nfor faculty in any field'}</h2>
              <p>{isKo
                ? '전 계열 교원·강사가 자신의 수업에 곧바로 적용할 수 있도록, 검증된 교수설계 모형에 따라 단계별·산출물 중심으로 설계했습니다.'
                : 'Designed on proven instructional-design models so faculty in any discipline can apply it to their own teaching right away.'}</p>
            </div>
            <div className="overview-cards">
              {features.map((f, i) => (
                <div key={f.no} className="overview-card" data-aos="fade-up" data-aos-delay={i * 80}>
                  <div className="overview-card-top">
                    <span className="overview-no">{f.no}</span>
                    <i className={`fa-solid ${f.icon}`} />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 교육 전 준비사항 */}
      <section className="section">
        <div className="container">
          <div className="prep-wrap" data-aos="fade-up">
            <div className="prep-head">
              <div className="overview-eyebrow accent-eyebrow">How It Works</div>
              <h2>{isKo ? '수강 방법' : 'How It Works'}</h2>
              <p>{isKo
                ? '자가진단으로 내 수준을 확인하고, LMS에서 자율 수강한 뒤 산출물을 제출하면 이수로 인정됩니다.'
                : 'Self-assess, learn at your own pace on the LMS, and submit deliverables to earn completion.'}</p>
            </div>
            <div className="prep-grid">
              {prep.map((p) => (
                <div key={p.no} className="prep-item">
                  <span className="prep-no">{p.no}</span>
                  <div>
                    <div className="prep-title">{p.title}</div>
                    <div className="prep-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 교육 안내 */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="overview-eyebrow">Information</div>
            <h2>{isKo ? '연수 안내' : 'Program Information'}</h2>
            <p>{isKo ? '운영 방식·수강 대상·이수 기준을 한눈에 확인하세요.' : 'Format, audience, and completion criteria at a glance.'}</p>
          </div>
          <div className="info-grid">
            {infoCards.map((c, i) => (
              <div key={c.kicker} className="info-card" data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="info-kicker">{c.kicker}</div>
                {c.rows.map((r) => (
                  <div key={r.k} className="info-row">
                    <div className="info-k">{r.k}</div>
                    <div className="info-v">{r.v}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="info-cta" data-aos="fade-up">
            <button className="btn btn-accent btn-lg" onClick={() => navigate('/courses')}>
              <i className="fa-solid fa-graduation-cap" /> {isKo ? '과정 살펴보기' : 'Explore programs'}
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section stats-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>{t('site.home.statsTitle')}</h2>
          </div>
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card" data-aos="zoom-in" data-aos-delay={i * 100}>
                <div className="stat-value">{stat.value}{stat.suffix}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content" data-aos="fade-up">
            <h2>{t('site.home.ctaTitle')}</h2>
            <p>{t('site.home.ctaDesc')}</p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>
              <i className="fa-solid fa-user-plus" /> {t('site.home.ctaButton')}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
