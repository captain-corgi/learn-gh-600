# Corgi Mate — Design System

A warm, clay-textured visual identity for **Corgi Mate**, a family assistant mascot that helps households stay organized — chores, calendars, meal plans, and daily routines. The mascot — a clay-sculpted corgi in a pink beanie, sage scarf, and teal coat — anchors everything: friendly, hand-crafted, nurturing, and calmly capable.

This design system lives at the intersection of *helpful home organizer* and *children's-stop-motion warm*. Think a tiny clay helper who remembers what's for dinner and when pickup is.

---

## At a Glance

- **Mascot**: Corgi Mate — pink beanie + heart patch, sage scarf, teal coat, heart badge.
- **Material language**: Soft clay, matte finishes, gentle highlights, finger-pressed contours. *Never glassy, never neon, never gradient-y in the "AI startup" sense.*
- **Color**: Warm and domestic — Mate Orange, Beanie Pink, Heart Tan against Soft Blue and Sage Green.
- **Tone**: Helper at home. "Let's get the week sorted." Calm, reassuring, organized.
- **Typography**: Bricolage Grotesque (display), Nunito (body), JetBrains Mono (code).

---

## Index — what's in this folder

```
README.md                  ← you are here
SKILL.md                   ← Agent Skills entry-point
colors_and_type.css        ← all CSS variables (color + type, base + semantic)
assets/                    ← logos, mascot avatars, icons, pose library
preview/                   ← small HTML cards that populate the Design System tab
ui_kits/
  app/                     ← family-assistant app UI (tasks, quick actions, today view)
  planner/                 ← household planner site (calendar, chore rotation, meal plan)
slides/                    ← onboarding / title-card slide templates
```

---

## Content Fundamentals

### Voice — "Helper at home"

Corgi Mate speaks **with** the household, never down to them. She's organized, warm, and practical — a friend who keeps track so you don't have to.

- **Second-person warm default.** "Let's get dinner sorted." "Your week looks busy — here's a plan."
- First-person plural is fine for shared tasks: "We'll tackle laundry after breakfast."
- Avoid "I" except in gentle asides ("I noticed the bins are due tomorrow").
- Reassuring, never patronizing. Organized friend, not a nanny.

### Tone

- **Calm, nurturing, slightly stop-motion.** Domestic topics with patience and clarity.
- **Plain over jargon.** Say "school pickup" not "calendar event retrieval."
- **Optimistic about busy days.** "This looks like a lot, but it's three small steps."
- Never snarky about other tools or family members. Corgi Mate is *generous*.

### Casing

- **Sentence case for titles, headings, and buttons.** "Weekly meal plan", not "Weekly Meal Plan".
- Code identifiers in `mono` when referencing app keys or env vars.

### Punctuation

- Em-dashes (—) are fine and encouraged.
- Oxford commas, yes.
- One exclamation mark per page, max.

### Emoji & symbols

- **Not in UI chrome.** No emoji in buttons, nav, headings.
- **OK in social contexts** sparingly — a heart in a tip card, a home icon in an intro.
- Prefer the **clay heart** (a mascot motif) over a generic emoji heart wherever a heart is needed in UI.

---

## Visual Foundations

### Material — *the clay rule*

Everything on screen wants to look like it could have been pressed out of polymer clay:

- **Matte surfaces.** No gloss, no glass.
- **Soft corner radii** — 12, 16, 20, 28 px.
- **Subtle, warm shadows.** Pink-tinted at elevation, never grey.
- **No gradients in UI chrome.** Optional soft radial glow behind mascot in hero shots only.

### Color

Sampled from the Corgi Mate mascot. Full tokens in `colors_and_type.css`:

| Token | Hex | Use |
| --- | --- | --- |
| Mate Orange | `#E8952E` | Primary accent — fur, CTAs |
| Beanie Pink | `#E8568A` | Hat colour — badges, alerts |
| Heart Tan | `#D4A574` | Beanie heart patch — highlights, focus ring |
| Coat Teal | `#4A8B8B` | Coat — links, info |
| Sage Green | `#9CB898` | Scarf — success, done states |
| Blush Pink | `#F2A8BC` | Heart badge — soft accent surfaces |
| Soft Blue | `#5B8FB9` | Mascot background — hero surfaces |
| Warm Cream | `#F6F2EA` | Default light surface |
| Ink | `#2A2E33` | Body text on light |

### Typography

- **Display — Bricolage Grotesque** for h1–h3 and big numbers.
- **Body — Nunito** for paragraphs and UI labels.
- **Mono — JetBrains Mono** for timestamps, reminders, config keys.

### Themes — Light, Dark, Deep Night

Three themes share semantic variable names (`--bg`, `--fg`, `--accent`, etc.).

- **Light** *(default)* — Warm Cream + Ink.
- **Dark** — Warm near-black with cream text; pink shadows become pure black.
- **Deep Night** — Amber-on-near-black for late-night planning; heart-tan accents.

**How to switch:**
- Set `data-theme="light"`, `data-theme="dark"`, or `data-theme="night"` on `<html>`.
- Persist in `localStorage` under `cm-theme`.
- Drop-in toggle at `assets/theme-toggle.html`.

### Motion

- Entrances: `cubic-bezier(0.34, 1.56, 0.64, 1)` — tiny overshoot.
- Durations: 180ms hover, 240ms state, 380ms entrance.

---

## Mascot Usage

- Always **full-colour**, never silhouetted or tinted.
- Minimum 32 px square. Below that, use the heart mark alone.
- **Pose library** in `assets/corgi-mate/` — match activity to pose (groceries, laundry, calendar, storytime, etc.).
- Safe backgrounds: Warm Cream, Soft Blue, Sage Green, Blush Pink, Ink. *Not* Heart Tan (patch disappears) or pure white.

---

## Iconography

- **Primary set: Lucide Icons** — 1.75px stroke, rounded caps.
- **Brand symbol: clay heart** — `assets/icons/heart.svg`
- **Secondary mark: clay home** — `assets/icons/home.svg`
- Emoji prohibited in product UI.

---

## File manifest

| File | What it is |
| --- | --- |
| `README.md` | This document. |
| `SKILL.md` | Skill entry-point for agents. |
| `colors_and_type.css` | Design tokens. |
| `assets/corgi-mate-avatar.png` | Primary mascot. |
| `assets/corgi-mate/` | 21 pose images. |
| `assets/icons/heart.svg` | Brand heart. |
| `assets/icons/logo-wordmark.svg` | "Corgi Mate" wordmark. |
| `preview/*.html` | Design system reference cards. |
| `ui_kits/app/` | Family-assistant app UI kit. |
| `ui_kits/planner/` | Household planner UI kit. |
| `slides/` | Slide templates. |
