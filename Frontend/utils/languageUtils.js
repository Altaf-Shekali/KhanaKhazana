
import enTranslations from '../languages/en';
import knTranslations from '../languages/kn';

const translations = {
  en: enTranslations,
  kn: knTranslations
};

export const getText = (key, langCode) => {
  // Split the key by dots to access nested properties
  const keys = key.split('.');
  
  // Get the translations for the specified language
  let result = translations[langCode];
  
  // Navigate through the nested properties
  for (const k of keys) {
    if (result && result[k]) {
      result = result[k];
    } else {
      // If translation not found, return the key
      return key;
    }
  }
  
  return result;
};
