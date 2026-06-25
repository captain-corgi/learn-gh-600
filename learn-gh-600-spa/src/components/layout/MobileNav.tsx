// =========================================================================
// Captain Corgi Hub — MobileNav Component
// Bottom navigation bar for mobile viewports
// =========================================================================

import { NavLink } from 'react-router-dom';
import styles from './MobileNav.module.css';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/study-plan', label: 'Study', icon: '📚' },
  { to: '/exams', label: 'Exams', icon: '📝' },
  { to: '/labs', label: 'Labs', icon: '🔬' },
];

export function MobileNav() {
  return (
    <nav className={styles.nav} aria-label="Mobile navigation">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ''}`
          }
        >
          <span className={styles.icon} aria-hidden="true">{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
