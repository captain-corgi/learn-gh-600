# Codebase Summary

Generated from repomix compaction on 2026-05-30.

## Project Overview

**Project:** learn-gh-600 (Captain Corgi Hub)
**Type:** Static educational website
**Purpose:** GH-600 exam certification training ("Developing in Agentic AI Systems")
**Platform:** GitHub Pages
**Tech Stack:** Pure HTML/CSS (no framework, no bundler)

## Repository Metrics

| Metric | Value |
|--------|-------|
| **Total Files (tracked)** | 22 HTML/CSS/MD files |
| **Total Tokens** | 392,471 |
| **Total Characters** | 1,296,050 |
| **Largest File** | release-manifest.json (146,539 tokens, 371 KB) |
| **Primary Content** | HTML pages (~10K LOC) |

## File Inventory

### Core HTML Pages (10 files, ~7,500 LOC)

| File | LOC | Purpose |
|------|-----|---------|
| `index.html` | 795 | Main hub with sidebar nav + iframe exam viewer |
| `gh600-study-plan.html` | 624 | Study plan (default theme) |
| `gh600-study-plan-captain-corgi.html` | 734 | Study plan (Captain Corgi theme) |
| `gh600-labs-captain-corgi.html` | 411 | Labs index page |
| `gh600-mock-exam.html` | 408 | Mock exam (default theme) |
| `gh600-mock-exam-captain-corgi.html` | 485 | Mock exam (themed) |
| `gh600-mock-exam-captain-corgi-{1..5}.html` | 485 each | 5 themed mock exams |
| `gh600-mock-exams-index.html` | 787 | Mock exams index |
| `gh600-practice-exam-captain-corgi-{1..7}.html` | 469 each | 7 practice exams |

**Total HTML LOC:** ~7,500 lines

### Documentation (docs/)

| File | LOC | Purpose |
|------|-----|---------|
| `enhanced-study-guide.md` | 1,607 | Comprehensive GH-600 study guide |
| `practice-example-{1..7}.md` | ~370 each | Practice exam question sets |
| `labs/README.md` | 74 | Lab overview |
| `labs/lab-{00..07}.md` | ~130 each | 8 hands-on labs |

**Total Docs LOC:** ~5,000 lines

### Design System

| File | Purpose |
|------|---------|
| `assets/captain-corgi-hub-design/colors_and_type.css` | Design tokens (colors, type, spacing, shadows, themes) |

### Configuration

| File | Purpose |
|------|---------|
| `Makefile` | Dev server (`make run` → python3 -m http.server 8080) |
| `.nojekyll` | Disable Jekyll processing on GitHub Pages |
| `release-manifest.json` | Release metadata and file checksums |

## Architecture Patterns

### Layout Structure

All HTML pages follow consistent patterns:

1. **Sidebar Navigation** (`idx-nav`)
   - Flexbox-based collapsible sidebar
   - Target links to iframe (`target="exam-frame"`)
   - Theme toggle button
   - Responsive collapse with CSS transitions

2. **Main Content Area** (`idx-main`)
   - Iframe-based content viewer
   - Hero section with CTA buttons
   - Card-based content grid
   - Responsive breakpoints

3. **Theme System**
   - CSS custom properties for theming
   - Three themes: light (default), dark, night
   - `[data-theme="dark|night"]` attribute switching
   - Warm clay-tinted palette (Captain Corgi brand)

### Design Tokens

**Brand Colors (sampled from mascot):**
- `--corgi-orange: #FC8903` (primary brand)
- `--captain-red: #E13429` (accent)
- `--star-yellow: #FBC00A` (highlight)
- `--sky-cyan: #51BBD7` (info)
- `--hub-green: #3BB283` (success)

**Semantic Tokens:**
- `--bg`, `--bg-elevated`, `--bg-sunken` (surfaces)
- `--fg`, `--fg-2`, `--fg-3`, `--fg-4` (text hierarchy)
- `--accent`, `--info`, `--success`, `--warning`, `--danger`
- `--shadow-{1..4}` (elevation)
- `--space-{1..6}` (spacing scale)
- `--fs-{12..18}` (type scale)
- `--r-{1..3}` (border radius)

### Content Architecture

**Study Flow:**
1. Study plan → Domain-weighted curriculum
2. Labs → Hands-on exercises (8 labs, scaffolded Go project)
3. Mock exams → 5 themed practice exams
4. Practice exams → 7 timed practice sets

**GH-600 Domain Coverage:**
1. Agent Architecture & SDLC (15-20%)
2. Tool Use & Environment (20-25%) — **Highest**
3. Memory & State (10-15%)
4. Evaluation & Tuning (15-20%)
5. Multi-Agent Coordination (15-20%)
6. Guardrails & Accountability (10-15%)

## Deployment

**Platform:** GitHub Pages
- Branch: `develop` → merges to `main` for deployment
- `.nojekyll` disables Jekyll processing
- Static file serving (no build step)
- Custom domain: (if configured)

**Development:**
```bash
make run  # python3 -m http.server 8080
```

## Dependencies

**Zero runtime dependencies.**

**Development:**
- Python 3 (for http.server dev server)
- Git (for version control)

**External Assets:**
- Google Fonts (Bricolage Grotesque, Nunito, JetBrains Mono)
- No CDN scripts or frameworks

## Code Conventions

### Naming
- Files: `kebab-case.html` / `kebab-case.css`
- CSS classes: `kebab-case` with BEM-like prefixes (`idx-nav`, `idx-main`)
- CSS variables: `kebab-case` with semantic prefixes (`--bg`, `--fg`, `--accent`)

### Organization
- All HTML files at repo root
- Design system in `assets/captain-corgi-hub-design/`
- Docs in `docs/` (study guides, labs, practice examples)
- No component duplication (copy-paste patterns, no imports)

### Style Patterns
- Inline `<style>` blocks in each HTML file
- Shared design tokens via external CSS
- Media queries for responsive breakpoints
- CSS transitions for theme switching

## Key Technical Decisions

1. **Static-only approach** — No JS framework, no build tools
   - Rationale: Educational content doesn't need reactivity
   - Benefit: Instant GitHub Pages deployment, no build step

2. **Iframe-based navigation** — Links target `exam-frame` iframe
   - Rationale: Simple navigation without JavaScript
   - Benefit: Works without client-side routing

3. **CSS custom properties** — All theming via tokens
   - Rationale: Easy theme switching, consistent brand
   - Benefit: Single source of truth for design tokens

4. **Captain Corgi brand** — Warm clay palette, mascot avatars
   - Rationale: Friendly, approachable learning environment
   - Benefit: Memorable educational experience

## Maintenance Notes

### File Size Management
- HTML files average ~500 LOC (acceptable for static pages)
- Enhanced study guide is 1,607 LOC (comprehensive reference)
- Consider splitting if guides exceed 2,000 LOC

### Content Updates
- Exam content embedded directly in HTML
- No CMS or database — manual edits required
- Git workflow for content versioning

### Future Enhancements
Potential areas for expansion:
- Search functionality (static site search)
- Progress tracking (localStorage or backend)
- Interactive quizzes (JS-based validation)
- Print/PDF export styles
- Accessibility audit (ARIA labels, keyboard nav)

---

**Generated:** 2026-05-30
**Source:** repomix-output.xml (22 files, 392K tokens)
