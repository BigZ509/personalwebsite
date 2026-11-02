# Handoff — assets

## Current handoff — lead evidence recorded · 2026-11-02 05:07 UTC

**Done: final documentation refresh only.** Updated only `research/assets.md`, `updates/assets.md`, `handoffs/assets.md`. RobotCharacter, app/assets/licenses and screenshots were not edited; no build, new test/browser run or repository operation. Earlier integration instructions below are historical where the lead has already completed and tested the flow.

- **Evidence reviewed:** [flow-evidence.json](../output/playwright/robot-journey/flow-evidence.json) and [paths-evidence.json](../output/playwright/robot-journey/paths-evidence.json), plus their retained capture/validation scripts. `firstflow-evidence.json` is not present under that name; `flow-evidence.json` is the actual first-flow capture. HeadlessChrome 156, Macintosh/macOS user agent, ANGLE Vulkan SwiftShader **software rendering**, desktop 1600 × 1100. Lead ran the browser tests; assets reviewed the records.
- **Pass:** hover starts Wave and right-hand world coordinates move across advancing Wave times; approach → workshop → Back preserves one Canvas and restores focus. Keyboard Tab/Enter/Escape and Space; actual orbited view restored with reported position error 0; midflight cancellation; manual pause at Idle 0.5 with frame 229 unchanged; emulated touch on actual robot mesh and Back at 390 × 844; reduced motion at Idle 0.5 with zero Wave starts and Enter/Escape; controlled WebGL-failure notes/retry and no-JS static notes access. Research note contains exact samples and qualifications.
- **Asset continuity:** GLB hash still matches immutable acquisition. Lead reports main hub yaw +0.45 radians to face view and hover-label relocation clear of head; no model/clip generation. Read lead's [attribution usage clarification](../public/licenses/desk-compositions/ATTRIBUTION.md), covering authored live Idle/Wave versus archived still poses and unchanged GLB/clip bytes. No change needed to RobotCharacter in this assignment.
- **Limits:** physical iOS/Android, hardware GPU, Safari/Firefox and screen readers **Not tested**. These records do not separately prove background resume, hidden-desk mixer pause, held-hover completion/replay or full gesture collision/clipping clearance. Empty page-error arrays do not erase the flow's aborted keyboard.glb request or Three.Clock deprecation warning.

**Lead next / scope stop:** finish the already-running final screenshot refresh and named-reference comparison (The Room entry, Stray atmosphere, Life Is Strange warmth), then report the bounded flow with software-rendering/emulated-touch limits. Assets does not claim an independent final visual review and has no further implementation work. Stop after these notes; other worlds/full portfolio remain unauthorized.

## Historical implementation handoff — live RobotCharacter · 2026-11-02 04:51 UTC

**Ready for lead integration/browser QA.** Latest direct user approval: Cinematic with Cozy warmth and one robot → workshop → desk flow, preserving the furnished room/assets. This specialist edited only `src/features/hub/RobotCharacter.tsx` plus `research/assets.md`, `updates/assets.md`, `handoffs/assets.md`. Prior scope/approval statements below remain historical.

- Default export `RobotCharacter`, named type export `RobotCharacterProps`: `{ height?: number; color: string; reacting: boolean; reducedMotion: boolean; running: boolean }`; height defaults to 1. Parent supplies placement, unified pointer/focus attention, canvas/camera/events and active-desk lifecycle. No event handlers or global API in the component.
- Existing GLB/rig/clips reused via skeletal clone and Drei useAnimations. Neutral Idle 0.5-second normalization; owned Main tint and reacting emissive 0.16, Grey `#56635b`; only owned materials disposed. Exact model CC0 notice retained unchanged; current GLB/notice hashes match acquisition record. Source/rights details are in the new top section of `research/assets.md`.
- Fresh attention edge starts authored Wave once; finished event returns to Idle even if held. Fresh edges during Wave are consumed. Reduced motion freezes Idle at 0.5 seconds. Running false/document hidden pause mixer time and stop component-driven continuing invalidation; unpause preserves the action. Held attention does not launch a deferred new wave after unpause. No manual per-frame mixer update (Drei already does it).
- Browser evidence: find group `RobotCharacter`, then copy `userData.robotAnimation` across frames. It exposes action/actionTime, idle/wave/mixer times, waveStarts/waveCompletions, playing/running/reducedMotion/documentVisible, samples and head/right/left palm world positions. Arrays and object mutate in place; serialize/copy each sample. Motion landmarks are `Head`/`Palm2R`/`Palm2L`, not fixed skinned hand mesh origins. `samples` can still rise when another scene renders; use action/mixer times and coordinates to verify freezing.
- Verification: full `npm run typecheck -- --incremental false` PASS on final retry (lead's initially missing Workshop import resolved); isolated component TypeScript PASS; `npm test` PASS, 7 existing tests. No browser/build performed by assets. Tests do not establish rendered robot motion.

**Lead next:** wire `reacting = hovered || focused` and `running` to the visible desk, mount inside the existing canvas/Suspense, then test visible Idle → Wave → Idle under held attention; fresh interaction replay; hover exit before completion; reduced motion; running false in workshop; page hide/resume; restore desk and camera round trip. Compare actual rendered framing/warmth with the selected references. Neutral bounds are not the complete gesture envelope, so check clipping/prop collisions. All rendered interaction, browser/device/performance checks remain **Not tested by assets**.

> **Lead coordination — 2026-11-01 05:58 UTC, D-012:** Read [hub sources](../research/hub-world/SOURCES.md) and [object mapping](../research/hub-world/OBJECTS.md). Current task complete at research level, pending user selection: CC0 Quaternius desk actual GLB inspected in memory; Kenney ZIP 403/inner paths unknown; Julien room reuse held for missing grants. Robot inventory and old object audits reused. Software keyboard is now an allowed alternative, not a chip. Next inspect/pin only selected assets after authority; no model creation, conversion or app integration now. Earlier robot instructions below are historical. Lead note, not a new specialist sign-off.

> **Lead coordination update — 2026-11-01 05:34 UTC:** User correction/D-011 stops asset creation/integration. Read [the reusable-source catalog](../research/reusable-components/README.md). Existing RobotExpressive acquisition remains untouched. Chappie asset/animation/texture rights are unverified despite code MIT; do not adopt yet. New publisher-link checks establish Nick Ladd CC BY 3.0 and iPoly3D CC0 1.0; archives remain uninspected. KiCad chip is conditional CC BY-SA/exception, not a cleared animated GLB. Await user source choices; no new models/conversions/downloads into app or author contact. Older acquisition/implementation next steps below are history. Specialist session is closed; note added by lead at user's handoff-update request.

**Current status:** Ready for review
**Last updated:** 2026-11-01 04:58:52 UTC
**Owner:** `assets`

## One-paragraph state
**Phase 2 current state:** Explicitly approved robot acquisition is complete and Ready for review/main-agent integration. Local GLB, exact historical README and detailed manifest exist. Use the Phase 2 handoff appended below; the earlier research handoff is preserved as history and its pending-approval language is superseded only for the bounded robot prototype.

### Phase 1 research handoff (historical)
T2 research is ready for lead review. Recommend proposing RobotExpressive for the first robot prototype and original primitive basketball/camera/microchip for a coherent eventual set, with specific reusable alternatives documented. Seven findings, eight candidate rows and four fetched repository/example source sets support the comparison. The recommended robot's exact model README states CC0 1.0; code licenses remain separate. No implementation, paid purchase, implementation asset acquisition or approval is implied.

## What was completed and confirmed
- Independently fetched [RobotExpressive model-specific README](https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/RobotExpressive/README.md): Tomás Laulhé, CC0 1.0, Don McCurdy modifications. Creator [Animated Robot Pack](https://quaternius.com/packs/animatedrobot) provides an additional editable alternative, not binary-equivalence proof.
- Specific model selection matrix covers two robots, two basketballs, two cameras, a microchip and an original-geometry set. Publisher format and animation claims are distinguished from inspected bytes.
- [dLeom basketball](https://dleom.itch.io/basketballs) lists Blend/GLB/FBX and CC0 1.0. [iPoly3D microchip](https://poly.pizza/m/tIp60lIg43) lists FBX/GLTF and a model-specific CC0 label, exact version unverified.
- Kai Fan camera browser metadata links specifically to [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Nick Ladd camera's exact version remains unknown; neither camera confirmed specifically mirrorless.
- [GSAP terms](https://gsap.com/community/standard-license/) are custom no-charge, not MIT. [Spline GLB export](https://docs.spline.design/exporting-your-scene/files/exporting-as-gtlf-glb) does not retain states/events and marks colored/textured export paid; wrapper MIT does not settle runtime/scene terms.
- Wrote per-object idle/focus/activation proposals, critical route comparison, exact nine-step robot prototype plan, asset pipeline and licensing-manifest fields in `research/assets.md`.

## Exact files changed / touched
- `research/assets.md` — final research report.
- `updates/assets.md` — real UTC checkpoints and Ready for review status; earlier entries preserved.
- `handoffs/assets.md` — this final integration handoff.
- No shared or other-agent files edited; all Markdown edits through `apply_patch`.

## Verification already performed
- Read AGENTS, UPDATE, brief, task board, decisions and all three owned files.
- `git status --short`: fatal, not a Git repository. No commits/builds claimed.
- Primary documentation/source/license fetches: Three.js, Quaternius, author asset listings, Drei/R3F, Spline, model-viewer, Creative Commons, GSAP, Khronos exporter/validator repositories. Exact links and evidence levels are adjacent to claims in the report.
- Browser: official robot controls loaded; screenshot was black. Console reported WebGL context creation failed and graphics disabled. **No live animation observed or measured.**
- Browser: Kai Fan camera license link and Triangle Count label observed. 18.6k is source-stated, not a local mesh measurement. Navigation to Nick Ladd timed out; fetched listing only for that candidate.
- Full Blender manual fetches failed; indexed manual excerpts marked S, not fully fetched/verified current UI.
- No model files saved to workspace, Blender inspection, validator execution, performance/mobile tests, code/scaffolding/dependency changes or purchases. Automatic browser demo asset loading was not implementation acquisition.
- Final readback confirmed seven numbered findings, eight candidate rows, explicit evidence levels, all three Ready for review statuses and exact continuation steps. No software test suite exists or was run.

## Next 3 actions for a fresh agent
1. **Lead now:** read the recommendation, matrix and uncertainties in `research/assets.md`; integrate T2 into T5. Record RobotExpressive + original props as a proposal, then reconcile palette, stack, device targets and acceptance budgets with the other tracks. Update shared task/status docs only through lead ownership.
2. **Lead next:** complete research synthesis and required visual/prototype-scope approval. No implementation approval exists in this handoff; do not start T7 automatically or acquire implementation assets during the research phase.
3. **After approval:** follow the report's nine-step robot plan: acquire pinned model/README, hash/inventory/validate, build only one portal with independent semantic navigation, test in a WebGL-capable desktop and agreed physical mobile environment, and return measured evidence before any full-site gate.

## Blockers or approvals needed
- No blocker to research review. Graphics-disabled browser blocks live verification; do not substitute documentation for a passing animation/performance test.
- Actual binary sizes, clips, licensing files, texture dependencies, export fidelity and visual coherence remain unknown until approved acquisition/prototype checks.
- Exact microchip CC0 version and Nick Ladd camera license version remain unknown. Prefer original props; defer external candidates if provenance is incomplete.
- No purchase needed for the proposed route. Optional source-pack/download flows, Spline account entitlements and runtime rights were not verified.

## Research references
- See `research/assets.md` for source links, four repo/example rows and explicit F/B/S/P/M verification vocabulary. M has no results.

## Notes to lead / integration contract
- **Exact integration contract:** T2 is Ready for review, not an approved asset/stack decision. Lead may mark research reviewed after examining evidence and limitations. Keep live-demo success, mobile speed, archive license verification and final visual match as future work.
- Lead's independently fetched robot/GSAP evidence agrees with this report; findings here were independently sourced.
- Proposed next decision: existing CC0 rigged robot for proof of concept, original simple companion props, R3F/Drei conditional on architecture, no mandatory GSAP/Spline/walk/physics/flash gate.
- Stop checkpoint: research/report and owned logs complete; awaiting lead integration only. No dependency on other specialists to finish this track.

## Phase 2 final handoff — 2026-11-01 04:58:52 UTC

**Status: Ready for review.** Acquisition/inventory task complete. No blocker remains to main-agent integration.

### Exact delivered paths

- `public/models/robot-expressive.glb` — unchanged upstream binary, 463,988 bytes.
- `public/licenses/RobotExpressive.md` — exact upstream historical README, 361 bytes; no local annotations.
- `public/models/robot-manifest.json` — immutable provenance, both SHA-256 hashes, raw node/mesh/material lists, geometry/skin/morph/clip inventory, CPU bounds and verification limitations.
- `research/assets.md` — appended Phase 2 binary/rights findings and complete clip/mesh tables.
- `updates/assets.md` — real UTC progress/final milestone entries.
- `handoffs/assets.md` — this appended handoff. No other app/shared files changed by assets.

### Immutable source / license

- Commit: [`b924f0cad4058dc4dde71445c796980c3cd5b5ed`](https://github.com/mrdoob/three.js/commit/b924f0cad4058dc4dde71445c796980c3cd5b5ed).
- Upstream model path: `examples/models/gltf/RobotExpressive/RobotExpressive.glb`; [binary URL](https://raw.githubusercontent.com/mrdoob/three.js/b924f0cad4058dc4dde71445c796980c3cd5b5ed/examples/models/gltf/RobotExpressive/RobotExpressive.glb).
- GLB SHA-256: `047f5e5fb3bb6d378bd1df16ca6137f2a596c99b3a1b5690b4020c05aaf6f319`.
- Upstream README path: `examples/models/gltf/RobotExpressive/README.md`; [exact evidence](https://raw.githubusercontent.com/mrdoob/three.js/b924f0cad4058dc4dde71445c796980c3cd5b5ed/examples/models/gltf/RobotExpressive/README.md).
- README SHA-256: `84003fa9382ff8133ebc27988f35402c15e308fc50a56f1630988534de573d26`.
- Retained historical README credits **Quaternius** and **Don McCurdy**, states **CC0 1.0**. Creator name differs from newer mutable README wording recorded in Phase 1; exact historical evidence is preserved, not rewritten.
- No external textures/images/URIs in this artifact. Code dependency license obligations remain separate.

### Scene facts already reported promptly

- **Main exists**, with Grey and Black. Raw mesh names: Foot.L, Torso, Head, Foot.R, Shoulder.L, Arm.L, Shoulder.R, Arm.R, Leg.L, LowerLeg.L, Leg.R, LowerLeg.R, Hand.R, Hand.L.
- 74 raw node names/indices/parents/bindings in manifest; duplicated bone/mesh names mean loader names can differ. Head morphs: Angry, Surprised, Sad.
- Default-pose CPU bounds: min [-1.998517305, -0.020304421, -1.269148275], max [2.280402934, 4.440918025, 2.021867978], dimensions [4.278920238, 4.461222446, 3.291016252], center [0.140942815, 2.210306802, 0.376359851].
- Bounds include weighted hand skinning and node world transforms, default morphs zero. Not animated envelope/renderer measurements. Preserve the original hierarchy and armature scale; frame an outer group and recompute after selecting Idle.
- 14 meshes, 19 primitives, two skins sharing 43 joint nodes, 3,237 accessor-derived triangle estimate, 7,214 POSITION entries. No claim of 19 runtime draws.
- All 14 clips/timings in manifest/report. Idle 3.333333254 s; Wave 1.833333373 s; Yes 1.666666627 s. Navigation/inline reveal must not await those complete gestures.

### Verification and limits

Node v24.13.1, built-ins only. PASS: downloaded GLB/README hashes and bytes match manifest; GLB header/chunks valid for inspected structure; all 283 buffer views/accessors within embedded buffer; all primitive indices in range; all animation input times finite/nondecreasing. Initial sandbox DNS failed; authorized require_escalated retry succeeded. No full Khronos Validator, rendering, live animation, mobile or performance tests. No dependencies, optimizing, conversion or repo changes.

### Exact continuation for main agent

1. Load `/models/robot-expressive.glb`; retain/serve `/licenses/RobotExpressive.md`; use manifest for provenance and inventory.
2. Confirm GLTFLoader-produced names/materials, clone materials before recolor, apply selected clip pose, recompute visible bounds and camera/gesture padding. Treat CPU defaults as provisional.
3. Complete only the approved bounded robot specimen/button/inline placeholder prototype, with independent normal link, keyboard/touch/reduced-motion/mobile/WebGL failure paths. Measure runtime draws/bytes/device behavior separately and return the prototype for review before expansion.

**Scope stop:** only this robot was acquired. Other three assets, full site and deployment remain unapproved.


## 2026-11-01 06:37:25 UTC — three desk compositions: asset acquisition handoff (latest scope)

Latest user authority supersedes previous acquisition freezes for this bounded task. All 11 assets acquired; no missing files. Asset worker did not edit renderer/source/shared docs or run builds. Existing RobotExpressive remains untouched.

- Runtime directory: `public/models/desk-compositions/` (serve `/models/desk-compositions/`).
- [Manifest](../public/models/desk-compositions/manifest.json): exact sources/downloads/licenses/previews, SHA256, bytes, original min/max/size/bottom-center, mesh/image inventory and orientation hints.
- Public credit link: `/licenses/desk-compositions/README.md`; CC BY camera, basketball and keyboard credited individually; scene resizing/rotation/possible recoloring disclosed as visual modifications despite unchanged binary bytes. CC0 sources/official texts retained separately.

| File | Bytes | Original bbox size XYZ |
| --- | ---: | --- |
| desk.glb | 135916 | 1.822303, 0.922499, 0.846627 |
| basketball.glb | 38288 | 1.105074, 1.090775, 1.090749 |
| camera.glb | 78276 | 0.482310, 0.379635, 0.482784 |
| chip.glb | 106144 | 4.877428, 1.093585, 1.601172 |
| monitor.glb | 12856 | 0.392688, 0.294285, 0.104004 |
| lamp.glb | 12832 | 0.251529, 0.573203, 0.453174 |
| plant.glb | 16636 | 1.166246, 0.881856, 1.220059 |
| books.glb | 15156 | 0.150448, 0.103902, 0.094500 |
| mug.glb | 4904 | 0.200000, 0.200000, 0.232487 |
| keyboard.glb | 140100 | 414.750031, 15.644881, 155.250053 |
| chair.glb | 115760 | 0.721670, 1.127562, 0.807206 |

Total GLB bytes: **676,868**.

All roots are Y-up after original glTF transforms. Preserve these transforms. Normalize from manifest bottom-center. With floor y=0, desk uniform scale **3.360437345** puts its top at **y=3.1** (original bounds height 0.922498973). Drawer handles face +Z.

Orientation differences: camera lens-glass normals approximately (-0.7, -0.1, -0.7), so start with yaw **+2.35619449 rad** to face +Z. Monitor screen normals face approximately -Z, so start with yaw **PI**. These are numerical geometry inferences, not visually tested orientation claims. Lamp reaches +Z; mug handle +Z; chair cushion faces +Z (yaw PI to face the desk from its front). Chip long axis X, pin rows +/-Z. Keyboard front and book spine orientation remain visually unverified.

Basketball and keyboard each contain an embedded image; originals remain self-contained. Other assets have zero images. Monitor/books contain duplicated overlapping source mesh groups, retained unchanged. No authored animation clips were found.

Verification: Node v24.13.1, existing Three r187 GLTFLoader CPU parse for all 11; exact scene bounds, positive finite dimensions, finite positions, valid primitive indices, buffer-view ranges and matching SHA256/bytes passed. In-memory texture placeholders bypass image decoding only during CPU checks. No packages installed, full glTF validator, browser rendering or GPU/performance tests.

Next for main: load exact filenames, use generic normalization plus camera/monitor yaw corrections, link public README credits, confirm textured basketball/keyboard and actual camera/monitor front visually in the three authorized studies. No mini-world or full-site expansion is covered by this handoff.
