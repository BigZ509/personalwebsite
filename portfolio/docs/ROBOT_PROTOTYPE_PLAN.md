# Robot proof of concept — approval scope and acceptance plan

**Owner:** lead  
**Status:** Proposed; implementation blocked on user approval  
**Date:** 2026-11-01

## Question to answer

Can one appealing robot interaction coexist with immediate, accessible navigation and acceptable measured mobile performance? This proof is the gate for expanding to the basketball, camera, and microchip. It is not permission to implement the entire portfolio.

## Prerequisites

1. User selects a visual direction and approves the technical architecture in `IMPLEMENTATION_RECOMMENDATION.md`.
2. User authorizes this bounded robot proof of concept.
3. Implementation owner records exact dependency versions, runtime requirements, source asset/license, and target test devices before starting.

## Proposed scope

- One homepage composition with a robot, meaningful introduction placeholder, and ordinary labeled destination links.
- Robot idle and hover/focus reactions plus one brief optional activation accent. The final motion details follow the chosen direction and asset capabilities.
- A real `/robotics` destination and a direct deep link, with semantic content available independently of the canvas.
- Minimal semantic route fixtures for all base destinations plus one `/projects/[slug]` example to validate static output and missing-page behavior. Label fixture copy as draft; this is architecture verification, not full production content authoring.
- Touch, keyboard, reduced-motion, disabled/unavailable 3D, asset-load failure, and lost-context paths.
- A static robot poster, 3D error containment, and a way to stop decorative motion.
- Recorded browser/device/network measurements and a written review of results against the proposed budget.

No second object, production project copy, CMS, custom shader showcase, complex scene, physics engine, or full site build is needed to answer this question.

## Review evidence

| Area | Evidence required before claiming success |
| --- | --- |
| Visual fit | Desktop/mobile captures and selected direction comparison; user reviews robot styling |
| Navigation | Direct destination, repeated activation, Back/Forward, normal and modified link activation, and route cancellation behavior |
| Accessibility | Keyboard walkthrough, visible focus, accessible destination labels, reduced motion, motion pause, screen reader smoke test |
| Resilience | No JS content, unavailable WebGL, 3D import/model failure, context loss, slow load, and offscreen/hidden tab |
| Runtime | Actual package lock and successful production build; exact commands and outputs in handoff |
| Performance | Named device/browser/network, cold/warm measurements, transfer sizes, rendering workload, frame timing; record failures too |
| Licensing | Per-asset source, creator, exact license/version, notices and modification record; dependency licenses separately |

## Expansion gate

After review, the user chooses to revise the prototype or approve expansion. If mobile or accessibility targets fail, retain the semantic content and poster path while revising 3D complexity. Passing a desktop demo alone is insufficient evidence for expansion.

## Specialist integration

The detailed [performance acceptance matrix](../research/performance.md#robot-proof-acceptance-matrix--all-not-run) and [measurement protocol](../research/performance.md#measurement-protocol-after-prototype-approval) are incorporated as the proposed test plan. **Every runtime check is NOT RUN.** Static mobile default, numeric limits and the following motion policy remain proposals requiring the initial gate.

### Motion and loading proposal

- Static poster and native links first; mobile/coarse-pointer starts static with optional Enable 3D. Reduced motion remains static even after enabling 3D.
- Finite idle/focus gestures; provide persistent pause/resume if continuous motion is chosen. Optional activation feedback ≤400 ms, never awaited by navigation. No flash/strobe.
- Timeout failed enhancement after 10 seconds, retain poster, and provide manual retry. Restoring 3D after context loss is optional; working semantic navigation is mandatory.
- Offscreen and hidden-page mixers/draws stop; user pause state survives return. On-demand rendering must explicitly invalidate during actual animation and stop invalidating at rest.

### Initial budget hypotheses

Initial 2D shell ≤300 KiB; deferred robot ≤1.5 MiB including renderer/decoder/GLB/environment; robot ≤40k visible triangles and ≤30 draws/frame; texture residency estimate ≤16 MiB; mobile DPR 1 initially and 30 fps motion target with p95 rendered-frame gaps ≤50 ms. These are experiment limits, not verified capabilities. Measure the framework baseline and revise constraints openly if necessary before adding features.

### Required evidence package

Record actual artifact/dependency versions, named device/browser/OS, physical-phone results and separate simulated profiles. Save HAR/traces, compressed transfers by phase, LCP/CLS/TBT, interaction samples during decode, submitted/presented frame timing where available, resource estimates and paired original/optimized animation captures. Run five cold/five warm loads; repeat motion after five minutes. Use at least a physical midrange Android, physical iPhone and integrated-GPU laptop when available; missing device coverage remains an explicit unresolved result.

Run the full matrix covering keyboard, touch/cancellation, reduced-motion changes, pause, unavailable WebGL, real simulated context loss, offscreen/background, no JS, direct links/history/modified clicks, asset/decoder failures, screen readers, contrast/reflow and animation fidelity. Mark each row pass/fail/not run/unavailable with evidence, not inference. Any navigation/accessibility-path failure blocks expansion. Lab results do not establish field p75 Core Web Vitals.

### Asset and architecture integration

Use the proposed CC0 RobotExpressive converted GLB, subject to the selected art direction, pinned source/license acquisition and actual inventory. [Model-specific license evidence](https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/RobotExpressive/README.md). Check the real clips, bounds, materials and texture/rig counts. Prefer a finite settle/group turn; evaluate imported gestures after inspection. No mandatory walk path, physics, bloom, flash or external HDRI is needed.

The proposed Next static-export architecture has one homepage canvas and a client wrapper for the dynamic import with SSR disabled. Never put browser-only imports in the shared server layout, content renderer or shared barrel. Verify that mobile before opt-in, reduced-motion visits, no-JS content and direct section/project visits request no scene/model chunks. Inspect preloads/prefetching too; an apparently lazy source file does not prove a lazy network boundary.

DOM anchors remain the sole navigation mechanism. Test middle/modified clicks, context menus, `target`, downloads and external links as well as primary activation; avoid duplicate router pushes or prevented native behavior. Repeated activation, Back/Forward during load and unmount before late async completion must cancel owned work and ignore stale results. Do not claim `import()` network cancellation. Mixers own bones, outer object groups own portal transforms, and the route layer owns destinations.

### Research reconciliation and future review

- **Idle conflict resolved as a proposal:** the assets report includes an authored looping Idle option; the design/performance recommendation prefers finite movement. Start with a bounded settle and rest. Looping requires explicit motion/pause policy and measured costs.
- **Focus policy:** immediate stable DOM outline/label feedback is required; focus does not require moving the object. Hover-only decoration conveys no essential information.
- **Timing:** 180–240 ms is the proposed hover response; activation accent ≤350 ms within the ≤400 ms experiment ceiling. Navigation never waits, and a route change may cut the accent short.
- **Bundle policy:** the specialist's 80 KiB initial-JS suballocation is diagnostic until a production baseline is measured. Maintain the visible total-shell hypothesis and document any revised gate with evidence before adding complexity.
- **No runtime success claimed:** browser WebGL creation failed in the asset research session. Use a graphics-capable environment and recorded physical devices for the approved proof; unavailable hardware coverage stays unverified.

The architecture specialist reviewed the lead proposal and found no blocking contradiction, then requested the semantic fixture, explicit lazy boundary and cancellation checks above. All four research tracks are integrated. This document remains a proposal and authorizes no implementation.
