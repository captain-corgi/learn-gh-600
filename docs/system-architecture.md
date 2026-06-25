# System Architecture

## Overview

Captain Corgi Hub is a **static HTML/CSS website** hosted on GitHub Pages. The architecture prioritizes simplicity, maintainability, and zero-dependency operation while delivering a comprehensive educational platform for GH-600 exam preparation.

**Key Architectural Principles:**
1. **Static-first** — No server-side processing, no database, no build step
2. **Client-side only** — All functionality via HTML/CSS (no JavaScript)
3. **Design-token driven** — Centralized CSS custom properties for theming
4. **Progressive enhancement** — Works without JavaScript, modern browsers enhance experience

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Pages (Static Hosting)            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Repository: captain-corgi/learn-gh-600               │  │
│  │  Branch: main ← develop (integration branch)          │  │
│  │  Config: .nojekyll (disables Jekyll processing)       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Static File Delivery                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ index.html   │  │ gh600-*.html │  │ colors_and_  │      │
│  │ (795 LOC)    │  │ (10 pages)   │  │   type.css    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│        ↓                  ↓                  ↓              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Browser    │  │   Browser    │  │   Browser    │      │
│  │   Renders    │  │   Renders    │  │   Applies    │      │
│  │   HTML       │  │   HTML       │  │   Tokens     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Page Structure

All HTML pages share this layout pattern:

```
┌─────────────────────────────────────────────────────────┐
│  <html class="idx-root">                                │
│  ┌───────────────────────────────────────────────────┐  │
│  │  <head>                                          │  │
│  │    - Meta tags (charset, viewport)               │  │
│  │    - Title                                       │  │
│  │    - Favicon link                                │  │
│  │    - Design token CSS (colors_and_type.css)      │  │
│  │    - Page-specific <style> block                 │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  <body class="cc-body">                           │  │
│  │    ┌─────────────────┐  ┌───────────────────────┐ │  │
│  │    │  Sidebar Nav     │  │  Main Content Area    │ │  │
│  │    │  (.idx-nav)     │  │  (.idx-main)          │ │  │
│  │    │  - Brand row     │  │  - Iframe viewer      │ │  │
│  │    │  - Theme toggle  │  │  - Hero section       │ │  │
│  │    │  - Nav links     │  │  - Content cards      │ │  │
│  │    │  - Collapse btn  │  │  - Footer             │ │  │
│  │    └─────────────────┘  └───────────────────────┘ │  │
│  └───────────────────────────────────────────────────┘  │
│  </body>                                                 │
│  </html>                                                │
└─────────────────────────────────────────────────────────┘
```

### Navigation System

**Iframe-based navigation** (no JavaScript required):

```html
<!-- Sidebar link targets iframe -->
<a href="gh600-study-plan.html" target="exam-frame">
  Study Plan
</a>

<!-- Main content iframe receives page -->
<iframe name="exam-frame" src="gh600-study-plan.html">
</iframe>
```

**Benefits:**
- No client-side routing
- No JavaScript state management
- Works with browser back button
- Simple and reliable

**Trade-offs:**
- Iframe creates isolated browsing context
- Shared state requires postMessage (if JS added)
- Print entire page includes iframe contents

### Theme System

**Three-tier theme architecture:**

```
colors_and_type.css (Design Tokens)
    ↓
CSS Custom Properties (--bg, --fg, --accent)
    ↓
[data-theme="dark|night"] attribute
    ↓
Theme-specific token overrides
    ↓
Page-specific styles consume tokens
```

**Theme switching flow:**

```html
<!-- Default (light) -->
<html>
  <body style="background: var(--bg);">
    <!-- Uses light theme tokens -->
  </body>
</html>

<!-- Dark theme -->
<html data-theme="dark">
  <body style="background: var(--bg);">
    <!-- Uses dark theme tokens (overridden values) -->
  </body>
</html>

<!-- Night theme -->
<html data-theme="night">
  <body style="background: var(--bg);">
    <!-- Uses night theme tokens (warm amber) -->
  </body>
</html>
```

**Implementation:**

```css
/* Light theme (default) */
:root {
  --bg: #F6F2EA;
  --fg: #1F2A33;
}

/* Dark theme override */
[data-theme="dark"] {
  --bg: #0E1318;
  --fg: #F8EFDB;
}

/* Night theme override */
[data-theme="night"] {
  --bg: #0A0C0E;
  --fg: #F5E6D3;
}
```

**Theme switching mechanism:**

Currently requires JavaScript (minimal implementation):

```javascript
// Inline script for theme toggle only
const themes = ['light', 'dark', 'night'];
let current = 0;

document.getElementById('theme-toggle').onclick = () => {
  current = (current + 1) % themes.length;
  const theme = themes[current];
  document.documentElement.setAttribute('data-theme', theme);
};
```

**Future enhancement:** Persist theme preference in localStorage

## Design System Architecture

### Token Hierarchy

```
Brand Colors (sampled from mascot)
    ↓
Semantic Tokens (bg, fg, accent, info, success, warning, danger)
    ↓
Component Tokens (card-bg, button-bg, link-color)
    ↓
Page-Specific Styles (consume component tokens)
```

### Design Token File

**Location:** `assets/captain-corgi-hub-design/colors_and_type.css`

**Structure:**

```css
:root {
  /* Brand colors */
  --corgi-orange: #FC8903;
  --captain-red: #E13429;
  --star-yellow: #FBC00A;

  /* Semantic tokens */
  --bg: var(--clay-cream);
  --fg: var(--ink);
  --accent: var(--corgi-orange);

  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;

  /* Type scale */
  --fs-12: 0.75rem;
  --fs-14: 0.875rem;
  --fs-16: 1rem;

  /* Shadows */
  --shadow-1: 0 1px 2px rgba(...);
  --shadow-2: 0 6px 14px rgba(...);
}
```

### Token Usage Patterns

**Direct consumption (recommended):**
```css
.card {
  background: var(--bg-elevated);
  color: var(--fg);
  padding: var(--space-4);
  border-radius: var(--r-2);
  box-shadow: var(--shadow-1);
}
```

**Semantic layering (for components):**
```css
.card {
  /* Component-level tokens */
  --card-bg: var(--bg-elevated);
  --card-fg: var(--fg);
  --card-padding: var(--space-4);

  background: var(--card-bg);
  color: var(--card-fg);
  padding: var(--card-padding);
}
```

## Content Architecture

### Educational Content Flow

```
Study Plan (6 modules, domain-weighted)
    ↓
Labs (8 hands-on exercises, scaffolded project)
    ↓
Mock Exams (5 themed exams, 50 questions each)
    ↓
Practice Exams (7 timed practice sets)
```

### Content Organization

**Markdown documentation:**
```
docs/
├── enhanced-study-guide.md          (1,607 LOC, comprehensive)
├── practice-example-{1..7}.md        (350 LOC each, question sets)
└── labs/
    ├── README.md                    (Lab overview)
    ├── lab-00-bootstrap.md          (Environment setup)
    ├── lab-01-sdlc-architecture.md   (Domain 1)
    ├── lab-02-tools-and-mcp.md      (Domain 2, highest weight)
    ├── lab-03-memory-and-state.md   (Domain 3)
    ├── lab-04-evaluation-and-tuning.md (Domain 4)
    ├── lab-05-multi-agent.md        (Domain 5)
    ├── lab-06-guardrails.md         (Domain 6)
    ├── lab-07-capstone.md           (Integration)
    └── scaffold/                    (Go project reference)
```

**HTML pages (rendered content):**
```
index.html                           (Main hub, sidebar nav)
gh600-study-plan*.html               (Study plan pages)
gh600-labs-captain-corgi.html        (Labs index)
gh600-mock-exam*.html                (Mock exam pages)
gh600-mock-exams-index.html          (Mock exam navigation)
gh600-practice-exam-captain-corgi-*.html (Practice exams)
```

### Content Mapping to Exam Domains

| Domain | Weight | Study Module | Lab | Practice Questions |
|--------|--------|--------------|-----|---------------------|
| 1. Agent Architecture & SDLC | 15-20% | Module 1 | Lab 1 | ~75 questions |
| 2. Tool Use & Environment | 20-25% | Module 2 | Lab 2 | ~100 questions |
| 3. Memory & State | 10-15% | Module 3 | Lab 3 | ~50 questions |
| 4. Evaluation & Tuning | 15-20% | Module 4 | Lab 4 | ~75 questions |
| 5. Multi-Agent Coordination | 15-20% | Module 5 | Lab 5 | ~75 questions |
| 6. Guardrails & Accountability | 10-15% | Module 6 | Lab 6 | ~50 questions |

**Total:** 600 exam questions across all materials

## Deployment Architecture

### GitHub Pages Workflow

```
Developer (local)
    ↓
git push origin develop
    ↓
GitHub Repository
    ↓
Pull Request: develop → main
    ↓
Code Review & Merge
    ↓
GitHub Actions (optional, future)
    ↓
GitHub Pages Deployment
    ↓
Static files served from main branch
    ↓
https://captain-corgi.github.io/learn-gh-600/
```

### Deployment Configuration

**`.nojekyll` file:**
```
# Disables Jekyll processing
# Allows files starting with underscore (if added)
# Serves files as-is
```

**No build process:**
- Files served directly from repository
- No compilation, bundling, or optimization steps
- Instant deployment on merge to `main`

### Development Workflow

**Local development:**
```bash
# Clone repository
git clone https://github.com/captain-corgi/learn-gh-600.git
cd learn-gh-600

# Start dev server
make run  # python3 -m http.server 8080

# Open browser
open http://localhost:8080
```

**Branch strategy:**
```
main     ← Production (auto-deployed to GitHub Pages)
  ↑
develop  ← Integration (ready for production)
  ↑
feature/*  ← Feature branches (optional)
```

### Performance Optimization

**Current optimizations:**
- Zero external dependencies (no CDN requests)
- Inline critical CSS (page-specific styles)
- System font fallback (Google Fonts progressive enhancement)
- Minimal DOM size (no heavy JavaScript frameworks)

**Future optimizations (if needed):**
- Critical CSS extraction (above-the-fold styles only)
- Async font loading
- Image optimization (if images added)
- Compression (GitHub Pages gzip by default)

## Security Architecture

### Threat Model

**Static file hosting:** Minimal attack surface
- No server-side code execution
- No database queries
- No user authentication
- No input processing

**Security considerations:**
- **Cross-site scripting (XSS):** Not applicable (no user input)
- **SQL injection:** Not applicable (no database)
- **Authentication bypass:** Not applicable (no auth)
- **Dependency vulnerabilities:** Zero dependencies

### GitHub Pages Security

**Platform-provided security:**
- HTTPS/TLS encryption (automatic)
- DDoS protection (GitHub infrastructure)
- Access control (private repository option)
- Branch protection rules (configurable)

**Repository security:**
- `.gitignore` excludes sensitive files (if any)
- No secrets in repository (API keys, credentials)
- Commit signing (optional, recommended)

### Content Security Policy (Future)

**If adding JavaScript or external resources:**

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src https://fonts.gstatic.com;
  img-src 'self' data: https:;
">
```

## Scalability Considerations

### Current Scale

**Content size:**
- HTML: ~7,500 lines (~250 KB)
- CSS: ~500 lines (~15 KB)
- Docs: ~5,000 lines (~150 KB)
- **Total:** ~415 KB (uncompressed)

**Traffic capacity:**
- GitHub Pages: 100 GB bandwidth/month (free tier)
- Serves thousands of visitors/month
- No database queries (horizontal scaling not needed)

### Scaling Strategy

**Content growth:**
- Add more practice exams (HTML files)
- Expand study guides (Markdown files)
- No architectural changes needed

**Traffic growth:**
- GitHub Pages handles scaling automatically
- CDN caching (GitHub's fastly infrastructure)
- No server-side bottlenecks

**Future considerations (if needed):**
- Migrate to dedicated hosting (Netlify, Vercel)
- Add search functionality (static site search)
- Implement analytics (privacy-preserving)

## Monitoring & Observability

### Current State

**No monitoring implemented:**
- No analytics (privacy-first)
- No error tracking (static site, no errors)
- No performance monitoring (manual Lighthouse audits)

### Future Monitoring (Optional)

**If adding analytics:**
- Privacy-preserving solutions (Plausible, Fathom)
- No third-party tracking (Google Analytics)
- Compliant with GDPR/CCPA

**If adding error tracking:**
- Client-side error monitoring (if JavaScript added)
- Uptime monitoring (Pingdom, UptimeRobot)

## Technology Decisions

### Why Static HTML/CSS?

**Decision:** Pure HTML/CSS, no JavaScript framework

**Rationale:**
1. **Simplicity** — Easy to maintain, no build step
2. **Performance** — Instant load, no framework overhead
3. **Reliability** — No runtime errors, works everywhere
4. **Accessibility** — Semantic HTML, screen reader friendly

**Trade-offs:**
- Limited interactivity (no dynamic features)
- Manual content updates (no CMS)
- Single-page experience requires iframes

### Why GitHub Pages?

**Decision:** Host on GitHub Pages

**Rationale:**
1. **Free hosting** — No infrastructure costs
2. **Automatic deployment** — Push to main = deployed
3. **Version control** — Git-based content management
4. **Community** — Easy contributions via PRs

**Trade-offs:**
- Limited to static sites
- GitHub branding on URL
- No server-side processing

### Why Custom Design System?

**Decision:** Captain Corgi Hub design tokens

**Rationale:**
1. **Brand identity** — Unique mascot-driven aesthetic
2. **Theming** — Easy theme switching via tokens
3. **Maintainability** — Single source of truth for design
4. **Learning** — Demonstrates design token patterns

**Trade-offs:**
- Custom maintenance (not using Bootstrap/Tailwind)
- Limited component library (build as needed)

## Future Architecture Evolution

### Potential Enhancements

**JavaScript features (optional):**
```javascript
// Theme persistence
localStorage.setItem('theme', 'dark');

// Progress tracking
localStorage.setItem('completed-modules', JSON.stringify([1, 2, 3]));

// Search functionality
// Static site search (lunr.js, flexsearch)
```

**Build process (if needed):**
```yaml
# Future: GitHub Actions for optimization
- name: Optimize images
  run: imagemin --out=assets/ assets/images/
- name: Minify HTML
  run: htmlminifier index.html -o index.html
- name: Critical CSS
  run: penthouse http://localhost:8080 > critical.css
```

**CMS integration (if needed):**
- Decap CMS (formerly Netlify CMS)
- Git-based content management
- No backend required

### Migration Path

**If outgrowing GitHub Pages:**
1. Netlify — GitHub integration, similar workflow
2. Vercel — Edge deployment, analytics
3. Cloudflare Pages — Global CDN, analytics

**If adding dynamic features:**
1. Add JavaScript progressively (enhancement)
2. Consider JAMstack architecture (API + static)
3. Evaluate serverless functions (if needed)

---

**Document Version:** 1.0
**Last Updated:** 2026-05-30
**Owner:** Anh Le (@captain-corgi)
