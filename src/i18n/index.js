import store from '../store/index.js';
import {setLanguage} from '../store/translation-slice';

export function getInitialLang() {
  const htmlLang = document.documentElement.lang || 'en'; // Default to English if no lang is set
  return htmlLang;
}

export const fetchTranslations = async (lang) => {
  const fetchLocale = async (language) => {
    const response = await fetch(`src/i18n/${language}.json`);
    if (!response.ok)
      throw new Error(`Failed to fetch ${language} translations`);
    return response.json();
  };

  try {
    return await fetchLocale(lang);
  } catch (error) {
    try {
      return await fetchLocale('en');
    } catch (fallbackError) {
      throw new Error('Unable to fetch translations');
    }
  }
};

export async function changeLanguage(lang) {
  const translation = await fetchTranslations(lang);
  store.dispatch(setLanguage(translation));
}

export function getTranslation(translations, key) {
  return translations[key] || key;
}
