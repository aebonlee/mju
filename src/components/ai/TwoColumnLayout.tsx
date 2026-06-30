import React from "react";
interface TwoColumnLayoutProps { title: string; description: string; inputPanel: React.ReactNode; output: string; isStreaming: boolean; error: string | null; usage: { inputTokens: number; outputTokens: number; cost: number; } | null; toolId?: string; }

import { useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import StreamingOutput from './StreamingOutput';
import ExportToolbar from './ExportToolbar';
import UsageBadge from './UsageBadge';

export default function TwoColumnLayout({ title, description, inputPanel, output, isStreaming, error, usage, toolId }: TwoColumnLayoutProps) {
  const { t } = useLanguage();
  const outputRef = useRef(null);

  return (
    <>
      <div className="ai-page-header">
        <div className="container">
          <h1 className="ai-page-title">{title}</h1>
          <p className="ai-page-desc">{description}</p>
        </div>
      </div>
      <div className="container">
        <div className="ai-two-column">
          <div className="ai-input-panel">
            {inputPanel}
          </div>
          <div className="ai-output-panel">
            <div className="ai-output-header">
              <div className="ai-output-title">
                📄 {t('ai.result')}
                {isStreaming && <span className="loading-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {usage && (usage.inputTokens > 0 || usage.outputTokens > 0) && (
                  <UsageBadge usage={usage} />
                )}
                {output && !isStreaming && (
                  <ExportToolbar content={output} filename={toolId || 'output'} outputRef={outputRef} />
                )}
              </div>
            </div>
            <div className="ai-output-body" ref={outputRef}>
              {error ? (
                <div style={{ color: '#EF4444', padding: '20px', textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', fontWeight: 600 }}>오류가 발생했습니다</p>
                  <p style={{ fontSize: '13px', marginTop: '8px', opacity: 0.8 }}>{error}</p>
                </div>
              ) : output ? (
                <StreamingOutput content={output} isStreaming={isStreaming} />
              ) : (
                <div className="ai-empty-state">
                  <div className="ai-empty-icon">✨</div>
                  <div className="ai-empty-title">{t('ai.emptyTitle')}</div>
                  <div className="ai-empty-desc">{t('ai.emptyDesc')}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
