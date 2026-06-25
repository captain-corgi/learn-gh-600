---
name: corgi-mate-design
description: Generates well-branded interfaces and assets for Corgi Mate, a clay-style corgi family assistant mascot. Warm, nurturing, organized household tone with pink, sage, teal, and soft-blue palette. Use for family app UI, household planner sites, chore calendars, onboarding slides, social cards, or throwaway prototypes when the user mentions Corgi Mate, family assistant, household, chores, or meal planning.
user-invocable: true
---

# Corgi Mate — Design Skill

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts *or* production code, depending on the need.

## The shortest version of the brand

- **Mascot**: a clay corgi family helper — pink beanie with heart patch, sage scarf, teal coat, heart badge.
- **Voice**: helper at home. Warm second-person ("let's get dinner sorted"), calm, organized, never patronizing.
- **Material**: matte clay everything — soft rounded corners, warm pink-tinted shadows, no gradients in chrome.
- **Color**: Mate Orange `#E8952E`, Beanie Pink `#E8568A`, Heart Tan `#D4A574`, Coat Teal `#4A8B8B`, Sage Green `#9CB898`, Blush Pink `#F2A8BC`, Soft Blue `#5B8FB9`, Warm Cream `#F6F2EA`, Ink `#2A2E33`.
- **Type**: Bricolage Grotesque (display), Nunito (body), JetBrains Mono (code).
- **Tokens**: `colors_and_type.css` — drop it in and use the CSS vars.
- **Don't**: emoji-spam, neon gradients, glass morphism, generic stock photography, Inter / Roboto.

## File map

| File | What it is |
| --- | --- |
| `README.md` | Full brand book — voice, foundations, color, type, motion, iconography, components. **Start here.** |
| `colors_and_type.css` | All design tokens as CSS variables. Import into any HTML you make. |
| `assets/corgi-mate-avatar.png` | Primary mascot photo. |
| `assets/corgi-mate/` | Pose library (original + 20 activity poses). |
| `assets/icons/heart.svg` | The brand heart — clay-style, with shadow + highlights. |
| `assets/icons/logo-wordmark.svg` | Wordmark with heart + "Corgi Mate". |
| `assets/icons/home.svg` | Secondary brand mark — clay home. |
| `preview/*.html` | Reference cards: color swatches, type specimens, components. |
| `ui_kits/app/` | Family-assistant app UI (tasks, quick actions, today view). React components. |
| `ui_kits/planner/` | Household planner site (calendar, chore rotation, meal plan). React components. |
| `slides/` | 1280×720 slide templates: title, code, comparison, big-quote, end-card, lower-third. |

## How to use these for new work

- **For a slide deck**: start from `slides/TitleSlide.html` and adapt — already wired up with tokens, fonts, mascot.
- **For a new web page**: copy `colors_and_type.css` into your project, set `<body class="cm-body">`, and use the semantic classes (`.h1`, `.lead`, `.code`) or compose your own with the CSS vars.
- **For an onboarding card**: a 1280×720 frame, big Bricolage display title (≥ 64 px), Heart Tan accent pill, Soft Blue or Sage Green background, the mascot bottom-left or top-right.
- **For social cards**: 1200×630 — same rules as slides but tighter.

## Mascot rules

- Always full-colour, never silhouetted, never tinted.
- Minimum 32 px square. Below that, use the heart alone.
- Pick poses from `assets/corgi-mate/` that match the activity (groceries, calendar, laundry, etc.).
- Safe backgrounds: Warm Cream, Soft Blue, Sage Green, Blush Pink, Ink. Avoid pure white and Heart Tan fills (heart patch disappears).

## When in doubt

- Use existing tokens. Don't invent new colors.
- Pick Lucide icons (1.75 px stroke, rounded caps) — they match the clay line weight.
- Soft, slightly-overshoot easing on entrances (`cubic-bezier(0.34, 1.56, 0.64, 1)`).
- Sentence case everywhere. One exclamation mark per page, max.
- If you can't find an asset, ask rather than drawing a placeholder SVG yourself.
