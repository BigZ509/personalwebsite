# Basketball sources

Checked 2026-11-01. Rank behavior and appearance separately: the existing game is the interaction source; a finished ball asset is a different selection. No ball/court component was rebuilt or executed here.

## B1 — Benjamin Miles existing shooting implementation

| Required field | Evidence |
| --- | --- |
| GitHub / demo | [Repo](https://github.com/benjaminmiles/react-three-basketball); [README-listed CodeSandbox](https://codesandbox.io/p/github/benjaminmiles/react-three-basketball/main). Browser and fetch hit security/403; **live functionality unverified** |
| Exact files | Commit `31962febdb32a596e9e820624e11b3df004dae54`: [`src/App.jsx`](https://github.com/benjaminmiles/react-three-basketball/blob/31962febdb32a596e9e820624e11b3df004dae54/src/App.jsx), `src/index.jsx`, `src/styles.css`, `package.json`, `LICENSE`, `public/preview.gif` |
| Visual preview | [Published animated GIF](previews/basketball-upstream.gif); source ball is a plain colored sphere, not a textured regulation basketball |
| Code license | [MIT, Benjamin Miles 2022](https://github.com/benjaminmiles/react-three-basketball/blob/main/LICENSE), actual text read |
| Asset license | Ball/hoop/court are geometry authored in `App.jsx`, so code-generated geometry source is under that code grant; no separate GLB present. `Environment preset='park'` loads an external environment whose asset rights were **not** verified; do not infer them from root MIT |
| Existing interactions | `Ball.shoot` applies an impulse and spawns another ball; Cannon handles gravity/bounce; `Hoop` has collision/score trigger logic; `Court` composes scene; camera switch and score/timer state exist |
| Direct reuse | Existing `Ball`, `Hoop`, `Court`, shooting impulse and collision-scoring implementation; reuse the mechanism instead of inventing shot physics. Preserve notices |
| Modification | Extract scoped behavior, adapt native accessible controls, bound spawned balls and correct subscription cleanup (`return () => unsubscribe` does not invoke the stored unsubscribers). Review placeholder backboard props. Decide whether a finished ball mesh replaces the plain sphere |
| Next/R3F fit | **Migration required:** React 18.2/Fiber 8.9.1/Drei 9.45/Three 0.146, Cannon 6.5/Zustand 4.1. Existing project is React 19/Fiber 9/Drei 10. Root reads `window.innerWidth`; mount behind client-only lazy boundary. Do not install its old package graph wholesale |

**Rank:** #1 existing basketball behavior; preview shows functioning concept but runtime not verified; clear code license with environment gap; moderate/high integration effort. No compatibility install or phone benchmark performed.

## B2 — dLeom finished basketball assets

| Required field | Evidence |
| --- | --- |
| GitHub / demo | **No GitHub repo supplied.** [Original creator/download page](https://dleom.itch.io/basketballs) provides the visual preview; no live interaction demo |
| Exact source files | Published `Basketballs.zip` (540 kB listing), containing a Blend master and individual GLB/FBX files. **Inner filenames not exposed/verified**; archive not downloaded in this task |
| Visual preview | [Creator's variants](previews/basketball-dleom.png): recognizable seams and several colors |
| Asset license / code license | Creator explicitly states **CC0 1.0**, no attribution required, commercial/personal use; code N/A (asset pack, no behavior implementation) |
| Existing animations | None verified; only model/format evidence. No claim of a rig or shot/bounce clips |
| Direct reuse | Existing ball geometry/material appearance and editable master; no need to model another basketball |
| Modification | Select variant, verify archive/license/actual dimensions, frame in current canvas and connect to the chosen existing interaction source. Do not assume inner hierarchy or compatible collision shape without inspection |
| Next/R3F fit | Published GLB is suited to existing `useGLTF`; exact file contents/runtime untested. Small loader/placement adaptation; behavior supplied separately |

**Rank:** #1 visual asset option; strong preview and explicit CC0; no existing interactivity; low asset-integration complexity pending archive verification. A B2 mesh + B1 behavior pairing is an option to select, not an integration performed here.

## B3 — OpenGameArt low-poly backup

[Creator page](https://opengameart.org/content/basketball-lowpoly), NephthysGameDev; no GitHub or working interaction demo supplied. Exact downloads: `basketball_blend.zip`, `basketball_dae.zip`, `basketball_fbx.zip`; inner mesh paths unverified. Model listing explicitly links **CC0** and says credit unnecessary; code N/A. Preview page exists but no separate image was verified in this pass. No animation verified. Reuse existing mesh; modification is format conversion/inspection, not fresh modeling. Next/R3F needs glTF conversion or another existing loader. **Rank:** reserve, more conversion effort than B2 and appearance unranked here.
