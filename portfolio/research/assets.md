# 3D assets and animation — Research report

## Current checkpoint — lead browser evidence · 2026-11-02 05:07 UTC

**Status: bounded assets documentation complete; lead browser evidence reviewed.** Cinematic with Cozy warmth, preserving the room/licensed assets, supports the authorized robot → Robotics workshop → Back to Desk flow. This refresh edits documentation only; no change to RobotCharacter is needed. The earlier implementation-only verification checkpoint below is preserved as history.

### Actual lead evidence and coverage

The first-flow file currently on disk is [flow-evidence.json](../output/playwright/robot-journey/flow-evidence.json), not the requested `firstflow-evidence.json` filename. Together with [paths-evidence.json](../output/playwright/robot-journey/paths-evidence.json), it records lead-run real browser interaction with visible 3D, rather than source-only checks. Environment: HeadlessChrome **156.0.0.0**, Macintosh/macOS user agent, **ANGLE Vulkan SwiftShader** software renderer; primary viewport **1600 × 1100**. This assets pass reviewed retained JSON and capture/validation scripts, not a new browser run or an independent final visual review.

| Path | Lead evidence result |
| --- | --- |
| Robot hover / authored Wave | **Pass:** `waveStarts=1`; Wave time advances from 0.1333333333 to 0.8226000000 seconds. Right palm world position moves from `[1.943451, 3.445363, -0.251901]` to `[1.585163, 4.138596, -0.448870]`. This establishes actual gesture movement, not merely a changed label or DOM state. |
| Camera approach → workshop → Back | **Pass:** sampled camera movement and workshop/desk states; `sameCanvas=true`, one Canvas, `focusRestored=true`; initial camera position and target restored. |
| Keyboard | **Pass:** Tab reaches robot control and triggers authored focus reaction; Enter enters, Escape returns and restores focus; Space completes another round trip. |
| Invoking orbit / interrupted approach | **Pass:** actual drag changes the view; saved/restored position `[-3.7888696749, 11.4102300801, 12.1483856312]`, reported maximum position error **0** (script also checks target tolerance). Escape during approach leaves the desk active after the stale-completion wait. |
| Manual pause | **Pass:** neutral Idle **0.5 seconds**, action times frozen; render frame **229 → 229** during the sampled 350 ms pause. This is one bounded demand-render observation, not a general performance benchmark. |
| Touch | **Pass under emulation:** **390 × 844**, touch input on the actual robot mesh followed by Back; one Canvas. No physical handset tested. |
| Reduced motion | **Pass:** browser observes immediate destination/return, frozen Idle **0.5 seconds**, `waveStarts=0`, Enter/Escape round trip. Absence of animated camera/fade is additionally supported by the coordinator test, as distinguished in the JSON. Reduced-motion context viewport: **1280 × 900** in the retained validation script. |
| WebGL unavailable / no JavaScript | **Pass:** controlled WebGL context failure exposes notes/retry UI; ordinary robotics notes route works. JavaScript-disabled context follows the noscript link to static notes. |

Both JSON files record empty page-error arrays. The flow capture also retains **one aborted keyboard.glb request** and a **Three.Clock deprecation warning**; do not summarize it as entirely free of network failures/warnings. Screenshot artifacts `01-desk.png` through `10-webgl-fallback.png` are in the same folder, but the lead is refreshing final flow screenshots; their final orientation/label framing and reference comparison are not independently signed off here.

### Asset continuity and remaining limits

Lead reports rotating the main hub robot yaw by **+0.45 radians** to face the view and repositioning the hover label away from its head. These are scene/presentation adjustments, not new model/clip generation. GLB hash rechecked in this refresh: `047f5e5fb3bb6d378bd1df16ca6137f2a596c99b3a1b5690b4020c05aaf6f319`, unchanged from acquisition. Lead's [attribution usage clarification](../public/licenses/desk-compositions/ATTRIBUTION.md) now distinguishes archived Idle still poses from live authored Idle/Wave reuse, runtime resizing/orientation/recolor/highlight, and frozen neutral reduced motion; model/clip bytes remain unchanged. That file was read, not edited by assets. Existing model-specific CC0 notice and separate library-code rights remain in force.

**Unverified:** physical iOS/Android devices, hardware GPU rendering/performance, Safari/Firefox and screen readers. Retained results also do not separately establish background-tab resume, inactive desk mixer freezing inside the workshop, held-hover Wave completion/replay timing, or a full gesture collision/clipping envelope. Do not expand the observed paths into those claims. The Room object/world-entry, Stray atmosphere and Life Is Strange warmth remain the lead's named visual-reference comparison; final screenshot refresh/review belongs to lead. Other three worlds and the full portfolio remain out of scope. Assets stops after these three notes; no app edit, build, new test/browser run or repository operation in this refresh.

## Implementation checkpoint before lead browser QA — 2026-11-02 04:51 UTC

**Status: source implemented and typechecked; browser behavior unverified by assets.** The latest direct assignment authorizes Cinematic with Cozy warmth and one robot → workshop → desk flow. Earlier research/acquisition scope restrictions below are historical where they conflict with that assignment. Assets implements only `src/features/hub/RobotCharacter.tsx`; scene/controller/browser build and QA belong to lead.

### Reuse and rights

The existing `/models/robot-expressive.glb` is unchanged: 463,988 bytes, SHA-256 `047f5e5fb3bb6d378bd1df16ca6137f2a596c99b3a1b5690b4020c05aaf6f319`, from [pinned three.js model](https://raw.githubusercontent.com/mrdoob/three.js/b924f0cad4058dc4dde71445c796980c3cd5b5ed/examples/models/gltf/RobotExpressive/RobotExpressive.glb). The retained [model notice](../public/licenses/RobotExpressive.md), corresponding to the [same pinned upstream README](https://raw.githubusercontent.com/mrdoob/three.js/b924f0cad4058dc4dde71445c796980c3cd5b5ed/examples/models/gltf/RobotExpressive/README.md), credits Quaternius, CC0 1.0, and Don McCurdy's modifications. Notice hash rechecked: `84003fa9382ff8133ebc27988f35402c15e308fc50a56f1630988534de573d26` (361 bytes). No reacquisition or license-file edits. No images/textures/external URI dependencies occur in the existing binary inventory; no new animation/texture sources or dependencies introduced. Runtime recoloring/normalization preserves the source model. Installed Three/R3F/Drei code notices remain separate from model rights.

### Implementation evidence

- Local installed GLTFLoader confirms `Idle` 3.3333332538604736 seconds and `Wave` 1.8333333730697632 seconds. Uses skeletal clone and Drei `useAnimations`; no custom gesture tracks or manual per-frame mixer update. A temporary local mixer samples Idle at 0.5 seconds solely to compute neutral bounds, then stops/uncaches. The live mixer establishes the same pose.
- Neutral authored-pose bounds size: `[3.2852222178932307, 4.7718321326779, 3.3460502846021094]` in original scene units. Uniform outer scaling gives requested height (default 1); inner offset centers x/z and grounds y without modifying animated hierarchy transforms. This is a neutral-pose fit, not a certified full Wave envelope.
- Materials are cloned once per original material per instance. Main receives caller color, matching emissive color and intensity 0.16 while reacting, otherwise 0. Grey uses existing desk helper's `#56635b`; Black retains the authored material. Cleanup disposes only cloned materials; cached geometry/textures remain shared and undisposed.
- A rising `reacting` edge starts Wave, crossfading over 0.18 seconds. The finished event fades back to Idle. Leaving hover does not interrupt the wave; holding it does not replay. Fresh edges during an active Wave are consumed, not queued. Reduced motion stops gestures/loops and applies the frozen Idle 0.5-second pose. Interactions while paused/reduced/hidden are consumed; resuming held attention does not start a new Wave.
- `running=false` or document hidden sets mixer time scale to zero, preserving action time. Document visibility listener pauses immediately; a frame callback before Drei's own update also gates the mixer. A delayed step is capped to 1/15 second to avoid a resume jump. The component requests continuing demand frames only while running, visible and motion-enabled. Static prop/visibility updates may request one frame while visible/running. Other parent/canvas invalidations remain outside this component's ownership.
- Group named `RobotCharacter` exposes `userData.robotAnimation`: `action`, `actionTime`, `idleTime`, `waveTime`, `mixerTime`, `playing`, `running`, `reducedMotion`, `documentVisible`, `waveStarts`, `waveCompletions`, `samples`, and head/right/left-hand world coordinate arrays. `Head`, `Palm2R`, `Palm2L` are sampled after Drei's mixer update. HandR/HandL skinned mesh origins are unsuitable motion evidence because they do not follow animated palms. Evidence mutates in place: browser tooling must copy values when taking samples. No globals/debug API added.

### Verification and limits

`npm run typecheck -- --incremental false` PASS (final full-project retry after lead added its initially missing Workshop module). Direct TypeScript check of the component PASS. `npm test` PASS: 7 existing controller/interaction tests. These checks do not test the robot in a rendered browser. Model/notice hashes and installed loader names/clip durations were checked locally. No build, browser, camera/scene changes, dependency installation or repository operations by assets.

**Not tested by assets:** visible Idle/Wave playback and crossfades, fresh pointer/focus interactions, reduced-motion appearance, background/resume and hidden-workshop suspension, full gesture framing, accessibility/touch paths, workshop round trip, GPU/device performance. Lead must exercise these in a browser with visible 3D and record actual renderer/browser/viewport evidence before claiming success.

## Historical research and acquisition checkpoints

**Owner:** `assets`  
**Status:** Phase 2 robot acquisition Ready for review; Phase 1 research preserved below
**Evidence checked:** 2026-11-01 UTC  
**Scope:** T2 research plus explicitly authorized bounded Phase 2 robot acquisition. Earlier pending-approval statements below describe Phase 1; see the appended Phase 2 checkpoint for current robot facts. Other objects/full-site work remain unapproved.

## Recommendation for lead

Propose **RobotExpressive for the first robot prototype**, then custom primitive basketball, unbranded camera and microchip as preferred companion objects. Use one restrained palette, shared lighting and similar silhouette detail. The exact robot has a [model-specific CC0 1.0 README](https://github.com/mrdoob/three.js/blob/dev/examples/models/gltf/RobotExpressive/README.md); asset rights do not come from the Three.js software license. If architecture selects React, use R3F/Drei for playback and simple transforms. Keep Blender optional for identified edits; defer Spline and GSAP dependencies.

This is a feasibility proposal. No model files were saved to the workspace, inspected in Blender, optimized or benchmarked. Browser demo network loading is distinct from acquiring implementation assets. The official robot demo loaded controls in Chrome, but its canvas could not render because WebGL was disabled in this environment. Visual coherence and mobile performance remain unverified.

## Evidence levels

| Level | Meaning |
| --- | --- |
| **F — fetched docs/repo/license** | Read linked primary documentation, source, license or model listing. Listed formats are publisher evidence, not binary inspection. |
| **B — browser observed** | Observed controls, metadata, screenshot or console in Chrome. Does not imply a working 3D viewport. |
| **S — search excerpt only** | Indexed primary-source text; full page fetch failed. Supporting lead requiring recheck. |
| **P — proposal/inference** | Researcher's recommendation, not an observed result. |
| **M — measured** | Repeatable test with environment/results. **No animation, asset or performance measurements made.** |

All checks occurred 2026-11-01. Branch URLs are mutable; no upstream commit or binary hash is pinned yet.

## Substantial source-backed findings

### 1. RobotExpressive has specific model provenance

**F:** The [upstream README](https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/RobotExpressive/README.md) credits Tomás Laulhé, states CC0 1.0, and separately credits Don McCurdy for facial morph targets, conversion and material changes. The [creator's Animated Robot Pack page](https://quaternius.com/packs/animatedrobot) lists one animated robot in FBX/OBJ/Blend and explicitly links CC0. Treat the creator pack as an editable alternative; its exact equivalence to the converted GLB was not inspected.

**P:** Prefer the converted GLB for the prototype to avoid a mandatory conversion step. The original pack could help with later edits. **Limit:** no archives or binary contents inspected. Confidence: high for published model-specific license evidence; medium for integration readiness.

### 2. Existing actions offer a feasible alternative to a walking transition

**F:** The [official example source](https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/webgl_animation_skinning_morph.html) loads `RobotExpressive.glb`, uses imported clips including `Idle`, `Wave` and `Yes`, crossfades actions and plays gestures once. The [demo page](https://threejs.org/examples/webgl_animation_skinning_morph.html) describes independent facial expressions.

**B:** Chrome showed state, gesture and expression controls. Screenshot: black canvas. Console: `THREE.WebGLRenderer: Error creating WebGL context`, with graphics reported disabled. **No live robot animation observed.**

**P:** Prototype idle and a small turn/gesture. Start navigation on activation, independent of animation completion. A walking path/root-motion system is unnecessary to establish whether an object portal works. Confidence: high for source behavior; live appearance/timing unknown.

### 3. Original props offer more control over a coherent lightweight style

**F:** Three.js provides parameterized [sphere](https://threejs.org/docs/pages/SphereGeometry.html), [box](https://threejs.org/docs/pages/BoxGeometry.html) and [cylinder](https://threejs.org/docs/pages/CylinderGeometry.html) geometry.

**P:** A sphere with original seam artwork can represent basketball; a rounded body/grip plus separate lens can represent a camera; a slab and repeated pins can represent a chip. Shared palette and intentionally placed pivots are easier to control than three unrelated realistic assets. Tradeoff: proportions, seam detail and rounded edges still need design work. Primitives do not automatically mean low draw-call cost: reuse geometry/materials and later measure repeated pins. No original geometry was authored. Confidence: medium.

### 4. R3F/Drei play authored motion; they do not replace rigging

**F:** [useGLTF](https://drei.docs.pmnd.rs/loaders/gltf-use-gltf) exposes scene/nodes/materials/animations, while [useAnimations](https://drei.docs.pmnd.rs/abstractions/use-animations) wraps AnimationMixer. [R3F hooks](https://r3f.docs.pmnd.rs/api/hooks) offer per-render-frame updates with time delta.

**P:** Let imported clips own bones and an outer group own hover yaw/position. Use application transforms for props. A resting scene can use demand rendering, but imperative animation needs explicit frame scheduling: [R3F explains invalidation](https://r3f.docs.pmnd.rs/advanced/scaling-performance). A perpetual idle still needs frames; demand mode alone does not eliminate its cost. Confidence: high for documented APIs; integration not tested.

### 5. Blender-to-GLB is viable, but exporter settings need verification

**F:** The [official Khronos exporter README](https://raw.githubusercontent.com/KhronosGroup/glTF-Blender-IO/main/README.md) identifies the bundled Blender glTF importer/exporter and describes conversion and round-trip validation.

**S:** Indexed [Blender manual guidance](https://docs.blender.org/manual/en/3.2/addons/import_export/scene_gltf2.html) describes transforms, pose bones, shape keys and active/stashed actions. Full manual fetches failed; the older excerpt is not verified current UI. Newer indexed [development documentation](https://docs.blender.org/manual/id/dev/addons/scene_gltf2.html) describes changed action-slot/merge behavior, reinforcing the need to record the selected exporter version. That excerpt is development guidance, not a selected stable-version guarantee.

**P:** Retain an editable Blend master when edits are needed, export only intended named actions, and reimport to compare poses/loop seams. Bake constraints into supported tracks as needed. Keep small color cues in application logic rather than assuming procedural material animation survives export. Confidence: medium for workflow; actual export fidelity and settings unknown.

### 6. Spline's export distinctions matter for a no-purchase proposal

**F:** [GLTF/GLB export docs](https://docs.spline.design/exporting-your-scene/files/exporting-as-gtlf-glb) list baked position/rotation/scale timeline tracks, exclude states/events/interactivity, and mark Color & Texture export as paid. [Code-export docs](https://docs.spline.design/exporting-your-scene/web/exporting-as-code) say animations/events are enabled for Vanilla JS and React exports; do not assume the R3F export preserves them. [Fully self-contained project export](https://docs.spline.design/exporting-your-scene/web/exporting-as-self-hosted-project) is documented as Enterprise.

**P:** Spline can be evaluated if selected visuals justify visual authoring, but defer it for this portable prototype. Gray geometry export plus recoloring is a possible workaround requiring export checks. Ordinary code export and Enterprise self-contained bundles are distinct; this is not a claim that all self-hosting is paid. Confidence: high for documentation; editor/account/scene/runtime not tested.

### 7. Free assets and free animation code carry different terms

**F:** [CC0](https://creativecommons.org/publicdomain/zero/1.0/) permits copying, modification and redistribution without a copyright credit condition, while not waiving third-party trademark/patent rights. [Kai Fan's camera](https://poly.pizza/m/1pI-40LVzWX) says Creative Commons Attribution; **B:** its actual license link is specifically [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Preserve supplied title/creator/source/license notices, credit appropriately, identify derivative changes and avoid additional restrictions.

**F:** [GSAP's standard terms](https://gsap.com/community/standard-license/) are a custom no-charge license, including commercial use, with competing visual animation-builder restrictions and notice requirements. **P:** a conventional portfolio appears within stated permitted website use. This is not MIT and grants no model rights.

**P:** Retain provenance for CC0 too, distinguishing courtesy credit from required attribution. Record mesh, texture, animation and code rights separately. Confidence: high for fetched statements, not a warranty of uploader ownership.

## Asset selection matrix

Animation unknown means not inspected, not necessarily absent. Formats below are publisher/source evidence. No paid asset purchase is needed for the proposed route; download flows were not exercised.

| Object / candidate | Creator and exact source | Format evidence | Animation / adaptation | Model license, attribution and redistribution | Verification limits / selection |
| --- | --- | --- | --- | --- | --- |
| **Robot: RobotExpressive — recommended prototype** | Tomás Laulhé; Don McCurdy conversion/modifications. [Folder](https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf/RobotExpressive), [model README](https://github.com/mrdoob/three.js/blob/dev/examples/models/gltf/RobotExpressive/README.md) | GLB path in fetched loader example | Imported actions and facial morphs evidenced by example source; binary inventory pending | Explicit **CC0 1.0** for model. Copyright credit optional; retain creator/modifier provenance. Copy/modify/redistribute under CC0. Code notices separate. | **F; B rendering failure.** Strong model license evidence; size, triangles, bones, materials and clip durations unmeasured. Not a unique commissioned mascot. |
| Robot: Animated Robot Pack — editable alternative | Quaternius, [creator pack](https://quaternius.com/packs/animatedrobot) | FBX, OBJ, Blend | Pack marked animated; specific actions unknown. Use Blend/FBX for rigged work; do not choose OBJ expecting clips. | Pack explicitly links **CC0 1.0**. Optional credit; redistribution/modification allowed under CC0. | **F listing/license link.** Archive uninspected; GLB conversion needed. Do not assume clips match converted RobotExpressive. |
| **Basketball: Basketball 3D assets — reusable first choice** | dLeom, [creator itch.io page](https://dleom.itch.io/basketballs) | Blend master, individual GLB/FBX stated | Clip inventory unknown; whole-object motion can be authored | Explicit **CC0 1.0**, no attribution required, personal/commercial use. Redistribution/modification under CC0. Name-your-own-price listing; zero-price flow not exercised. | **F listing.** Variant appearance, bytes and archive notices unknown. More direct web-format route than conversion-only backup. |
| Basketball: Basketball lowpoly — backup | NephthysGameDev, [author submission](https://opengameart.org/content/basketball-lowpoly) | Blend/DAE/FBX ZIP listings | Animation unknown; proposed transform bounce/spin | Submission explicitly CC0, says credits unnecessary. Copy/modify/redistribute under CC0. | **F page.** Archives not inspected; GLB conversion needed. No demonstrated advantage over direct-GLB option. |
| Camera: Camera — reusable alternative | Kai Fan, [model page](https://poly.pizza/m/1pI-40LVzWX) | OBJ/GLTF listed; GLB packaging unknown | Rig/clips/lens separation unknown; whole-object tilt proposed | **CC BY 3.0** link observed in browser. Required title/creator/source/license attribution and supplied notices; identify derivative changes; no extra restrictions on licensed redistribution. [Terms](https://creativecommons.org/licenses/by/3.0/) | **F + B metadata.** Browser labels 18.6k Triangle Count: publisher-stated, not measured. Too detailed to prefer for a small portal without a visual reason. Mirrorless identity/branding unknown. |
| Camera: Camera / Digital camera — backup | Nick Ladd, [model page](https://poly.pizza/m/4A3SYVh_smq) | OBJ/GLTF listed | Animation/separate lens unknown | Listing says **Creative Commons Attribution**; exact version/link unverified. Hold adoption until exact terms checked; do not inherit Kai Fan's version. | **F only.** Browser navigation timed out and remained on Kai Fan page. No confirmed silhouette, mirrorless identity or complexity figures. |
| **Microchip: Microchip — reusable first choice** | iPoly3D, [specific listing](https://poly.pizza/m/tIp60lIg43) | FBX/GLTF listed; GLB packaging unknown | Animation unknown; group tilt/application accent proposed | Explicit **Public Domain (CC0)** model label. Exact version not exposed in fetched text; verify downloaded license. Credit optional if CC0 confirmed; modification/redistribution under that dedication. | **F listing.** Creator-original archive and binary not inspected; weaker provenance depth than robot. |
| **Original primitive set — preferred props; robot fallback** | Future project author; [geometry APIs](https://threejs.org/docs/) establish available building blocks | Native scene geometry; optional future Blend/GLB | Deliberately separate lens/body groups. Rigid robot alternative needs its own joint transforms. | Wholly original mesh needs no third-party mesh grant; project asset license remains to be chosen. Imported textures/decals/references need separate rights records; renderer notices remain. | **P only; none created.** Palette/pivot control at cost of design time. Original rigid robot cannot simply reuse another rig's skeletal clips. |

Draft camera credit if adopted: “Camera” by Kai Fan, [source](https://poly.pizza/m/1pI-40LVzWX), [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Add geometry/material changes **only if actually performed**; preserve additional archive notices. No such edits exist yet.

## Accessible repositories and demo sources

Four source sets successfully fetched, exceeding the three-repository research aim. **Not four functioning demos tested.**

| Source | Verification | Separate software license | Relevance and constraint |
| --- | --- | --- | --- |
| [Three.js robot source](https://github.com/mrdoob/three.js/blob/dev/examples/webgl_animation_skinning_morph.html), [demo](https://threejs.org/examples/webgl_animation_skinning_morph.html) | **F** source; **B** controls/console, rendering failed | [MIT](https://raw.githubusercontent.com/mrdoob/three.js/dev/LICENSE): retain copyright/permission notices. Model separately CC0. | Closest action-blending reference; its full demo scene is not a mobile budget baseline. |
| [pmndrs/drei](https://github.com/pmndrs/drei), [useAnimations](https://drei.docs.pmnd.rs/abstractions/use-animations) | **F** repository/helper docs/license; no sandbox run | [Drei MIT](https://raw.githubusercontent.com/pmndrs/drei/master/LICENSE); [R3F MIT](https://raw.githubusercontent.com/pmndrs/react-three-fiber/master/LICENSE) also fetched | React playback helpers. Imported model rights independent; architecture must verify selected dependency versions. |
| [google/model-viewer](https://github.com/google/model-viewer), [animation examples](https://modelviewer.dev/examples/animation/) | **F** repository/docs; no browser render attempted | [Apache 2.0](https://raw.githubusercontent.com/google/model-viewer/master/LICENSE): retain license/notices and modification notices as applicable, including NOTICE if supplied | Future independent inspection harness; not a second production renderer proposal. Example page separately credits RobotExpressive CC0. |
| [splinetool/react-spline](https://github.com/splinetool/react-spline) | **F** repository/license/export docs; no scene run | [Wrapper MIT](https://raw.githubusercontent.com/splinetool/react-spline/main/LICENSE) only; runtime, service and scene rights separate | React integration reference. Wrapper MIT does not grant model reuse or establish free self-contained export. |

## Critical route comparison — proposals

| Route | Strength | Cost / failure mode | Fit |
| --- | --- | --- | --- |
| Original primitive groups | Controlled palette, pivots and silhouette; original artwork provenance | Design time; many meshes can inflate draw calls | Preferred ball/camera/chip; rigid toy robot fallback. [APIs](https://threejs.org/docs/) support primitives, not finished art. |
| GLB + Blender skeletal actions | Authored gestures and editable rig with portable delivery | Skinning/morph cost; export errors, missing clips, appearance differences | Existing robot first; edit only for an identified issue. [Exporter](https://github.com/KhronosGroup/glTF-Blender-IO), [robot source](https://github.com/mrdoob/three.js/blob/dev/examples/webgl_animation_skinning_morph.html). |
| R3F/Drei | React integration and imported-action helpers; mixed original/imported scene | Not an authoring tool or model library; render lifetime/cleanup still needed | Combine with GLB if React selected. [Helpers](https://drei.docs.pmnd.rs/abstractions/use-animations), [render scheduling](https://r3f.docs.pmnd.rs/advanced/scaling-performance). |
| Spline | Visual scene/state authoring and React embedding | Export limits, service/runtime terms, paid features; no bundle comparison measured | Defer unless visual direction justifies. [GLB export](https://docs.spline.design/exporting-your-scene/files/exporting-as-gtlf-glb) does not preserve states/events. |
| GSAP alongside renderer | [Timelines](https://gsap.com/docs/v3/GSAP/Timeline/) coordinate sequences and interruption | Extra timing owner/dependency; custom terms; no meshes/rigs supplied | Optional later choreography; simple prototype motion does not require it. [License](https://gsap.com/community/standard-license/). |

## Per-object motion proposal

All timings/angles are **P**, review starting values, not measurements. Keyboard focus shares hover cues; touch follows the destination on first tap. Persistent labelled DOM links work independently of canvas/load/animation. Reduced motion, pause, graphics failure and missing assets retain static artwork and immediate links.

| Object | Idle when visible and motion allowed | Hover / focus | Activation |
| --- | --- | --- | --- |
| Robot | Authored Idle clip, with pause and suspension offscreen | Outer-group yaw about 4–6° over 180–240 ms; optional once-only Wave after clip inspection | Small turn/translation as navigation starts; never wait for walking, clip completion or load success. |
| Basketball | Slow limited rotation settling to rest | One authored bounce/spin, roughly 350–450 ms; guard retriggers | Brief curved movement toward card edge; no physics, hoop scene or shot-success gate. |
| Camera | Rest pose, at most subtle periodic lens cue | Lens group extends slightly over ~200 ms; 2D focus brackets | Small shutter-button motion/content reveal; no full-screen white flash, camera permission or shutter wait. Imported lens may need regrouping; whole-body tilt fallback. |
| Microchip | Resting slab, optional subtle accent cue | Small tilt/lift over ~200 ms and one trace cue | Accent sweep as projects opens; no boot/loading gate. Reuse pin resources; measure before instancing. |

## Exact robot prototype plan — after approval

1. **Scope one portal.** Lead chooses silhouette/palette, test asset, target route, poster and acceptance budgets with design/architecture/performance evidence. This report is not implementation authorization.
2. **Acquire provenance.** After approval, obtain only the selected GLB and README from one immutable upstream commit. Record UTC, source path, SHA-256, byte size and model-specific license. No model acquired for implementation in this research pass.
3. **Inventory.** Verify actual Idle/Wave/Yes clips, durations/loop seams, root orientation, bounding box, mesh/bone/morph/material/texture counts and external URIs. Missing gestures degrade to group transforms. Do not treat example internal node names as a stable API.
4. **Compose.** One neutral scene, fixed camera, restrained lights, no postprocessing/physics/environment download. Preserve rig transforms; frame/scale an outer group. Clone shared materials before recoloring. Keep original/derivative traceable.
5. **Define states.** Loading/fallback, resting/idle, highlighted, activating, suspended. Inputs: highlighted, reducedMotion, motionPaused, visible, activation. Mixer owns bones; outer group owns portal transforms; router owns navigation. Guard repeated triggers and remove listeners/tweens/owned actions on unmount.
6. **Keep links independent.** Labelled semantic link works before GLB or JavaScript completion. Keyboard/link click/first tap navigate. A decorative cue may begin, ≤350 ms proposed, but navigation never waits for its finish. Preserve native modified-click/new-tab behavior. Reduced motion and failed graphics/asset use static art with the same destination.
7. **Stop frames deliberately.** Decide whether bounded idle warrants continuous visible frames. Demand rendering needs frame requests during mixer/transform updates; stop requesting at rest. Hidden/offscreen/paused/reduced-motion states suspend decorative updates. Resume without an accumulated time jump.
8. **Produce acceptance evidence.** In an actual WebGL-capable desktop and agreed physical mobile target, test idle/focus/gesture, keyboard/touch, rapid enter/leave, repeated activation, visibility changes, route exit/back, reduced-motion change, context/asset failure and slow loading. Record video/screenshots, console, network bytes and draw-call/frame data against lead-approved budgets. None of these passes is claimed here.
9. **Return one-object result for review.** Include manifest, sources and measured checks. Four-object implementation remains a separate approval gate.

## Proposed asset pipeline

1. Resolve a specific model, its creator/modifiers, textures and animation sources. A library homepage/software license is insufficient evidence for a mesh.
2. After approval: acquire pinned bytes, retain notices, hash and inventory. Inspect GLTF external bin/texture references or GLB container rather than trusting a format label.
3. Normalize framing, pivots and palette in a derivative, preserving an editable source. Avoid destructive changes to rig/animation relationships. Keep only prop parts needing separate motion independently grouped.
4. Export GLB with intended geometry/materials/textures/actions. Record Blender/exporter versions/settings; reimport and compare rest pose, actions and appearance. Old NLA instructions require version recheck.
5. Run [Khronos glTF-Validator](https://github.com/KhronosGroup/glTF-Validator), which documents structural/animation checks and JSON reports. A valid file does not prove visual fidelity, license provenance or performance. Repository fetched; validator not run.
6. Measure baseline before compression. [Drei documents Draco decoder loading/customization](https://drei.docs.pmnd.rs/loaders/gltf-use-gltf). Compare total transferred bytes and decoding/startup work; no Draco/Meshopt/KTX pipeline selected or installed.
7. Generate same-camera static posters, inspect real card sizes, host approved versioned artifacts locally and ship required credits/notices. Check any added texture/HDRI rights independently.

## Licensing manifest fields — proposed, no manifest created

| Group | Fields |
| --- | --- |
| Identity | `assetId`, `objectRole`, `title`, `creator`, `modifierCredits`, `originalCreatorUrl`, `modelPageUrl`, `upstreamRepo`, `upstreamCommit`, `upstreamPath` |
| Acquisition | `acquiredAtUtc`, `originalFilename`, `sourceFormat`, `originalSha256`, `originalBytes`, `downloadUrl`, `downloadVerified` |
| Model license | `modelLicenseId`, `modelLicenseVersion`, `modelLicenseUrl`, `modelSpecificEvidenceUrl`, `evidenceCheckedAtUtc`, `retainedLicensePath`, `commercialUseStatus`, `modificationStatus`, `redistributionStatus`, `attributionRequired`, `requiredCreditText`, `creditPlacement`, `additionalNotices`, `rightsUncertainties` |
| Separate components | `textureSourcesAndLicenses`, `animationSourcesAndLicenses`, `embeddedExternalAssets`, `brandOrLikenessReview`, `codeDependencyLicenses` |
| Processing | `editableMasterPath`, `modifications`, `toolVersions`, `exportSettings`, `includedClipNamesAndDurations`, `outputPath`, `outputSha256`, `outputBytes`, `decoderRequirements`, `posterPath` |
| Verification | `verificationLevel`, `validatorReportPath`, `triangles`, `vertices`, `meshCount`, `materialCount`, `boneCount`, `textureDimensions`, `externalUris`, `observedDeviceBrowser`, `visualCheckResult`, `performanceEvidencePath`, `reviewStatus`, `approvedBy` |

Robot starting values: RobotExpressive; Tomás Laulhé; Don McCurdy modifications; `CC0-1.0`; exact upstream README evidence above. Commit/hash/bytes/durations/artifact paths/measurements/approval remain **unknown or unset**.

## Uncertainties and exact lead next steps

- **Graphics blocker:** Chrome WebGL creation failed. No live animation/mobile/performance success claim. Use a known graphics-capable environment during an approved prototype; no graphics/security settings changed here.
- **Binaries:** listed formats, clip completeness, archive licenses, actual weights and successful downloads still need acquisition checks after approval.
- **Camera:** Kai Fan's BY 3.0 link verified, but no confirmed mirrorless identity. Nick Ladd exact license version unknown. Prefer original unbranded geometry unless a downloaded alternative proves advantageous.
- **Microchip:** model-specific CC0 label verified, exact version/original file bundle unverified. Original geometry remains preferred.
- **Blender:** complete manual fetches failed. Indexed older/development details support research only; selected-version export UI/fidelity must be checked.
- **Spline:** account entitlements, runtime/service/scene rights and bundle costs not verified. Wrapper MIT is insufficient.
- **Lead now:** integrate T2 into T5; record robot-plus-original-props route as proposed, compare visual direction and technical budgets. Do not mark assets or stack approved.
- **Next gate:** after research/visual/prototype-scope approval, follow the nine-step robot plan. Full implementation awaits its later gate.

## Work audit

Read mandatory shared context and all owned files. `git status --short` returned `fatal: not a git repository (or any of the parent directories): .git`. Independently fetched primary sources; opened robot/camera pages, read robot screenshot/console and camera model license metadata. No website code, scaffolding, dependencies, implementation downloads, model transformations, builds, benchmarks, purchases or commits. Only `research/assets.md`, `updates/assets.md` and `handoffs/assets.md` are owned write targets.

## Phase 2 — approved robot acquisition and direct binary inspection

**Checkpoint:** 2026-11-01 04:58:52 UTC. **Status:** Ready for review / main-agent integration. The user explicitly authorized only the bounded robot prototype. This section supersedes Phase 1's pending-acquisition statements for RobotExpressive only; the earlier report remains historical research. Other three objects and full-site expansion remain unapproved.

### Exact source and retained license

- **F — acquisition:** GitHub's [path-specific commit endpoint](https://api.github.com/repos/mrdoob/three.js/commits?path=examples%2Fmodels%2Fgltf%2FRobotExpressive%2FRobotExpressive.glb&per_page=1) resolved commit [`b924f0cad4058dc4dde71445c796980c3cd5b5ed`](https://github.com/mrdoob/three.js/commit/b924f0cad4058dc4dde71445c796980c3cd5b5ed). Downloaded from this immutable commit, not the mutable `dev` branch.
- **Exact upstream model path:** `examples/models/gltf/RobotExpressive/RobotExpressive.glb`; [immutable GLB URL](https://raw.githubusercontent.com/mrdoob/three.js/b924f0cad4058dc4dde71445c796980c3cd5b5ed/examples/models/gltf/RobotExpressive/RobotExpressive.glb). Saved unchanged to `public/models/robot-expressive.glb` (**463,988 bytes**, approximately 453.113 KiB).
- **Model SHA-256:** `047f5e5fb3bb6d378bd1df16ca6137f2a596c99b3a1b5690b4020c05aaf6f319`.
- **Exact upstream README path:** `examples/models/gltf/RobotExpressive/README.md`; [immutable source README](https://raw.githubusercontent.com/mrdoob/three.js/b924f0cad4058dc4dde71445c796980c3cd5b5ed/examples/models/gltf/RobotExpressive/README.md). Saved verbatim to `public/licenses/RobotExpressive.md` (**361 bytes**).
- **README SHA-256:** `84003fa9382ff8133ebc27988f35402c15e308fc50a56f1630988534de573d26`. The historical README credits **Quaternius**, states **CC0 1.0**, and credits Don McCurdy for morph targets, conversion and material changes. Preserve this historical credit exactly; Phase 1's mutable newer README credited Tomás Laulhé. The downloaded source README was not edited or augmented.
- **License boundary:** model-specific CC0 evidence is retained. No textures/images/external URIs occur in the GLB. The README does not identify separately licensed clip components. Renderer/dependency software notices remain the main agent's responsibility; no generic repository-license substitution.
- **Machine-readable record:** `public/models/robot-manifest.json`, written with `apply_patch`; includes source URLs/commit, both hashes, full raw node index/name list, meshes/material assignments, clip timings, counts, bounds and limitations.
- **Network evidence:** initial sandbox curl failed with DNS resolution error for api.github.com. Retried with `require_escalated`, then downloaded both immutable artifacts successfully under that approved network context. No bypass or dependency install.

### Direct GLB inspection — M for local bytes/calculations, not runtime

Inspection used Node **v24.13.1**, built-in `fs`/`crypto`, at **2026-11-01T04:57:45.670Z**. The GLB header is version 2; generator `FBX2glTF`; JSON chunk **82,704 bytes**, BIN chunk **381,256 bytes**, plus header/chunk headers gives the exact file length.

| Inventory | Result |
| --- | --- |
| Scene / nodes | One scene, `Root Scene`; 74 raw nodes, all reachable |
| Meshes / primitives | 14 meshes; 19 TRIANGLES primitives, each instanced once in the default scene |
| Geometry estimate | 3,237 triangles from sum(index accessor counts / 3); 7,214 POSITION entries across primitives |
| Skinning | Two skins, each 43 joints; 43 unique joint nodes shared across their joint lists. Skinned nodes are `Hand.R` and `Hand.L`; much of robot movement is hierarchical rigid-part animation |
| Morph targets | Head mesh has `Angry`, `Surprised`, `Sad`, default weights [0, 0, 0]; three targets on each of its three primitives |
| Materials | `Grey`, `Main`, `Black`; all OPAQUE, metallic 0.1, roughness 0.9 |
| Textures / images / external URIs | 0 / 0 / none |
| Extensions | No extensionsUsed or extensionsRequired |
| Animation clips | 14; actual sampler input times read from BIN; all start at 0 |

Geometry counts are **file-level estimates of authored submitted triangles**, not unique surface triangles or renderer measurements. POSITION entries are not spatially deduplicated vertices. **19 primitives is not a measured runtime draw-call count**; shadows, batching, visibility and render passes can change runtime work.

### Prompt scene integration data

**Yes, material `Main` exists.** Its stored linear glTF baseColorFactor is [0.590328395366669, 0.291314452886581, 0.0383376032114029, 1]. `Grey`: [0.373757988214493, 0.371300429105759, 0.334965020418167, 1]. `Black`: [0.046244353055954, 0.046244353055954, 0.046244353055954, 1]. These are raw factors, not CSS/sRGB hex colors. Clone materials before local recoloring of cached models.

| Mesh index | Raw mesh name | Mesh node index | Primitive count | Material order | POSITION entries | Triangle estimate |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `Foot.L` | 4 | 1 | Grey | 64 | 33 |
| 1 | `Torso` | 7 | 2 | Grey, Main | 1912 | 870 |
| 2 | `Head` | 13 | 3 | Grey, Main, Black | 1742 | 810 |
| 3 | `Foot.R` | 68 | 1 | Grey | 64 | 34 |
| 4 | `Shoulder.L` | 16 | 1 | Main | 232 | 122 |
| 5 | `Arm.L` | 18 | 1 | Main | 296 | 108 |
| 6 | `Shoulder.R` | 36 | 1 | Main | 232 | 122 |
| 7 | `Arm.R` | 38 | 1 | Main | 284 | 106 |
| 8 | `Leg.L` | 56 | 1 | Main | 270 | 98 |
| 9 | `LowerLeg.L` | 58 | 1 | Main | 370 | 146 |
| 10 | `Leg.R` | 61 | 1 | Main | 270 | 98 |
| 11 | `LowerLeg.R` | 63 | 1 | Main | 370 | 146 |
| 12 | `Hand.R` | 72 | 2 | Main, Grey | 554 | 272 |
| 13 | `Hand.L` | 73 | 2 | Main, Grey | 554 | 272 |

Root node is `RootNode` (0); `RobotArmature` (1) has scale [100,100,100] and an imported X rotation. Preserve the original hierarchy and rig transforms. Raw glTF node names include duplicate `Foot.L`, `Torso`, `Head`, `Shoulder.L`, `Shoulder.R`, `LowerLeg.L`, `LowerLeg.R` and `Foot.R` across bones and mesh nodes. The manifest lists all 74 indices, names, parents and mesh/skin bindings. **Do not assume loader-generated `Head_4` or another sanitized/deduplicated object name from the example is the raw source name.** Inspect the actual loader output as needed.

### Bounding basics and framing limits

CPU bounds were computed from every POSITION entry, composing default-scene node TRS matrices. Skinned hand positions use weighted jointWorld × inverseBind matrices; default morph weights are zero. No animation clip was sampled for these bounds. Values are in original scene units.

| Axis | Minimum | Maximum | Size |
| --- | --- | --- | --- |
| X | -1.998517305 | 2.280402934 | 4.278920238 |
| Y | -0.020304421 | 4.440918025 | 4.461222446 |
| Z | -1.269148275 | 2.021867978 | 3.291016252 |

Center: **[0.140942815, 2.210306802, 0.376359851]**. The manifest retains full precision and per-mesh-node bounds.

**P — framing guidance:** target around Y=2.21 before outer scaling, with gesture padding. Recompute the renderer's bounds after selecting/advancing Idle and verify visually; the default pose is not Idle's complete animated envelope. Do not independently multiply by the armature's 100 scale again. No fixed camera distance or gesture-safe fit is certified by this calculation.

### Actual clip inventory

Durations below are max sampler input time minus min sampler input time, decoded as float32 from BIN, not guessed from clip names. The manifest retains exact numeric values and target paths; all clips include weight/translation/rotation channels.

| Clip | Duration seconds | Channels |
| --- | --- | --- |
| `Dance` | 3.333333254 | 12 |
| `Death` | 0.958333313 | 18 |
| `Idle` | 3.333333254 | 7 |
| `Jump` | 0.708333313 | 18 |
| `No` | 1.666666627 | 7 |
| `Punch` | 0.833333313 | 15 |
| `Running` | 0.958333313 | 18 |
| `Sitting` | 0.416666657 | 10 |
| `Standing` | 0.416666657 | 10 |
| `ThumbsUp` | 1.583333373 | 15 |
| `Walking` | 0.958333313 | 20 |
| `WalkJump` | 0.833333313 | 18 |
| `Wave` | 1.833333373 | 18 |
| `Yes` | 1.666666627 | 7 |

**P — main-agent implications:** `Idle`, `Wave`, `Yes` exist; no external clips needed. Do not gate the short activation feedback on a full 1.833-second Wave or 1.667-second Yes. Preserve immediate inline reveal/native link behavior from approved Phase 2. Loop smoothness, crossfades, expression appearance and gesture envelope remain runtime checks.

### Verification and exact handoff

**Local verification passed at 2026-11-01 04:58:52 UTC:**

- GLB and retained exact README hashes/bytes match the manifest.
- GLB magic/version/declared length and chunk boundaries checked.
- All 283 buffer views and accessors remain within the embedded buffer.
- All primitive indices are within their POSITION accessor count.
- All animation sampler input times are finite and nondecreasing.
- Model-specific retained README contains the explicit CC0 1.0 statement.

These are bounded Node integrity checks, **not a full Khronos Validator run**, a rendered model check, animation test or mobile benchmark. No optimization, format conversion, dependency install, app/shared-file edit or Git changes were performed by assets. Git status at start still reported no repository.

**Lead/main agent next:** load `/models/robot-expressive.glb`, retain `/licenses/RobotExpressive.md`, read the manifest, confirm loader object/material names, recompute framing after the selected clip pose, and complete the approved bounded prototype's runtime/keyboard/touch/reduced-motion/fallback checks. Keep renderer counters/device evidence separate from this binary inventory. No other asset acquisition or full-site expansion is authorized.

