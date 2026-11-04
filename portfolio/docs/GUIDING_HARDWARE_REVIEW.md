# Guiding Hands hardware illustration — D-024 review

The generic monitor/keyboard/chip stand-in is replaced by a compact **illustrative computer-vision setup** on the same selectable plinth: requested webcam, requested tripod projector, original stylized Jetson Orin Nano, a small schematic projection area and two reodesuxz office-pack props (plant/paper stack). The optional monitor and whiteboard are omitted to keep the setup uncluttered. The desk, Rover, room/camera and shared project inspector remain.

The Jetson is original code-native geometry guided by NVIDIA's official layout image and documentation: board, static cooler/fan, header strip and simplified connectors. It is **not an official NVIDIA model, electrical/port diagram, dimensional replica or confirmed assembled hardware**. No logo/reference texture is copied. Projection-area marks are a static schematic, not actual gameplay, inference output or demo footage. Both videos remain unavailable. No camera access requested.

Nameplate and panel now say Illustrative setup; the panel explains its status. Rover retains Placeholder model and provisional/missing data. Clicking any core hardware object opens the existing Guiding Hands inspector, with the confirmed repository/inspiration and unchanged missing-demo state.

## Sources, modifications and rights

[Asset/source/rights record](GUIDING_HARDWARE_ASSETS.md), [public credits](../public/licenses/guiding-hardware/ATTRIBUTION.md), [four-file manifest](../public/models/guiding-hardware/manifest.json).

- Projector by Andy Shaw and Webcam by dook: verified CC BY3.0 anchors; credits/full license retained. The projector's built-in brown display-base node is omitted from scene roots. Geometry/buffers/materials otherwise retained; adaptation disclosed. Webcam original bytes unchanged.
- reodesuxz v1.0 archive LICENSE expressly permits app/project use and modification. Its restriction covers standalone assets, packs and libraries. Only `office_plant.glb` and `paper_stack.glb` are app-integrated, with retained LICENSE and scope notice; no ZIP/.blend/unused assets included. No general-purpose asset-library reuse grant.
- NVIDIA reference image remains outside production, used only for visual reference. No official model download fabricated. Imported GLTF hierarchy/bounds and no animations were checked with native Three GLTFLoader. Independent source review found no actionable issue and checked hashes/loading/base omission/resource ownership/credits/scope.

## Actual browser captures

- [Unchanged desk](../output/playwright/guiding-hardware/01-desk.png)
- [Workshop](../output/playwright/guiding-hardware/02-workshop.png)
- [Hardware detail crop](../output/playwright/guiding-hardware/03-hardware-crop.png), actual browser crop
- [Guiding Hands inspector](../output/playwright/guiding-hardware/04-guiding-panel.png)
- [Returned desk](../output/playwright/guiding-hardware/05-returned-desk.png)
- [Portrait workshop](../output/playwright/guiding-hardware/mobile-01-workshop.png)
- [Mobile panel](../output/playwright/guiding-hardware/mobile-02-guiding-panel.png)
- [Mobile scrolled content](../output/playwright/guiding-hardware/mobile-03-details-scrolled.png)
- [Initial reduced motion](../output/playwright/guiding-hardware/reduced-01-workshop.png)

Actual exported build `f3JtLGGttBH0FIGdwlPdC`, at `http://127.0.0.1:4182/hub/`. macOS, HeadlessChrome156, ANGLE/SwiftShader **software WebGL**, desktop1600×1100 and touch emulation390×844. Software rendering/emulation is not hardware-GPU or physical-phone coverage.

| Path | Result |
| --- | --- |
| All4 imported assets visibly present; projector base omitted; stylized fan/board visible | Pass, screenshots + loaded asset/bounds checks |
| Actual webcam, Jetson and projector mesh selection | Pass, desktop and touch/reduced motion |
| Illustrative labels/note, confirmed repo and unavailable demo retained | Pass |
| Rover selection/placeholder/provisional data preserved | Pass |
| Shared inspector switch/close, restored focus, Enter/Space | Pass |
| Mobile content scroll/switch reset, portrait nameplate clears Jetson edge | Pass |
| Same Canvas, unchanged camera pose on inspection, exact invoking desk return | Pass |
| Unit/type/build/static export/diff check | Pass,8 tests; no dependencies/routes added |

Reproducible CLI functions and matching result logs/JSON: `output/playwright/guiding-hardware/{desktop-checks,mobile-checks}.js`, `desktop-cli.log`, `mobile-cli.log`, `reduced-cli.log`. [Verification manifest](../output/playwright/guiding-hardware/verification.json) binds build/source/model/screenshot hashes. Four new GLBs total169,180bytes; all original12 GLBs remain byte-identical. DeskScene/camera adapter and journey/robot/presets/asset adapter unchanged. Observed workshop frame198draw calls/62,918triangle submissions includes rendering/shadow work; not FPS or a benchmark.

## Corrections and limits

Portrait nameplate initially covered part of the Jetson front edge. Only Guiding Hands portrait label moves lower; desktop/Rover/camera stay put. Before screenshot retained as `mobile-before-label-adjustment.png`. Final bound/visible screenshot checks pass. A premature reduced-motion Html bounds sample (`mobile-label-first-sampling.log`) caught pre-settled projection; it is **not claimed as a failing overlap assertion**. Final checks wait for rendered camera/Html geometry.

First desktop automation captured an aborted robot GLB request during its initial reload, despite all subsequent visual/interaction assertions completing. Preserved `navigation-abort-first.log`; final request monitoring starts after initial ready, and no scoped failed requests/page errors were recorded. Initial-load visual readiness and all new assets were separately observed. This is test scoping, not a claimed application/network fix.

Existing favicon404, Three.Clock deprecation and software-GPU readback warnings remain. No physical iOS/Android, hardware GPU, Safari/Firefox, screen reader/conformance, orientation, arbitrary orbit/zoom label containment, FPS/CWV or electrical accuracy claim. Tiny schematic/Jetson micro-labels are not claimed fully readable in portrait; main nameplate and inspector disclose representation clearly. On mobile the lower inspector can cover the low hardware cluster; close or use its project-navigation controls to inspect/switch. Video playback remains untested because both videos are unavailable. The full earlier recovery/context-loss suite was not rerun.

Actual captures were compared to retained Life Is Strange desk warmth/storytelling, Stray warm/cool atmosphere and The Room object/world inspection; [comparison](../research/hub-world/VISUAL_REFERENCES.md). No proprietary game assets included.

## Files and next step

Runtime: added `GuidingHandsSetup.tsx`; replaced Guiding children and portrait-label anchor in `Workshop.tsx`; representation data/note in `exhibits.ts`/`ProjectDetails.tsx`; small caption/style changes in `HubExperience.tsx`/`hub.module.css`. New selected models/manifest/license notices and lead-owned scope/provenance/review/memory. Prior uncommitted showcase/detail work preserved.

No other worlds, dependencies, commits/push or deployment. Stop for user review of the illustration; actual hardware/photos and demo videos remain unconfirmed. After QA teardown, reopen the export from portfolio with `PORT=4182 npm run preview`; rebuild with `npm run build`.
