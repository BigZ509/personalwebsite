# Hub assets and reusable systems

Checked 2026-11-01. Use the existing libraries/components through their public interfaces; don't copy renderer setup, dependency bundles or an author's entire site. Code and model rights are separate. “Compatible” below means a plausible documented integration path, not a successful integration test.

## Desk / room shortlist

### H1 — Quaternius desk: recommended first asset inspection

| Field | Finding |
| --- | --- |
| Source / preview demo | [Desk listing/viewer](https://poly.pizza/m/V86Go2rlnq); no GitHub exposed. [Unchanged publisher preview](previews/quaternius-desk.jpg). Live viewer interaction unverified |
| Exact asset file | [`91c2bf8d-0876-4801-abd3-8dd5d017ecbd.glb`](https://static.poly.pizza/91c2bf8d-0876-4801-abd3-8dd5d017ecbd.glb), exposed by the listing's model-viewer metadata; not an invented archive path |
| License | Listing's actual HTML links to [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Code N/A. Keep provenance; no copyright attribution condition asserted for CC0 |
| Verified contents | Actual GLB: **135,916 bytes**, SHA256 `3878f6d93d946d77f3e1be55919627a81435696252137ae33c22391c0411f3ce`; FBX2glTF v0.9.7; nodes `RootNode`, `Desk`, `Desk_Drawer1`–`Desk_Drawer4`; zero images, zero animation clips, no required glTF extensions. Metadata/bytes checked, not rendered locally |
| Reuse | Finished wooden desk geometry/materials and separate drawer nodes; asset-based hub foundation |
| Change | Set scale/origin, place four independently loaded objects, frame a desk-height camera, add selected room dressing/lighting. No existing drawer animation or portal behavior supplied |
| Next/R3F | GLB through existing Drei `useGLTF`, inside the client canvas. Low asset effort; art coherence and gesture clearance still need a later render |

**Rank:** first for clear rights and inspectable GLB. Visual fit is a traditional drawer desk; choose H2 if a simpler modern workbench is preferred. This desk alone is not a complete room.

### H2 — Kenney Furniture Kit: modular environment alternative

| Field | Finding |
| --- | --- |
| Source / demo | [Official Furniture Kit](https://kenney.nl/assets/furniture-kit), source URL rather than GitHub. Publisher asset page/preview, not an interactive portfolio demo |
| Exact files | Official link resolves to `https://kenney.nl/media/pages/assets/furniture-kit/440e0608a4-1677580847/kenney_furniture-kit.zip`. Download returned **403**. **Inner desk/chair/wall filenames and available model variants are not verified**; inspect archive after selection rather than claiming paths |
| License | Official pack page explicitly lists Creative Commons CC0 and links its license. Code N/A; included archive license/contents not inspected |
| Reuse | Published interior furniture kit for composing a consistent desk/room; page lists 140 files, not 140 verified unique meshes |
| Change | Choose actual desk and room pieces, inspect formats, assemble room, align object anchors/materials, optimize selected files. Do not import the entire kit by default |
| Next/R3F | Format/pipeline conditional until ZIP inspection. Use existing glTF tooling if conversion is required, after authorization. Moderate composition effort; no working drop-in R3F hub supplied |

**Rank:** second, potentially stronger modern-room cohesion; file inspection blocked. No fully assembled, license-cleared desk-room application was verified in this focused pass.

### H3 — Julien Quenneville room: close visual/behavior reference, reuse on hold

| Field | Finding |
| --- | --- |
| GitHub / demo | [JulienQ1/NextThree-js-Portfolio](https://github.com/JulienQ1/NextThree-js-Portfolio); [published room](https://next-three-js-portfolio.vercel.app); [creator's illustrated walkthrough](https://julienquenneville.com/projets/3d-room-portfolio/). Walkthrough fetched; room interactions not observed |
| Exact files | At `b260ec8963e1074e409c8ea3d7de8e48389bf347`: `src/Experience.jsx`, `src/RoomModel/roomModel.jsx`, `src/CameraManager/CameraManager.jsx`, `src/helper/CameraStore.jsx`, `src/RoomModel/textures/TextureMaterial.jsx`; `public/assets/RoomModel.glb`, `public/assets/chairtopDraco.glb`. Room source references `public/assets/bakedTextureDaycmp.webp`, `roomTextureNightcmp.webp`, `roomTextureLightMapcmp.webp` |
| License | **No LICENSE/COPYING/NOTICE found in recursive tree; code and room/model/texture reuse grants not established. Public source is not an open-source license. Hold copying** |
| Existing behavior | Inspected source: room GLB, baked day/night/light-map blending, chair idle, named camera states calling `setLookAt`; creator shows object-led exploration and monitor/phone entry |
| Reuse / change | Currently reference only. If permission is obtained, room organization and camera-state integration are relevant. Replace personal content/media/emulator, adapt four portal targets, remove unnecessary audio/postprocessing dependencies |
| Next/R3F | Despite repository name, `package.json` is Vite/React 18/Fiber 8/Drei 9, not a ready Next application. Requires current-major migration and browser-only boundaries. High effort; no compatibility test |

**Rank:** strongest concept match among newly inspected room repos; excluded from the cleared reuse bundle because of missing grants.

## Interaction and transition implementations

### I1 — Txemalon keyboard interaction: preferred concrete object behavior

- **Source/demo:** [Txemalon/3d-portfolio](https://github.com/Txemalon/3d-portfolio), [live site](https://txemaalbero.com). [Existing capture and full audit](../reusable-components/06-priority-repositories.md). DOM/language switch observed previously; 3D keyboard unverified here.
- **Exact files:** `components/FrozenKeyboard.tsx` (`Keycap`, `Keyboard`), `lib/skills.ts`, `lib/seasons.ts`; read at `52cfcb8f8e1c192d9dc44edb3cb70feae79d49d7`. `LICENSE` actual MIT text verified. Code geometry/behavior reusable; don't assume its fonts, sounds, photos or icons have the same license.
- **Reuse:** authored key geometry, hover/touch press, emissive interpolation and idle/section poses. Useful as the entire software portal object under the user's “another development object” allowance.
- **Change:** extract scene contents from its own canvas; replace skills/theme/scroll coupling with hub selection; supply focus/keyboard bridge and camera targets. Don't transfer its standalone deployment config.
- **Next/R3F:** same React 19/Next 16/Fiber 9/Drei 10 family as existing workspace. Moderate extraction; no second canvas, optional sounds omitted. No port tested.

### I2 — R3F events: use the existing raycaster/event system

- **Source/demo:** [Fiber repository](https://github.com/pmndrs/react-three-fiber), [official events examples](https://r3f.docs.pmnd.rs/api/events). Documentation examples, not a separate complete hub demo.
- **Exact files:** `packages/fiber/src/core/events.ts`, `LICENSE` verified through GitHub. MIT code; no model included/cleared by this API.
- **Reuse:** mesh/group pointer-over/out, click and pointer-missed events, intersection data and `stopPropagation` behavior. Use one event root; no custom picking engine.
- **Change:** restrict picking to portal objects/proxy hit meshes; prevent occluded targets from responding; distinguish drag from tap; send selection to one controller. Keyboard interaction requires real DOM controls because a mesh is not a native focusable button.
- **Next/R3F:** native fit inside the existing client canvas, low integration effort. See I1 for a concrete existing styled reaction rather than treating this API as a finished animation.

### C1 — Drei + yomotsu CameraControls: recommended camera engine

| Field | Finding |
| --- | --- |
| GitHub / demo | [Drei](https://github.com/pmndrs/drei), [camera-controls](https://github.com/yomotsu/camera-controls); [official sequence demo](https://yomotsu.github.io/camera-controls/examples/await-transitions.html), [Drei docs](https://drei.docs.pmnd.rs/controls/camera-controls) |
| Exact files | Drei `src/core/CameraControls.tsx`, `.storybook/stories/CameraControls.stories.tsx`, `LICENSE` at `bf6f4addf47467d3885de272d94ca5127f6ef68f`. yomotsu `src/CameraControls.ts`, `examples/await-transitions.html`, `LICENSE` at `c51601107e266097edf6a9caa57bfa9eaa77427c` |
| License | Both actual code licenses MIT, verified separately; example uses basic geometry, no room/model rights provided |
| Existing behavior | Smooth `setLookAt`, `fitToBox`/`fitToSphere`, reset, transition/rest events. Existing official example sequences promised camera operations; Drei supplies lifecycle and frame integration |
| Reuse | Public CameraControls ref/methods and existing sequence pattern; one controller owns the camera |
| Change | Calibrate hub/approach/world poses for actual asset dimensions, constrain orbit, arbitrate input during travel, handle cancellation/load failure and return. Replace randomized demo targets with authored data; don't copy its separate renderer/animation loop |
| Next/R3F | Already within approved Drei family; docs say Drei ≥10.5 uses camera-controls v3, so use matching installed API rather than copying old recipes. Low/moderate integration; no additional tween library proposed |
| Runtime evidence | Demo DOM loaded in Chrome. Screenshot blank beneath controls; console: WebGL context creation failed. **No transition executed successfully or FPS measured** |

### S1 — Existing notebook scene/page state: useful comparison, not chosen wholesale

- **Source/demo:** [nothingnothings/r3f-portfolio](https://github.com/nothingnothings/r3f-portfolio), [publisher demo](https://arthur-panazolo.netlify.app/), [unchanged screenshot](previews/panazolo-upstream.png). Demo inaccessible to web reader. Preview shows a closed laptop, **not a complete desk-room**.
- **Exact files:** at `cbb19ac9cd70f7909273eb0d9795cf96ce953b98`: `src/Components/Room.jsx`, `src/Experience.jsx`, `src/store/useNotebook.jsx`, `src/Components/Notebook/LenovoBook.jsx`, `public/models/lenovo-notebook.glb`, `LICENSE`.
- **License:** actual MIT (Arthur Panazolo 2024) for code; separate notebook mesh, sounds, photos and HDR/image provenance unverified. Hold those assets.
- **Reuse:** existing scene/page selection store and model `useAnimations` pattern as reference or selected code extraction. `roomPage` switches notebook/about/skills states; not four complete worlds.
- **Change:** original uses timers, imperative mesh removal/disposal and browser globals; adapt cancellation/resource ownership and client boundaries. Don't copy the manual disposal of potentially shared resources. Existing GSAP dependency has its own custom license, not MIT.
- **Next/R3F:** older Vite/React 18/Fiber 8/Drei 9. High whole-app port effort; small state pattern has low conceptual cost. Recommend lean React state plus existing C1 for our specific world lifecycle, rather than migrating this app.

### S2 — Drei MeshPortalMaterial: optional seamless portal mechanism

| Field | Finding |
| --- | --- |
| Source / demo | [Drei portal docs](https://drei.docs.pmnd.rs/portals/mesh-portal-material), [maintainer-linked demo](https://codesandbox.io/s/9m4tpc), [pass-through alternative](https://codesandbox.io/s/qvk72r). Demo links verified in upstream `v9.107.2/README.md`; live runtime unverified/inaccessible here |
| Exact files | Current `src/core/MeshPortalMaterial.tsx`, `src/core/RenderTexture.tsx`, `src/core/Fbo.tsx`, root `LICENSE`. First two files fetched; `Fbo.tsx` is an imported support file to inspect before integration. Portal file blob `7471b8d150dc109b3af1bbb3cd8d391a4b945ba1` |
| License | Drei actual MIT code license. Sandbox models/environments have **not** been separately cleared; reuse library machinery with our selected licensed assets |
| Existing behavior / reuse | Render a sub-scene within a mesh surface and blend from the root view into that scene. Existing material owns the portal mechanism; use it instead of creating a custom portal shader |
| Change | Select portal aperture/anchor for each desk object (not necessarily its whole mesh), coordinate C1 travel and material blend, arbitrate inner/outer events, return to hub, honor motion settings. No source supplies our four authored destination scenes |
| Next/R3F | Native R3F/Drei fit; moderate integration, higher GPU/memory risk from render targets and overlapping scenes. One canvas still can perform several render passes. Evaluate only one selected live portal first; no four constantly animated portal previews |

## Comparison and selection

| Option | Visual result | Existing functionality | Rights readiness | Integration effort / recommendation |
| --- | --- | --- | --- | --- |
| H1 desk + I1/I2 + C1 + one active destination | Cinematic approach; brief covered scene handoff | Geometry, reactions, camera engine reused; our orchestration remains integration work | Best current combination, subject to chosen object assets | Moderate; **start here** |
| Same hub + S2 live portal | Destination visible before entry; seamless blend possible | Mature portal material; return/navigation still application work | Library cleared; sample assets separate | Higher rendering/event complexity; optional later test |
| H3 complete room adaptation | Closest furnished room reference | Room lighting, object navigation and named camera states | **Unlicensed code/assets: hold** | High migration and rights uncertainty |
| S1 notebook app adaptation | Object-led navigation, narrower than room concept | Existing store, authored laptop clips/page switch | MIT code; model/audio gaps | High wholesale effort; reference/extraction only |

Preview provenance: H1 JPEG 360,423 bytes SHA256 `d32da30a81c4170fe82df75dc0a040970a5e08eb3e0d236001bc15961fc34566`. S1 PNG 1,151,231 bytes SHA256 `5e1b924c0ce2f39bf76e7ceb0cc39d00b520a054573558f2c15a8b2287ada5bc`, from `screenshots/panazolo-portfolio.png` at its pinned commit. These unchanged research images carry their source's rights; the screenshot is documentation evidence, not a cleared production asset.
