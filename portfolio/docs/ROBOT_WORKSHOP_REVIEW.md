# Robot workshop — review checkpoint

2026-11-02 · D-018 · **Ready for user review.** Approved direction: 02 Cinematic with 01 Cozy warmth. Existing room and licensed models preserved; only the robot has a destination. No other worlds implemented.

## Open and inspect

- Running static production preview: [desk](http://127.0.0.1:4182/) (alias `/hub/`), [non-3D notes](http://127.0.0.1:4182/hub/robotics/).
- Screenshots: [desk](../output/playwright/robot-journey/01-desk.png), [authored hover Wave](../output/playwright/robot-journey/02-hover-wave.png), [camera approach](../output/playwright/robot-journey/03-camera-approach.png), [workshop](../output/playwright/robot-journey/04-workshop.png), [return](../output/playwright/robot-journey/05-returned-desk.png), [mobile desk](../output/playwright/robot-journey/07-mobile-desk.png), [mobile workshop](../output/playwright/robot-journey/08-mobile-workshop.png).
- Run from `portfolio/`: `npm run dev`; production: `npm run build`, then `PORT=4182 npm run preview` if that port is free. Existing preview server already runs there.

## Component and scene architecture

`src/app/page.tsx` reexports `/hub/page.tsx`. `HubExperience` lazy-loads `DeskScene`, owns semantic controls, motion preferences, foreground loading deadlines, focus and the DOM cover. The framework-independent `journey.ts` coordinates cancellation and phase changes through camera/cover/world ports.

```text
HubExperience — DOM navigation, motion, fallback, live status
└── DeskScene — ONE Canvas, demand rendering, capped DPR
    ├── CameraRig — ONE Drei CameraControls; sole pose writer
    ├── lights + SceneEvidence
    ├── Workroom — preserved; hidden during workshop
    │   └── RobotCharacter — authored Idle/Wave + material highlight
    └── Workshop — lazy destination; unmounted on return
        └── existing props + separate RobotCharacter clone
```

`SceneAssets` extracts the existing model/material/print adapters without replacing the room. Skeleton/material clones keep cached GLTF geometry/textures shared. Robot animation uses Drei `useAnimations` and the existing clips, not new skeletal tracks. Hidden worlds stop animation/picking. The GLTF cache and desk remain retained; GPU-memory eviction is not measured.

Entry captures current CameraControls position/target, approaches the robot, covers the swap, waits for rendered workshop readiness, reveals and frames the bench. Back supersedes pending work, freezes the current pose without an endpoint jump, swaps under cover, restores the saved pose and focuses the committed entry button. Return position error was **0** in the orbited-view browser check. Resize adjusts projection without resetting pose. Live reduced motion settles active movement and skips later flights/fades. Deadlines count foreground time: initial scene15s, world12s, camera8s. Context/load failure uses terminal semantic fallback; retry reloads the page.

## Verification

Environment: macOS host, isolated HeadlessChrome156, **SwiftShader software WebGL**, desktop1600×1100, reduced-motion1280×900, touch emulation390×844. This is not physical-device or hardware-GPU coverage.

| Interaction / requirement | Result |
| --- | --- |
| Real mesh hover, authored Wave/palm movement, ring/material highlight | Pass; timed animation/pose samples and screenshots |
| Mesh click → camera approach → visibly distinct workshop → Back | Pass; same canvas identity throughout |
| Native Tab/focus/Enter/Space, Escape, restored focus | Pass |
| Focus attention survives pointer leaving | Pass |
| Exact return after orbit; repeat visits; cancel during approach | Pass; no stale destination; cancellation continuity sampled before cover |
| Touch on actual robot mesh and return control | Pass in emulation |
| Reduced motion at load and changed during travel; manual Pause | Pass; neutral Idle0.5, no Wave in reduced motion; paused frame count unchanged in sample |
| WebGL unavailable, actual context loss, indefinitely stalled initial GLB | Pass; usable notes/retry fallback |
| No JavaScript | Pass; noscript link reaches exported notes |
| All three archived composition routes after adapter extraction | Pass |
| Unit suite / typecheck / production build / static export | Pass; 8 tests; `/`, `/hub/`, `/hub/robotics/` exported |

Machine-readable evidence and reproducible CLI functions: [flow](../output/playwright/robot-journey/flow-evidence.json), [input paths](../output/playwright/robot-journey/paths-evidence.json), [recovery](../output/playwright/robot-journey/recovery-evidence.json), [hardening](../output/playwright/robot-journey/hardening-evidence.json), [build log](../output/playwright/robot-journey/build.log). Initial unbounded-load reproduction and subsequent bounded regression are retained separately. The pure controller's load-error unit test does not imply integrated in-place WebGL recovery.

Final build ID: `5YY4vq69O-B25g-jGbiZu`. All four browser functions passed against this build. [Verification manifest](../output/playwright/robot-journey/verification.json) records source/image hashes, exported routes, unchanged model bytes and limits. No remaining failure was observed in the exercised paths. Earlier failures fixed: false fallback notification, invisible canvas tab stop, return-focus race, captured motion policy and unbounded initial loading. CameraControls endpoint-jump/hidden-time concerns were source-corrected, with interruption/live-motion regressions; actual OS suspension remains unverified. Stale-frame orbit sampling and premature pause sampling were test synchronization defects, corrected to await rendered state.

## Changed files and navigation effects

- **Added runtime:** `src/app/hub/page.tsx`, `src/app/hub/robotics/page.tsx`; `src/features/hub/{HubExperience,RobotCharacter,Workshop}.tsx`, `journey.ts`, `visibleDeadline.ts`, `hub.module.css`; shared `src/features/compositions/SceneAssets.tsx`.
- **Modified runtime:** `src/app/page.tsx` now reexports the hub; `src/features/compositions/DeskScene.tsx` integrates the robot/destination/camera lifecycle; `presets.ts` adds the approved derived theme while keeping all three original presets. `package.json` changes only the test glob. Added `tests/journey.test.ts`; no dependency or lockfile changes.
- **Evidence/memory:** `output/playwright/robot-journey/`; asset usage/attribution notice; root/project READMEs and AGENTS, launch prompt, UPDATE, task/decision/index/brief, lead/assets/architecture checkpoints and reference-comparison note. Existing source/license research preserved.

**Composition preserved with disclosed adaptations:** original room geometry, desk/furnishing placements, four existing object models and Cinematic camera/framing remain. Approved Cozy-derived wood/rug/paper/light warmth changes the treatment. Robot yaw changed from −0.45 to +0.45 radians to face the viewer and make Wave legible; HUD/hover-label placement changed. The three archived presets themselves remain unchanged. The workshop is a separate small destination; the main room was not rebuilt.

**Changes beyond the minimum isolated round trip:** promoted the hub to `/`, added `/hub/robotics/` as accessible static notes, added Pause/motion and failure-deadline controls, and extracted shared asset helpers. Promoting the route changes existing navigation: the old Field Notes homepage/header/specimen anchor navigation is replaced. `/hub/` is an alias; no redirect or new world-history system was introduced. `/compositions/` and `/robotics/` still export. The legacy `/robotics/` link labeled “Back to the specimen” still targets `/`, which now opens the desk; old root `#specimen`/`#main` anchors no longer identify the former homepage sections. This is a navigation change, not an unchanged-navigation claim. No other navigation object/world was built.

## Visual comparison and performance observations

Compared actual captures against the three retained [game references](../research/hub-world/VISUAL_REFERENCES.md). **Life Is Strange:** warm wood/rug, mug, notes and belongings preserve a used-desk feeling; personal project evidence is still placeholder. **Stray:** warm practical lamp against cool room fill, shelf shadows and plants; geometry/material detail is simpler, without volumetrics or expensive postprocessing. **The Room:** object approach and a distinct entered space with explicit return; the swap is covered, with no visible portal nesting or puzzle mechanics. Moved the hover label off the robot’s face and oriented the existing character toward the viewing angle. No proprietary game assets or generated models/images used.

Observed renderer submissions (including shadow work): desk237 draw calls/61,478 triangles; workshop130/34,580. Twelve unchanged GLBs total **1,140,856 bytes**; hashes and exported copies match manifests. Local resource entries recorded about **1.56MB raw JavaScript** for the observed load, before workshop chunk; these are local/warm-cache observations, not network/phone budgets. No FPS, Core Web Vitals, battery, thermal or GPU-memory target is claimed. Upstream `THREE.Clock` deprecation and software-driver readback warnings remain; final flow recorded no page errors or failed requests.

## Rights, limits and next review

[Asset credits](../public/licenses/desk-compositions/ATTRIBUTION.md) retain required CC BY3.0 author/source/license/modification credits; remaining props and [RobotExpressive model/animations](../public/licenses/RobotExpressive.md) are separately documented CC0. Stored assets/clips are unchanged. Library code licenses are separate from model rights. No new dependencies were added.

**Unverified:** physical iPhone/iPad/Android, Safari/Firefox, hardware GPU, screen readers/formal accessibility conformance, real OS background suspension, mid-transition orientation changes, browser-history/deep-link world navigation, memory pressure and production-network performance. Visibility policies are source-hardened; actual OS suspension is not browser-proven. The workshop contains illustrative notes rather than real project case studies. Browser Back navigates normally; it is not an in-scene world-history control.

**Implementation stopped at the user's explicit review boundary (D-020).** Review the robot reaction, camera pacing, workshop scale and return; wait for visual review before any implementation. Do not create a GitHub repository, commit or deploy. No repository was created, no commit/push/remote exists and no deployment occurred. Historical D-017 creation failed because automatic approval review could not run due to a usage limit; the creation click never executed. The latest prohibition supersedes the earlier repository request.
