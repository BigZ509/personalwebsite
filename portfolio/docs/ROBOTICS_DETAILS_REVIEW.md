# Robotics project details — D-023 review

Preserved the working two-exhibit workshop, cinematic desk and robot journey. One reusable **nonmodal** project inspector opens from either actual exhibit mesh or named control: right side on desktop, lower52svh sheet on mobile. No backdrop, camera move, new Canvas, detail route or other world. The room remains visible and the header/other exhibit remain usable. Mobile sheet covers some lower bench/nameplates; the upper room/models stay visible and sheet navigation also switches projects.

Labels now use readable dark plaques with Open project, Placeholder model and selected state. The persistent ring/front strip and pressed control agree with the panel. Close restores focus to the selected exhibit's DOM equivalent; Escape closes notes first, the next Escape returns Desk. Header Back directly returns and clears notes. Re-entering starts with no open details. Scroll position resets on project switch, and the content region supports keyboard scrolling.

## Content and deliberate gaps

- **Guiding Hands:** user-confirmed [repository](https://github.com/BigZ509/guiding-hands) and inspiration. Summary derives from fetched README/CONTEXT: local hand tracking and forest-game controls; projected setup is intended, not an asserted verified hardware outcome.
- **Gesture Rover:** confirmed name; pending summary/repository. User supplied its inspiration as **provisional**, visibly labeled. Do not imply confirmed personal wording or demonstrated robot functionality.
- **Both demo videos:** explicitly unavailable per user's clarification. No guessed URL, embedded test recording, synthetic demo, autoplay or external media request. The optional video component/schema supports future confirmed content, but its playback/error branches are **not exercised** with these null-video records.
- **KnightHacks candidate:** current main context/controls/relay describe the forest hand-control game; Gesture Rover implementation could not be verified, so no Rover link. Root README404 and exact sources/limitations recorded in [data provenance](ROBOTICS_PROJECT_DATA.md). This is limited to inspected current main, not all history/private repositories.

## Actual browser evidence

Static exported build `wfegZMpmIInQSF2tPWjKQ`, `http://127.0.0.1:4182/hub/`. macOS, HeadlessChrome156, ANGLE/SwiftShader **software WebGL**. Desktop1600×1100 plus1280×720 scrolling check; touch emulation390×844 with normal and initial reduced motion. Not physical phone/GPU coverage.

| Path | Result |
| --- | --- |
| Actual Rover mesh → correct panel; actual controller mesh switches to Guiding Hands | Pass, desktop/touch/reduced-motion |
| Same panel shell reused; one Canvas and camera pose preserved | Pass; DOM element identity/pose equality checks |
| Both names/placeholder/action plaques inside mobile viewport | Pass; Rover10.71–134.71px, Hands149.99–273.99px |
| Real Guiding repo/inspiration; Rover missing/provisional fields; both demos unavailable | Pass |
| Enter/Space, close focus, nonmodal header Back, Escape close then return | Pass |
| Scroll → switch resets content; keyboard PageDown scroll | Pass |
| Repeated entry/reopening; no stale panel in desk | Pass |
| Mobile visible room above sheet, content scrolling, switch/close/reopen | Pass; sheet370×438.875px at10,395.125 |
| No unconfirmed media/KnightHacks resource requested | Pass |
| Unit suite, typecheck, production build/static export, diff whitespace check | Pass;8 tests, existing routes preserved |

Screenshots:
- [Refined workshop labels](../output/playwright/robotics-details/02-workshop-labels.png)
- [Gesture Rover details](../output/playwright/robotics-details/03-rover-panel.png)
- [Guiding Hands details](../output/playwright/robotics-details/04-guiding-panel.png)
- [Keyboard](../output/playwright/robotics-details/05-keyboard-panel.png)
- [Returned desk](../output/playwright/robotics-details/06-returned-desk.png)
- [Mobile Rover](../output/playwright/robotics-details/mobile-02-rover.png)
- [Mobile Guiding Hands](../output/playwright/robotics-details/mobile-03-guiding.png)
- [Mobile inspiration after scroll](../output/playwright/robotics-details/mobile-04-inspiration.png)
- [Initial reduced-motion inspector](../output/playwright/robotics-details/reduced-03-guiding.png)

Reproducible Playwright CLI functions: [desktop](../output/playwright/robotics-details/desktop-checks.js), [mobile/reduced](../output/playwright/robotics-details/mobile-checks.js). Exact results in matching `desktop-cli.log`, `mobile-cli.log`, `reduced-cli.log` and JSON evidence; environment/source/model/image hashes in [verification](../output/playwright/robotics-details/verification.json). Configs under the same folder. No new testing dependency/framework installed.

## Review corrections and limits

Independent source review identified retained panel scroll across project switches. Reproduced `scroll-red.log`: prior255px, new project retained82px. Keying only the content body by project ID resets scroll and removes old media; final desktop/mobile tests verify this. Added explicitly focusable/labelled content region.

Browser checks also caught the decorative selected checkmark becoming part of the button accessible name. Retained `selection-name-red.log`; explicit project aria-label keeps the name stable, with aria-pressed separately expressing state. Final keyboard and mobile-close focus checks pass.

Final functions recorded no page errors. Existing Three.Clock deprecation, favicon404 and software-GPU readback warnings remain. No physical iOS/Android, hardware GPU, Safari/Firefox, screen reader, accessibility-conformance, landscape/orientation, arbitrary zoom/label containment or production-performance claim. Media playback cannot be claimed without supplied videos. Prior WebGL recovery/context-loss/background-suspension suite was not rerun; no lifecycle code there changed. KnightHacks historical branches/private sources not searched.

Reopened actual three-game reference images and compared new captures; [comparison](../research/hub-world/VISUAL_REFERENCES.md) records retained warm wood/amber vs cool fill, object inspection while the room remains visible, simplified materials and missing real photos. No proprietary reference assets shipped.

## Files and continuation

Runtime: new `src/features/hub/ProjectDetails.tsx`; expanded `exhibits.ts`; selection/panel/focus/Escape integration in `HubExperience.tsx`; nameplate copy in `Workshop.tsx`; appended styles in `hub.module.css`. `DeskScene.tsx` exactly matches the D-022 checkpoint; journey, robot, presets, scene assets/dependencies and all12 licensed GLB bytes remain unchanged. Existing uncommitted D-022 work was preserved.

Memory: root/app AGENTS, UPDATE, task/decision/brief, source-data report, lead update/handoff, spec/plan, reference comparison and this review. No other worlds, commit/push or deployment. Next: user reviews the inspector and supplies confirmed demo videos, Rover summary/repository and final inspiration wording, plus actual project photos when ready.

After QA teardown, reopen local export with `cd /Users/bigz/personalwebsite/portfolio && PORT=4182 npm run preview`. Rebuild with `npm run build`. Checks: `npm test`, `npm run typecheck`.
