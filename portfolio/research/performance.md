# Performance, accessibility and recruiter experience — Research

**Owner:** performance  
**Status:** Ready for review; proposals only  
**Sources checked:** 2026-11-01 UTC  
**Scope:** T4: mobile WebGL/loading, accessibility, CWV/SEO, compression/animation fidelity, fallback routing. Architecture owns stack selection.

## Recommendation to lead

Propose immediately readable HTML with ordinary destination/case-study links and reserved-size object posters. Enhance the robot only after the shell is usable. Start mobile/coarse-pointer and reduced-motion visits static, with a separate optional **Enable 3D** button. Navigation must remain available during loading, animation and failure. Mobile WebGL availability is not proof of adequate performance.

For the approved robot experiment, compare staged glTF Transform optimization against gltfpack on the same licensed original. Retain an uncompressed baseline; investigate Meshopt for geometry plus animation and Draco where geometry dominates. Choose using total transfer, decoding/upload time, responsiveness and retained rig/visual quality. These are proposals, not approved dependencies or implementation authorization.

## Verification levels and limits

- **F — fetched documentation:** Original standards, official guidance and maintainer docs read through web fetch. W3C Understanding pages explain the normative [WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/); they are informative.
- **R — fetched repository/source/license:** Repository, source excerpts and root license text inspected remotely. This is not execution or a full dependency/model license audit.
- **B — browser observed:** None. No interactive rendering, animation, keyboard or mobile behavior observed.
- **M — measured:** None. No app exists; no website tests, benchmarks, model conversion or implementation downloads occurred.

Git check: `git status --short --branch` in the work root returned exit 128, “not a git repository.” Source branches are mutable; pin revisions/versions before future adoption. All numbers marked **H** are planning hypotheses, not measured results.

## Findings and critical comparisons

### 1. Semantic links and readable HTML should be independent of 3D

**F:** Google documents discovery through `<a href>` links, recommends History API URLs rather than fragment-based page routing, and recommends server/pre-rendering because some bots cannot execute JavaScript. Unique titles/descriptions and consistent canonicals also matter. [Google JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

**Proposal:** Put visible named anchors in initial HTML, provisionally `/robotics/`, `/about/`, `/photography/`, `/projects/`, plus independent case-study paths. Render name, short role statement, project summaries and GitHub/demo/contact links without canvas or JS. Provide navigation/main landmarks, headings and skip link. The robot visual enhances a semantic anchor; it does not become the only navigation mechanism. Hide purely decorative canvas from assistive technology without hiding any focusable anchor inside that subtree. Avoid duplicate keyboard stops for an identical canvas target and label link.

**Comparison/limit:** HTML-first delivery imposes a requirement on architecture without selecting a framework. Crawlability does not guarantee indexing or ranking. A route that only works after visiting home fails the proposed recruiter experience.

### 2. CWV are field criteria; Lighthouse loading tests cannot establish INP

**F:** Official good thresholds: **LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1**, assessed at the **75th percentile**, segmented mobile/desktop. Lab measurement does not replace field data. Lighthouse load audits use TBT as a responsiveness proxy and do not measure INP without user interactions. [Official Web Vitals guidance](https://web.dev/articles/vitals). INP concerns responsiveness to the next paint, not completion of all asynchronous consequences. [Official INP definition](https://web.dev/articles/inp).

**Proposal:** Record lab LCP/CLS/TBT, then separately record scripted click/tap/key latency during loading and animation. Label those **lab interaction samples**, never field INP verification. After launch assess real-user p75 by device class; low portfolio traffic may leave CrUX unavailable. Do not substitute a Lighthouse score or smooth animation for field CWV evidence.

Reserve poster/canvas dimensions; keep likely LCP text/poster discoverable in initial HTML; defer renderer/decoders/models. An above-fold poster that is the LCP candidate should not be lazy-loaded. [Google LCP optimization](https://web.dev/articles/optimize-lcp). Deferral is a strategy requiring traces, not evidence that the site passes.

### 3. Pause controls and reduced motion solve different requirements

**F:** Automatically starting movement lasting over five seconds beside other content needs pause/stop/hide unless essential; pausing only while focused is insufficient. [SC 2.2.2, Level A](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). Disabling nonessential interaction motion is [SC 2.3.3, AAA](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html), not an AA criterion. Content must not flash more than three times in any one-second period unless below general/red flash thresholds. [SC 2.3.1, A](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html).

**Proposal:** Prefer finite idle gestures. If continuous movement is retained, provide persistent **Pause motion / Resume motion** controlling all objects, eye glows, camera and circuit effects. Respect reduced-motion initially and on live preference changes: static pose, immediate navigation, no parallax/travel/bounce. Enabling 3D must not override reduced motion. Pause persists through hover/focus, scrolling offscreen and return. Remove the camera flash effect from the proof; avoid flashing instead of depending on area exceptions.

**Comparison/limit:** A loop shorter than five seconds does not excuse endless repetition. A short transition can still disturb someone. Product support for reduced motion is recommended beyond the specific AA baseline; neither toggle alone establishes overall WCAG conformance.

### 4. Keyboard, touch and visible focus need separate checks

**F:** [Keyboard, SC 2.1.1 A](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html); [visible focus, SC 2.4.7 AA](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html); [focus not entirely obscured, SC 2.4.11 AA](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html). [Target Size Minimum, SC 2.5.8 AA](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) specifies **24×24 CSS px with spacing/equivalent/inline/user-agent/essential exceptions**, not 44 px AA. Drag functionality needs a single-pointer alternative under [SC 2.5.7 AA](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html). Ordinary click/up-event activation supports [pointer cancellation, SC 2.5.2 A](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html).

**Proposal:** **44×44 CSS px** primary targets are a stricter project choice. Keep labels visible on touch; first tap navigates rather than revealing a hover label. No required dragging/orbiting, timed keystroke or precise mesh contact. Enter activates native anchors; Space/Enter activates native buttons. Keep focus fully visible, stronger than the partial-visibility minimum, and preserve modified click/new-tab behavior.

**Comparison/limit:** DOM hit regions are easier to target than a moving thin mesh, but must not overlap. Keyboard operation does not itself provide a touch alternative to dragging. A glowing robot eye is insufficient as the sole focus cue.

### 5. Mobile quality must account for pixels, lifecycle and GPU memory

**F:** MDN documents conservative VRAM estimates, smaller back buffers, batching, disposal and lack of a portable maximum-VRAM query. [WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices). Hidden-page state and viewport intersection are separate signals: [Page Visibility](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API), [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

**Proposal:** Limit DPR, use simple materials/baked lighting and no initial real-time shadows, bloom, physics or fullscreen postprocessing. Prefer coordinated rendering rather than four unbounded independent loops, subject to architecture review. Pause mixers and draw submission offscreen/hidden, stop unnecessary scheduling, and dispose owned resources/listeners on teardown. Resume only if user motion settings permit.

**Comparison/limit:** DPR 2→1 quarters drawing-buffer pixel count (**arithmetic, not a measured speedup**) but softens edges. Triangle counts miss skinning/fill-rate/material costs. CPU-throttled desktop emulation does not test a phone GPU, memory pressure or thermal behavior.

### 6. Compression must preserve both residency and robot animation quality

**F/R:** [glTF Transform Meshopt](https://gltf-transform.dev/modules/functions/functions/meshopt) covers geometry, morph targets and animation and wraps reordering/quantization/compression. [Resample](https://gltf-transform.dev/modules/functions/functions/resample) documents lossless duplicate-keyframe removal. [Khronos Draco extension](https://raw.githubusercontent.com/KhronosGroup/glTF/main/extensions/2.0/Khronos/KHR_draco_mesh_compression/README.md) compresses geometry; do not describe it as animation compression. [gltfpack guide](https://raw.githubusercontent.com/zeux/meshoptimizer/master/gltf/README.md) documents mesh/node merging, animation quantization/resampling and named-node/material retention controls.

**F:** [KHR_texture_basisu](https://raw.githubusercontent.com/KhronosGroup/glTF/main/extensions/2.0/Khronos/KHR_texture_basisu/README.md) permits ETC1S/UASTC in KTX2, gives usage-specific guidance and notes that UASTC non-color maps may require uncompressed RGBA fallback when suitable GPU formats are absent. A KTX2 container does not guarantee a particular resident memory size.

**Proposal:** Compare original → lossless cleanup → controlled lossy variants. Trial ETC1S color/UASTC sensitive normal or roughness maps; inspect color space/mips. Smaller JPEG/WebP transfer does not imply GPU block compression. Account for environments, fallback residency and decoder/transcode cost. Preserve robot joint names, articulation, required clips and external animation hooks; do not flatten/merge blindly.

**Comparison/limit:** No universal Meshopt-vs-Draco winner was measured. Decoder cost, shared reuse, actual loader extensions and asset distribution decide. Test every clip, silhouette and transition seam; byte savings do not prove retained animation quality.

### 7. Context loss must degrade visuals without changing destinations

**F:** Khronos provides real loss/restoration simulation with `WEBGL_lose_context`. Restoration is asynchronous; restorable handling requires the proper lost-event behavior, including `preventDefault()`. [Ratified extension specification](https://registry.khronos.org/webgl/extensions/WEBGL_lose_context/).

**Proposal:** Keep posters/anchors outside renderer lifecycle. No WebGL, denied context, unsupported required extension, decoder/model error, timeout and context loss all retain the same destination URLs in static form. Cancel pending transitions, preserve focus and avoid mandatory reload/retry loops. Announce an error once if it explains explicitly requested 3D; offer manual retry.

**Comparison/limit:** For the proof, static navigation after loss is mandatory; successful 3D restoration is optional and separately recorded. Dispatching a synthetic DOM event alone does not establish GPU resource loss/recovery.

### 8. Readability cannot depend on a moving background

**F:** Normal text generally requires 4.5:1 contrast; qualifying large text 3:1, with exceptions. [SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Meaningful control/state graphics generally require 3:1 against adjacent colors. [SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). Vertical content must reflow at 320 CSS px without two-dimensional scrolling except essential two-dimensional content. [SC 1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

**Proposal:** Put labels/focus indicators on stable 2D surfaces and test contrast in normal/focused/paused states. Recruiters reach a robotics case study in one ordinary link activation and can read its summary while 3D fails. Automated checks supplement manual screen-reader, reflow and focus inspection; they cannot establish conformance alone.

## Three accessible repositories/tools — documentary verification

All three repository URLs returned readable content. **No live working-demo claim is made.**

| Tool and evidence | Verification / root code license | Useful comparison and limitation |
| --- | --- | --- |
| [glTF Transform](https://github.com/donmccurdy/glTF-Transform), [CLI docs](https://gltf-transform.dev/cli), [CLI source](https://raw.githubusercontent.com/donmccurdy/glTF-Transform/main/packages/cli/src/cli.ts) | F/R: inspect/optimization docs and source excerpts fetched; [MIT text](https://raw.githubusercontent.com/donmccurdy/glTF-Transform/main/LICENSE.md) read | Staged inspection/cleanup/compression gives control for articulated assets. Docs warn defaults may not fit all scenes. No execution or model-rights clearance. |
| [meshoptimizer / gltfpack](https://github.com/zeux/meshoptimizer), [guide](https://meshoptimizer.org/gltf/), [source](https://raw.githubusercontent.com/zeux/meshoptimizer/master/gltf/gltfpack.cpp) | F/R: docs/source excerpts fetched; [MIT text](https://raw.githubusercontent.com/zeux/meshoptimizer/master/LICENSE.md) read | Compare integrated packing with staged transforms. Aggressive node/material changes may affect interaction hooks; preserve names explicitly and verify loader support. No execution or asset license grant. |
| [Khronos Sample Viewer](https://github.com/KhronosGroup/glTF-Sample-Viewer), [README](https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Viewer/main/README.md), [main source](https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Viewer/main/src/main.js) | R: WebGL2 initialization/render-loop excerpts inspected; [Apache-2.0 text](https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Viewer/main/LICENSE.md) and [third-party notices](https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Viewer/main/THIRDPARTY.md) fetched | Independent visual inspection reference, not scaffold. Source uses device DPR and schedules RAF continuously while rendering conditionally: source inspection, not a measured performance judgment. Models/environments/dependencies require separate checks. |

Retain required MIT code notices; Apache redistribution conditions include license/notice retention and modification marking as applicable. Root code licenses are not a complete dependency audit. Khronos directs users to individual model READMEs for detailed asset licensing. [Sample Assets guidance](https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/README.md). No robot model, animation, texture, HDR environment or font is licensed or approved by this research.

[Sample Viewer demo](https://github.khronos.org/glTF-Sample-Viewer-Release/) and [glTF Report](https://gltf.report/) fetched with no readable lines; rendering/functionality remains unverified. A guessed RobotExpressive model path returned 404, so no model license is inferred. Guessed root `LICENSE` paths also returned 404; corrected repository-listed `LICENSE.md` texts above were fetched successfully.

## Alternatives compared

| Approach | Benefit | Cost / risk | Proposed fit |
| --- | --- | --- | --- |
| Static posters + anchors | Least runtime demand; survives no JS/WebGL | Less tactile; image transfer still matters | Required baseline/failure state |
| Deferred selective 3D | Keeps object concept while isolating loading | State handling; decode/GPU work still competes later | Recommended robot experiment; mobile opt-in default |
| Immediate four-object autoplay | Immediate motion when successful | Simultaneous fetch/compile demand and continuous-motion controls | Do not start here |
| Prerendered video/animated image | Predictable art without WebGL | Transfer/playback/pause/reduced-motion costs; no true object interaction | Asset-specific option; not automatically cheaper or accessible |

## Numeric initial budgets — H, planning hypotheses only

KiB = 1024 bytes; MiB = 1024 KiB. These are proposed experiment gates, **not measurements, universal device limits, standards or approvals**. Transfer counts compressed response bodies once per cold visit, including external decoders/environments; cache hits and headers are recorded separately.

| Area | H: initial target | Future verification |
| --- | --- | --- |
| Initial 2D shell | ≤300 KiB: HTML/CSS ≤60, initial JS ≤80, fonts ≤60, posters ≤100 KiB; zero model/3D decoder bytes before enhancement gate | HAR by phase; links readable before enhancement; system fonts if needed |
| Deferred robot | ≤1.5 MiB additional total; planning split JS/WASM/decoders ≤350 KiB, GLB including textures/clips ≤900 KiB, environment ≤250 KiB | Include every lazy import/external request; shared costs counted once |
| Deferred four-object set | ≤4 MiB additional aggregate, including renderer/decoders and all objects/environments | Ceiling for later investigation, not permission for simultaneous loading |
| Textures | Default max 1024×1024/map; robot resident texture estimate ≤16 MiB; complete scene ≤32 MiB including environments/mips and worst-case RGBA fallback | Inventory dimensions/upload format/mips. Separately report buffers, render targets and temporary decode memory; texture cap is not total VRAM |
| Geometry/draws | Robot ≤40k visible triangles, ≤30 draws/frame; combined later scene ≤120k, ≤80 draws/frame | Worst pose and all passes; counters are not speed guarantees |
| DPR | Mobile initial 1, cap 1.5 after evidence; desktop cap 2 | Record CSS and drawing-buffer size; reduce to 1 before adding complexity |
| Framerate | Mobile target 30 fps during motion; desktop 60 fps aspiration; mobile p95 rendered-frame gaps ≤50 ms over 30 s | Count submitted/presented frames, not RAF callbacks alone; repeat after 5 min |
| Offscreen/hidden | Stop continuous object work within 500 ms; zero object draws in next 10 s steady state | Mixer/draw counters and traces; allow one state-change draw; no catch-up burst |
| Transitions/loading | Optional enhancement ≤400 ms, skippable; 3D loading timeout 10 s | Links never await assets or animation completion; timeout yields poster/manual retry |
| Lab loading | Five cold runs, each LCP ≤2.5 s and CLS ≤0.1; TBT ≤200 ms diagnostic target | Proposed lab rule borrowing CWV numbers, not field p75 proof. TBT target is our hypothesis, not INP applied to TBT |

Calculated example, not a model measurement: one 1024² RGBA8 texture uses 4 MiB at base level, approximately 5.33 MiB with full mip chain; four use approximately 21.33 MiB. Thus four 1K maps can exceed the robot texture hypothesis despite small downloads. [Mip allocation guidance](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices).

## Robot proof acceptance matrix — ALL NOT RUN

Future test protocol; no row passes through documentary research. Record device/browser version, artifact revision, exact steps, expected/actual result and evidence. Paths remain provisional. Standards references are in findings 1–8 above; project choices such as no-JS operation and 44 px targets are deliberately identified.

| Scenario | Actual future procedure | Required outcome / evidence |
| --- | --- | --- |
| Keyboard | Cold load; Tab/Shift+Tab through skip link, four destinations, motion/3D controls; Enter anchors; Space/Enter buttons; repeat while loading/paused | No trap; visible unobscured focus and meaningful order; every route accessible. Recording/focus captures |
| Touch | Physical Android Chrome and iOS Safari: first tap, scroll from card, down then cancel/move away; portrait/landscape; inspect CSS boxes | Visible labels; one tap navigates; scrolling/cancel does not accidentally navigate; ≥44×44 project targets; no required drag |
| Reduced motion | OS preference before cold load, then toggle during animation; repeat Enable 3D, hover and focus | Static pose, no parallax/bounce/travel; immediate destinations; preference changes respected without reload |
| Pause / flashes | Observe >10 s; pause and tab/scroll away; leave/return; rapidly repeat activations | Motion stays paused until explicit resume; no shutter/strobe or flashing sequence. Record worst-case rapid interactions |
| No WebGL | Future harness forces context creation null/throw before init; separately test browser GPU-disabled configuration with JS enabled | Poster/anchors survive; no crash/blank overlay or mandatory retry. Distinguish injected simulation from device result |
| Context loss | Existing renderer context: call extension loseContext; repeat idle and during navigation; after lost event completes optionally request restoreContext | Genuine lost event; anchors/focus work, poster shown, no stuck transition/reload loop. Restoration optional. Extension unavailable means unavailable, not pass |
| Offscreen / background | Draw/mixer counters + trace: fully offscreen 10 s, background tab 10 s, return; repeat user-paused | Work stops within H limit, no catch-up/override. Use remote/external capture for hidden interval; frozen screenshot alone proves nothing |
| No JS | Disable JS; cold-load home and all section/case-study paths; follow links | Useful initial HTML, real anchors/posters, no indefinite skeleton. Save HTTP HTML/status/screenshots; product resilience rule |
| Deep links / history | Fresh direct /robotics/ and case-study URL, hard reload, modified click/new tab, back/forward, nonexistent URL | Intended content/status 200 without home boot; genuine 404 for missing path; title/canonical/history correct. HTTP evidence |
| Asset/network failure | Block GLB, decoder JS, WASM, texture individually; stall beyond 10 s; navigate before completion; retry | Navigation unaffected, bounded timeout, stable poster/layout, no retry storm or late render over destination. HAR/console |
| Assistive technology | VoiceOver/Safari and NVDA/Firefox: inspect link/control names, landmarks/headings and route navigation | Equivalent named destinations; no decorative canvas chatter; destination heading discoverable. Manual transcript |
| Reflow/contrast | 320 CSS px; 400% zoom at 1280 px; normal/focus/paused states | No loss or two-dimensional scrolling for ordinary text; applicable 4.5:1 text/3:1 state graphics. Screenshots/contrast records |
| Loading/interaction/thermal | Run protocol below static/enhanced; activate links/control during decode/first draw; repeat after 5 min | Real traces against H gates; functional routes pass independently of rendering quality; no field-INP claim |
| Animation fidelity | Same camera/light/time: compare original and each optimized clip, start/25/50/75/end plus scrub, loops/joins/hands/feet/eyes | Required clips/nodes retained; no introduced snapping, foot slide, silhouette collapse, shimmer or seam break. Paired captures/reviewer verdict; numeric visual-error tolerance awaits asset/art review |

Context loss procedure follows the [Khronos extension specification](https://registry.khronos.org/webgl/extensions/WEBGL_lose_context/); a synthetic DOM event is insufficient. Semantic/deep-link expectations follow [Google routing guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics). This matrix is not a complete WCAG audit.

## Measurement protocol after prototype approval

1. Freeze artifact and real device inventory: proposed minimum one physical midrange Android (record SoC/RAM), one physical iPhone, integrated-GPU laptop. Record OS/browser versions; emulator coverage is additional.
2. Five cold and five warm loads per selected setup, static/enhanced separately. Proposed repeatable lab network: **1.6 Mbps down / 750 Kbps up / 150 ms latency**; **4× CPU slowdown only on desktop simulation**. These are H settings, not universal mobile conditions. Separately run unthrottled physical phones; document cache/storage/service-worker state.
3. Save HAR and trace, compressed bodies by phase, LCP element/timing, layout shifts, TBT, draw/triangle counters, texture estimates. Separate decoder startup, decode/transcode, GPU upload, first draw and visible usable 3D. Label unavailable GPU/presentation measurements and memory estimates honestly.
4. Record browser interaction timing during enhancement/animation using DevTools/Event Timing where available. These are lab samples, not field INP. Capture 30 s of actual rendering and repeat after 5 min. Report all run values/worst case, never present five samples as population p75.
5. Compare uncompressed baseline, staged Meshopt and Draco geometry variant under identical settings, including shared decoder costs. Confirm original vs optimized rig/clip fidelity. Different renderer tone mapping means Sample Viewer is an additional reference, not pixel ground truth.
6. Record each matrix row as not run/unavailable/fail/pass. Proposed proof gate: no navigation/accessibility-path failure; H budgets met or explicitly revised by lead from evidence. Persistent mobile failure at DPR 1 means simplify assets and retain static mobile default before expansion.
7. After approved launch, use sufficiently populated RUM/CrUX for mobile/desktop p75 LCP/INP/CLS; record sample sizes/window and unavailable data. TBT and scripted interaction latency remain separate. [Official lab/field distinction](https://web.dev/articles/vitals).

## Uncertainty and exact next steps

- No actual robot model/rig/textures, target device list, loader extension support, decoder size, compression ratio or quality results verified. No browser/live-demo or website test evidence exists.
- Assets agent supplies a per-file model/animation/texture/environment license manifest and attribution/modification obligations. Architecture owns stack/runtime and released-version compatibility; do not infer approval from these tool comparisons.
- Lead: integrate T4 recommendation, H budgets and matrix with T1–T3; propose decisions in synthesis and use existing visual/prototype approval gates. Mobile opt-in and every H number remain proposals.
- After approval only: assign robot proof implementer; begin semantic HTML/fallback behavior and instrumentation, then one licensed robot; collect evidence per matrix before full-site expansion. This researcher requests no preference/approval pause and authorizes no implementation.
