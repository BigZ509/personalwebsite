# Robotics showcase — D-022 review

Only the robotics workshop changes in this milestone. Two selectable licensed placeholder exhibits sit on the existing workbench: **Gesture Rover** (generic RobotExpressive stand-in) and **Guiding Hands** (monitor, keyboard and chip controller stand-in). Each has an always-visible project name and “Placeholder model” label. These are not replicas of the actual projects. User photos/appearance remain pending.

Click/tap a model or its named DOM button to select it. Hover/focus brightens its ring; selection adds a persistent ring/front strip, selected nameplate and pressed button. Selection changes no camera pose and opens no details. A drag or camera travel must not select. Each visit resets selection. Existing Back/Escape, robot animation, pause/motion controls and semantic notes remain.

## Actual build and screenshots

- [Desktop overview](../output/playwright/robotics-exhibits/02-workshop.png)
- [Gesture Rover selected](../output/playwright/robotics-exhibits/04-rover-selected.png)
- [Guiding Hands selected](../output/playwright/robotics-exhibits/05-hands-selected.png)
- [Keyboard selection](../output/playwright/robotics-exhibits/06-keyboard.png)
- [Portrait overview](../output/playwright/robotics-exhibits/08-mobile-workshop.png)
- [Touch selection](../output/playwright/robotics-exhibits/10-mobile-hands-selected.png)

Browser tests use the static exported site at `http://127.0.0.1:4182/hub/`, browser-tested build `KKAoKFzBH9jz_Sc8LcT3N`. Final export `5lJD4vraT4h2_DT7wC6fR` includes the updated credit notice; all five application-source hashes match the browser-tested sources. macOS, HeadlessChrome156, ANGLE/SwiftShader **software WebGL**; desktop1600×1100, touch emulation390×844. This is not physical-phone or hardware-GPU coverage.

## Verified paths

| Check | Result / evidence |
| --- | --- |
| Both actual model meshes hover and click | Pass, desktop final CLI result and screenshot states |
| Single selection; DOM controls mirror model highlight | Pass |
| Tab / Enter / Space; focus attention survives pointer leaving | Pass |
| Drag from unselected exhibit orbits without selecting | Pass |
| Selection controls disabled during entry | Pass |
| Escape / Back, restored invoking focus, repeat visit resets | Pass |
| Authored robot Wave still advances before entry | Pass |
| Exact original camera position/target after an orbited view | Pass, numeric error **0**, same Canvas element |
| Two portrait labels fully inside390px width | Pass, Rover16.21–129.21px; Hands155.49–268.49px |
| Touch taps on both model meshes and exact mobile return | Pass, fresh isolated mobile process |
| Initial reduced motion, both mesh taps and return | Pass, fresh isolated reduced-motion process |
| Unit suite / typecheck / production static build | Pass,8 tests, all existing routes exported |

Full reproducible CLI functions and results: [desktop](../output/playwright/robotics-exhibits/final-desktop.js), [desktop CLI result](../output/playwright/robotics-exhibits/final-desktop-cli.log), [mobile function](../output/playwright/robotics-exhibits/isolated-mobile.js), [mobile CLI result](../output/playwright/robotics-exhibits/isolated-mobile-cli.log), [initial reduced motion](../output/playwright/robotics-exhibits/isolated-reduced-cli.log), [source/model verification](../output/playwright/robotics-exhibits/verification.json). Tests are browser-CLI functions, not a new browser-test framework/dependency.

## Corrections and limits

Initial portrait image clipped Gesture Rover's nameplate (left=-53px). A failing in-browser label-bounds regression is retained in `mobile-label-red.log`. Workshop-only narrow-screen vertical FOV76 fixes the framing; the desk projection and saved/travel camera poses remain intact. No new camera writer or Canvas.

The first numeric return check sampled canvas data before it had settled; synchronized final sampling verifies identical saved/returned coordinates. Additional-context mobile runs timed out or exposed semantic fallback after reload; cause is not established. Retained `mobile-reduced-first.log`, `mobile-reduced-first.png` and `final-mobile-cli.log` document these failures. Fresh standalone Chrome processes passed both normal mobile and initial reduced-motion paths, with no page errors. Multi-context reliability remains an unresolved test-environment limitation, not a claimed fix. Earlier attempts are retained, not represented as passes.

Initial browser session reported favicon404 plus existing Three.Clock deprecation and SwiftShader readback warnings. Final desktop function recorded no page errors, failed requests or additional warnings. No FPS, physical-device, accessibility-conformance or production-performance claim. Safari/Firefox, screen readers, physical iOS/Android, hardware GPU, landscape/orientation and arbitrary orbited label containment are not tested here. Prior full recovery/context-loss suite was not rerun for this bounded scene edit.

Independent review identified the same mobile label clipping and requested touch/reduced-motion/numeric-return coverage; no other definite functional/ownership bug. Code and material ownership remain in the existing adapters. Updated current scope in root/app AGENTS, UPDATE, task/decision log, lead progress/handoff and [reference comparison](../research/hub-world/VISUAL_REFERENCES.md).

## Scope and handoff

Runtime changes: `Workshop.tsx`, new `exhibits.ts`, `HubExperience.tsx`, `hub.module.css`, and small interaction/projection integration in `DeskScene.tsx`. Desk furnishing code, presets, journey/controller, model bytes, dependencies and routes are preserved. All12 GLBs match HEAD (1,140,856bytes). Observed workshop frame:126draw calls/35,572triangle submissions, not a benchmark. Credits clarify placeholder usage and retain CC BY keyboard attribution.

No detail panels, other worlds, project claims, model generation/downloads, commit/push or deployment. Next: user reviews exhibit arrangement and supplies actual project photos before replacing stand-ins. Stop at this scope.

Local preview after teardown: `cd /Users/bigz/personalwebsite/portfolio && PORT=4182 npm run preview` (serves existing export). To rebuild: `npm run build`. Verification commands: `npm test`, `npm run typecheck`, `npm run build`; CLI functions run with cached Playwright CLI `--session=robotics-exhibits run-code` and the selected function text. Browser launch settings are retained in `output/playwright/compositions/playwright-config.json`.
