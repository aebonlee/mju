import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

export default function About(): ReactElement {
  const { language } = useLanguage();

  return (
    <>
      <SEOHead
        title={language === 'ko' ? '소개' : 'About'}
        path="/about"
      />

      <section className="page-header">
        <div className="container">
          <h1>{language === 'ko' ? '명지대학교 교수자 AI 역량 강화' : 'Myongji Faculty AI Competency'}</h1>
          <p>{language === 'ko'
            ? 'AI 도구 활용과 교수설계 역량을 함양하는 단계별 온라인 연수 (교수학습개발센터)'
            : 'A staged online program building AI tool fluency and instructional design competency'}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-card">
              <h2><i className="fa-solid fa-bullseye" /> {language === 'ko' ? '연수 목표' : 'Goals'}</h2>
              <ul>
                <li>{language === 'ko' ? '전(全) 교원의 기본 AI 활용 역량 표준화' : 'Standardize baseline AI competency across all faculty'}</li>
                <li>{language === 'ko' ? 'AI 융합 교수설계·평가 역량 강화 (TPACK)' : 'Strengthen AI-fused instructional design (TPACK)'}</li>
                <li>{language === 'ko' ? '차시별 산출물의 실제 수업 즉시 적용' : 'Apply session deliverables directly in class'}</li>
                <li>{language === 'ko' ? '전공 융합·연구·산학 적용으로 확장 (Lv4)' : 'Extend to discipline fusion and research application (Lv4)'}</li>
              </ul>
            </div>

            <div className="about-card">
              <h2><i className="fa-solid fa-layer-group" /> {language === 'ko' ? '3단계 연수과정' : '3-Stage Courses'}</h2>
              <div className="about-targets">
                <div className="target-item">
                  <i className="fa-solid fa-seedling" />
                  <h4>{language === 'ko' ? '기초과정' : 'Basic'}</h4>
                  <p>{language === 'ko' ? 'AI 도구 이해 · 프롬프트 · 윤리 · 강의자료·강의계획서 (Lv1→Lv2)' : 'Tool literacy, prompts, ethics, lecture materials (Lv1→Lv2)'}</p>
                </div>
                <div className="target-item">
                  <i className="fa-solid fa-diagram-project" />
                  <h4>{language === 'ko' ? '심화과정' : 'Intermediate'}</h4>
                  <p>{language === 'ko' ? 'AI-PBL · 글쓰기·발표 지도 · 평가 루브릭 · 맞춤형 피드백 (Lv2→Lv3)' : 'AI-PBL, coaching, rubrics, personalized feedback (Lv2→Lv3)'}</p>
                </div>
                <div className="target-item">
                  <i className="fa-solid fa-rocket" />
                  <h4>{language === 'ko' ? '전문과정' : 'Advanced'}</h4>
                  <p>{language === 'ko' ? '교과목 재설계 · AI 튜터·챗봇 · 캡스톤 · 학습성과 분석 (Lv3→Lv4)' : 'Course redesign, AI tutors, capstone, analytics (Lv3→Lv4)'}</p>
                </div>
              </div>
            </div>

            <div className="about-card">
              <h2><i className="fa-solid fa-wand-magic-sparkles" /> {language === 'ko' ? 'AI 도구' : 'AI Tools'}</h2>
              <p>{language === 'ko'
                ? '5가지 AI 교수학습 도구를 활용하여 교수학습 업무를 혁신합니다.'
                : 'Innovate teaching tasks with 5 AI teaching tools.'}</p>
              <div className="about-tools">
                <span className="about-tool-tag"><i className="fa-solid fa-calendar-days" /> {language === 'ko' ? '강의계획서 생성기' : 'Syllabus Generator'}</span>
                <span className="about-tool-tag"><i className="fa-solid fa-table-cells" /> {language === 'ko' ? '루브릭 생성기' : 'Rubric Builder'}</span>
                <span className="about-tool-tag"><i className="fa-solid fa-file-pen" /> {language === 'ko' ? '과제 생성기' : 'Assignment Generator'}</span>
                <span className="about-tool-tag"><i className="fa-solid fa-comments" /> {language === 'ko' ? '피드백 생성기' : 'Feedback Generator'}</span>
                <span className="about-tool-tag"><i className="fa-solid fa-check-double" /> {language === 'ko' ? '학생 과제 평가' : 'Student Evaluator'}</span>
              </div>
            </div>

            <div className="about-card">
              <h2><i className="fa-solid fa-user-tie" /> {language === 'ko' ? '강사 정보' : 'Instructor'}</h2>
              <div className="instructor-info">
                <h4>{language === 'ko' ? '이애본 박사 (Ph.D Aebon Lee)' : 'Dr. Aebon Lee (Ph.D)'}</h4>
                <p>{language === 'ko' ? 'DreamIT Biz 대표' : 'CEO of DreamIT Biz'}</p>
                <ul>
                  <li>{language === 'ko' ? '경기대학교 경영정보학과 겸임교수' : 'Adjunct Professor at Kyonggi University'}</li>
                  <li>{language === 'ko' ? 'AI·디지털 교육 전문가' : 'AI & Digital Education Expert'}</li>
                  <li>{language === 'ko' ? '84개 교육 사이트 운영' : 'Operating 84 education sites'}</li>
                </ul>
                <div className="instructor-contact">
                  <p><i className="fa-solid fa-envelope" /> aebon@dreamitbiz.com</p>
                  <p><i className="fa-solid fa-globe" /> www.dreamitbiz.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
