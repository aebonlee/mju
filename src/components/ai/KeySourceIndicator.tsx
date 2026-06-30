import { useApiKeys } from '../../hooks/useApiKeys';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  provider: string;
}

export default function KeySourceIndicator({ provider }: Props) {
  const { getEffectiveApiKey } = useApiKeys();
  const { language } = useLanguage();
  const { source } = getEffectiveApiKey(provider);

  if (source === 'none') return null;

  const isKo = language === 'ko';

  return (
    <div className="key-source-indicator">
      {source === 'personal' ? (
        <span className="key-source personal">
          <i className="fa-solid fa-key" />
          {isKo ? '개인 키 사용 중' : 'Using personal key'}
        </span>
      ) : (
        <span className="key-source shared">
          <i className="fa-solid fa-users" />
          {isKo ? '공유 키 사용 중' : 'Using shared key'}
        </span>
      )}
    </div>
  );
}
