// =========================================================================
// Captain Corgi Hub — LanguageToggle Component
// Language switcher for i18n
// =========================================================================

import { useTranslation } from 'react-i18next';
import styles from './LanguageToggle.module.css';

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'vi', label: 'VI' },
  ];

  return (
    <div className={styles.toggle} role="radiogroup" aria-label="Language">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          className={`${styles.button} ${currentLang === lang.code ? styles.active : ''}`}
          onClick={() => i18n.changeLanguage(lang.code)}
          aria-pressed={currentLang === lang.code}
          title={lang.code === 'en' ? 'English' : 'Tiếng Việt'}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
