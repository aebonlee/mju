interface AIProviderSelectProps { selected: string; onSelect: (id: string) => void; apiKeys?: Record<string, string>; }

import { PROVIDER_LIST } from '../../config/ai-providers';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSubscriptionContext } from '../../contexts/SubscriptionContext';

export default function AIProviderSelect({ selected, onSelect, apiKeys }: AIProviderSelectProps) {
  const { t } = useLanguage();
  const { hasSharedKey, isSubscribed } = useSubscriptionContext();

  return (
    <div>
      <label className="ai-form-label">
        <span className="label-icon"><i className="fa-solid fa-microchip" /></span>
        {t('ai.selectProvider')}
      </label>
      <div className="provider-select">
        {PROVIDER_LIST.map(provider => {
          const hasPersonalKey = !!apiKeys?.[provider.id]?.trim();
          const hasShared = isSubscribed && hasSharedKey(provider.id);
          const hasAny = hasPersonalKey || hasShared;
          return (
            <button
              key={provider.id}
              className={`provider-chip provider-${provider.id} ${selected === provider.id ? 'active' : ''}`}
              onClick={() => onSelect(provider.id)}
              title={hasPersonalKey ? provider.name : hasShared ? `${provider.name} (Shared)` : `${provider.name} (API key required)`}
            >
              <span className="provider-dot" style={{ background: provider.color }} />
              {provider.name}
              {hasShared && !hasPersonalKey && <span className="shared-badge">Shared</span>}
              {!hasAny && <span style={{ fontSize: '10px', opacity: 0.5 }}><i className="fa-solid fa-key" /></span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
