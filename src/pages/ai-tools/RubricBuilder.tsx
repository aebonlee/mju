import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAIStream } from '../../hooks/useAIStream';
import { useApiKeys } from '../../hooks/useApiKeys';
import { useToast } from '../../contexts/ToastContext';
import { buildRubricPrompt } from '../../utils/prompts/rubric';
import { AI_PROVIDERS } from '../../config/ai-providers';
import SEOHead from '../../components/SEOHead';
import TwoColumnLayout from '../../components/ai/TwoColumnLayout';
import AIProviderSelect from '../../components/ai/AIProviderSelect';
import KeySourceIndicator from '../../components/ai/KeySourceIndicator';
import SubscribePrompt from '../../components/SubscribePrompt';

export default function RubricBuilder() {
  const { language, t } = useLanguage();
  const { output, isStreaming, error, usage, generate } = useAIStream();
  const { keys, getEffectiveApiKey, hasAnyKey } = useApiKeys();
  const toast = useToast();

  const [provider, setProvider] = useState('openai');
  const [form, setForm] = useState({
    taskName: '',
    subject: '',
    level: '학부',
    criteria: '',
    rubricType: 'analytic',
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  async function handleGenerate() {
    if (!form.taskName.trim()) {
      toast.warning(language === 'ko' ? '과제명을 입력해주세요.' : 'Please enter a task name.');
      return;
    }
    const { key, source } = getEffectiveApiKey(provider);
    if (!key) { toast.warning(t('ai.noApiKey')); return; }

    const messages = buildRubricPrompt({ ...form, language });
    try {
      await generate({ provider, apiKey: key, model: AI_PROVIDERS[provider].defaultModel, messages, toolId: 'rubric', keySource: source as 'personal' | 'shared' });
    } catch (err: unknown) { toast.error((err as Error).message); }
  }

  const inputPanel = (
    <>
      <h3><i className="fa-solid fa-table-cells" /> {t('tools.rubric')}</h3>
      <AIProviderSelect selected={provider} onSelect={setProvider} apiKeys={keys} />
      <KeySourceIndicator provider={provider} />
      {!hasAnyKey(provider) && <SubscribePrompt />}

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-pen-to-square" /></span> {language === 'ko' ? '과제명' : 'Task Name'} *</label>
        <input className="form-input" value={form.taskName} onChange={e => update('taskName', e.target.value)} placeholder={language === 'ko' ? '예: 연구 보고서' : 'e.g., Research Paper'} />
      </div>

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-book" /></span> {language === 'ko' ? '교과목' : 'Subject'}</label>
        <input className="form-input" value={form.subject} onChange={e => update('subject', e.target.value)} placeholder={language === 'ko' ? '예: 경영학개론' : 'e.g., Business Administration'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="ai-form-group">
          <label className="ai-form-label">{language === 'ko' ? '수준' : 'Level'}</label>
          <select className="form-select" value={form.level} onChange={e => update('level', e.target.value)}>
            <option value="학부">{language === 'ko' ? '학부' : 'Undergraduate'}</option>
            <option value="대학원">{language === 'ko' ? '대학원' : 'Graduate'}</option>
          </select>
        </div>
        <div className="ai-form-group">
          <label className="ai-form-label">{language === 'ko' ? '루브릭 유형' : 'Rubric Type'}</label>
          <select className="form-select" value={form.rubricType} onChange={e => update('rubricType', e.target.value)}>
            <option value="analytic">{language === 'ko' ? '분석적 루브릭' : 'Analytic'}</option>
            <option value="holistic">{language === 'ko' ? '총체적 루브릭' : 'Holistic'}</option>
          </select>
        </div>
      </div>

      <div className="ai-form-group">
        <label className="ai-form-label"><span className="label-icon"><i className="fa-solid fa-bullseye" /></span> {language === 'ko' ? '평가 기준' : 'Criteria'} <span className="optional">({language === 'ko' ? '선택' : 'optional'})</span></label>
        <textarea className="form-textarea" rows={3} value={form.criteria} onChange={e => update('criteria', e.target.value)} placeholder={language === 'ko' ? '평가하고 싶은 기준을 입력하세요.' : 'Enter criteria you want to assess.'} />
      </div>

      <button className="ai-generate-btn" onClick={handleGenerate} disabled={isStreaming}>
        {isStreaming ? <><span className="spinner" /> {t('ai.generating')}</> : <>{t('ai.generate')}</>}
      </button>
    </>
  );

  return (
    <>
      <SEOHead title={t('tools.rubric')} path="/tools/rubric" />
      <TwoColumnLayout
        title={t('tools.rubric')}
        description={language === 'ko' ? '4단계 평가 기준 루브릭을 자동으로 생성합니다.' : 'Automatically generate 4-level assessment rubrics.'}
        inputPanel={inputPanel}
        output={output}
        isStreaming={isStreaming}
        error={error}
        usage={usage}
        toolId="rubric"
      />
    </>
  );
}
