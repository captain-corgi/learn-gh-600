# Project Overview & Product Development Requirements

## Project Identity

**Name:** Captain Corgi Hub (learn-gh-600)
**Purpose:** Educational platform for GitHub GH-600 exam certification
**Tagline:** "Developing in Agentic AI Systems" — Your path to certification
**Maintainer:** Anh Le (@captain-corgi)
**Repository:** https://github.com/captain-corgi/learn-gh-600

## Mission Statement

Provide a comprehensive, accessible, and engaging learning platform for developers preparing for the GitHub GH-600 certification exam in agentic AI systems development. The platform combines structured study plans, hands-on labs, and extensive practice materials in a friendly, mascot-branded environment.

## Product Vision

A static, GitHub Pages-hosted educational website that:

1. **Structures Learning** — Domain-weighted curriculum aligned with GH-600 exam objectives
2. **Enables Practice** — Timed mock exams and practice question sets
3. **Builds Skills** — Hands-on labs with scaffolded real-world projects
4. **Reduces Anxiety** — Friendly Captain Corgi branding, warm design, clear progress tracking

## Target Audience

**Primary:** Developers seeking GH-600 certification
- Familiar with basic AI/ML concepts
- Experience with GitHub and CI/CD workflows
- Want structured exam preparation

**Secondary:** Engineering teams upskilling in agentic AI
- Need internal training resources
- Reference implementation patterns
- Evaluation frameworks for AI agents

## GH-600 Exam Domains

The platform covers all 6 GH-600 domains with weighted emphasis:

| Domain | Weight | Platform Focus |
|--------|--------|----------------|
| **1. Agent Architecture & SDLC** | 15-20% | Labs 1, 7; Study Plan Module 1 |
| **2. Tool Use & Environment** | 20-25% | Labs 2; Study Plan Module 2 (Highest Priority) |
| **3. Memory & State** | 10-15% | Labs 3; Study Plan Module 3 |
| **4. Evaluation & Tuning** | 15-20% | Labs 4; Study Plan Module 4 |
| **5. Multi-Agent Coordination** | 15-20% | Labs 5; Study Plan Module 5 |
| **6. Guardrails & Accountability** | 10-15% | Labs 6; Study Plan Module 6 |

## Functional Requirements

### Core Features

#### 1. Study Plan Delivery
- **Domain-structured curriculum** — 6 modules aligned with exam weights
- **Themed presentation** — Default and Captain Corgi branded versions
- **Progress tracking** — Visual indicators for completed modules
- **Resource linking** — Connects study content to labs and practice exams

**Acceptance Criteria:**
- Each module covers 2-3 key learning objectives
- Module 2 (Tool Use) has most comprehensive content
- All sections link to relevant labs and practice questions

#### 2. Hands-on Labs
- **8 progressive labs** — From bootstrap to capstone project
- **Scaffolded Go project** — Working agent implementation
- **Docker + CI/CD** — Containerization and GitHub Actions workflows
- **Agent configuration** — Memory, tools, evaluation patterns

**Acceptance Criteria:**
- Labs increase in complexity (beginner → advanced)
- Lab 7 (capstone) integrates all previous concepts
- Scaffold includes working code for reference
- Labs map directly to exam domains

#### 3. Mock Exam System
- **5 themed mock exams** — Captain Corgi branded, 50 questions each
- **Timed practice** — Simulates real exam conditions
- **Immediate feedback** — Answer explanations with references
- **Multiple practice sets** — 7 additional practice exams

**Acceptance Criteria:**
- Question distribution matches exam domain weights
- Questions are unique across all exams (no duplicates)
- All questions include explanations and domain tags
- Mock exams accessible via dedicated index page

#### 4. Navigation & UX
- **Sidebar navigation** — Collapsible, persistent across pages
- **Iframe content viewer** — Seamless page transitions without reload
- **Theme switching** — Light, dark, and night modes
- **Responsive design** — Mobile, tablet, desktop layouts

**Acceptance Criteria:**
- All pages accessible via sidebar
- Theme preference persists during session
- Mobile layout is functional (no horizontal scroll)
- Keyboard navigation works for all interactive elements

### Non-Functional Requirements

#### Performance
- **Load time** — Initial page load < 3 seconds on 3G
- **Static delivery** — No server-side processing
- **Cache efficiency** — Browser cacheable for offline study

#### Accessibility
- **WCAG 2.1 AA** — Color contrast, keyboard navigation, screen reader support
- **Semantic HTML** — Proper heading hierarchy, ARIA labels
- **Focus indicators** — Clear visual feedback for keyboard users

#### Maintainability
- **Single-purpose files** — Each HTML file is self-contained
- **Shared design tokens** — CSS custom properties for consistency
- **Clear naming** — kebab-case files, descriptive class names
- **Inline documentation** — Comments explain complex patterns

#### Security
- **No user data collection** — Zero tracking, analytics, or cookies
- **No authentication** — Public access, no login required
- **Static only** — No server-side code execution
- **GitHub Pages security** — Relies on platform security model

## Technical Stack

### Frontend
- **HTML5** — Semantic markup, no framework
- **CSS3** — Custom properties, flexbox, grid, transitions
- **Zero JavaScript** — All interactions work via HTML/CSS only

### Design System
- **Captain Corgi Hub** — Custom design system with clay mascot branding
- **Google Fonts** — Bricolage Grotesque (display), Nunito (body), JetBrains Mono (code)
- **CSS Tokens** — 50+ custom properties for colors, spacing, typography, shadows

### Infrastructure
- **GitHub Pages** — Static hosting from `main` branch
- **Git Workflow** — `develop` → `main` merge for deployment
- **No build process** — Direct file serving (`.nojekyll` disables Jekyll)

### Development
- **Python 3** — `python3 -m http.server 8080` for local dev
- **Makefile** — `make run` command for convenience
- **Git** — Version control and release management

## Design Philosophy

### Brand Identity

**Captain Corgi** — Friendly, approachable mascot brand
- **Warm clay palette** — Orange, red, yellow, cyan, green sampled from mascot
- **Rounded aesthetic** — Soft radii, friendly typography, organic shapes
- **Playful but professional** — Educational content presented engagingly

### Design Principles

1. **Learnability First** — Content organization over clever interactions
2. **Reduce Cognitive Load** — Clear hierarchy, generous whitespace, consistent patterns
3. **Warm Over Cold** — Clay-cream backgrounds, warm neutrals, inviting atmosphere
4. **Progressive Disclosure** — Simple to complex, basics to advanced

### Theme System

Three themes for different study contexts:

| Theme | Use Case | Characteristics |
|-------|----------|------------------|
| **Light (default)** | Daytime study, bright environments | Warm clay-cream background, high contrast |
| **Dark** | Evening study, reduced eye strain | Warm navy-cream, not slate/black |
| **Night** | Late-night, low-blue-light | Amber-on-black, f.lux-style warmth |

## Success Metrics

### Educational Impact
- **Completion rate** — Users finish all 6 study modules
- **Practice engagement** — Average 3+ practice exams attempted
- **Lab completion** — Users complete 5+ labs (out of 8)

### Platform Quality
- **Load performance** — < 3 seconds initial load on 3G
- **Accessibility** — WCAG 2.1 AA compliance
- **Mobile usability** — Functional on smartphones (no horizontal scroll)

### Community
- **GitHub stars** — Community validation of usefulness
- **Contributions** — PRs with additional questions, lab improvements
- **Certification success** — User reports of passing GH-600

## Release Strategy

### Version 2.0 (Current)
- ✅ Complete study plan (6 modules)
- ✅ 8 hands-on labs with scaffold
- ✅ 5 mock exams + 7 practice exams
- ✅ Captain Corgi theming
- ✅ Responsive design
- ✅ GitHub Pages deployment

### Future Enhancements (Unplanned)
- [ ] Search functionality (static site search)
- [ ] Progress persistence (localStorage)
- [ ] Interactive quiz modes (JS validation)
- [ ] Print/PDF export styles
- [ ] Additional language translations
- [ ] Community-contributed questions

## Constraints & Assumptions

### Constraints
- **Static-only** — No backend, database, or server-side processing
- **GitHub Pages** — Deployment platform (limits on custom server config)
- **Manual updates** — Content changes require git commits
- **No user tracking** — Privacy-first, no analytics or cookies

### Assumptions
- Users have modern browsers (Chrome, Firefox, Safari, Edge)
- Users have basic GitHub familiarity
- Users are studying independently (no instructor-led courses)
- GH-600 exam structure remains stable during platform lifecycle

## Risk Management

### Content Accuracy Risk
**Risk:** Exam content changes, making materials outdated
**Mitigation:**
- Modular structure allows easy content updates
- Community contributions via GitHub PRs
- Regular review against latest GH-600 blueprint

### Platform Maintenance Risk
**Risk:** Abandonment, broken links, outdated dependencies
**Mitigation:**
- Zero-dependency stack (no external libs to break)
- Static files are durable
- Open source allows community forks

### Accessibility Risk
**Risk:** WCAG compliance gaps for users with disabilities
**Mitigation:**
- Semantic HTML foundation
- ARIA labels for interactive elements
- Keyboard navigation for all features
- Regular accessibility audits

## Related Documentation

- **[Codebase Summary](./codebase-summary.md)** — Detailed file inventory and architecture
- **[Code Standards](./code-standards.md)** — HTML/CSS conventions and patterns
- **[System Architecture](./system-architecture.md)** — Static site architecture and deployment
- **[Project Roadmap](./project-roadmap.md)** — Development milestones and future plans

---

**Document Version:** 1.0
**Last Updated:** 2026-05-30
**Owner:** Anh Le (@captain-corgi)
