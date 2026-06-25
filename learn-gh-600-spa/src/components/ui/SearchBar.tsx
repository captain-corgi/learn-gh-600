// =========================================================================
// Captain Corgi Hub — SearchBar Component
// Search input with keyboard shortcut support (Cmd/Ctrl+K)
// =========================================================================

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '@/hooks/useSearch';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const { query, results, isOpen, search, open, close } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Cmd/Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        open();
      }
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, open, close]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleResultClick = (url: string) => {
    close();
    navigate(url);
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        className={`${styles.trigger} ${className ?? ''}`}
        onClick={open}
        title="Search (Cmd/Ctrl+K)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span className={styles.triggerText}>Search</span>
        <kbd className={styles.shortcut}>⌘K</kbd>
      </button>
    );
  }

  return (
    <div className={styles.overlay} onClick={close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.inputWrap}>
          <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Search questions, topics, labs..."
            value={query}
            onChange={(e) => search(e.target.value)}
          />
          <kbd className={styles.escShortcut}>Esc</kbd>
        </div>

        {results.length > 0 && (
          <div className={styles.results}>
            {results.map((result) => (
              <button
                key={result.id}
                type="button"
                className={styles.resultItem}
                onClick={() => handleResultClick(result.url)}
              >
                <span className={`${styles.resultType} ${styles[result.type]}`}>
                  {result.type}
                </span>
                <div className={styles.resultContent}>
                  <div className={styles.resultTitle}>{result.title}</div>
                  <div className={styles.resultExcerpt}>{result.excerpt}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className={styles.empty}>
            No results found for &ldquo;{query}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}
