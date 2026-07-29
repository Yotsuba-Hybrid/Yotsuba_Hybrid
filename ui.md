SKILL WEB FRONTEND YTB
---
name: material-premium-decks
description: Use this skill whenever the user wants a premium, art-directed HTML deck, pitch-style presentation, or software/product UI mockup — especially anything compared to Pitch (pitch.com), described as "premium," "professional," or meant to look designed rather than AI-generated. This covers slide decks, investor/sales presentations, landing-page-as-slides, dashboards, and app/tool UI mockups. Always reach for this skill instead of a plain HTML page when the request mentions decks, slides, presentations, dashboards, or premium/polished software UI — it enforces a fixed Material Design 3 token system (color roles, type scale, shape, elevation, motion) plus a specific premium color story (near-black base with pink, lilac, turquoise, and a gold/mustard accent) and Pitch-like composition patterns, so output doesn't default to generic templated layouts.
---

# Premium M3 decks and tool UI

The brief here is consistent: produce output that looks like it came from a design studio with a real point of view, not a generic AI template. The way this skill achieves that is by being *strict* about two things and *deliberate* about a third:

1. **Strict**: a fixed Material Design 3 token system — color roles, type scale, shape scale, elevation, state layers, motion. Read `references/tokens.md` before writing any CSS. This is fixed across every project this skill produces — don't improvise a different palette or type scale per brief. The consistency is the brand.
2. **Strict**: a specific premium palette within the M3 role system — near-black surfaces, pink as primary, lilac as secondary, turquoise as tertiary, and a golden mustard as a spotlight accent used sparingly. This is also fixed; it's what makes multiple decks/tools produced by this skill feel like they belong to the same design language.
3. **Deliberate, per-brief**: composition. Read `references/composition.md` before laying out slides or screens. This is where the actual craft happens — which slide gets the big-number treatment, where the asymmetry goes, what the one signature decorative moment is. Fixed tokens plus lazy, templated composition still looks generic; the tokens are the instrument, composition is the performance.

## Output format

Build a single self-contained HTML file (CSS and any JS inline, per the artifact conventions) — this is the deliverable whether it's a slide deck or a tool mockup. For a deck, stack slides as full-viewport-height sections in one scrollable document (see `assets/starter-template.html`); this renders cleanly as an artifact and the user can screenshot or present directly from it. Don't split a deck into multiple files.

If the user explicitly asks for an editable `.pptx` instead of an HTML artifact, that's a different deliverable — use the pptx skill for the file mechanics, but still pull the color/type/shape decisions from `references/tokens.md` so the visual language stays consistent with everything else this skill produces.

## Workflow

1. **Read both reference files first.** `references/tokens.md` (colors, type, shape, elevation, state, motion — copy these as literal CSS custom properties, don't approximate from memory) and `references/composition.md` (slide anatomy patterns, grid/spacing discipline, decorative language, what to avoid).
2. **Look at `assets/starter-template.html`** for a working example of the tokens and a few composition patterns (cover, big-number stat, asymmetric comparison, closing/CTA) already wired together. Adapt it — swap copy, choose which slide types actually fit this brief, adjust which brand hues anchor which slide — rather than starting from a blank file. Don't reuse its exact copy or exact slide selection for a different brief; the point is the underlying system, not this specific example.
3. **Ground it in the actual content.** Before building, work out per-slide (or per-screen) what the one thing that matters most is, and let that decide the layout — a slide about a single number should not look like a slide comparing three options. This is the same discipline as the frontend-design skill's "ground it in the subject" principle, applied within this fixed design system rather than a fresh one each time.
4. **Build the full HTML file**, embedding the Google Fonts import (Fraunces, Inter, Space Mono) and the CSS custom properties from tokens.md at the top of the stylesheet.
5. **Self-critique before presenting**: Does every slide/screen use the same layout? (If so, vary it — see composition.md's slide anatomy patterns.) Is gold used on more than one focal element per screen? (Pull it back to one.) Are buttons pill-shaped and cards using the large/xl shape scale? (M3's shape system is one of the fastest tells when it's missing.) Is there at least one real decorative moment (gradient-mesh blob or a deliberate grid-break) rather than a flat, safe layout?

## When the ask is a software tool rather than a deck

Same tokens, different composition register — `references/composition.md` has a dedicated section on this (navigation rail/bar, button emphasis hierarchy via filled/tonal/outlined, surface-container stepping for panel hierarchy, real empty/error state copy). Read it before starting a dashboard or app mockup specifically; the M3 component anatomy matters more there than the decorative blob language, which is more of a deck thing.

## Common mistakes this skill exists to prevent

- Flat, single-layer dark backgrounds with no surface-container stepping (looks like a plain dark-mode toggle, not an M3 system).
- Square or barely-rounded buttons — M3 buttons are pill-shaped (`--md-shape-full`). This one detail alone signals "not actually following M3."
- Gold used as a background color or on multiple elements per slide — it's a spotlight for one thing, not a fourth general-purpose brand color.
- Every slide using the same centered-headline-over-paragraph layout.
- Heavy, dark drop-shadows on cards instead of the tonal-surface + soft tinted-glow approach described in tokens.md.
- Body text set in the display serif (Fraunces) — reserve it for titles/headlines/hero numbers only; everything functional stays in Inter.

# Design tokens — Premium M3

This is the fixed token system for every deck, dashboard, or tool mockup this skill produces. Don't invent a new palette or type scale per project — the consistency across projects is the point (it's how a design system builds brand recognition, and it's what separates this from a one-off AI page). What changes project to project is composition, copy, and which containers/charts get used — not the tokens themselves.

Always implement these as CSS custom properties on `:root` so every component reads from the same source. Never hard-code a hex value in a component rule.

## Color roles

The palette is dark-first: near-black surfaces with pink, lilac, and turquoise as the three brand hues, and a mustard/gold as the high-contrast fourth accent reserved for the moments that need to pop hardest (a key metric, a single CTA, a highlighted word in a headline). Gold is a spotlight, not a background — if more than one element per screen is gold, it stops working.

```css
:root {
  /* Surfaces — near-black, warm not cold. Never pure #000. */
  --md-surface-dim: #050506;
  --md-surface: #0B0B0E;
  --md-surface-bright: #1E1E23;
  --md-surface-container-lowest: #060608;
  --md-surface-container-low: #131316;
  --md-surface-container: #18181D;
  --md-surface-container-high: #212126;
  --md-surface-container-highest: #2B2B31;
  --md-on-surface: #F3F1F7;
  --md-on-surface-variant: #B9B6C2;
  --md-outline: #4C4A55;
  --md-outline-variant: #322F3A;

  /* Primary — Pink */
  --md-primary: #FF3D8E;
  --md-on-primary: #3A0021;
  --md-primary-container: #5C0035;
  --md-on-primary-container: #FFD4E7;

  /* Secondary — Lilac */
  --md-secondary: #A78BFA;
  --md-on-secondary: #2A1854;
  --md-secondary-container: #3D2678;
  --md-on-secondary-container: #E7DCFF;

  /* Tertiary — Turquoise */
  --md-tertiary: #2DD4C4;
  --md-on-tertiary: #003733;
  --md-tertiary-container: #00504A;
  --md-on-tertiary-container: #A6F5EA;

  /* Accent — Golden mustard. Spotlight only, use sparingly. */
  --md-accent: #F2B705;
  --md-on-accent: #3A2900;

  /* Error (standard M3 semantic role, keep for real error/destructive states) */
  --md-error: #FF5449;
  --md-on-error: #690003;
  --md-error-container: #930006;
  --md-on-error-container: #FFDAD4;
}
```

### Light-surface exception

Some slides benefit from a bright, high-key moment as contrast against an otherwise dark deck (a single "light card" pull-quote or a stat panel). When you need one, use `--md-surface-bright` promoted to a full light surface (`#F7F4FA`) with dark text (`#1A1825`) instead of inventing a new gray — keep it as an occasional beat, not a default.

### Applying color roles correctly (this is the M3 discipline that reads as intentional, not decorative)

- A `container` role is always paired with its `on-container` for text/icons drawn on top of it. Never put `--md-on-primary` text on a `--md-primary-container` background — the pairs are fixed.
- Base roles (`--md-primary`, `--md-secondary`, `--md-tertiary`) are for high-emphasis small elements: filled buttons, active nav indicators, key icons. They are not backgrounds for large surfaces — a whole hero panel filled edge-to-edge with `--md-primary` reads as a template default, not a considered choice.
- `container` roles (`--md-primary-container`, etc.) are for larger surfaces that need brand color at lower intensity: cards, chips, section backgrounds.
- Reserve gold for exactly one focal point per slide/screen: a hero stat, one button, one underline. If you want to use it twice, pick which one matters more.

## Type scale

Two type roles, used with restraint on which contexts get which:

- **Display/Headline face — Fraunces** (variable serif). Reserved for slide titles, hero numbers, and the one big idea per screen. This is what gives the deck an editorial, art-directed quality instead of reading as a generic SaaS template — most AI output defaults to sans-serif everywhere, so a considered serif moment at the top of a slide is an immediate tell that a human designer was involved.
- **Title/Body/Label face — Inter**. Everything functional: paragraph copy, UI chrome, nav, buttons, captions, table data.
- **Data/mono accent — Space Mono**. Optional third voice for things that are literally data: timestamps, version numbers, stat callouts that want a technical feel, code snippets in a tool mockup.

Import all three from Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

M3 type scale (px / line-height), mapped to the two-family system above:

| Role | Font | Size/Line | Weight |
|---|---|---|---|
| Display Large | Fraunces | 57/64 | 400 |
| Display Medium | Fraunces | 45/52 | 400 |
| Display Small | Fraunces | 36/44 | 500 |
| Headline Large | Fraunces | 32/40 | 500 |
| Headline Medium | Fraunces | 28/36 | 500 |
| Headline Small | Fraunces | 24/32 | 600 |
| Title Large | Inter | 22/28 | 600 |
| Title Medium | Inter | 16/24 | 600 |
| Title Small | Inter | 14/20 | 600 |
| Body Large | Inter | 16/24 | 400 |
| Body Medium | Inter | 14/20 | 400 |
| Body Small | Inter | 12/16 | 400 |
| Label Large | Inter | 14/20 | 500 |
| Label Medium | Inter | 12/16 | 500 |
| Label Small | Inter | 11/16 | 500 |

Set these as `--md-type-*` custom properties (font-family, font-size, line-height, font-weight) or utility classes, whichever suits the artifact. Use Fraunces's optical-size axis (`font-optical-sizing: auto`) so it doesn't look thin/spindly at display sizes.

## Shape scale

M3's shape system is a fixed corner-radius scale — apply it by component role, not by eyeballing "looks about right":

```css
:root {
  --md-shape-none: 0px;
  --md-shape-xs: 4px;
  --md-shape-sm: 8px;
  --md-shape-md: 12px;
  --md-shape-lg: 16px;
  --md-shape-xl: 28px;
  --md-shape-full: 999px;
}
```

- Buttons: `--md-shape-full` (pill). This is a hard M3 signature — square or barely-rounded buttons are the single fastest way to make a design stop reading as M3.
- Cards, dialogs, sheets: `--md-shape-lg` or `--md-shape-xl`.
- Chips, small tags: `--md-shape-sm`.
- Text fields: `--md-shape-xs` on top corners only (M3 filled text field convention).
- FAB-style circular actions: `--md-shape-full`.

## Elevation

M3 dark-theme elevation is communicated primarily through **surface tone** (lighter container steps as elevation increases), with a soft shadow as a secondary cue — not the heavy drop-shadows common in generic AI output.

| Level | Surface token | Shadow |
|---|---|---|
| 0 | `--md-surface` | none |
| 1 | `--md-surface-container-low` | `0 1px 2px rgba(0,0,0,.4)` |
| 2 | `--md-surface-container` | `0 1px 3px rgba(0,0,0,.5)` |
| 3 | `--md-surface-container-high` | `0 4px 8px rgba(0,0,0,.5)` |
| 4/5 | `--md-surface-container-highest` | `0 8px 24px rgba(0,0,0,.55)` |

For a premium/editorial lift beyond stock M3, an elevated card can additionally carry a very soft, low-opacity glow tinted with whichever brand hue it's associated with (e.g. a card about a pink metric gets `box-shadow: 0 12px 40px -12px rgba(255,61,142,.35)` in addition to the neutral elevation shadow). Keep the glow subtle — it should read as ambient light, not a neon outline.

## State layers (interactive feedback)

Every interactive element needs a state layer — a flat color overlay in the element's own "on-X" color at fixed opacities. Don't invent custom hover colors per component.

| State | Opacity |
|---|---|
| Hover | 8% |
| Focus | 12% |
| Pressed | 12% |
| Dragged | 16% |

Always pair a visible focus ring (2px, `--md-primary` or the component's own base color, offset 2px) with the focus state layer — this is also an accessibility floor, not optional polish.

## Motion

- Standard easing: `cubic-bezier(0.2, 0, 0, 1)` — for things entering/existing the same way (most transitions).
- Emphasized decelerate: `cubic-bezier(0.05, 0.7, 0.1, 1)` — for things entering the screen (slide-ins, reveals).
- Emphasized accelerate: `cubic-bezier(0.3, 0, 0.8, 0.15)` — for things leaving.
- Durations: micro-interactions 100–150ms, small transitions 200–300ms, large/full-screen transitions 400–600ms.

For decks specifically: a slide-load reveal (staggered fade + 8–16px translate on the headline, then supporting elements) reads as intentional. Don't animate everything — pick one orchestrated moment per slide transition, same principle as any other design work: spend the motion budget in one place.

# Composition — the Pitch-deck sensibility

Tokens (color, type, shape) make the output *consistent*. Composition is what makes it *premium*. A slide can use every token correctly and still look like a generic AI deck if the layout is a centered headline over a centered paragraph over three evenly-spaced cards. This file is about the layout decisions that make a deck look art-directed by a human who cares about the specific content on each slide.

## Why this matters more than the tokens

Anyone can copy a hex code. What reads as premium — the kind of thing pitch.com's own template gallery does well — is that every slide's layout is a *response to what that slide is saying*, not a container that any text could be dropped into. Before laying out a slide, decide: what is the one thing on this slide that matters most, and how does the composition make that unmissable? A slide about a single big number should look completely different from a slide comparing three options, which should look different from a slide telling a customer story.

## Slide anatomy patterns

Rotate through these deliberately rather than defaulting to one for every slide. A deck that uses the same layout on all 12 slides reads as templated even if each slide individually looks fine.

- **Title/cover** — Not centered-text-on-a-plain-background. Give it a focal graphic moment: an oversized Fraunces numeral or word bleeding off the edge of the frame, an asymmetric color-block split (e.g. 60/40 dark surface vs. a container-tinted panel), or a soft gradient-mesh blob in two brand hues behind the title. The deck's name and one-line premise are the only text; resist adding a subtitle paragraph.
- **Big-number / stat hero** — One number gets the full Fraunces Display treatment, oversized, in a brand color. Supporting label in small Label-scale type directly beneath it, not above. Everything else on the slide should be quiet enough that the number is the first and last thing the eye lands on.
- **Two/three-column comparison** — Use unequal column widths or unequal visual weight (one column gets a filled container card, the others stay outline-only) rather than three identical boxes — asymmetry signals that one option is being recommended, which is usually true in real pitch content.
- **Narrative/story slide** — A quote or customer story gets the light-surface exception treatment (see tokens.md) as a single bright card floating on the dark background, with generous padding, so it reads as a distinct "voice" breaking into the deck.
- **Data/chart slide** — Charts use rounded bar caps, donut charts with a gap between segments (not touching), and gridlines at low opacity (`--md-outline-variant` at ~40%) rather than full-strength lines. Label the one data point that matters directly on the chart in the accent gold, rather than relying on a legend for it.
- **Closing/CTA** — Mirror the cover's composition (bookending the deck) but swap the headline for the ask, and put the one action in a filled pill button using `--md-primary` or `--md-accent`.

## Grid and spacing

- Work off an underlying 12-column grid with generous outer margins (at minimum 64–96px on a 1280px-wide slide canvas) — premium decks breathe, they don't fill every pixel.
- Let content break the grid occasionally on purpose (a headline that bleeds past the column edge, an image that overlaps two columns) — this is the "one real risk" that keeps a layout from feeling like a template, but do it once per slide at most.
- Vertical rhythm: pick one spacing unit (commonly 8px) and derive every gap as a multiple of it. Inconsistent, eyeballed spacing is one of the fastest tells of an unconsidered layout.

## Decorative language

Two decorative devices carry the brand across every slide — use these instead of stock gradients or random shape confetti:

1. **Gradient-mesh blobs** — soft, large, low-opacity (15–25%) blurred ellipses in two of the three brand hues (pink+lilac, or lilac+turquoise), placed off-frame or behind content, never centered and never sharp-edged. This is the ambient atmosphere device; it should never compete with foreground content for attention.
2. **Thin outline containers** — 1px `--md-outline-variant` strokes on cards/panels that don't need a filled background, so structure is implied without adding visual weight. Reserve filled containers for the 1–2 elements per slide that need emphasis.

Avoid: drop-shadow-heavy cards, generic three-icon-in-a-row feature grids, centered-everything layouts, numbered 01/02/03 badges unless the content is a genuine sequence, and stock-photo-style hero imagery (prefer abstract gradient blobs, real product UI, or real data over generic photography).

## Software-tool mockups specifically

When the deliverable is a product UI (dashboard, app screen, tool) rather than a slide, the same tokens apply but the composition rules shift toward real M3 component anatomy:

- Use a persistent navigation rail or nav bar (M3 pattern) rather than a top nav alone — it signals "considered app" rather than "landing page."
- Give every primary action a filled pill button in `--md-primary`; secondary actions get filled-tonal (container color) or outlined; the least important actions are text-only.
- Surface hierarchy communicates structure: the app shell is `--md-surface`, panels within it step up through the `--md-surface-container-*` scale — don't use pure white/pure black panels dropped on top.
- Empty states and error states get real, specific copy (see frontend-design skill's writing guidance) — a premium tool never shows a bare "No data."
