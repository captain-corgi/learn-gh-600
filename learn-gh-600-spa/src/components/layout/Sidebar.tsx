import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/study-plan', label: 'Study Plan', icon: '📚' },
  { to: '/exams', label: 'Exams', icon: '📝' },
  { to: '/labs', label: 'Labs', icon: '🔬' },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <nav
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}
      aria-label="Main navigation"
    >
      <div className={styles.header}>
        <button
          type="button"
          className={styles.toggleButton}
          onClick={onToggle}
          aria-expanded={!isCollapsed}
          aria-controls="sidebar-nav"
          title={isCollapsed ? 'Show navigation' : 'Hide navigation'}
        >
          <span className="sr-only">
            {isCollapsed ? 'Show' : 'Hide'} navigation
          </span>
          <span aria-hidden="true">{isCollapsed ? '›' : '‹'}</span>
        </button>
      </div>

      <ul id="sidebar-nav" className={styles.navList}>
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <a
          href="https://captain-corgi.github.io/learn-gh-600/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerLink}
        >
          View on GitHub ↗
        </a>
      </div>
    </nav>
  );
}
