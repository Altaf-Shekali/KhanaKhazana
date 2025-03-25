
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create language context
const LanguageContext = createContext();

// Available languages
export const languages = {
  en: { code: 'en', name: 'English' },
  kn: { code: 'kn', name: 'ಕನ್ನಡ' }, // Kannada
};

export function LanguageProvider({ children }) {
  // Try to get language from localStorage, default to English
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('appLanguage');
    return savedLanguage && languages[savedLanguage] ? savedLanguage : 'en';
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('appLanguage', language);
    document.documentElement.lang = language;
  }, [language]);

  // Function to change language
  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setLanguage(langCode);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
