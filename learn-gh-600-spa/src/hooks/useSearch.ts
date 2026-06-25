// =========================================================================
// Captain Corgi Hub — useSearch Hook
// Full-text search across questions, topics, and labs
// =========================================================================

import { useState, useCallback, useEffect, useRef } from 'react';
import { getExamCatalog, getExamQuestions, DOMAINS } from '@/lib/data';
import type { SearchResult } from '@/lib/types';

interface SearchDocument {
  id: string;
  type: 'question' | 'topic' | 'lab';
  title: string;
  content: string;
  domain: number;
  domainName: string;
  url: string;
}

// Simple in-memory search using string matching (no FlexSearch dependency issues)
let searchDocs: SearchDocument[] = [];

function buildSearchIndex(): void {
  if (searchDocs.length > 0) return;

  const docs: SearchDocument[] = [];

  // Index questions from all exams
  const catalog = getExamCatalog();
  for (const exam of catalog) {
    const questions = getExamQuestions(exam.id);
    for (const q of questions) {
      docs.push({
        id: q.id,
        type: 'question',
        title: q.question.slice(0, 100),
        content: `${q.question} ${q.options.join(' ')} ${q.explanation}`,
        domain: q.domain,
        domainName: q.domainName,
        url: `/exams/${exam.id}`,
      });
    }
  }

  // Index domain topics
  for (const domain of DOMAINS) {
    docs.push({
      id: `domain-${domain.id}`,
      type: 'topic',
      title: domain.name,
      content: `${domain.name} ${domain.description} ${domain.weight}`,
      domain: domain.id,
      domainName: domain.name,
      url: `/study-plan/${domain.id}`,
    });
  }

  // Index labs
  const labs = [
    { id: 0, title: 'Bootstrap corgi-greeter', description: 'Create the Go app, Docker build, Docker Hub push, and AWS deploy baseline.', tools: 'Go | Actions | Docker Hub | AWS' },
    { id: 1, title: 'SDLC architecture', description: 'Separate planning from execution with issues, PRs, CODEOWNERS, labels, and rulesets.', tools: 'Copilot | PRs | Rulesets' },
    { id: 2, title: 'Tools and MCP', description: 'Configure MCP allow lists, custom agents, branch scope, retries, rollback, and escalation.', tools: 'MCP | custom agents | firewall' },
    { id: 3, title: 'Memory and state', description: 'Persist decisions, resume interrupted work, and detect context drift.', tools: 'Issues | AGENTS.md | decisions' },
    { id: 4, title: 'Evaluation and tuning', description: 'Score repeated agent runs with tests, scans, traces, and root-cause buckets.', tools: 'Actions | CodeQL | evals' },
    { id: 5, title: 'Multi-agent coordination', description: 'Run specialist agents in isolated branches and merge their artifacts safely.', tools: 'matrix | artifacts | coordinator' },
    { id: 6, title: 'Guardrails', description: 'Apply autonomy levels, least privilege, approvals, hard blocks, and audit trails.', tools: 'environments | OIDC | audit' },
    { id: 7, title: 'Capstone', description: 'Ship one end-to-end agentic change from issue to production deployment.', tools: 'issue | PR | eval | deploy' },
  ];

  for (const lab of labs) {
    docs.push({
      id: `lab-${lab.id}`,
      type: 'lab',
      title: lab.title,
      content: `${lab.title} ${lab.description} ${lab.tools}`,
      domain: -1,
      domainName: 'Labs',
      url: `/labs/${lab.id}`,
    });
  }

  searchDocs = docs;
}

function searchQuery(
  query: string,
  options?: { type?: string; domain?: number }
): SearchResult[] {
  if (!query.trim()) return [];

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const scored: Array<{ doc: SearchDocument; score: number }> = [];

  for (const doc of searchDocs) {
    if (options?.type && doc.type !== options.type) continue;
    if (options?.domain !== undefined && doc.domain !== options.domain) continue;

    const searchText = `${doc.title} ${doc.content}`.toLowerCase();
    let score = 0;

    for (const term of terms) {
      if (searchText.includes(term)) {
        score += 1;
        // Bonus for title match
        if (doc.title.toLowerCase().includes(term)) score += 2;
      }
    }

    if (score > 0) {
      scored.push({ doc, score });
    }
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(({ doc }) => ({
      id: doc.id,
      type: doc.type,
      title: doc.title,
      excerpt: doc.content.slice(0, 150) + '...',
      domain: doc.domain,
      url: doc.url,
      score: 1,
    }));
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build index on mount
  useEffect(() => {
    buildSearchIndex();
    setIsReady(true);
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (query.trim()) {
        const searchResults = searchQuery(query);
        setResults(searchResults);
      } else {
        setResults([]);
      }
    }, 200);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  const search = useCallback((q: string) => {
    setQuery(q);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  }, []);

  return {
    query,
    results,
    isReady,
    isOpen,
    search,
    open,
    close,
    totalIndexed: searchDocs.length,
  };
}
