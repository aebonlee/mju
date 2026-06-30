import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import type { ReactElement } from 'react';

/** 프롬프트 실습 좌측 메뉴 — 학습하기·실습하기·평가하기 (접고 펴는 드롭다운) */
export default function PromptEvalNav(): ReactElement {
  const { language } = useLanguage();
  const isKo = language === 'ko';
  const { pathname } = useLocation();
  const [open, setOpen] = useState(true);

  const items = [
    { to: '/prompt-eval', icon: 'fa-book-open', label: isKo ? '학습하기' : 'Learn' },
    { to: '/prompt-eval/practice', icon: 'fa-clipboard-check', label: isKo ? '실습하기' : 'Practice' },
    { to: '/prompt-eval/workshop', icon: 'fa-wand-magic-sparkles', label: isKo ? '평가하기' : 'Evaluate' },
  ];

  return (
    <nav className="pe-nav">
      <button
        type="button"
        className={`pe-nav-toggle${open ? ' open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <i className="fa-solid fa-keyboard" /> {isKo ? '프롬프트 학습' : 'Prompt Learning'}
        <i className="fa-solid fa-chevron-down pe-nav-chevron" />
      </button>
      {open && (
        <div className="pe-nav-list">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className={`pe-nav-link${pathname === it.to ? ' active' : ''}`}
            >
              <i className={`fa-solid ${it.icon}`} /> {it.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
