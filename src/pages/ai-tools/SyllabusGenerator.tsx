import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAIStream } from '../../hooks/useAIStream';
import { useApiKeys } from '../../hooks/useApiKeys';
import { useToast } from '../../contexts/ToastContext';
import { buildSyllabusPrompt } from '../../utils/prompts/syllabus';
import { AI_PROVIDERS } from '../../config/ai-providers';
import SEOHead from '../../components/SEOHead';
import TwoColumnLayout from '../../components/ai/TwoColumnLayout';
import AIProviderSelect from '../../components/ai/AIProviderSelect';
import KeySourceIndicator from '../../components/ai/KeySourceIndicator';
import SubscribePrompt from '../../components/SubscribePrompt';

export default function SyllabusGenerator() {
  const { language, t } = useLanguage();
  const { output, isStreaming, error, usage, generate } = useAIStream();
  const { keys, getEffectiveApiKey, hasAnyKey } = useApiKeys();
  const toast = useToast();

  const [provider, setProvider] = useState('openai');
  const [form, setForm] = useState({
    courseName: '',
    department: '',
    level: '학부',
    credits: '3',
    weeks: '15',
    objectives: '',
    textbook: '',
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  async function handleGenerate() {
    if (!form.courseName.trim()) {
      toast.warning(language === 'ko' ? '과목명을 입력해주세요.' : 'Please enter a course name.');
      return;
    }
    const { key, source } = getEffectiveApiKey(provider);
    if (!key) {
      toast.warning(t('ai.noApiKey'));
      return;
    }

    const messages = buildSyllabusPrompt({ ...form, language });
    const providerConfig = AI_PROVIDERS[provider];
    try {
      await generate({
        provider,
        apiKey: key,
        model: providerConfig.defaultModel,
        messages,
        toolId: 'syllabus',
        keySource: source as 'personal' | 'shared',
      });
    } catch (err: unknown) {
      toast.error((err as Error).message);
    }
  }

  const inputPanel = (
    <>
      <h3><i className="fa-solid fa-calendar-days" /> {t('tools.syllabus')}</h3>
      <AIProviderSelect selected={provider} onSelect={setProvider} apiKeys={keys} />
      <KeySourceIndicator provider={provider} />
      {!hasAnyKey(provider) && <SubscribePrompt />}

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-book" /></span> {language === 'ko' ? '과목명' : 'Course Name'} *</label>
        <input className="form-input" value={form.courseName} onChange={e => update('courseName', e.target.value)} placeholder={language === 'ko' ? '예: 인공지능개론' : 'e.g., Introduction to AI'} />
      </div>

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-building-columns" /></span> {language === 'ko' ? '학과/전공' : 'Department'}</label>
        <input className="form-input" value={form.department} onChange={e => update('department', e.target.value)} placeholder={language === 'ko' ? '예: 컴퓨터공학과' : 'e.g., Computer Science'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        <div className="ai-form-group">
          <label className="ai-form-label">{language === 'ko' ? '수준' : 'Level'}</label>
          <select className="form-select" value={form.level} onChange={e => update('level', e.target.value)}>
            <option value="학부">{language === 'ko' ? '학부' : 'Undergraduate'}</option>
            <option value="대학원">{language === 'ko' ? '대학원' : 'Graduate'}</option>
            <option value="직업훈련">{language === 'ko' ? '직업훈련' : 'Vocational'}</option>
          </select>
        </div>
        <div className="ai-form-group">
          <label className="ai-form-label">{language === 'ko' ? '학점' : 'Credits'}</label>
          <select className="form-select" value={form.credits} onChange={e => update('credits', e.target.value)}>
            <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
          </select>
        </div>
        <div className="ai-form-group">
          <label className="ai-form-label">{language === 'ko' ? '주차' : 'Weeks'}</label>
          <select className="form-select" value={form.weeks} onChange={e => update('weeks', e.target.value)}>
            <option value="8">8</option><option value="15">15</option><option value="16">16</option>
          </select>
        </div>
      </div>

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-bullseye" /></span> {language === 'ko' ? '교육 목표' : 'Objectives'} <span className="optional">({language === 'ko' ? '선택' : 'optional'})</span></label>
        <textarea className="form-textarea" rows={3} value={form.objectives} onChange={e => update('objectives', e.target.value)} placeholder={language === 'ko' ? '이 과목의 교육 목표를 입력하세요.' : 'Enter course objectives.'} />
      </div>

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-book-open" /></span> {language === 'ko' ? '교재' : 'Textbook'} <span className="optional">({language === 'ko' ? '선택' : 'optional'})</span></label>
        <input className="form-input" value={form.textbook} onChange={e => update('textbook', e.target.value)} placeholder={language === 'ko' ? '교재명, 저자' : 'Textbook title, author'} />
      </div>

      <button className="ai-generate-btn" onClick={handleGenerate} disabled={isStreaming}>
        {isStreaming ? <><span className="spinner" /> {t('ai.generating')}</> : <>{t('ai.generate')}</>}
      </button>
    </>
  );

  return (
    <>
      <SEOHead title={t('tools.syllabus')} path="/tools/syllabus" />
      <TwoColumnLayout
        title={t('tools.syllabus')}
        description={language === 'ko' ? 'CLO와 Bloom\'s Taxonomy 기반으로 15주차 강의계획서를 생성합니다.' : 'Generate 15-week syllabi based on CLO and Bloom\'s Taxonomy.'}
        inputPanel={inputPanel}
        output={output}
        isStreaming={isStreaming}
        error={error}
        usage={usage}
        toolId="syllabus"
      />
    </>
  );
}
