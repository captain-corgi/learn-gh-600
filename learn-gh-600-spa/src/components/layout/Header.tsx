import { useThemeContext } from '@/app/providers/ThemeProvider';
import { SearchBar } from '@/components/ui/SearchBar';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import styles from './Header.module.css';

export function Header() {
  const { theme, cycleTheme } = useThemeContext();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.brand}>
          <img
            src="/captain-corgi-hub-avatar.png"
            alt="Captain Corgi"
            className={styles.avatar}
            width={44}
            height={44}
          />
          <div>
            <div className={styles.title}>Captain Corgi Hub</div>
            <div className={styles.subtitle}>GH-600 Exam Prep</div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <SearchBar />
        <LanguageToggle />
        <button
          type="button"
          className={styles.themeButton}
          onClick={cycleTheme}
          aria-label={`Current theme: ${theme}. Click to cycle themes.`}
          title={`Theme: ${theme}`}
        >
          <ThemeIcon theme={theme} />
          <span className={styles.themeLabel}>{theme}</span>
        </button>
      </div>
    </header>
  );
}

function ThemeIcon({ theme }: { theme: string }) {
  if (theme === 'dark') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );
  }
  if (theme === 'night') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a4 4 0 0 0 0 8 6 6 0 0 0 0-8z" />
        <path d="M12 14v7M9 18l3-1 3 1" />
      </svg>
    );
  }
  // light or auto
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
