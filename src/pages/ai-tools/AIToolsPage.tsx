import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import SEOHead from '../../components/SEOHead';

const TOOLS = [
  {
    id: 'syllabus',
    path: '/tools/syllabus',
    icon: 'fa-calendar-days',
    labelKo: '강의계획서 생성',
    labelEn: 'Syllabus Generator',
    descKo: '15주차 강의계획서를 CLO와 Bloom\'s Taxonomy 기반으로 생성합니다.',
    descEn: 'Generate 15-week syllabi based on CLO and Bloom\'s Taxonomy.',
    color: 'blue',
  },
  {
    id: 'rubric',
    path: '/tools/rubric',
    icon: 'fa-table-cells',
    labelKo: '루브릭 생성',
    labelEn: 'Rubric Builder',
    descKo: '4단계 평가 기준 루브릭을 자동으로 생성합니다.',
    descEn: 'Automatically generate 4-level assessment rubrics.',
    color: 'green',
  },
  {
    id: 'assignment',
    path: '/tools/assignment',
    icon: 'fa-file-pen',
    labelKo: '과제 생성',
    labelEn: 'Assignment Generator',
    descKo: '난이도별 개인/그룹/연구/발표 과제를 생성합니다.',
    descEn: 'Create assignments by difficulty level and type.',
    color: 'purple',
  },
  {
    id: 'feedback',
    path: '/tools/feedback',
    icon: 'fa-comments',
    labelKo: '피드백 생성',
    labelEn: 'Feedback Generator',
    descKo: '학생별 개인화된 피드백을 AI로 작성합니다.',
    descEn: 'Generate personalized student feedback with AI.',
    color: 'orange',
  },
  {
    id: 'evaluator',
    path: '/tools/evaluator',
    icon: 'fa-check-double',
    labelKo: '학생 과제 평가',
    labelEn: 'Student Evaluator',
    descKo: '학생 과제물을 루브릭 기반으로 평가합니다.',
    descEn: 'Evaluate student submissions using rubric-based assessment.',
    color: 'blue',
  },
];

export default function AIToolsPage() {
  const { language } = useLanguage();
  const { isLoggedIn } = useAuth();

  const pageTitle = language === 'ko' ? 'AI활용 교수설계 도구' : 'AI Teaching Design';

  return (
    <div className="ai-tools-landing">
      <SEOHead
        title={language === 'ko' ? 'AI활용 교수설계 도구' : 'AI Teaching Design Tools'}
        description={language === 'ko' ? '강의계획서, 루브릭, 과제, 피드백, 학생평가를 AI로 생성하세요.' : 'Generate syllabi, rubrics, assignments, feedback, and evaluations with AI.'}
        path="/tools"
      />

      <div className="ai-tools-hero">
        <div className="container">
          <div className="ai-tools-hero-icon">
            <i className="fa-solid fa-wand-magic-sparkles" />
          </div>
          <h1>{pageTitle}</h1>
          <p>{language === 'ko'
            ? 'AI를 활용하여 교수학습 자료를 손쉽게 생성하세요.'
            : 'Easily create teaching materials with AI assistance.'}</p>
        </div>
      </div>

      <div className="container">
        <div className="ai-tools-grid">
          {TOOLS.map(tool => (
            <Link
              key={tool.id}
              to={tool.path}
              className={`ai-tools-card ai-tools-card--${tool.color}`}
            >
              <div className="ai-tools-card-icon">
                <i className={`fa-solid ${tool.icon}`} />
              </div>
              <h3>{language === 'ko' ? tool.labelKo : tool.labelEn}</h3>
              <p>{language === 'ko' ? tool.descKo : tool.descEn}</p>
              <span className="ai-tools-card-arrow">
                {language === 'ko' ? '시작하기' : 'Get Started'} <i className="fa-solid fa-arrow-right" />
              </span>
            </Link>
          ))}
        </div>

        {!isLoggedIn && (
          <div className="ai-tools-login-cta">
            <i className="fa-solid fa-right-to-bracket" />
            <span>
              {language === 'ko'
                ? '로그인 후 AI 도구를 사용할 수 있습니다.'
                : 'Please log in to use AI tools.'}
            </span>
            <Link to="/login" className="btn btn-primary btn-sm">
              {language === 'ko' ? '로그인' : 'Login'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
