# Captain Corgi Hub — GH-600 Exam Preparation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-3277E5?logo=githubpages)](https://captain-corgi.github.io/learn-gh-600/)
[![Static Site](https://img.shields.io/badge/Type-Static-009900)](https://github.com/captain-corgi/learn-gh-600)

A comprehensive, mascot-branded educational platform for GitHub's **GH-600 certification exam** — *"Developing in Agentic AI Systems."*

**✨ Features:**
- 📚 Domain-weighted study plan (6 modules, aligned with exam blueprint)
- 🧪 600+ practice questions across 12 exam sets
- 🔬 8 hands-on labs with scaffolded Go project
- 🎨 Captain Corgi branding with warm, clay-tinted design
- 🌙 Three themes: Light, Dark, and Night modes
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Static-only — Zero dependencies, instant load

**🌐 Live Site:** [captain-corgi.github.io/learn-gh-600](https://captain-corgi.github.io/learn-gh-600/)

---

## Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/captain-corgi/learn-gh-600.git
cd learn-gh-600

# Start development server
make run

# Open browser to http://localhost:8080
```

**Requirements:** Python 3 (for `http.server`)

### GitHub Pages Deployment

The platform is automatically deployed from the `main` branch:

```
develop → main (via pull request) → GitHub Pages (auto-deployed)
```

---

## What's Inside

### Study Materials

| Resource | Content | Purpose |
|----------|---------|---------|
| **Study Plan** | 6 modules, domain-weighted | Structured learning path |
| **Labs** | 8 hands-on exercises | Practical agent development |
| **Mock Exams** | 5 themed exams (250 questions) | Exam simulation |
| **Practice Exams** | 7 timed sets (350 questions) | Reinforce learning |

### GH-600 Exam Domains

All 6 exam domains are covered with weighted emphasis:

1. **Agent Architecture & SDLC** (15-20%) — Labs 1, 7; Module 1
2. **Tool Use & Environment** (20-25%) — Lab 2; Module 2 ⭐ **Highest Priority**
3. **Memory & State** (10-15%) — Lab 3; Module 3
4. **Evaluation & Tuning** (15-20%) — Lab 4; Module 4
5. **Multi-Agent Coordination** (15-20%) — Lab 5; Module 5
6. **Guardrails & Accountability** (10-15%) — Lab 6; Module 6

### File Structure

```
learn-gh-600/
├── index.html                           # Main hub (sidebar + iframe viewer)
├── gh600-study-plan*.html               # Study plan pages (2 versions)
├── gh600-labs-captain-corgi.html        # Labs index
├── gh600-mock-exam*.html                # 5 themed mock exams
├── gh600-mock-exams-index.html          # Mock exam navigation
├── gh600-practice-exam-captain-corgi-*.html  # 7 practice exams
├── assets/
│   └── captain-corgi-hub-design/
│       └── colors_and_type.css          # Design tokens (50+ variables)
├── docs/
│   ├── enhanced-study-guide.md          # Comprehensive guide (1,607 LOC)
│   ├── practice-example-*.md             # 7 question sets (50 each)
│   ├── labs/
│   │   ├── lab-00-bootstrap.md          # Environment setup
│   │   ├── lab-01-sdlc-architecture.md   # Domain 1
│   │   ├── lab-02-tools-and-mcp.md      # Domain 2 (highest weight)
│   │   ├── lab-03-memory-and-state.md   # Domain 3
│   │   ├── lab-04-evaluation-and-tuning.md # Domain 4
│   │   ├── lab-05-multi-agent.md         # Domain 5
│   │   ├── lab-06-guardrails.md          # Domain 6
│   │   ├── lab-07-capstone.md            # Integration project
│   │   └── scaffold/                     # Go project reference
│   ├── project-overview-pdr.md           # Product requirements
│   ├── codebase-summary.md               # Architecture overview
│   ├── code-standards.md                 # Development conventions
│   ├── system-architecture.md           # Technical architecture
│   └── project-roadmap.md                # Development milestones
├── Makefile                              # `make run` for dev server
├── .nojekyll                             # Disables Jekyll on GitHub Pages
└── release-manifest.json                 # Release metadata
```

---

## Design System

### Captain Corgi Brand

**Visual Identity:**
- Warm clay palette sampled from mascot avatars
- Rounded aesthetic with soft shadows
- Playful but professional educational tone
- Three themes for different study contexts

**Brand Colors:**
```css
--corgi-orange: #FC8903   /* Primary brand */
--captain-red: #E13429     /* Accent */
--star-yellow: #FBC00A      /* Highlight */
--sky-cyan: #51BBD7        /* Info */
--hub-green: #3BB283       /* Success */
```

### Theme Modes

| Theme | Use Case | Characteristics |
|-------|----------|------------------|
| **Light** (default) | Daytime study | Warm clay-cream background |
| **Dark** | Evening study | Warm navy-cream, not slate |
| **Night** | Late-night | Amber-on-black, low blue-light |

---

## Development

### Tech Stack

- **HTML5** — Semantic markup, no framework
- **CSS3** — Custom properties, flexbox, grid
- **Zero JavaScript** — All interactions via HTML/CSS
- **GitHub Pages** — Static hosting
- **Python 3** — Local dev server only

### Code Conventions

**File naming:** `kebab-case.html` / `kebab-case.css`
**Class naming:** `kebab-case` with BEM-like prefixes (`idx-nav`, `exam-question`)
**CSS variables:** `--kebab-case` semantic tokens

See [`docs/code-standards.md`](docs/code-standards.md) for detailed conventions.

### Branch Strategy

```
main     ← Production (auto-deployed to GitHub Pages)
  ↑
develop  ← Integration branch
  ↑
feature/*  ← Feature branches (optional)
```

### Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add mock exam 5 with domain 6 questions
fix: correct answer key for practice exam 3
docs: update study guide module 2
style: adjust sidebar padding for mobile
```

---

## Contributing

Contributions welcome! Please:

1. Check existing issues for your topic
2. Fork the repository
3. Create a feature branch from `develop`
4. Make your changes following code standards
5. Test locally (`make run`)
6. Submit a pull request to `develop`

**What we need:**
- Additional practice questions (ensure no duplicates)
- Lab improvements or new exercises
- Bug fixes and accessibility improvements
- Documentation updates

**Content guidelines:**
- All questions must map to GH-600 exam domains
- Maintain domain weight distribution in question banks
- Include explanations and references for all questions
- Use friendly, educational tone

---

## Architecture

### Static-First Approach

**Why static HTML/CSS?**
- ✅ Simplicity — No build step, easy to maintain
- ✅ Performance — Instant load, no framework overhead
- ✅ Reliability — No runtime errors, works everywhere
- ✅ Accessibility — Semantic HTML, screen reader friendly

### Key Architectural Decisions

1. **Iframe-based navigation** — Simple page switching without JavaScript
2. **CSS custom properties** — Centralized design tokens for theming
3. **Zero dependencies** — No external libraries or frameworks
4. **Git-based content** — Version control for all materials

See [`docs/system-architecture.md`](docs/system-architecture.md) for detailed architecture.

---

## Performance

**Metrics:**
- Load time: < 3 seconds on 3G
- Lighthouse Performance: 95+
- Lighthouse Accessibility: 95+
- Zero dependencies: No CDN requests

**Optimization:**
- All CSS inlined or external token file
- No JavaScript framework overhead
- System font fallback (Google Fonts progressive enhancement)
- Minimal DOM size

---

## Browser Support

**Desktop:**
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

**Mobile:**
- iOS Safari: iOS 14+
- Android Chrome: Android 10+

**Accessibility:** WCAG 2.1 AA compliant (semantic HTML, keyboard navigation, focus indicators)

---

## Documentation

- **[Project Overview & PDR](docs/project-overview-pdr.md)** — Product requirements and success metrics
- **[Codebase Summary](docs/codebase-summary.md)** — File inventory and architecture patterns
- **[Code Standards](docs/code-standards.md)** — Development conventions and patterns
- **[System Architecture](docs/system-architecture.md)** — Technical architecture and deployment
- **[Project Roadmap](docs/project-roadmap.md)** — Milestones and future enhancements

---

## License

[MIT License](LICENSE) — Free for educational and commercial use.

---

## Acknowledgments

- **GitHub** — For the GH-600 certification program
- **Captain Corgi** — Our friendly mascot and brand ambassador
- **Open source community** — For tools and inspiration

---

**Maintainer:** Anh Le ([@captain-corgi](https://github.com/captain-corgi))
**Repository:** [github.com/captain-corgi/learn-gh-600](https://github.com/captain-corgi/learn-gh-600)
**Live Site:** [captain-corgi.github.io/learn-gh-600](https://captain-corgi.github.io/learn-gh-600/)

---

**Status:** ✅ Production Ready — Comprehensive GH-600 exam preparation platform fully functional.

*Last updated: 2026-05-30*
