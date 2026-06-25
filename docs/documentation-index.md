# Documentation Index

**Last Updated:** 2026-05-30
**Project:** Captain Corgi Hub (learn-gh-600)
**Documentation Status:** ✅ Complete

---

## Core Documentation

### Project Overview & Requirements
**[project-overview-pdr.md](./project-overview-pdr.md)** (256 LOC)
- Mission statement and product vision
- GH-600 exam domain coverage (all 6 domains)
- Functional and non-functional requirements
- Technical stack and design philosophy
- Success metrics and release strategy

**Best for:** Understanding project scope, requirements, and success criteria

---

### Codebase Structure
**[codebase-summary.md](./codebase-summary.md)** (209 LOC)
- Repository metrics (22 files, 392K tokens)
- File inventory (HTML pages, documentation, configuration)
- Architecture patterns (layout, design tokens, content flow)
- Technical decisions and constraints
- Maintenance notes and future enhancements

**Best for:** Quick understanding of codebase structure and architecture

---

### Development Standards
**[code-standards.md](./code-standards.md)** (572 LOC)
- File naming conventions (kebab-case)
- HTML structure and semantic patterns
- CSS conventions (class naming, custom properties)
- Content guidelines (text, code examples, links)
- Accessibility standards (WCAG 2.1 AA)
- Performance standards and browser compatibility
- Git workflow and commit conventions
- Quality checklists

**Best for:** Developers contributing code or content

---

### System Architecture
**[system-architecture.md](./system-architecture.md)** (577 LOC)
- Static-first architecture overview
- Component architecture (page structure, navigation)
- Theme system (three-tier token architecture)
- Design system architecture (token hierarchy)
- Content architecture (educational flow)
- Deployment architecture (GitHub Pages workflow)
- Security and scalability considerations
- Technology decisions and rationale

**Best for:** Understanding technical architecture and deployment

---

### Development Roadmap
**[project-roadmap.md](./project-roadmap.md)** (458 LOC)
- Completed milestones (Phases 1-5)
- Current platform capabilities and metrics
- Future enhancements (unplanned features)
- Technical debt and maintenance priorities
- Release strategy and versioning
- Success criteria and metrics
- Timeline projections

**Best for:** Understanding project progress and future plans

---

## Educational Content

### Study Materials
**[enhanced-study-guide.md](./enhanced-study-guide.md)** (1,607 LOC)
- Comprehensive GH-600 study guide
- All 6 exam domains covered
- Domain-weighted content (Domain 2 highest priority)
- Detailed explanations and examples

**Best for:** Exam preparation and comprehensive learning

---

### Practice Exams
**[practice-example-1.md](./practice-example-1.md)** through **[practice-example-7.md](./practice-example-7.md)** (~370 LOC each)
- 7 practice exam sets
- 50 questions per set (350 total questions)
- Answer keys with explanations
- Domain-tagged questions

**Best for:** Reinforcing learning and exam practice

---

### Hands-on Labs
**[labs/README.md](./labs/README.md)** (74 LOC)
- Lab overview and sequence
- Learning objectives
- Prerequisites and setup

**Lab Files:**
- **[lab-00-bootstrap.md](./labs/lab-00-bootstrap.md)** (135 LOC) — Environment setup
- **[lab-01-sdlc-architecture.md](./labs/lab-01-sdlc-architecture.md)** (137 LOC) — Domain 1: Agent Architecture & SDLC
- **[lab-02-tools-and-mcp.md](./labs/lab-02-tools-and-mcp.md)** (131 LOC) — Domain 2: Tool Use & Environment ⭐
- **[lab-03-memory-and-state.md](./labs/lab-03-memory-and-state.md)** (115 LOC) — Domain 3: Memory & State
- **[lab-04-evaluation-and-tuning.md](./labs/lab-04-evaluation-and-tuning.md)** (113 LOC) — Domain 4: Evaluation & Tuning
- **[lab-05-multi-agent.md](./labs/lab-05-multi-agent.md)** (142 LOC) — Domain 5: Multi-Agent Coordination
- **[lab-06-guardrails.md](./labs/lab-06-guardrails.md)** — Domain 6: Guardrails & Accountability
- **[lab-07-capstone.md](./labs/lab-07-capstone.md)** — Integration project

**Best for:** Practical, hands-on agent development experience

**Scaffold:** [`labs/scaffold/`](./labs/scaffold/) — Go project reference implementation

---

## Project README

**[README.md](../README.md)** (288 LOC)
- Quick start guide
- What's inside (study materials, exam domains)
- Design system overview
- Development guidelines
- Contributing guidelines
- Performance metrics
- Browser support

**Best for:** New contributors and users

---

## Documentation Structure

```
docs/
├── documentation-index.md         (This file - navigation)
├── project-overview-pdr.md       (Product requirements)
├── codebase-summary.md           (Architecture overview)
├── code-standards.md             (Development conventions)
├── system-architecture.md        (Technical architecture)
├── project-roadmap.md            (Development milestones)
├── enhanced-study-guide.md       (Comprehensive study guide)
├── practice-example-{1..7}.md     (Practice exam sets)
└── labs/
    ├── README.md                 (Lab overview)
    ├── lab-00-bootstrap.md       (Environment setup)
    ├── lab-01-sdlc-architecture.md    (Domain 1)
    ├── lab-02-tools-and-mcp.md        (Domain 2 - highest)
    ├── lab-03-memory-and-state.md     (Domain 3)
    ├── lab-04-evaluation-and-tuning.md (Domain 4)
    ├── lab-05-multi-agent.md          (Domain 5)
    ├── lab-06-guardrails.md           (Domain 6)
    ├── lab-07-capstone.md            (Integration)
    └── scaffold/                 (Go project reference)
```

---

## Documentation Metrics

| Category | Files | Total LOC | Avg LOC |
|----------|-------|-----------|---------|
| Core Documentation | 5 | 2,072 | 414 |
| Educational Content | 8 | 5,000+ | 625 |
| **Total** | **13** | **7,072+** | **544** |

**All files under maxLoc (800 LOC):** ✅

---

## Quick Reference

### For New Contributors
1. Start with [README.md](../README.md) — Project overview and quick start
2. Read [code-standards.md](./code-standards.md) — Development conventions
3. Review [system-architecture.md](./system-architecture.md) — Technical understanding

### For Content Contributors
1. Read [project-overview-pdr.md](./project-overview-pdr.md) — Requirements and success metrics
2. Review [enhanced-study-guide.md](./enhanced-study-guide.md) — Content style and structure
3. Check [project-roadmap.md](./project-roadmap.md) — Planned enhancements

### For Learners
1. Start with [README.md](../README.md) — Quick start guide
2. Follow [labs/README.md](./labs/README.md) — Lab sequence
3. Use [enhanced-study-guide.md](./enhanced-study-guide.md) — Comprehensive reference
4. Practice with [practice-example-*.md](./practice-example-1.md) — Exam practice

### For Maintainers
1. Review [codebase-summary.md](./codebase-summary.md) — Structure overview
2. Check [project-roadmap.md](./project-roadmap.md) — Milestones and debt
3. Monitor [project-overview-pdr.md](./project-overview-pdr.md) — Success metrics

---

## Maintenance Notes

### Documentation Updates

**When to update:**
- Code changes → Update [codebase-summary.md](./codebase-summary.md)
- New features → Update [project-roadmap.md](./project-roadmap.md)
- Architecture changes → Update [system-architecture.md](./system-architecture.md)
- Standard changes → Update [code-standards.md](./code-standards.md)
- Requirements changes → Update [project-overview-pdr.md](./project-overview-pdr.md)

### File Size Management

**Current status:** All files under 800 LOC ✅

**If files exceed limit:**
- Split into topic directories (e.g., `architecture/`, `standards/`)
- Create modular structure with index files
- Move detailed examples to reference files

### Documentation Accuracy

**Verification protocol:**
1. Cross-reference code examples with actual implementation
2. Verify file paths and function names
3. Check API endpoints against route files
4. Validate configuration keys against `.env.example`

---

## Contributing to Documentation

### Style Guidelines
- Use clear, descriptive headings
- Include code examples with syntax highlighting
- Add diagrams for complex flows (use Mermaid or ASCII)
- Cross-reference related documentation
- Keep sections concise and focused

### Content Guidelines
- Verify technical accuracy before documenting
- Include practical examples
- Provide context and rationale
- Link to related resources
- Update as codebase evolves

### Review Process
1. Create documentation PR
2. Verify all code examples compile/run
3. Check all links are valid
4. Ensure consistency with other docs
5. Update related documentation if needed

---

**Document Version:** 1.0
**Last Updated:** 2026-05-30
**Owner:** Anh Le (@captain-corgi)
