import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../i18n';

const languages: Record<Language, { flag: string; code: string; label: string }> = {
  es: { flag: '🇦🇷', code: 'ES', label: 'Español' },
  en: { flag: '🇺🇸', code: 'EN', label: 'English' },
  zh: { flag: '🇨🇳', code: '中文', label: '中文' },
};

const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (newLang: Language) => {
    setLang(newLang);
    setOpen(false);
  };

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className="lang-switcher__toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Change language"
        aria-expanded={open}
      >
        <span className="lang-switcher__code">{languages[lang].code}</span>
        <svg
          className={`lang-switcher__chevron ${open ? 'is-open' : ''}`}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
        >
          <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul className="lang-switcher__dropdown">
          {(Object.keys(languages) as Language[]).map((key) => (
            <li key={key}>
              <button
                className={`lang-switcher__option ${key === lang ? 'is-active' : ''}`}
                onClick={() => handleSelect(key)}
              >
                <span className="lang-switcher__option-flag">{languages[key].flag}</span>
                <span className="lang-switcher__option-label">{languages[key].label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
