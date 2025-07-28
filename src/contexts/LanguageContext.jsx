import { createContext, useContext, useState, useEffect } from 'react';
import tr from '../locales/tr';
import en from '../locales/en';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('tr');
  const [translations, setTranslations] = useState(tr);

  const languages = {
    tr: { name: 'Türkçe', flag: '🇹🇷', translations: tr },
    en: { name: 'English', flag: '🇺🇸', translations: en }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('biosphere-language') || 'tr';
    setCurrentLanguage(savedLanguage);
    setTranslations(languages[savedLanguage].translations);
  }, []);

  const changeLanguage = (languageCode) => {
    if (languages[languageCode]) {
      setCurrentLanguage(languageCode);
      setTranslations(languages[languageCode].translations);
      localStorage.setItem('biosphere-language', languageCode);
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    languages,
    availableLanguages: Object.keys(languages)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 