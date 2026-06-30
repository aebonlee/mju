import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAIStream } from '../../hooks/useAIStream';
import { useApiKeys } from '../../hooks/useApiKeys';
import { useToast } from '../../contexts/ToastContext';
import { buildFeedbackPrompt } from '../../utils/prompts/feedback';
import { AI_PROVIDERS } from '../../config/ai-providers';
import SEOHead from '../../components/SEOHead';
import TwoColumnLayout from '../../components/ai/TwoColumnLayout';
import AIProviderSelect from '../../components/ai/AIProviderSelect';
import KeySourceIndicator from '../../components/ai/KeySourceIndicator';
import SubscribePrompt from '../../components/SubscribePrompt';

export default function FeedbackGenerator() {
  const { language, t } = useLanguage();
  const { output, isStreaming, error, usage, generate } = useAIStream();
  const { keys, getEffectiveApiKey, hasAnyKey } = useApiKeys();
  const toast = useToast();

  const [provider, setProvider] = useState('openai');
  const [form, setForm] = useState({
    studentName: '',
    courseName: '',
    assignmentName: '',
    grade: '',
    strengths: '',
    improvements: '',
    tone: 'constructive',
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  async function handleGenerate() {
    if (!form.courseName.trim() && !form.assignmentName.trim()) {
      toast.warning(language === 'ko' ? '교과목 또는 과제명을 입력해주세요.' : 'Please enter a course or assignment name.');
      return;
    }
    const { key, source } = getEffectiveApiKey(provider);
    if (!key) { toast.warning(t('ai.noApiKey')); return; }

    const messages = buildFeedbackPrompt({ ...form, language });
    try {
      await generate({ provider, apiKey: key, model: AI_PROVIDERS[provider].defaultModel, messages, toolId: 'feedback', keySource: source as 'personal' | 'shared' });
    } catch (err: unknown) { toast.error((err as Error).message); }
  }

  const inputPanel = (
    <>
      <h3><i className="fa-solid fa-comments" /> {t('tools.feedback')}</h3>
      <AIProviderSelect selected={provider} onSelect={setProvider} apiKeys={keys} />
      <KeySourceIndicator provider={provider} />
      {!hasAnyKey(provider) && <SubscribePrompt />}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="ai-form-group">
          <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-user" /></span> {language === 'ko' ? '학생 이름' : 'Student Name'}</label>
          <input className="form-input" value={form.studentName} onChange={e => update('studentName', e.target.value)} />
        </div>
        <div className="ai-form-group">
          <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-chart-simple" /></span> {language === 'ko' ? '점수/등급' : 'Grade'}</label>
          <input className="form-input" value={form.grade} onChange={e => update('grade', e.target.value)} placeholder="A+ / 95" />
        </div>
      </div>

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-book" /></span> {language === 'ko' ? '교과목' : 'Course'}</label>
        <input className="form-input" value={form.courseName} onChange={e => update('courseName', e.target.value)} />
      </div>

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-pen-to-square" /></span> {language === 'ko' ? '과제명' : 'Assignment'}</label>
        <input className="form-input" value={form.assignmentName} onChange={e => update('assignmentName', e.target.value)} />
      </div>

      <div className="ai-form-group">
        <label className="ai-form-label">{language === 'ko' ? '피드백 톤' : 'Feedback Tone'}</label>
        <select className="form-select" value={form.tone} onChange={e => update('tone', e.target.value)}>
          <option value="encouraging">{language === 'ko' ? '격려하는' : 'Encouraging'}</option>
          <option value="constructive">{language === 'ko' ? '건설적인' : 'Constructive'}</option>
          <option value="formal">{language === 'ko' ? '공식적인' : 'Formal'}</option>
          <option value="friendly">{language === 'ko' ? '친근한' : 'Friendly'}</option>
        </select>
      </div>

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-circle-check" /></span> {language === 'ko' ? '잘한 점' : 'Strengths'}</label>
        <textarea className="form-textarea" rows={2} value={form.strengths} onChange={e => update('strengths', e.target.value)} />
      </div>

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-thumbtack" /></span> {language === 'ko' ? '개선할 점' : 'Areas to Improve'}</label>
        <textarea className="form-textarea" rows={2} value={form.improvements} onChange={e => update('improvements', e.target.value)} />
      </div>

      <button className="ai-generate-btn" onClick={handleGenerate} disabled={isStreaming}>
        {isStreaming ? <><span className="spinner" /> {t('ai.generating')}</> : <>{t('ai.generate')}</>}
      </button>
    </>
  );

  return (
    <>
      <SEOHead title={t('tools.feedback')} path="/tools/feedback" />
      <TwoColumnLayout
        title={t('tools.feedback')}
        description={language === 'ko' ? '학생별 개인화된 피드백을 AI로 작성합니다.' : 'Generate personalized student feedback with AI.'}
        inputPanel={inputPanel}
        output={output}
        isStreaming={isStreaming}
        error={error}
        usage={usage}
        toolId="feedback"
      />
    </>
  );
}
