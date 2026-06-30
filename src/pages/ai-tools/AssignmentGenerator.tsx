import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAIStream } from '../../hooks/useAIStream';
import { useApiKeys } from '../../hooks/useApiKeys';
import { useToast } from '../../contexts/ToastContext';
import { buildAssignmentPrompt } from '../../utils/prompts/assignment';
import { AI_PROVIDERS } from '../../config/ai-providers';
import SEOHead from '../../components/SEOHead';
import TwoColumnLayout from '../../components/ai/TwoColumnLayout';
import AIProviderSelect from '../../components/ai/AIProviderSelect';
import KeySourceIndicator from '../../components/ai/KeySourceIndicator';
import SubscribePrompt from '../../components/SubscribePrompt';

export default function AssignmentGenerator() {
  const { language, t } = useLanguage();
  const { output, isStreaming, error, usage, generate } = useAIStream();
  const { keys, getEffectiveApiKey, hasAnyKey } = useApiKeys();
  const toast = useToast();

  const [provider, setProvider] = useState('openai');
  const [form, setForm] = useState({
    subject: '',
    topic: '',
    assignmentType: 'individual',
    difficulty: 'intermediate',
    groupSize: '',
    duration: '',
    objectives: '',
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  async function handleGenerate() {
    if (!form.subject.trim()) {
      toast.warning(language === 'ko' ? '교과목을 입력해주세요.' : 'Please enter a subject.');
      return;
    }
    const { key, source } = getEffectiveApiKey(provider);
    if (!key) { toast.warning(t('ai.noApiKey')); return; }

    const messages = buildAssignmentPrompt({ ...form, language });
    try {
      await generate({ provider, apiKey: key, model: AI_PROVIDERS[provider].defaultModel, messages, toolId: 'assignment', keySource: source as 'personal' | 'shared' });
    } catch (err: unknown) { toast.error((err as Error).message); }
  }

  const inputPanel = (
    <>
      <h3><i className="fa-solid fa-file-pen" /> {t('tools.assignment')}</h3>
      <AIProviderSelect selected={provider} onSelect={setProvider} apiKeys={keys} />
      <KeySourceIndicator provider={provider} />
      {!hasAnyKey(provider) && <SubscribePrompt />}

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-book" /></span> {language === 'ko' ? '교과목' : 'Subject'} *</label>
        <input className="form-input" value={form.subject} onChange={e => update('subject', e.target.value)} placeholder={language === 'ko' ? '예: 데이터사이언스' : 'e.g., Data Science'} />
      </div>

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-lightbulb" /></span> {language === 'ko' ? '주제' : 'Topic'}</label>
        <input className="form-input" value={form.topic} onChange={e => update('topic', e.target.value)} placeholder={language === 'ko' ? '예: 머신러닝 알고리즘 비교' : 'e.g., Comparing ML algorithms'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="ai-form-group">
          <label className="ai-form-label">{language === 'ko' ? '과제 유형' : 'Type'}</label>
          <select className="form-select" value={form.assignmentType} onChange={e => update('assignmentType', e.target.value)}>
            <option value="individual">{language === 'ko' ? '개인 과제' : 'Individual'}</option>
            <option value="group">{language === 'ko' ? '그룹 과제' : 'Group'}</option>
            <option value="research">{language === 'ko' ? '연구 과제' : 'Research'}</option>
            <option value="presentation">{language === 'ko' ? '발표 과제' : 'Presentation'}</option>
            <option value="project">{language === 'ko' ? '프로젝트' : 'Project'}</option>
          </select>
        </div>
        <div className="ai-form-group">
          <label className="ai-form-label">{language === 'ko' ? '난이도' : 'Difficulty'}</label>
          <select className="form-select" value={form.difficulty} onChange={e => update('difficulty', e.target.value)}>
            <option value="basic">{language === 'ko' ? '기초' : 'Basic'}</option>
            <option value="intermediate">{language === 'ko' ? '중급' : 'Intermediate'}</option>
            <option value="advanced">{language === 'ko' ? '고급' : 'Advanced'}</option>
          </select>
        </div>
      </div>

      {form.assignmentType === 'group' && (
        <div className="ai-form-group">
          <label className="ai-form-label">{language === 'ko' ? '그룹 규모' : 'Group Size'}</label>
          <input className="form-input" type="number" min="2" max="10" value={form.groupSize} onChange={e => update('groupSize', e.target.value)} placeholder="3-5" />
        </div>
      )}

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-clock" /></span> {language === 'ko' ? '소요 기간' : 'Duration'}</label>
        <input className="form-input" value={form.duration} onChange={e => update('duration', e.target.value)} placeholder={language === 'ko' ? '예: 2주' : 'e.g., 2 weeks'} />
      </div>

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-bullseye" /></span> {language === 'ko' ? '학습 목표' : 'Objectives'} <span className="optional">({language === 'ko' ? '선택' : 'optional'})</span></label>
        <textarea className="form-textarea" rows={3} value={form.objectives} onChange={e => update('objectives', e.target.value)} />
      </div>

      <button className="ai-generate-btn" onClick={handleGenerate} disabled={isStreaming}>
        {isStreaming ? <><span className="spinner" /> {t('ai.generating')}</> : <>{t('ai.generate')}</>}
      </button>
    </>
  );

  return (
    <>
      <SEOHead title={t('tools.assignment')} path="/tools/assignment" />
      <TwoColumnLayout
        title={t('tools.assignment')}
        description={language === 'ko' ? '난이도별 개인/그룹/연구/발표 과제를 생성합니다.' : 'Create assignments by difficulty level and type.'}
        inputPanel={inputPanel}
        output={output}
        isStreaming={isStreaming}
        error={error}
        usage={usage}
        toolId="assignment"
      />
    </>
  );
}
