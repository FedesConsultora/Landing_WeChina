import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import translations, { type Language, type Translations } from '../i18n';

interface LanguageContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  t: translations.es,
  setLang: () => {},
});

const STORAGE_KEY = 'wechina-lang';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && translations[saved]) return saved;
    return 'es';
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : newLang;
  }, []);

  const value: LanguageContextType = {
    lang,
    t: translations[lang],
    setLang,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
