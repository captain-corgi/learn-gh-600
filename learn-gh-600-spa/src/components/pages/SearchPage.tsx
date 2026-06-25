// =========================================================================
// Captain Corgi Hub — SearchPage
// Full search results page with filtering and highlighting
// =========================================================================

import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSearch } from '@/hooks/useSearch';
import styles from './SearchPage.module.css';

const TYPE_LABELS: Record<string, string> = {
  question: 'Question',
  topic: 'Topic',
  lab: 'Lab',
};

const TYPE_COLORS: Record<string, string> = {
  question: 'var(--accent)',
  topic: 'var(--success)',
  lab: 'var(--warning)',
};

/** Highlight matching terms in text */
function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text;
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  let result = text;
  for (const term of terms) {
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    result = result.replace(regex, '<mark>$1</mark>');
  }
  return result;
}

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search, results } = useSearch();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Sync URL params to search
  const urlQuery = searchParams.get('q') ?? '';

  useEffect(() => {
    if (urlQuery) {
      search(urlQuery);
    }
  }, [urlQuery, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams(value ? { q: value } : {});
  };

  const filteredResults = activeFilter
    ? results.filter((r) => r.type === activeFilter)
    : results;

  const typeCounts = results.reduce((acc, r) => {
    acc[r.type] = (acc[r.type] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Search</h1>
        <p className={styles.description}>
          Search across all questions, topics, and labs.
        </p>
      </div>

      <div className={styles.searchBox}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search questions, topics, labs..."
          value={urlQuery}
          onChange={handleSearch}
          autoFocus
          aria-label="Search content"
        />
      </div>

      {urlQuery && results.length > 0 && (
        <>
          <div className={styles.filters}>
            <button
              type="button"
              className={`${styles.filterBtn} ${activeFilter === null ? styles.active : ''}`}
              onClick={() => setActiveFilter(null)}
            >
              All ({results.length})
            </button>
            {Object.entries(typeCounts).map(([type, count]) => (
              <button
                key={type}
                type="button"
                className={`${styles.filterBtn} ${activeFilter === type ? styles.active : ''}`}
                onClick={() => setActiveFilter(activeFilter === type ? null : type)}
              >
                {TYPE_LABELS[type] ?? type} ({count})
              </button>
            ))}
          </div>

          <div className={styles.resultList}>
            {filteredResults.map((result) => (
              <Link
                key={result.id}
                to={result.url}
                className={styles.resultCard}
              >
                <div className={styles.resultMeta}>
                  <span
                    className={styles.typeBadge}
                    style={{ background: TYPE_COLORS[result.type] ?? 'var(--fg-3)' }}
                  >
                    {TYPE_LABELS[result.type] ?? result.type}
                  </span>
                  {result.domain >= 0 && (
                    <span className={styles.domainBadge}>Domain {result.domain + 1}</span>
                  )}
                </div>
                <div
                  className={styles.resultTitle}
                  dangerouslySetInnerHTML={{ __html: highlightMatch(result.title, urlQuery) }}
                />
                <div
                  className={styles.resultExcerpt}
                  dangerouslySetInnerHTML={{ __html: highlightMatch(result.excerpt, urlQuery) }}
                />
              </Link>
            ))}
          </div>
        </>
      )}

      {urlQuery && results.length === 0 && (
        <div className={styles.noResults}>
          <p>No results found for &quot;{urlQuery}&quot;</p>
        </div>
      )}
    </div>
  );
}
