# Code Standards & Conventions

## File Naming

### HTML Files
- **Pattern:** `kebab-case.html`
- **Examples:** `gh600-study-plan.html`, `gh600-mock-exam-captain-corgi-1.html`
- **Prefixes:** `gh600-` for all GH-600 related pages
- **Themed variants:** Append `-captain-corgi` for branded versions

### CSS Files
- **Pattern:** `kebab-case.css`
- **Location:** `assets/captain-corgi-hub-design/`
- **Purpose:** Single design token file (`colors_and_type.css`)
- **No component CSS:** All styles in `<style>` blocks or shared tokens

### Markdown Files
- **Pattern:** `kebab-case.md`
- **Documentation:** `docs/` directory with descriptive names
- **Examples:** `enhanced-study-guide.md`, `practice-example-1.md`

### Other Files
- `Makefile` — Standard makefile naming
- `.nojekyll` — GitHub Pages configuration (hidden file)
- `release-manifest.json` — JSON for release metadata

## HTML Structure

### Document Outline

Every HTML file follows this structure:

```html
<!DOCTYPE html>
<html lang="en" class="{page-root}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{Page Title} — Captain Corgi Hub</title>
  <link rel="icon" href="assets/captain-corgi-hub-design/assets/icons/star.svg">
  <link rel="stylesheet" href="assets/captain-corgi-hub-design/colors_and_type.css">
  <style>
    /* Page-specific styles */
  </style>
</head>
<body class="cc-body">
  <!-- Page content -->
</body>
</html>
```

### Root Class Convention

Each page has a unique root class:

```html
<html lang="en" class="idx-root">  <!-- index.html -->
<html lang="en" class="study-plan-root">  <!-- study plan -->
<html lang="en" class="mock-exam-root">  <!-- mock exam -->
```

**Purpose:** Namespace page-specific styles, prevent style leakage

### Semantic HTML5

**Required elements:**
- `<header>` — Page headers, hero sections
- `<nav>` — Navigation menus, sidebars
- `<main>` — Primary content area
- `<section>` — Thematic content groupings
- `<article>` — Self-contained content (exam questions, lab steps)
- `<footer>` — Page footers, copyright
- `<button>` — Interactive controls (not `<div>` with click handlers)

**Heading hierarchy:**
```html
<h1>Page title (one per page)</h1>
  <h2>Major section</h2>
    <h3>Subsection</h3>
      <h4>Detail</h4>
```

**No skipped levels** — Always nest hierarchically

## CSS Conventions

### Class Naming

**Pattern:** `kebab-case` with BEM-like prefixes

**Prefixes:**
- `idx-` — Index page components (`idx-nav`, `idx-main`, `idx-hero`)
- `study-` — Study plan components (`study-nav`, `study-content`)
- `exam-` — Exam components (`exam-question`, `exam-options`)
- `lab-` — Lab components (`lab-step`, `lab-code`)

**Modifiers:** Single hyphen suffix
```css
.idx-nav           /* Base */
.idx-nav-collapsed /* Modifier: collapsed state */
.idx-btn-primary   /* Modifier: primary button */
```

**Avoid:**
- CamelCase: `idxNav` ❌
- Underscores: `idx_nav` ❌
- Double hyphens: `idx--nav` ❌ (BEM style not used)

### Custom Properties (CSS Variables)

**Naming:** `--kebab-case` with semantic prefixes

**Categories:**

**Colors:**
```css
--corgi-orange          /* Brand color */
--bg, --bg-elevated     /* Surfaces */
--fg, --fg-2            /* Text hierarchy */
--accent, --info        /* Semantic colors */
--border                /* Dividers */
```

**Spacing:**
```css
--space-1  /* 0.25rem */
--space-2  /* 0.5rem */
--space-3  /* 1rem */
--space-4  /* 1.5rem */
--space-5  /* 2rem */
--space-6  /* 3rem */
```

**Typography:**
```css
--fs-12   /* 0.75rem */
--fs-14   /* 0.875rem */
--fs-16   /* 1rem */
--fs-18   /* 1.125rem */
--font-body  /* Font family */
--lh-normal  /* Line height */
```

**Radii:**
```css
--r-1  /* 0.25rem */
--r-2  /* 0.5rem */
--r-3  /* 1rem */
```

**Shadows:**
```css
--shadow-1  /* Subtle elevation */
--shadow-2  /* Medium elevation */
--shadow-3  /* High elevation */
--shadow-4  /* Maximum elevation */
```

### Layout Patterns

**Flexbox for components:**
```css
.nav-row {
  display: flex;
  gap: var(--space-3);
  align-items: center;
}
```

**Grid for page layouts:**
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-4);
}
```

**Container queries (future):**
```css
/* Currently using media queries, migrate to container queries when support allows */
```

### Responsive Breakpoints

**Mobile-first approach:**
```css
/* Base styles: mobile */
.component { padding: var(--space-3); }

/* Tablet: 768px+ */
@media (min-width: 48rem) {
  .component { padding: var(--space-4); }
}

/* Desktop: 1024px+ */
@media (min-width: 64rem) {
  .component { padding: var(--space-5); }
}
```

**No device-specific breakpoints** — Use content-first breakpoints

### State Styles

**Hover, focus, active:**
```css
.btn {
  background: var(--accent);
  color: var(--accent-fg);
}

.btn:hover {
  background: var(--accent-deep);
}

.btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.btn:active {
  transform: scale(0.98);
}
```

**Theme-specific styles:**
```css
/* Default (light) */
.btn { background: var(--accent); }

/* Dark theme override */
[data-theme="dark"] .btn {
  background: var(--accent);
  /* Different shadow needed on dark */
  box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
```

### Transitions

**Standard easing:**
```css
transition: all 260ms cubic-bezier(0.22, 1, 0.36, 1);
```

**Properties to animate:**
- `opacity`, `visibility` — Fade effects
- `transform` — Movement, scaling
- `flex-basis`, `width` — Sidebar collapse
- `background-color`, `color` — Theme changes

**Properties NOT to animate:**
- `height`, `width` (except flex-basis) — Use transform instead
- `font-size` — Jarring, hard to interpolate

## Content Guidelines

### Text Content

**Voice:** Friendly, educational, approachable
- Use "you" and "we" — Inclusive, direct
- Active voice — Clear instructions
- Simple sentences — Easy to scan

**Tone:**
- Study guides: Encouraging, structured
- Labs: Instructional, step-by-step
- Exams: Professional, clear

**Formatting:**
- Use semantic HTML (`<strong>`, `<em>`, `<code>`)
- Avoid `<b>`, `<i>` — Not semantic
- Reserve `<strong>` for key terms (not styling)

### Code Examples

**Language-agnostic formatting:**
```html
<code class="inline-code">command-name</code>

<pre><code class="code-block">
# Multi-line code
git add .
git commit -m "Add feature"
</code></pre>
```

**Syntax highlighting:** Not currently implemented (pure HTML)
- Future: Consider Prism.js or highlight.js if needed

### Links

**Internal links:**
```html
<a href="gh600-study-plan.html">Study Plan</a>
```

**External links:**
```html
<a href="https://github.com/captain-corgi/learn-gh-600" target="_blank" rel="noopener">
  GitHub Repository
</a>
```

**Always include `rel="noopener"` for `target="_blank"`**

## Accessibility Standards

### WCAG 2.1 AA Compliance

**Color contrast:**
- Text on background: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- Interactive elements: 3:1 minimum against adjacent colors

**Keyboard navigation:**
- All interactive elements: `<button>`, `<a>`, inputs
- Tab order: Logical, matches visual layout
- Focus indicators: Visible outline or ring
- No keyboard traps: Easy navigation in/out of components

**Semantic markup:**
- Proper heading hierarchy (no skipped levels)
- Labels for form inputs (if forms added)
- ARIA labels for icon-only buttons
- `alt` text for images

### Screen Reader Support

**ARIA attributes (when needed):**
```html
<button aria-label="Toggle navigation menu">
  <svg><!-- menu icon --></svg>
</button>

<nav aria-label="Main navigation">
  <!-- navigation links -->
</nav>
```

**Hidden content:**
```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
```

**Use for:** Screen-reader-only text, skip links

## Performance Standards

### File Size

**Targets:**
- HTML files: < 50 KB (uncompressed)
- CSS files: < 20 KB (uncompressed)
- Total page weight: < 100 KB (excluding images)

**Current status:** All files within targets (largest: study-plan-captain-corgi.html at 734 LOC)

### Optimization Techniques

**Current practices:**
- Zero external dependencies (no CDN requests)
- System font stack fallback (Google Fonts progressive enhancement)
- Inline critical CSS (page-specific styles in `<style>`)

**Future optimizations (if needed):**
- Critical CSS extraction (above-the-fold styles)
- Async font loading
- Image compression (if images added)

### Load Performance

**Target metrics:**
- First Contentful Paint (FCP): < 1.5 seconds
- Largest Contentful Paint (LCP): < 2.5 seconds
- Cumulative Layout Shift (CLS): < 0.1

**Measurement:** Use Chrome DevTools Lighthouse

## Browser Compatibility

### Supported Browsers

**Desktop:**
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

**Mobile:**
- iOS Safari: iOS 14+
- Android Chrome: Android 10+

**Fallbacks:**
- CSS Grid → Flexbox (if needed)
- CSS Custom Properties → Static values (if IE support needed)
- Modern JS → No JS (current approach)

### Feature Detection

**Progressive enhancement:**
```css
@supports (display: grid) {
  .card-grid {
    display: grid;
    /* Grid layout */
  }
}

@supports not (display: grid) {
  .card-grid {
    display: flex;
    flex-wrap: wrap;
    /* Flexbox fallback */
  }
}
```

**Feature queries** over browser sniffing

## Git Workflow

### Branch Strategy

```
main     ← Production deployment (GitHub Pages)
  ↑
develop  ← Integration branch
  ↑
feature/*  ← Feature branches (optional)
```

### Commit Conventions

**Format:** Conventional Commits

```
feat: add mock exam 5 with domain 6 questions
fix: correct answer key for practice exam 3 question 12
docs: update study guide module 2 with MCP examples
style: adjust sidebar padding for mobile layout
refactor: extract common button styles to utility class
test: validate all 350 exam questions (no duplicates)
chore: update Makefile to use port 3000
```

**No AI references in commit messages**
- ❌ "AI: Generate mock exam content"
- ✅ "feat: add mock exam 5 with domain 6 questions"

### Pull Request Guidelines

**Before merging:**
- [ ] All links work (no 404s)
- [ ] Theme switching works (all 3 themes)
- [ ] Mobile layout functional (no horizontal scroll)
- [ ] Keyboard navigation works
- [ ] No console errors (if JS added in future)

**PR description template:**
```markdown
## Changes
- Bullet list of changes

## Testing
- [ ] Desktop (Chrome, Firefox, Safari)
- [ ] Mobile (iOS Safari, Android Chrome)
- [ ] All 3 themes (light, dark, night)

## Related
- Closes #issue-number
```

## Documentation Standards

### Code Comments

**When to comment:**
- Complex CSS logic (layout tricks, browser workarounds)
- Non-obvious HTML structures (why this nesting?)
- Theme-specific overrides (why different on dark?)

**Comment style:**
```css
/* Sidebar collapse animation — matches main content padding transition */
.idx-nav {
  transition: flex-basis 260ms cubic-bezier(0.22, 1, 0.36, 1);
}
```

```html
<!-- Target attribute enables iframe navigation without JavaScript -->
<a href="page.html" target="exam-frame">Link</a>
```

**What NOT to comment:**
- Obvious property values (`padding: 1rem;` /* 1rem padding */)
- Standard HTML tags (`<button>` /* button element */)

### File Headers

**HTML files:**
```html
<!-- GH-600 Study Plan — Captain Corgi Theme -->
<!-- Domain 2: Tool Use & Environment (20-25% exam weight) -->
```

**CSS files:**
```css
/* =========================================================================
   Captain Corgi Hub — Design Tokens
   Colors + Type + Spacing + Radii + Shadows + Motion
   ========================================================================= */
```

## Security Considerations

### Content Security

**Current:**
- No user input processing (XSS not applicable)
- No server-side code (injection not applicable)
- No authentication (session security not applicable)

**Future (if adding features):**
- Sanitize all user-generated content
- Use `textContent` instead of `innerHTML` in JS
- Implement CSP headers if adding scripts

### Dependency Security

**Current:** Zero external dependencies

**Future dependencies (if added):**
- Use npm audit for JavaScript packages
- Pin exact versions in `package.json`
- Review third-party code before integrating

## Quality Checklist

### Before Committing

- [ ] HTML validates (W3C Validator)
- [ ] No CSS syntax errors (browser DevTools console)
- [ ] All links work (internal and external)
- [ ] Theme switching works (all 3 themes)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Keyboard navigation works
- [ ] File naming follows conventions
- [ ] Code formatted consistently

### Before Merging to main

- [ ] All above commit checks
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Mobile tested (real devices, not just DevTools)
- [ ] Accessibility audit (Lighthouse, axe DevTools)
- [ ] Performance audit (Lighthouse score > 90)
- [ ] Documentation updated (if applicable)

---

**Document Version:** 1.0
**Last Updated:** 2026-05-30
**Owner:** Anh Le (@captain-corgi)
