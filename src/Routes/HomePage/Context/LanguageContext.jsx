import { createContext, useState } from 'react';
import ja from '../assets/locales/ja.json';
import vi from '../assets/locales/vi.json';

const translations = { ja, vi };

export const LanguageContext = createContext();

// eslint-disable-next-line react/prop-types
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('vi');

  const changeLanguage = lang => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{ translations: translations[language], changeLanguage, language }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
