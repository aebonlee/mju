import React from "react";
interface ExportToolbarProps { content: string; filename?: string; metadata?: Record<string, unknown>; outputRef?: React.RefObject<HTMLDivElement | null>; }

import { useLanguage } from '../../contexts/LanguageContext';
import { exportPDF } from '../../utils/export/pdf';
import { exportMarkdown } from '../../utils/export/markdown';
import { exportJSON } from '../../utils/export/json-export';
import { exportCSV } from '../../utils/export/csv';
import { exportHTML } from '../../utils/export/html-export';

export default function ExportToolbar({ content, filename = 'output', metadata = {}, outputRef }: ExportToolbarProps) {
  const { t } = useLanguage();

  const handlers = [
    { label: t('export.pdf'), icon: '📄', fn: () => exportPDF(content, filename, metadata, outputRef?.current) },
    { label: t('export.markdown'), icon: '📝', fn: () => exportMarkdown(content, filename) },
    { label: t('export.json'), icon: '{}', fn: () => exportJSON(content, filename, metadata) },
    { label: t('export.csv'), icon: '📊', fn: () => exportCSV(content, filename) },
    { label: t('export.html'), icon: '🌐', fn: () => exportHTML(content, filename, metadata) },
  ];

  return (
    <div className="export-toolbar">
      {handlers.map(h => (
        <button key={h.label} className="export-btn" onClick={h.fn}>
          {h.icon} {h.label}
        </button>
      ))}
    </div>
  );
}
