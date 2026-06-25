import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import styles from './AppLayout.module.css';

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`${styles.layout} ${sidebarCollapsed ? styles.collapsed : ''}`}>
      <Header />
      <div className={styles.body}>
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        {sidebarCollapsed && (
          <button
            type="button"
            className={styles.expandBtn}
            onClick={() => setSidebarCollapsed(false)}
            aria-label="Show navigation"
          >
            ‹
          </button>
        )}
        <main className={styles.main}>
          <Outlet />
        </main>        </div>
      <MobileNav />
    </div>
  );
}
