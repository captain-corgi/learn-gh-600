// =========================================================================
// Captain Corgi Hub — i18n Configuration
// i18next setup with language detection and localStorage persistence
// =========================================================================

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en.json';
import vi from '@/locales/vi.json';

const STORAGE_KEY = 'cc-language';

function getStoredLanguage(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ['en', 'vi'].includes(stored)) {
      return stored;
    }
  } catch {
    // localStorage not available
  }
  return 'en';
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: getStoredLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes
  },
});

// Persist language changes to localStorage
i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // localStorage not available
  }
});

export default i18n;
