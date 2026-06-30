import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function SubscribePrompt() {
  const { language } = useLanguage();
  const { isLoggedIn } = useAuth();
  const isKo = language === 'ko';

  return (
    <div className="subscribe-prompt">
      <div className="subscribe-prompt-icon">
        <i className="fa-solid fa-circle-info" />
      </div>
      <div className="subscribe-prompt-content">
        <p className="subscribe-prompt-title">
          {isKo ? 'API 키가 필요합니다' : 'API Key Required'}
        </p>
        <p className="subscribe-prompt-desc">
          {isKo
            ? 'AI 도구를 사용하려면 개인 API 키를 입력하거나 토큰을 충전하세요.'
            : 'Enter your own API key or recharge tokens to use AI tools.'}
        </p>
        <div className="subscribe-prompt-actions">
          {isLoggedIn ? (
            <>
              <Link to="/settings" className="btn btn-sm btn-outline">
                <i className="fa-solid fa-key" /> {isKo ? 'API 키 입력' : 'Enter API Key'}
              </Link>
              <Link to="/pricing" className="btn btn-sm btn-primary">
                <i className="fa-solid fa-coins" /> {isKo ? '토큰 충전' : 'Recharge'}
              </Link>
            </>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary">
              <i className="fa-solid fa-right-to-bracket" /> {isKo ? '로그인' : 'Log In'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
