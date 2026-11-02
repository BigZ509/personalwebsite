# UI/UX and visual direction — Research

**Owner:** design  
**Status:** Ready for review  
**Date checked:** 2026-11-01; primary-source research 04:37–04:40 UTC  
**Authority:** Proposals only; no implementation, font, asset, library or art direction approved.

## Recommendation for lead

Recommend **A — Field Notes**: warm paper, dark ink, a serif headline paired with restrained UI text, and four separately labeled object specimens. Keep conventional section navigation and selected project summaries visible alongside the portals. Basketball and its orange accent stay within About.

Exactly three directions below retain the same robot, basketball, camera and microchip concept and readable destination content. The recommendation is design judgment, not measured recruiter preference. Rendering stacks, architecture, model sourcing and performance budgets remain delegated.

## Verification method

- **F — Fetched:** Primary page text, README/repository listing or actual license text retrieved. Confirms content/documented intent, not appearance or behavior.
- **B — Browser observed:** Chrome screenshot and/or accessibility (AX) state inspected. A capture confirms a composition at that moment, not animation smoothness or responsive behavior.
- **I — Interaction observed:** A named desktop action produced a visible state change.
- **M — Measured:** None. No mobile/emulation, reduced-motion setting, keyboard journey, screen reader, contrast calculation, load-time, FPS or benchmark was run.
- **P — Proposed:** Our layouts, colors, pairings and behaviors, not claims about reference sites.

Read all five shared context documents and all three owned files. Git status returned exit 128: not a git repository. Initial research file contained unfilled prompts only; this report replaces that starter. Browser screenshots were viewed in this session; no screenshot files were written. Only the three design-owned Markdown files are edited.

Used brainstorming to compare proposals without preference-question pauses, per user instruction. Read Mobbin best-practices; personal primary sites better fit this research than product-screen searches, so no Mobbin search/redesign was invoked. No site cloning, code, scaffolding, dependencies, implementation downloads or commits.

## Personal-site catalogue: 11 active references + one retired counterexample

Every row checked 2026-11-01. F-only rows deliberately make no visual-composition claims.

| Primary site | Content / interaction evidence | Visual verification | Transfer and limitation |
| --- | --- | --- | --- |
| [Brittany Chiang](https://brittanychiang.com/) | F: About, Experience, Projects, résumé and project archive. B: section links in AX. | B screenshot: navy background, pale sans text, identity/nav left, career content right, teal tags. No hover/mobile test. | Separate identity from work evidence; retain explicit access. Do not copy recognizable layout/colors. Footer identifies Inter independently of visual inference. |
| [Josh W. Comeau](https://www.joshwcomeau.com/) | F: category/course/goodies buttons, About, article summaries and popular content; interactive-guide links. | F only; guides not activated. | Informative summaries and visible categories. Educator/publishing site rather than direct recruiting equivalent. |
| [Bruno Simon](https://bruno-simon.com/) | F: driving instructions, keyboard/touch controls, map, quality, respawn and source link. | Browser attempted: AX showed images/unlabeled buttons; screenshot dark and blank. World/driving unconfirmed. | Boundary comparison: avoid making spatial movement a prerequisite. Documented touch controls do not prove mobile success. |
| [Rauno Freiberg](https://rauno.me/) / [Craft](https://rauno.me/craft) | F: Craft, Projects, Field Notes; named experiments and prototype links. B: destinations in AX. | B screenshots: initially partial title reveal, then large black type over yellow circle on white panel/gray space. No timing/hover/prototype test. | Strong type can frame experiments; opening composition occupies much captured viewport space. Avoid delaying project evidence. |
| [Paco Coursey](https://paco.me/) | F: grouped Building, Projects, Writing, Now, Connect; [2021 redesign account](https://paco.me/writing/redesign-2021) argues for simpler documents. | F only; historical account is author intent, not proof of today's runtime. | Short grouped descriptions accommodate work and personality. Pure text would underserve our object brief. |
| [Emil Kowalski](https://emilkowal.ski/) | F: named Sonner/Vaul projects, writing and code links. Separately linked demos inspected below. | Homepage F only; demos B/I. | Present experiments with clear destinations. Demo styling does not establish homepage appearance. |
| [Maggie Appleton](https://maggieappleton.com/) | F: essays, notes, patterns/library; [colophon](https://maggieappleton.com/colophon) identifies Canela Display/Text, Lato and content growth stages. | B screenshot: large serif headline, sans support, illustrated essay cards and notes column on dark background in this session. No theme/mobile test. | Separate expressive display from reading; don't reuse illustrations or assume commercial font files are free. |
| [Lee Robinson](https://leerob.com/) | F: Default/Long bio buttons, notes, dated blogs. | F only; buttons not activated. | Offer optional biographical depth while keeping work evidence visible. |
| [Delba](https://delba.dev/) | F: Work, Personal, About; documentation/course links and technical video examples with contribution descriptions. | F only. | Explain personal contribution beside work links. Content-hierarchy evidence, not verified visual treatment. |
| [Hakim El Hattab](https://hakim.se/) | F: experiment catalogue describes focus, progress navigation, hover/press pagination and keyboard-capable Origami. | F only; Focusss deep fetch failed. | Explain an experiment before asking visitors to try it. Descriptions don't establish old demos still work. |
| [Sara Soueidan](https://www.sarasoueidan.com/) | F: skip link, Blog/Speaking/About, excerpts/dates; explicit redesign/refactor notice. | F only. | Durable text navigation and honest status; current design expressly transitional. |
| [Cassie Evans](https://cassie.codes/) — retired | F: current closure message and external community/contact links. | F only; older animated portfolio not observed. | Excluded from active shortlist; do not cite remembered older designs as live animation evidence. |

## Seven substantial findings

### 1. Pair playful portals with text routes

**Evidence F/B:** [Brittany](https://brittanychiang.com/) exposes conventional navigation; [Bruno](https://bruno-simon.com/) documents driving, map and recovery. **Inference P:** our objects should enrich already visible section links, with selected work below. Learning spatial controls adds a task this brief doesn't require. **Tradeoff:** parallel routes use space, but labels disambiguate a basketball meaning About. **Confidence:** high on structures; recruiter effectiveness unmeasured.

### 2. Explain the destination and contribution before interaction

**Evidence F:** [Delba](https://delba.dev/) describes work contributions; [Hakim](https://hakim.se/) names/describes experiments; [Josh](https://www.joshwcomeau.com/) supplies article summaries. **P:** labels “Software / Microchip,” “Robotics / Robot,” “Photography / Camera,” “About / Basketball,” each with one sentence. Put Software/Robotics first in reading order while retaining all four portals. **Tradeoff:** less mystery, better pre-interaction clarity. **Confidence:** high on fetched content; ordering needs actual-content review.

### 3. Typography can carry hierarchy while objects carry personality

**Evidence B/F:** [Maggie's capture](https://maggieappleton.com/) separates display type and illustrated content; her [colophon](https://maggieappleton.com/colophon) names actual fonts. [Rauno's capture](https://rauno.me/) demonstrates a typographic graphic panel. **P:** one display face, one reading/UI face, consistent captions; Newsreader is an alternative candidate, not a Canela recreation claim. **Tradeoff:** huge headings push work down; limit headline length and prevent overlaps. **Confidence:** high for captured desktop; mobile balance unverified.

### 4. Prefer purposeful state changes to continual movement

**Evidence F/I:** [Emil's animation essay](https://emilkowal.ski/ui/you-dont-need-animations) compares purpose/frequency/speed. [Sonner](https://sonner.emilkowal.ski/) produced a notification; [Vaul](https://vaul.emilkowal.ski/) opened a drawer. **P:** brief decorative acknowledgment, ordinary immediate navigation, no intro gate. Suggested 180–240 ms response is a starting proposal, not measured or universal. **Tradeoff:** less cinematic travel, clearer action/result. **Confidence:** high for those state changes; smoothness/easing/durations untested.

### 5. Navigation must remain understandable with all objects still

**Evidence F:** [W3C Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) describes persistent keyboard indication; [Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) explains 24 CSS px minimum/exceptions; [Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) is Level AAA and addresses disabling nonessential movement. **P:** labeled portal anchors, clear outline, generous padding (aim 44 px high), first-tap navigation, still reduced-motion alternatives. The 44 px target is our stronger proposal, not SC 2.5.8's minimum. **Tradeoff:** taller phone rows, understandable without hover. **Confidence:** high on guidance; no compliance certification.

### 6. Source availability and working live behavior are different evidence

**Evidence F/B:** [Bruno's repo](https://github.com/brunosimon/folio-2025) fetched while the scene wasn't visible in our attempt. [Paco's old repo](https://github.com/pacocoursey/paco) is archived/outdated; [Vaul's README](https://github.com/emilkowalski/vaul) says unmaintained although its drawer opened. **P:** learn bounded visual ideas without adopting a production base by stars/appearance. **Tradeoff:** useful source may still need maintenance/security/rights review. **Confidence:** high on notices and session states; no inference Bruno is generally broken.

### 7. Font, code and model licenses are separate

**Evidence F/license:** actual [Newsreader](https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/OFL.txt), [Inter](https://raw.githubusercontent.com/rsms/inter/master/LICENSE.txt), [Plex Sans](https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexsans/OFL.txt), [Plex Mono](https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/OFL.txt), [Space Grotesk](https://raw.githubusercontent.com/google/fonts/main/ofl/spacegrotesk/OFL.txt) texts all identify SIL OFL 1.1. **P:** shortlist these; retain exact chosen release's copyright/license when packaging. OFL includes redistribution and modified-name conditions (Plex explicitly reserves its name). **Tradeoff:** available candidates don't establish visual fit or license any reference design/model/photo/music. **Confidence:** high for fetched texts; no four-object asset rights audited here.

## Demos / repositories: exact verification

Four example repos and actual MIT texts fetched. Two desktop demo activations observed. None installed, cloned, built or benchmarked. “Accessible” means retrievable, not accessibility-certified.

| Example | Live check | Repo/license check | Lesson / limit |
| --- | --- | --- | --- |
| [Sonner](https://sonner.emilkowal.ski/) | B/I: clicked Render a toast; AX added notification and screenshot showed bottom-right toast. | F: [repo](https://github.com/emilkowalski/sonner), [MIT text](https://raw.githubusercontent.com/emilkowalski/sonner/main/LICENSE.md). | Local acknowledgment without replacing the document; not a recommendation to install a toast library for navigation. |
| [Vaul](https://vaul.emilkowal.ski/) | B/I: clicked Open Drawer; expanded state, drawer content and dimmed background observed. | F: [repo](https://github.com/emilkowalski/vaul), [MIT text](https://raw.githubusercontent.com/emilkowalski/vaul/main/LICENSE.md); README says unmaintained. | Optional-preview comparison; avoid compulsory drawer/second tap. No gesture/focus-management test. |
| [Bruno](https://bruno-simon.com/) | F controls; B attempted, blank dark capture. No driving verified. | F: author-linked [folio-2025](https://github.com/brunosimon/folio-2025), [MIT text](https://raw.githubusercontent.com/brunosimon/folio-2025/main/license.md). | Full-world scope contrast; root software license does not independently audit each model/texture/music file. |
| [Brittany v4](https://v4.brittanychiang.com/) | Historical live fetch failed; current site rendered separately, not proof of v4. | F: author-linked historical [v4 repo](https://github.com/bchiang7/v4), [MIT text](https://raw.githubusercontent.com/bchiang7/v4/master/LICENSE). | Historical source not current site's code. No image/content reuse assumed. |

[Paco's repo](https://github.com/pacocoursey/paco) says outdated 2020 site and is archived. README allows template use, but no standard license file was verified; no blanket asset grant inferred. Study, do not clone.

## Shared navigation contract for all directions (P)

- Permanent name/home, Software, Robotics, Photography, About, résumé and contact links. Narrow screens keep name/résumé/contact plus wrapping section text links; do not hide every route behind icons.
- One navigation anchor per labeled portal, containing model region, section name and summary; decorative model gets no extra tab stop. Proposed destinations: /projects, /robotics, /photography, /about; architecture resolves final names. Text and object routes agree.
- Selected work also appears on the homepage with verified role/problem/outcome/status and GitHub/demo links. Case studies keep readable titles, normal paragraphs, figure captions and direct URLs. No invented metrics or unconfirmed résumé links.
- Hover may preview. Focus immediately shows a persistent outline/underlined label without moving anything or navigating. Enter follows the anchor. Preserve native link/open-new-tab/Back behavior.
- First touch follows the link; never require hover-emulation, drag, aim, throw, double tap or a preview drawer first. Press feedback is decorative. No sound by default.
- Navigation starts immediately; decorative responses must not delay it. Text links bypass decorative transitions. No full-screen white camera flash; use a dark shutter edge confined to the object region.
- Reduced motion uses static objects/posters and instant focus indication; no bounce, orbit, zoom, page travel, shutter movement, trace pulse or autoplay. Same content/routes. Performance owner validates preferences/manual motion-off in approved implementation.

## Exactly three proposed directions

### A — Field Notes (recommended)

**Concept/evidence:** engineering field journal with four exhibited specimens, fine rules and concise captions. Learn display/reading separation from [Maggie](https://maggieappleton.com/) and restraint from [Paco's redesign](https://paco.me/writing/redesign-2021), not their artwork.

**Palette P:** paper #F4F1E8; ink #202824; deep green links/focus #245744; sage inset #DDE5D7; rust #A54D32 only in About/basketball or limited annotation. Ink carries body/captions; fine rules decorative. Contrast unmeasured.

**Fonts P:** Newsreader medium display + Inter regular/medium body/UI. [Newsreader author repo](https://github.com/productiontype/Newsreader) describes screen-reading intent; [Inter specimen](https://rsms.me/inter/) describes text/display optical sizing. Actual [Newsreader OFL](https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/OFL.txt) and [Inter OFL](https://raw.githubusercontent.com/rsms/inter/master/LICENSE.txt) fetched. Pairing not claimed as reference-site typography. Fallback Georgia/system sans.

**Desktop P:** left 5/12 conceptual columns: short identity, two-line role, Software/Robotics shortcuts, résumé; right 7/12: roomy 2×2 specimen layout with one pale inset, baseline, index, label and summary per object. Reading order Microchip, Robot, Camera, Basketball. Below: ruled selected-work index with real screenshots and article introductions. No shared 3D desk/room.

**Mobile P:** identity and visible shortcuts, then four full-width compact specimen rows, object left/label and summary right; selected work follows. Avoid a tiny 2×2 target grid. Headline wraps naturally without covering objects.

| Object | Idle / hover P | Click motif P; immediate navigation |
| --- | --- | --- |
| Robot | One small head-settle then still; hover looks toward label. | One step across its own baseline. |
| Basketball | Gentle partial turn then rests; one contained hover lift. | Small arc to a drawn ring inside About panel. |
| Camera | One lens-settle then stable; still hover focus bracket. | Dark shutter edge crops only its panel. |
| Microchip | One trace sweep then still; hover highlights a trace. | Trace meets caption rule as Software appears. |

**Focus/touch/reduced P:** outline full specimen and underline label instantly; first tap navigates with border feedback; reduced motion uses still pose/bracket/trace and instant route. One settling event per object, no four simultaneous infinite loops.

**Tradeoff:** best balance across four interests; soft materials can unify unlike models. Risk: generic stationery or quaintness. Use precise technical copy/screenshots, restrained serif, no handwriting/aged textures. Medium-high fit confidence; model/material consistency awaits assets lane.

### B — Instrument Panel

**Concept/evidence:** dark engineering catalogue with four isolated equipment bays and plain captions. [Brittany](https://brittanychiang.com/) supplies dark reading precedent; [Rauno's Craft](https://rauno.me/craft) supplies bounded experiment precedent, not a copied layout.

**Palette P:** charcoal #151B24; off-white #EDF2F7; slate bays #242E3C; muted text #B6C2CF; cyan #73D8EA; optional periwinkle #B9B2FF. Orange only on basketball/About, no sports branding. Contrast unmeasured; no thin luminous body text.

**Fonts P:** IBM Plex Sans headline/body; Plex Mono only indices/dates/short metadata. [IBM specimen](https://www.ibm.com/plex/); actual [Sans OFL](https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexsans/OFL.txt) / [Mono OFL](https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/OFL.txt) fetched, including reserved name Plex. Fallback system sans/mono; no mono long-form articles.

**Desktop P:** name/role and editorial headline; narrow left index plus four equal central bays on wide screens, 2×2 at intermediate widths. Visible labels/summaries below each model; selected projects immediately below in large readable text/screenshots. Decorative 2D grid, no cockpit controls.

**Mobile P:** remove left rail/grid marks; stack four horizontal bays after identity/text nav. Single reading column for projects, metadata above body; no swipe-only deck.

| Object | Idle / hover P | Click motif P; immediate navigation |
| --- | --- | --- |
| Robot | One eye readiness cue then steady; slight hover head turn. | Small bay-edge opening and one contained step. |
| Basketball | Still support pose; hover rotates seams once. | Small arc through local thin ring. |
| Camera | Stable lens; one hover bracket settles into place. | Dark aperture mask inside bay. |
| Microchip | One initialization trace then steady; hover highlights second trace. | Short line reveal into Software heading, no fake progress. |

**Focus/touch/reduced P:** solid double-edge bay border plus underlined label, never glow alone; touch border acknowledgment and first-tap route; reduced motion freezes ready pose and routes instantly. No scanning loops, parallax, boot intro or moving focus highlight.

**Tradeoff:** strongest technical signal; bays contain varied silhouettes. Risks familiar neon-dev aesthetic and less natural photography presentation. Keep cyan scarce and photos neutral. More demanding dark-surface lighting than A; medium confidence, no actual rendered contrast test.

### C — Object Index

**Concept/evidence:** bold exhibition index with oversized section names and four standalone objects punctuating a ruled 2D list. [Rauno's captured panel](https://rauno.me/) motivates graphic typography; [Hakim's catalogue](https://hakim.se/) motivates named experiments.

**Palette P:** near-white #FAFAF6; near-black #171717; cobalt #263DB5; pale lilac #E3DDF2; small yellow decorative block #F0E773. Black reading text, underlined cobalt links; yellow never text or sole state indicator. Basketball orange localized. Contrast unmeasured.

**Fonts P:** Space Grotesk bold section names, Inter paragraphs/nav. [Space Grotesk author repo](https://github.com/floriankarsten/space-grotesk); actual [Space Grotesk OFL](https://raw.githubusercontent.com/google/fonts/main/ofl/spacegrotesk/OFL.txt) and [Inter OFL](https://raw.githubusercontent.com/rsms/inter/master/LICENSE.txt) fetched. Fallback system sans with size/weight distinction. No screenshot font guess.

**Desktop P:** compact identity/role; four broad ruled rows containing number, large title, short descriptor, model and arrow. Objects vary position inside a fixed side region, never overlap words/body. Ordinary anchors, no full-screen carousel. Work articles use quieter type, real figures and captions.

**Mobile P:** single vertical index; bold title left, object right, descriptor below. If crowded, move model above title rather than truncate; no sideways scrolling. Résumé/contact visible before index.

| Object | Idle / hover P | Click motif P; immediate navigation |
| --- | --- | --- |
| Robot | Still three-quarter sculpture; hover greeting tilt. | Small lateral step matching row arrow. |
| Basketball | One settling turn then still; one contained hover bounce. | Short local upward arc to small circular target. |
| Camera | Still side profile; slight hover lens turn. | Dark shutter stripe across object region only. |
| Microchip | Still oblique chip; hover pin/trace highlight. | Geometric line joins object region to row rule. |

**Focus/touch/reduced P:** instant whole-row outline/underlined title; optional hover color block never moves label/hit area. First tap routes with inset border; reduced motion keeps still sculpture/static arrow. No viewport zoom or word morph.

**Tradeoff:** most graphic and easy to scan by title. Oversized rows increase distance to selected projects; add Selected work jump link before index and keep headline short. Varied silhouettes/long labels need narrow-width review. Medium confidence.

## Concise comparison

| Design criterion, not measured | A — Field Notes | B — Instrument Panel | C — Object Index |
| --- | --- | --- | --- |
| Distinction | Warm serif + 2×2 specimens | Dark sans/mono + equipment bays | Bold grotesk + ruled rows |
| Best quality | Balanced technical/creative personality | Technical precision | Graphic identity and clear section names |
| Navigation risk | Models mistaken for illustrations | Controls mistaken for dashboard | Index delays work evidence |
| Mobile | Compact labeled specimen rows | Stacked bays, remove rail/grid | Smaller rows, separate object region |
| Asset demand | Soft material/light consistency | Dark-background silhouettes | Cutout silhouette/scale consistency |
| Recommendation | **Recommend for review** | Technical alternative | Expressive alternative |

Choose A for lead review because it accommodates diverse objects without a world metaphor or making personal interests look like software controls. Shared navigation contract survives any choice. No user preference or approval inferred.

## Failures and uncertainties

- In-app browser unavailable; Chrome worked. Bruno scene remained blank in captured attempt; cause unknown, no general availability claim.
- https://www.joshuasworld.com/ inaccessible to text fetch, excluded. Guessed https://github.com/brittanychiang/v5 returned 404; corrected through author-linked bchiang7/v4, not assumed current source.
- https://hakim.se/focussss/ returned cache miss; historical Brittany v4 live fetch returned UnexpectedStatusCode.
- [Google Fonts Newsreader specimen](https://fonts.google.com/specimen/Newsreader) had zero readable lines; author repo and actual OFL used instead.
- Cassie's current closure page supersedes remembered older portfolio. Sara explicitly reports redesign underway.
- Unknown: final copy/résumé/project links, actual model/material compatibility, individual asset rights, preferred identity, responsive fit, contrast, focus/touch/reduced-motion correctness and real loading/animation behavior.
- No site certified for accessibility/mobile/performance. Models, photos, textures and music need independent rights checks even where code is MIT.

## Exact next steps for lead

1. Review this report and three-row comparison; integrate A recommendation and evidence limits in synthesis. Only lead updates TASKS/UPDATE/DECISIONS; T1 can be marked Ready for review.
2. Reconcile A's soft-light/material requirement with assets research; ask architecture to retain equivalent semantic routes and performance owner to review motion/focus contract. No stack choice implied.
3. Present these three options and A recommendation at the existing visual approval gate. This researcher requests no approval and assumes none.
4. After applicable approval only, scope robot proof of concept: one Robot/Robotics anchor, text route, still fallback, idle/hover/activation, immediate keyboard focus, first-tap touch, reduced-motion bypass.
5. Approved review should check real longest labels/headline at narrow widths, real model/background silhouette, immediate work access, direct links/Back, camera no-flash alternative and nonblocking motion. Record actual tests under responsible owners before expanding to four objects.

## Phase 2 — actual robot prototype visual review

**Reviewed:** 2026-11-01 05:08:16 UTC. **Status:** Ready for review with two material issues and one validation item. This section supersedes Phase 1's pending-approval/current-work statements; the earlier report remains historical. User approved provisional Field Notes and the robot proof only. The app is a provisional art-direction implementation, not a completed portfolio; missing camera/basketball/microchip and real case studies are intentional scope, not defects.

### Evidence inspected and limits

- **Image observed, not browser operated:** opened all three actual files using view_image: [desktop](../docs/evidence/homepage-desktop.png), [mobile](../docs/evidence/homepage-mobile.png), [inline reveal](../docs/evidence/robotics-reveal.png). Desktop/reveal show RobotExpressive in a sage specimen panel; mobile shows the static illustrated SVG. These are still/full-page captures, not an animation, scrolling or physical-device test.
- **Source read:** [homepage DOM](../src/app/page.tsx), [robot specimen/disclosure DOM](../src/features/robot/RobotSpecimen.tsx), [styles](../src/app/globals.css), [robot scene](../src/features/robot/RobotScene.tsx), [robotics route](../src/app/robotics/page.tsx), layout, and relevant [browser test definitions](../tests/prototype.spec.ts). Source inspection establishes intended behavior, not a rerun result.
- **Recorded by lead, not measured by design:** [browser-observations.json](../docs/evidence/browser-observations.json) labels its environment headless Chrome with software SwiftShader and viewport/touch emulation. User reports initial 13 browser tests passing, including Enter/Space, touch, reduced motion, no-WebGL/model-error/context-loss/offscreen and actual static-export checks. Definitions were read; design did not rerun these or independently validate their aggregate pass count. Native user Chrome has WebGL disabled and uses fallback per user report; that is distinct from the software-rendering evidence.
- **Fonts:** globals.css declares Georgia/Times New Roman for serif and Arial/Helvetica for sans, using local/system faces. No Newsreader/Inter download is implemented or required for this prototype review. Their absence is not a defect. Actual font resolution across operating systems remains untested.
- **Not verified:** physical mobile, live animation quality, hardware rendering, focus visibility in operation, complete screen-reader behavior, computed contrast or zoom/reflow. No new design research, browser control, app edits, builds or test execution performed by this reviewer.

### What the captures establish

The warm paper/sage palette, large serif identity and fine rules visibly form a coherent Field Notes shell. Desktop keeps the robot separate from readable text; the inline reveal remains distinct in the left column without overlapping the model. The mobile capture stacks copy above a contained static robot and shows both Robotics text navigation and Explore robotics, so the static illustration still has an understandable destination. No headline/model collision or horizontal clipping is apparent in these specific captures. This does not establish all breakpoints or physical-device readability.

The independent robotics anchors and the specimen's native button with aria-expanded/aria-controls match the approved Phase 2 **inline disclosure** contract. This explicitly supersedes Phase 1's proposal that every object must be an anchor. The disclosure itself is not a defect; the visible action wording needs to describe it.

### Material findings sent to lead before final handoff

**D2-01 — P2, confirmed image + CSS: essential instructions and controls are too small in the composition.** The specimen's interaction hint, keyboard instruction and motion/state controls are visually much smaller than nearby body text in both homepage captures. globals.css sets .specimen-toolbar p to 8px, its child span to 7px, .scene-status to 7px, and desktop .control-button to 8px (10px in the narrow breakpoint). These are operating instructions/status, not just decorative folio labels. The issue is legibility/hierarchy; no contrast failure or standards violation was measured. **Proposed revision:** make actionable/control/instruction text approximately 12–14px, allow wrapping and keep it distinct from decorative micro-labels. Preserve existing touch padding; recheck toolbar fit on desktop and narrow screens after enlarging. Do not enlarge every decorative coordinate or reopen typography selection.

**D2-02 — P2, confirmed image + DOM: the visible call to action suggests a route, but the robot opens a preview.** Both homepage captures show “Hover to say hello. Click to explore.” and a ↗ arrow; the visible button pill says “A little curious. Just like you.” RobotSpecimen.tsx's activation dispatch reveals an inline section, and a separate link then opens /robotics/. That behavior is authorized and useful, but “explore” plus a navigation-shaped arrow does not explain the immediate result. The same hover/click hint also appears in the static mobile capture. **Proposed revision:** use a visible label such as “Meet the robot — preview robotics,” with touch-neutral “Activate to preview” support or a tap-specific variant. Give the disclosure a reveal cue rather than the same ↗ used for route links; retain Explore robotics as the direct route. Keep aria-expanded/controls and the native Space/Enter button behavior. This is a wording/affordance correction, not a request to convert the disclosure into navigation or add another interaction step.

**D2-03 — P2 validation item, source-supported risk, NOT reproduced: verify the revealed result is actually in the mobile viewport.** RobotSpecimen.tsx places the preview in .hero-copy before the specimen panel (preview around lines 76–81, panel starting line 84). On activation it focuses the preview heading using focus({ preventScroll: true }) around lines 63–65. Narrow CSS stacks that copy above the specimen; a visitor can be scrolled down to tap the robot while the newly revealed result is above it. Browser scroll anchoring may affect the exact outcome, so these screenshots alone do not prove an offscreen-result bug. The existing mobile test taps and asserts toBeVisible, but does not explicitly assert the heading is in the viewport. **Exact check requested:** at 390×844, scroll until the robot is the primary visible content, activate once, and capture the resulting viewport/focus position; repeat via keyboard at a narrow layout. If the focused result is offscreen, ensure it is brought into view immediately (without smooth motion under reduced motion) or place the disclosure where activation and result remain adjacent. Add a viewport assertion if a defect is reproduced. Existing desktop reveal capture does not cover this case.

### Review disposition and exact handoff

No additional art direction or broad redesign is proposed. Address D2-01/D2-02 within the bounded robot revision; validate D2-03 before calling the mobile reveal experience reviewed. No visually observed blocker requires abandoning Field Notes or replacing RobotExpressive. This is not full-site or expansion approval, nor accessibility/performance sign-off.

Lead next actions: (1) triage the two confirmed issues and the one explicitly unconfirmed visibility risk; (2) if revised, provide fresh desktop/mobile screenshots and a mobile post-activation viewport; (3) retain reported test provenance and obtain remaining physical-device/font/contrast/screen-reader evidence through the responsible owner; (4) stop at robot review before adding other objects. Only research/design.md, updates/design.md and handoffs/design.md were changed by design.
