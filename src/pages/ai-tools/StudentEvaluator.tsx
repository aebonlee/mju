import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAIStream } from '../../hooks/useAIStream';
import { useApiKeys } from '../../hooks/useApiKeys';
import { useToast } from '../../contexts/ToastContext';
import { buildEvaluatorPrompt } from '../../utils/prompts/evaluator';
import { AI_PROVIDERS } from '../../config/ai-providers';
import SEOHead from '../../components/SEOHead';
import TwoColumnLayout from '../../components/ai/TwoColumnLayout';
import AIProviderSelect from '../../components/ai/AIProviderSelect';
import KeySourceIndicator from '../../components/ai/KeySourceIndicator';
import SubscribePrompt from '../../components/SubscribePrompt';

export default function StudentEvaluator() {
  const { language, t } = useLanguage();
  const { output, isStreaming, error, usage, generate } = useAIStream();
  const { keys, getEffectiveApiKey, hasAnyKey } = useApiKeys();
  const toast = useToast();

  const [provider, setProvider] = useState('openai');
  const [form, setForm] = useState({
    courseName: '',
    assignmentName: '',
    rubric: '',
    studentSubmission: '',
    additionalNotes: '',
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  async function handleGenerate() {
    if (!form.studentSubmission.trim()) {
      toast.warning(language === 'ko' ? '학생 제출물을 입력해주세요.' : 'Please enter student submission.');
      return;
    }
    const { key, source } = getEffectiveApiKey(provider);
    if (!key) { toast.warning(t('ai.noApiKey')); return; }

    const messages = buildEvaluatorPrompt({ ...form, language });
    try {
      await generate({ provider, apiKey: key, model: AI_PROVIDERS[provider].defaultModel, messages, toolId: 'evaluator', keySource: source as 'personal' | 'shared' });
    } catch (err: unknown) { toast.error((err as Error).message); }
  }

  const inputPanel = (
    <>
      <h3><i className="fa-solid fa-check-double" /> {t('tools.evaluator')}</h3>
      <AIProviderSelect selected={provider} onSelect={setProvider} apiKeys={keys} />
      <KeySourceIndicator provider={provider} />
      {!hasAnyKey(provider) && <SubscribePrompt />}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="ai-form-group">
          <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-book" /></span> {language === 'ko' ? '교과목' : 'Course'}</label>
          <input className="form-input" value={form.courseName} onChange={e => update('courseName', e.target.value)} />
        </div>
        <div className="ai-form-group">
          <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-pen-to-square" /></span> {language === 'ko' ? '과제명' : 'Assignment'}</label>
          <input className="form-input" value={form.assignmentName} onChange={e => update('assignmentName', e.target.value)} />
        </div>
      </div>

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-chart-simple" /></span> {language === 'ko' ? '평가 루브릭' : 'Rubric'} <span className="optional">({language === 'ko' ? '선택' : 'optional'})</span></label>
        <textarea className="form-textarea" rows={4} value={form.rubric} onChange={e => update('rubric', e.target.value)} placeholder={language === 'ko' ? '루브릭 기준을 입력하세요. (없으면 일반 기준 적용)' : 'Enter rubric criteria. (General criteria applied if empty)'} />
      </div>

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-file-lines" /></span> {language === 'ko' ? '학생 제출물' : 'Student Submission'} *</label>
        <textarea className="form-textarea" rows={8} value={form.studentSubmission} onChange={e => update('studentSubmission', e.target.value)} placeholder={language === 'ko' ? '학생이 제출한 과제 내용을 붙여넣으세요.' : 'Paste the student submission here.'} />
      </div>

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-lightbulb" /></span> {language === 'ko' ? '참고사항' : 'Notes'} <span className="optional">({language === 'ko' ? '선택' : 'optional'})</span></label>
        <textarea className="form-textarea" rows={2} value={form.additionalNotes} onChange={e => update('additionalNotes', e.target.value)} />
      </div>

      <button className="ai-generate-btn" onClick={handleGenerate} disabled={isStreaming}>
        {isStreaming ? <><span className="spinner" /> {t('ai.generating')}</> : <>{t('ai.generate')}</>}
      </button>
    </>
  );

  return (
    <>
      <SEOHead title={t('tools.evaluator')} path="/tools/evaluator" />
      <TwoColumnLayout
        title={t('tools.evaluator')}
        description={language === 'ko' ? '학생 과제물을 루브릭 기반으로 평가합니다.' : 'Evaluate student submissions using rubric-based assessment.'}
        inputPanel={inputPanel}
        output={output}
        isStreaming={isStreaming}
        error={error}
        usage={usage}
        toolId="evaluator"
      />
    </>
  );
}
