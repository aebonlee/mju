interface UsageBadgeProps { usage: { inputTokens: number; outputTokens: number; cost: number; } | null; }

import { formatCost } from '../../utils/ai/token-counter';
import { useLanguage } from '../../contexts/LanguageContext';

export default function UsageBadge({ usage }: UsageBadgeProps) {
  const { t } = useLanguage();
  if (!usage || (!usage.inputTokens && !usage.outputTokens)) return null;

  return (
    <div className="usage-badge">
      <span className="usage-dot" />
      <span>{(usage.inputTokens + usage.outputTokens).toLocaleString()} {t('ai.tokenCount')}</span>
      {usage.cost > 0 && <span>· {formatCost(usage.cost)}</span>}
    </div>
  );
}
