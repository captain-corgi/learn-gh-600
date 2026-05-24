# Lumen Design System

**Lumen** is an original warm-editorial design system for an AI chat product. It is built in the spirit of paper-toned, serif-driven conversational AI interfaces (off-white backgrounds, clay/terracotta accent, soft radii, generous whitespace), but it is **not** a clone of any existing product — no third-party logos, wordmarks, or proprietary visuals are reproduced.

> **Source context:** This system was built from a written brief only — no codebase, Figma, or brand assets were attached. Direction was set by the user (warm editorial, serif display + sans body, clay accent, spacious, soft 8–12px radii, full light/dark/auto, original mascot).

---

## Brand at a glance

| | |
|---|---|
| Name | **Lumen** |
| Product | AI chat assistant (single core product) |
| Tagline | *A thoughtful companion, on paper.* |
| Voice | Warm, literate, plain-spoken. Calm confidence. |
| Accent | Clay / terracotta `#c96442` (light), `#d97757` (dark) |
| Paper | `#faf7f2` (light app bg), `#1b1814` (dark app bg) |
| Display | Source Serif 4 (serif) |
| Body | Inter (sans) |
| Mono | JetBrains Mono |
| Mascot | "Lumi" — a monoline lantern glyph |

---

## Content fundamentals

Writing for Lumen should feel like a letter from a thoughtful friend who knows their material — unhurried, concrete, and considerate of the reader's time.

**Voice**
- **Warm, not cute.** Say things plainly; avoid marketing shine.
- **Second person.** Address the reader as *you*. The assistant refers to itself as *I* sparingly.
- **Confident without hedging.** Prefer "Here's what I found" over "I think maybe you could try…"
- **Literate, not stiff.** Full sentences, em-dashes, the occasional semicolon. Contractions are fine.

**Casing**
- **Sentence case for everything:** headings, buttons, menu items, section labels. *"New chat"*, not *"New Chat"*. Only proper nouns and the product name are capitalized.

**Punctuation & typography**
- Use curly quotes ("…") and apostrophes (it's), em-dashes for asides (—), and an Oxford comma.
- One space after a period. Avoid exclamation points except in error recovery ("Welcome back!").

**Emoji**
- **No emoji in product UI.** Icons and serif punctuation carry the warmth. Emoji are acceptable only in user-generated content.

**Example copy**

| Surface | ✓ Use | ✗ Avoid |
|---|---|---|
| Empty state | *What's on your mind today?* | *Welcome! 👋 Let's get started!!* |
| Composer placeholder | *Ask Lumen anything* | *Type your prompt here...* |
| Error | *Something went sideways. We've logged it — try again in a moment.* | *Oops! Error 500.* |
| Settings group | *How Lumen sounds* | *AI Response Configuration* |
| Success toast | *Saved.* | *Successfully updated! ✅* |
| Destructive confirm | *Delete this conversation? You can't undo this.* | *Are you sure??* |

---

## Visual foundations

**Color vibe** — Warm neutrals on warm neutrals. The background is off-white paper (`--paper-50`, `#faf7f2`), not pure white. Text is warm near-black (`#24201a`), never true black. The single accent is clay-terracotta — used sparingly for primary actions, links, the cursor, and selection highlight.

**Backgrounds** — Flat paper color. No gradients, no images, no textures in chrome. Full-bleed imagery appears only in user-inserted content (attachments, canvas previews). Dark mode swaps to a warm charcoal (`#1b1814`) with cream text (`#f0eadf`) — also no pure black.

**Type**
- Serif (Source Serif 4) for display, H1, H2, and long-form assistant prose where the editorial feel matters most.
- Sans (Inter) for H3+, UI labels, body, and composer input.
- Mono (JetBrains Mono) for code only.
- Headlines are weight 400 (regular) — the serif is already confident; bold feels shouty.

**Spacing** — 4px base scale (`--space-1` through `--space-20`). Default gutter between composed elements is **16px**; between sections, **32–48px**. Chat messages get **48px** vertical breathing room between turns.

**Corner radii** — Soft, friendly, never pills on cards. Inputs `10px`, buttons `10px`, cards `14px`, modals `20px`, message bubbles `20–24px`, avatars + tag pills only `999px`.

**Borders** — 1px hairlines at `--border` (a warm paper-200). Strong borders are reserved for focus, active selection, and hover affordance on clickable rows. No double borders, no heavy dividers.

**Shadows** — Warm, low, single-layer. `--shadow-sm` for cards, `--shadow-md` for menus, `--shadow-lg` for modals. Shadow hue is the same warm near-black as text, not blue-black. Dark mode shadows are much stronger (near-opaque) because ambient light is lower.

**Animation**
- `--dur-fast: 120ms` for hover state changes.
- `--dur-base: 180ms` for menus, modal appearance, most UI transitions.
- `--dur-slow: 260ms` for larger layout shifts (sidebar collapse, panel reveal).
- Easing: `--ease-out` (`cubic-bezier(0.22, 1, 0.36, 1)`) for entrances; `--ease-in-out` for reversible state.
- **Fades over slides.** Bouncy or spring motion is avoided — the brand is calm.

**Hover states** — Surfaces use a soft background tint (shift to `--surface-2` or `accent-bg-soft`). Text-only links transition from `--accent` to `--accent-hover` (darker clay). Never use pure underline-on-hover for buttons.

**Press states** — Buttons darken (`--accent-press`) and scale to `0.98` for `80ms`. No large bounces.

**Focus** — Single 3px ring at `rgba(201, 100, 66, 0.28)` (or 0.35 in dark). Always visible on keyboard nav; never removed.

**Transparency & blur** — Used sparingly. The composer attachment menu uses a `backdrop-filter: blur(12px)` over a `rgba(paper, 0.7)` surface. Modal scrims are `rgba(20, 18, 16, 0.4)` with no blur.

**Cards** — Surface `--surface` (white in light, warm charcoal in dark), 1px `--border`, `--radius-lg` (14px), `--shadow-sm`. No colored left-accent stripe. No gradient fills.

**Imagery mood** — If photography is ever used, it should feel natural, warm, slightly grainy, printed — never corporate stock. B&W or warm-toned is preferred. For this initial system, no photography is shipped.

**Layout rules** — The sidebar is a fixed 280px in the chat app, collapsible to 64px. The composer is always sticky at the bottom of the thread, max-width 760px, centered. Assistant prose is max-width `68ch` for readability.

## Data visualization

Lumen supports business intelligence and data-analysis conversations. When the assistant is reasoning over data, it replies with a small, consistent vocabulary of rich components — all rooted in the same paper aesthetic, tabular-nums for every number, serif for titles, sans for axes.

**Vocabulary**
- **KPI tiles** — big number (serif), label (caps), delta (semantic green/red), inline sparkline
- **Chart cards** — line, bar, area, donut. Same title / subtitle / legend / foot scaffold
- **Data tables** — right-aligned numerics, optional inline bar cells, sortable header
- **Sparklines** — inline, 60–120px wide, adopt current accent
- **Insights** — tinted callouts for "what I noticed" (trend / anomaly / summary)
- **Pull quotes** — surfaced rows or customer quotes in serif italic
- **Query blocks** — SQL/dsl with copy + run-again + row-count footer
- **Source chips** — "From sales_fact · 142,031 rows"

**Palette** — six categorical hues (clay-first), a sequential ramp for heatmaps, and a diverging ramp for pos/neg. All live on `colors_and_type.css` as `--chart-1…6`, `--seq-0…5`, `--div-neg/neu/pos`. Dark mode has its own set that reads cleanly on charcoal.

**Rules**
- Clay (`--chart-1`) is the default when a single series is shown. Add colors in the categorical order only when series count grows.
- Never more than 6 categorical hues in one chart. Group the tail as "Other".
- Numbers use `font-variant-numeric: tabular-nums`. Thousand separators. Percent to one decimal.
- Deltas show a 1-2 decimal number and a direction icon. Green `--delta-up`, red `--delta-down`. Never the reverse (no "up is bad").
- Source chip goes above the first KPI/chart; query block goes at the end as provenance.

The BI conversation "Q3 revenue breakdown" in the chat kit demonstrates the full vocabulary in a single reply.

Lumen uses **Lucide** (`lucide@latest`, loaded from CDN) for the entire UI icon set. Lucide's 1.5px stroke, slightly rounded joins, and open metaphors match the warm-editorial character without feeling sterile.

- **Loading:** via CDN — `<script src="https://unpkg.com/lucide@latest"></script>` then `lucide.createIcons()`.
- **Default size:** 20px at body text, 16px inline with `var(--fs-small)`, 24px in headers.
- **Stroke weight:** 1.75 (slightly heavier than Lucide default 2, reads calmer at small sizes). Set via CSS: `.icon { stroke-width: 1.75; }`.
- **Color:** inherits `currentColor`. Muted icons use `--fg-3`, interactive `--fg-1`, accent icons `--accent`.
- **Fill:** outline only. No duotone, no filled variants except for toggle-selected state.

**Emoji** — Not used in chrome. See Content Fundamentals.

**Custom SVGs in `assets/`**
- `mark.svg` — Lumen lantern mark only (40×40 viewBox, monoline, uses `currentColor`).
- `wordmark.svg` — mark + "Lumen" in Source Serif 4 (220×48).
- `mascot.svg` — "Lumi" full mascot illustration with rays and face (64×64, monoline).

All three use `currentColor` so they adopt the surrounding foreground color in both light and dark mode.

---

## Index

| Path | Purpose |
|---|---|
| `README.md` | This file — brand, content, visual foundations |
| `SKILL.md` | Agent-Skills-compatible entry point |
| `colors_and_type.css` | All CSS custom properties (tokens) + semantic type rules. Light + dark + auto. |
| `assets/mark.svg` | Lantern mark |
| `assets/wordmark.svg` | Mark + "Lumen" wordmark |
| `assets/mascot.svg` | "Lumi" mascot illustration |
| `assets/fonts.css` | Font-face imports (Google Fonts substitutes) |
| `preview/*.html` | Small specimen cards for the Design System tab |
| `ui_kits/chat/` | Chat app UI kit — components + interactive `index.html` |

### Typography — final choice

The system ships with three Google Fonts, chosen deliberately as the best free stand-ins for a warm-editorial AI chat aesthetic:

- **Source Serif 4** (display, H1, H2, assistant prose) — Adobe's open serif, with true optical sizes (8–60). Carries the same literary warmth as Tiempos or Lyon; confident at large sizes, readable at body. Weight 400 is the default — the serif's own contrast provides the presence, so we don't lean on bold.
- **Inter** (H3+, UI labels, body, composer) — the most capable free humanist sans for interfaces. Clean, neutral, and has the cap-height and x-height rhythm that pairs cleanly with Source Serif 4.
- **JetBrains Mono** (code only) — ligatures on, 400/500 weights. Readable at the small sizes used in inline and block code, without the chunky feel of cousins like Fira Code.

All three are imported at the top of `colors_and_type.css`. No local font files needed.
