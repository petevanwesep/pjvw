---
title: "feat: Full makeover of pjvw.io personal site"
type: feat
status: completed
date: 2026-06-12
---

# feat: Full makeover of pjvw.io personal site

## Overview

pjvw.io is a small single-page personal site (Rails 7.1 + Sprockets asset pipeline +
classic global-`React`/`ReactDOM` components compiled through the asset pipeline). It
shows a typewriter intro that types out "Pete van Wesep", then fades in a
`me / work / contact` nav backed by React components. The visual design is dated
(default browser link colors, Roboto Slab everywhere, `padding-top: 15%`, device-pixel
media queries), the analytics is dead (the retired `analytics.js`), the contact form
markup uses Bootstrap 3/4 grid classes against a Bootstrap 5 stylesheet (so it renders
broken), the bio says "Seattle" (user now lives in Oakland), and the `/zork` Skulpt
easter egg does not run correctly.

This plan delivers a **full visual + layout makeover in a "modern minimal" direction**
while **keeping the existing Rails + React + asset-pipeline stack** (restyle in place,
lowest risk). It also: fixes the location, lightly polishes stale copy, restores Google
Analytics via the new `gtag.js` tag, repairs the contact form, and makes `/zork` work.

## Problem Frame

The owner (Pete van Wesep, an engineering leader) wants his personal site to look
nicer and current, and to be factually correct about where he lives. The site is small
and the owner explicitly wants to keep it simple — modernize the look, layout, and copy
without re-platforming. Direct user request; no upstream `ce:brainstorm` requirements
document exists, so this plan was bootstrapped directly from the request plus interactive
decisions captured below.

## Requirements Trace

- **R1.** Full visual makeover in a "modern minimal" aesthetic — clean, generous
  whitespace, refined serif/sans pairing, a single tasteful accent color, subtle motion.
- **R2.** Modernize the page **layout/composition** (header & nav placement, section
  structure, responsive behavior), not just colors and type.
- **R3.** Fix the location: bio must say Oakland, CA (not Seattle). The "University of
  Washington (Seattle, WA)" education line stays — it is factually correct.
- **R4.** Lightly polish stale/dated copy while preserving Pete's voice and all
  resume facts.
- **R5.** Keep the signature typewriter intro, but make it faster so content appears
  quickly.
- **R6.** Keep the Rails + React + asset-pipeline stack; this is a restyle-in-place, no
  re-platforming.
- **R7.** Restore Google Analytics using the provided `gtag.js` tag (`G-W5R3C6KDPN`),
  including SPA section-change pageviews.
- **R8.** Ensure the `/zork` Skulpt easter egg works correctly end to end.
- **R9.** Keep all existing functionality working: contact form submission, the
  `me / work / contact` navigation, hash-based deep links, and the easter eggs.

## Scope Boundaries

- **Non-goal:** Re-platforming away from React/Sprockets to static views, a JS framework,
  a static-site generator, or a CSS framework migration. (User chose restyle-in-place.)
- **Non-goal:** Rewriting copy wholesale / changing Pete's voice. Light polish only.
- **Non-goal:** New content sections (blog, projects gallery, etc.) beyond what exists
  (me / work / contact, plus existing easter eggs).
- **Non-goal:** Changing the resume facts, employment history, education, or publication.
- **Non-goal:** Backend/data changes — no new models, routes (except as needed), or
  controller logic beyond what zork/analytics require.
- **Non-goal:** Removing the easter eggs (zork, dad jokes) — they stay and keep working.

## Context & Research

### Relevant Code and Patterns

- `app/views/layouts/application.html.erb` — main layout. Has duplicated/empty `<meta>`
  tags, lowercase `<title>pete van wesep</title>` then a second proper title, the dead
  `analytics.js` snippet (lines 26–33), an inline `<style>` block, Bootstrap 5 CDN,
  FontAwesome 5 CDN, Roboto Slab Google Font, and an inline `.nav-span` style.
- `app/views/layouts/_navbar.html.erb` — Bootstrap-grid nav with `me / work / contact`
  links carrying `data-react-copy` attributes that drive React section switching.
- `app/views/layouts/_footer.html.erb` — "Site built using Ruby on Rails/React JS"
  footer (note: it is defined but **not** rendered by `application.html.erb`; confirm
  intended footer behavior during work).
- `app/assets/javascripts/components/frontPageCopy.jsx` — the heart of the page. Contains
  `FrontPageCopy` (nav/section state machine + hash routing + `Pjvw.Ga.sendPageView`),
  `Header`, `About` (the bio — **"Happily located in Seattle, WA 🌦️ ⛰️ 🌊"** on
  line 85), `Resume` (experience/education/publication), and `Code` (dev practices).
- `app/assets/javascripts/components/contactForm.jsx` — contact form. Uses Bootstrap 3/4
  classes (`control-label`, `col-sm-2`, `col-sm-offset-9`, `pull-left`,
  `btn btn-primary`) that do not exist in Bootstrap 5 → currently renders broken.
- `app/assets/javascripts/pjvw/frontpage.js.coffee` — the typewriter intro. `tw.wait(1500)`
  then types at min/max speed 15/18, then activates `.navbar` and `.content`. This is
  the timing to tighten for R5.
- `app/assets/javascripts/pjvw/ga.js.coffee` — `Pjvw.Ga.sendPageView` calls the old
  `ga('send','pageview', …)`. Must be migrated to `gtag` for R7.
- `app/assets/stylesheets/application.scss` — global reset + base type. `html` is
  `font-family: "Roboto Slab"; font-size: 62.5%`, `body { padding-top: 15% }`, raw
  `:link { color: #0000EE }` / `:visited { color: #551A8B }`, glyphicons `@font-face`.
- `app/assets/stylesheets/welcome.scss` — page-specific styles: `.content` fade-in
  transitions, `.logo` blinking **red** cursor (`background: red` keyframes), `.footer`,
  contact `.container/.row/.submit`, and a `min-device-width:320px…orientation:portrait`
  media query (dated; replace with modern responsive).
- `app/views/python/zork.html.erb` + `app/controllers/python_controller.rb` +
  `app/views/layouts/python.html.erb` + `app/assets/stylesheets/python.scss` — the zork
  easter egg. The `python` layout runs `runit()` on body load, decodes the embedded
  Python, and calls `Sk.importMainWithBody(..., true)` (canSuspend=true). It configures
  `output` and `read` but **not** `inputfun`/`inputfunTakesPrompt` — the game relies on
  `input("What do you do? ")`, which Skulpt cannot service without an input function. The
  layout also still carries the dead `analytics.js` snippet.
- `vendor/assets/javascripts/skulpt.js` — vendored, minified, old single-file Skulpt
  build (no separate `skulpt-stdlib`). Whether `input()` suspension works depends on this
  build; verify at execution time.
- `config/routes.rb` — `root 'welcome#index'`, `contact_forms#create`, `zork`,
  `stranger_things`.

### Institutional Learnings

- No `docs/solutions/` directory exists in this repo — no prior institutional learnings
  to carry forward. (First plan in `docs/plans/`.)

### External References

- Google Analytics 4 `gtag.js` SPA pattern: for client-side "page" changes, fire
  `gtag('event', 'page_view', { page_path, page_title })` (or re-`config` with
  `page_path`) on each section switch rather than relying on the initial auto pageview.
- Skulpt input: `input()` requires `Sk.configure({ inputfun, inputfunTakesPrompt: true })`
  with `read`, `output`, and an async-capable run (`asyncToPromise` + `canSuspend=true`,
  which the layout already uses). `inputfun` may return a Promise to support async prompts.

### Frontend design execution

- During implementation, the `frontend-design` skill governs the actual visual build
  (composition, typography scale, color, spacing, motion, copy) and requires screenshot
  verification before declaring the design done. This plan sets direction and the
  decision record; it does not pre-write CSS.

## Key Technical Decisions

- **Restyle in place, keep the stack** (R6): keep Rails + Sprockets + global React. All
  visual work happens in SCSS + component `className`/markup + layout ERB. No build-tool
  or framework migration. *Rationale:* user choice; lowest risk for a small site.
- **Drop the Bootstrap 5 + glyphicons dependencies, write a small bespoke stylesheet.**
  *Rationale:* "modern minimal" wants deliberate control of type/space/color; Bootstrap
  is barely used and its grid classes are already mismatched (broken contact form). A
  compact custom stylesheet with CSS custom properties (design tokens) is cleaner and
  removes a render-blocking CDN. FontAwesome usage (print/icon glyphs) is small and can
  be replaced with inline SVG or a single light icon set. *Confirm during work* that
  removing Bootstrap doesn't strand any other markup.
- **Design tokens via CSS custom properties** for color, type scale, spacing, and motion,
  so the aesthetic is consistent and tweakable. Light background, near-black ink text,
  **one accent color**. Keep a refined **red** accent to honor the existing blinking
  cursor for visual continuity (final hue chosen during design with screenshot review).
- **Typography:** pair a refined serif for the name/headlines with a clean sans for body
  (modern minimal). Keep the typewriter on the name. Exact families chosen during design;
  load via Google Fonts `display=swap` (replacing the old `Roboto+Slab` link).
- **Layout modernization** (R2): replace `padding-top: 15%` + centered-everything with an
  intentional composition — a real header/identity block, clear nav, a comfortable
  reading column for content, and a footer. Replace device-pixel-ratio media queries with
  fluid, mobile-first responsive rules (`clamp()` type, sensible breakpoints).
- **Typewriter timing** (R5): reduce the `wait` and raise typing speed in
  `frontpage.js.coffee` so the name finishes and content reveals quickly (target the
  full intro completing well under ~1s). Preserve the `.navbar`/`.content` activation
  callback so nothing downstream breaks. Honor `prefers-reduced-motion` (skip/instant).
- **Analytics migration** (R7): put the `gtag.js` tag in both layouts
  (`application.html.erb` and `python.html.erb`), remove both old `analytics.js`
  snippets, and rewrite `Pjvw.Ga.sendPageView` to emit a `gtag` `page_view` event so SPA
  section switches keep tracking. ID: `G-W5R3C6KDPN`.
- **Zork fix** (R8): configure Skulpt with an `inputfun` (and `inputfunTakesPrompt`) so
  the game's `input()` prompts work, keep async suspension, and surface prompts/output in
  the page. If the vendored Skulpt build cannot service async input, upgrade/replace the
  vendored Skulpt assets as a fallback. Style the zork page to match the new design.
- **Contact form repair** (R9): re-mark-up the form against the new bespoke styles
  (remove Bootstrap-only classes), keeping the existing `$.post('/contact_forms', …)`
  submit flow, the honeypot `#nickname` field, and the success/failure alerts intact.
- **Metadata cleanup:** single correct `<title>`, a real `<meta name="description">`,
  correct/`https` Open Graph tags, and remove the duplicate/empty meta + inline styles.

## Open Questions

### Resolved During Planning

- Aesthetic direction → **Modern minimal** (user).
- Typewriter intro → **Keep, but faster** (user).
- Tech approach → **Restyle in place**, keep Rails + React (user).
- Copy scope → **Light polish**, preserve voice and facts; fix Seattle→Oakland (user).
- Analytics → **Restore** with provided `gtag.js` tag `G-W5R3C6KDPN` (user).
- Zork → **Must work correctly** (user).
- Keep Seattle in the UW education line → yes, it is factually correct.
- Keep easter eggs (zork, dad jokes) → yes.

### Deferred to Implementation

- Exact font families and final accent hue — decided during the `frontend-design` pass
  with screenshot review.
- Whether removing Bootstrap strands any markup that needs a small custom replacement —
  discovered by running the site and diffing each section.
- Root cause of the zork failure (missing `inputfun` vs. an old Skulpt build that can't
  suspend on input) — confirmed by running `/zork` and observing actual behavior; the
  fix escalates from "configure inputfun" to "upgrade Skulpt assets" only if needed.
- Whether to render the existing `_footer` partial (it is currently not rendered) — decide
  while composing the new layout.
- Exact `gtag` SPA event shape (re-`config` vs. `page_view` event) — finalize against the
  live tag's behavior.

## Implementation Units

- [ ] **Unit 1: Design foundation — tokens, base layout, typography, metadata**

**Goal:** Establish the modern-minimal visual system and modernized page shell that every
section renders into, and clean up document metadata.

**Requirements:** R1, R2

**Dependencies:** None

**Files:**
- Modify: `app/views/layouts/application.html.erb` (metadata cleanup, fonts, drop
  Bootstrap/glyphicons/inline styles, gtag handled in Unit 5, modern shell markup)
- Modify: `app/assets/stylesheets/application.scss` (design tokens via CSS custom
  properties, base type scale with `clamp()`, link/focus colors, replace `padding-top:15%`)
- Modify: `app/assets/stylesheets/welcome.scss` (layout composition, spacing, refined
  cursor accent, responsive rules; remove device-pixel media query)
- Modify: `app/views/layouts/_navbar.html.erb` (modern nav markup, no Bootstrap grid)

**Approach:**
- Define tokens: `--bg`, `--ink`, `--muted`, `--accent` (refined red), type families,
  modular type scale, spacing scale, max content width, motion durations.
- Mobile-first, fluid layout: header/identity block, nav, reading column, footer region.
- Replace dated reset bits and default `:link/:visited` colors with deliberate styles +
  visible focus states (accessibility).
- Honor `prefers-reduced-motion` for transitions.
- Fix `<head>`: one `<title>`, real description, correct `https` OG tags; remove
  duplicate/empty meta and the inline `.nav-span` style.

**Execution note:** Driven by the `frontend-design` skill; verify with before/after
screenshots at desktop + mobile widths before moving on.

**Patterns to follow:** Keep the existing `.content.active` fade-in mechanism and the
`data-react-copy` nav contract so React keeps working.

**Test scenarios:**
- Test expectation: none — pure styling/markup/metadata with no behavioral logic.
  Verification is visual (screenshots) + manual smoke per the Verification field.

**Verification:**
- Home page renders in the new modern-minimal style at desktop and mobile widths with no
  layout overflow; nav and content column are visually intentional; no console errors;
  no remaining references to Bootstrap/glyphicons assets; metadata is correct in
  view-source.

- [ ] **Unit 2: Content & copy refresh (Seattle → Oakland, light polish)**

**Goal:** Fix the location and lightly modernize stale copy across the React sections
while preserving voice and all facts, and restyle those sections to the new system.

**Requirements:** R3, R4

**Dependencies:** Unit 1 (tokens/layout)

**Files:**
- Modify: `app/assets/javascripts/components/frontPageCopy.jsx` (`About` bio line 85
  Seattle→Oakland + emoji refresh; light polish of `About`/`Code`; restyle `Header`,
  `Resume` section classNames to new styles)

**Approach:**
- `About`: change "Happily located in Seattle, WA 🌦️ ⛰️ 🌊" → Oakland, CA with
  appropriate emoji; tighten wording, keep voice.
- Preserve every resume fact (Forge/BrightBytes/Tanga/Upwork/consulting, UW education
  incl. its correct Seattle reference, Reverse Traceroute publication).
- Update section markup classNames to the bespoke styles (no Bootstrap remnants).

**Patterns to follow:** Existing component structure and the `.content` reveal class.

**Test scenarios:**
- Happy path: load `/` → `me` section shows "Oakland, CA"; no "Seattle" appears in the
  bio. Edge case: the UW education line still reads "Seattle, WA" (intentionally retained).
- Happy path: `work` section still lists all roles, education, and the publication
  unchanged in substance.

**Verification:**
- Visiting `me` shows Oakland; `work` shows the full unchanged-in-fact resume; copy reads
  cleanly with no broken markup.

- [ ] **Unit 3: Faster typewriter intro + motion polish**

**Goal:** Keep the signature name typewriter but make the intro fast, and make it
respect reduced-motion.

**Requirements:** R5

**Dependencies:** Unit 1

**Files:**
- Modify: `app/assets/javascripts/pjvw/frontpage.js.coffee` (reduce `wait`, raise
  typing speed, keep `.navbar`/`.content` activation callback; reduced-motion path)
- Modify: `app/assets/stylesheets/welcome.scss` if transition durations need tightening

**Approach:**
- Lower the initial `wait` and raise min/max speed so the name completes quickly; keep
  the callback that adds `.active` to nav and content.
- If `prefers-reduced-motion: reduce`, render the name immediately and activate without
  the per-character animation.

**Patterns to follow:** Existing typewriter build chain and the activation callback.

**Test scenarios:**
- Happy path: on load, the name types out and nav + first section reveal quickly (intro
  noticeably faster than before).
- Edge case (reduced motion): with `prefers-reduced-motion`, the name and content appear
  immediately with no animation and the page is fully usable.
- Integration: after the intro, clicking `me/work/contact` still switches sections.

**Verification:**
- Intro completes quickly; nav/content reliably activate; reduced-motion users get an
  instant, usable page; no regression in section switching.

- [ ] **Unit 4: Contact form repair + restyle**

**Goal:** Make the contact form render correctly under the new design and keep its submit
flow working.

**Requirements:** R9

**Dependencies:** Unit 1

**Files:**
- Modify: `app/assets/javascripts/components/contactForm.jsx` (replace Bootstrap 3/4
  classes with bespoke form styles; keep honeypot + submit + alerts)
- Modify: `app/assets/stylesheets/welcome.scss` (form field, label, button styles)

**Approach:**
- Re-mark-up name/email/message fields and the submit button with the new styles; keep
  the hidden `#nickname` honeypot, the `$.post('/contact_forms', …)` call, and the
  success/failure alert components and their auto-dismiss timing.

**Patterns to follow:** Existing `ContactForm` state + `setAlert` flow; keep field `name`
attributes (`name`, `email`, `message`, `nickname`) so the controller keeps working.

**Test scenarios:**
- Happy path: fill name/email/message → submit → success alert "Thanks!" appears and
  auto-dismisses; request hits `/contact_forms`.
- Error path: simulate a failed POST → failure alert with the LinkedIn fallback appears.
- Edge case: honeypot `#nickname` stays visually hidden and is present in the DOM.
- Edge case: form is legible and aligned at mobile and desktop widths.

**Verification:**
- The form looks correct in the new design, submits successfully, and shows the right
  alert on success/failure; honeypot intact.

- [ ] **Unit 5: Restore Google Analytics via gtag.js**

**Goal:** Re-enable analytics with the new GA4 tag, including SPA section-change pageviews,
and remove the dead `analytics.js`.

**Requirements:** R7

**Dependencies:** Unit 1 (so layout head is settled)

**Files:**
- Modify: `app/views/layouts/application.html.erb` (add gtag.js for `G-W5R3C6KDPN`,
  remove old `analytics.js` snippet)
- Modify: `app/views/layouts/python.html.erb` (same gtag.js add + remove old snippet)
- Modify: `app/assets/javascripts/pjvw/ga.js.coffee` (`Pjvw.Ga.sendPageView` → `gtag`
  `page_view` event)

**Approach:**
- Insert the provided gtag snippet in both layout `<head>`s.
- Rewrite `sendPageView(pageName)` to call `gtag('event','page_view', { page_path/title })`
  (or re-`config` with `page_path`) so `me/work/contact` switches register; guard for a
  missing `gtag` (e.g., blocked) so it never throws.

**Patterns to follow:** Existing `Pjvw.Ga.sendPageView` call site in
`frontPageCopy.jsx#openNavItem`.

**Test scenarios:**
- Happy path: page load issues the gtag config/pageview (visible in network as a
  `collect`/`g/collect` request to Google).
- Integration: switching to `work`/`contact` fires an additional gtag page_view event.
- Error path: if `gtag` is undefined (blocker), `sendPageView` no-ops without throwing
  and section switching still works.

**Verification:**
- Network shows GA4 hits to `G-W5R3C6KDPN` on load and on section change; no console
  errors; no remaining `analytics.js` / `ga('create')` references in either layout.

- [ ] **Unit 6: Make /zork work + restyle**

**Goal:** The `/zork` Skulpt game runs end to end (intro prints, accepts input commands,
reaches win/lose), and the page matches the new design.

**Requirements:** R8

**Dependencies:** Unit 1 (design tokens), Unit 5 (gtag in python layout)

**Files:**
- Modify: `app/views/layouts/python.html.erb` (configure Skulpt `inputfun` +
  `inputfunTakesPrompt`, keep `read`/`output` + async suspension; remove dead analytics;
  modern head/fonts)
- Modify: `app/assets/stylesheets/python.scss` (style the output/input to match design;
  replace `position:absolute; top:500px` hack and device-pixel media query)
- Modify (fallback only if needed): `vendor/assets/javascripts/skulpt.js`
  (+ stdlib) — upgrade/replace the vendored Skulpt build if the current one cannot
  service async `input()`
- Modify if needed: `app/views/python/zork.html.erb` (input UI element if an in-page
  input field is preferred over a prompt)

**Approach:**
- First confirm the actual failure by running `/zork`. Configure `Sk.configure` with an
  `inputfun` (returning a value/Promise) and `inputfunTakesPrompt: true` so the game's
  `input("What do you do? ")` prompts work, keeping `asyncToPromise` + `canSuspend=true`.
- Decide prompt UX: browser `prompt()` is simplest; an in-page input box is nicer and
  fits the design — choose during work.
- Only if the vendored Skulpt build can't suspend on input, upgrade the vendored Skulpt
  assets (and stdlib) as the fallback path.
- Restyle the output area; remove the dead analytics snippet (gtag added in Unit 5).

**Execution note:** Investigate-then-fix — reproduce the broken behavior at `/zork`
before changing Skulpt config; escalate to an asset upgrade only if configuration alone
can't make `input()` work.

**Patterns to follow:** Existing `runit()` decode-and-run flow in the python layout.

**Test scenarios:**
- Happy path: load `/zork` → intro narration prints; entering `help` lists commands;
  a full winning path (`grab` sword, navigate, `down`, `grab` ring, reach dragon,
  `fight`) prints the win message; `quit` ends with "THE END".
- Error path: an unknown command prints the "I don't know that command" message and the
  game continues (no crash, no hang).
- Edge case: works on a fresh load with no console errors; output is readable on mobile.

**Verification:**
- `/zork` is fully playable to both a win and a loss, accepts typed commands, and is
  styled to match the site; no JS errors in the console.

## System-Wide Impact

- **Interaction graph:** The `data-react-copy` nav → `FrontPageCopy.openNavItem` →
  `Pjvw.Ga.sendPageView` chain is touched by Units 1, 2, and 5; keep the contract stable.
  The typewriter callback (Unit 3) gates nav/content activation — must keep firing.
- **Error propagation:** `sendPageView` must no-op safely if `gtag` is blocked/undefined
  so analytics never breaks navigation. Skulpt errors must be caught (already logged) and
  not hang the page.
- **State lifecycle risks:** Hash-based deep links (`#work`, `#contact`) must still select
  the right section after the intro; confirm `componentWillMount`/hash handling survives
  the restyle.
- **API surface parity:** Two layouts (`application` and `python`) both carry analytics
  and fonts — apply the gtag + font changes to both so the zork page isn't left on the
  dead tag/old styling.
- **Integration coverage:** Contact form POST to `/contact_forms` and its alerts; verify
  end to end after re-mark-up (Unit 4). Removing Bootstrap must not break the form, nav,
  or any section.
- **Unchanged invariants:** Routes, controllers, the contact-form server contract
  (field names), the resume facts, the UW "Seattle, WA" education line, and the easter
  eggs all remain. No backend/model changes.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Removing Bootstrap strands markup (nav/form/sections) | Restyle nav and form in the same units; smoke-test every section after removal; keep a bespoke stylesheet that covers what was used. |
| Vendored Skulpt build can't service async `input()` | Reproduce first; if config can't fix it, upgrade/replace the vendored Skulpt assets (fallback path already in Unit 6). |
| GA4 SPA pageviews double-count or miss section changes | Use a single config on load + explicit `page_view` events on switch; verify exact hits in the network panel. |
| Typewriter speed-up breaks the activation callback (blank page) | Keep the existing callback that adds `.active`; test that nav/content reliably appear; add reduced-motion instant path. |
| Hash deep links break after restyle | Verify `#work`/`#contact` still select sections post-makeover. |
| Font swap causes layout shift / slow load | Use `display=swap`, set sensible fallbacks, keep the type scale stable. |

## Documentation / Operational Notes

- No deploy-config change expected (same Rails app, asset pipeline). Confirm production
  asset precompilation still succeeds after dependency/asset changes (Bootstrap removal,
  any Skulpt asset change).
- The `_footer` partial is currently not rendered; if the new design adds a footer, wire
  it in deliberately and update its "Site built using…" copy if desired.

## Sources & References

- Live site: pjvw.io
- Key files: `app/assets/javascripts/components/frontPageCopy.jsx`,
  `app/assets/javascripts/components/contactForm.jsx`,
  `app/assets/javascripts/pjvw/frontpage.js.coffee`,
  `app/assets/javascripts/pjvw/ga.js.coffee`,
  `app/views/layouts/application.html.erb`, `app/views/layouts/python.html.erb`,
  `app/controllers/python_controller.rb`, `app/assets/stylesheets/application.scss`,
  `app/assets/stylesheets/welcome.scss`, `app/assets/stylesheets/python.scss`
- GA4 tag: `G-W5R3C6KDPN` (gtag.js), provided by site owner.
