# Lumen Chat UI Kit

An interactive recreation of the Lumen chat surface — warm editorial, paper-toned, soft radii. Built as reusable JSX components so pieces can be composed into other mocks.

## Files
- `index.html` — the full interactive app (sidebar + thread + composer + settings + tweaks)
- `kit.css` — kit-specific styles, on top of `colors_and_type.css`
- `components.jsx` — all reusable components, attached to `window`
- `app.jsx` — stateful app wiring + seed data

## Components (available on `window` after `components.jsx` loads)

| Component | Purpose |
|---|---|
| `Mark` / `Mascot` | Brand mark (lantern) and Lumi mascot SVGs |
| `Icon` | Lucide icon by name |
| `Sidebar` | Collapsible sidebar with conversation history, new-chat, footer |
| `Topbar` | Title + model pill + theme toggle + share |
| `EmptyState` | Mascot welcome + suggestion cards |
| `UserBubble` | User message (right-aligned paper bubble) |
| `AssistMessage` | Assistant message with mark avatar, serif prose, optional code + artifact parts, action row |
| `CodeCard` | Dark code surface with copy button |
| `ArtifactCard` | Generated artifact (document, canvas preview) with open/copy actions |
| `Composer` | Sticky composer with attachments, model picker, send |
| `ModelPicker` | Inline model dropdown |
| `SettingsModal` | Full settings modal (appearance, density, notifications, destructive) |

## Interactions mocked
- Switching between seeded conversations
- Collapsing/expanding the sidebar
- Creating a new chat
- Typing + sending a message (word-by-word streamed reply with cursor)
- Theme toggle cycling Light → Dark → Auto
- Opening + navigating Settings
- Tweaks panel (accent color, corner radius) — live-applied via CSS vars

## Known gaps
- No real attachment flow, no share dialog body, no rich artifact renderer — these are stubs to keep the kit lean.
