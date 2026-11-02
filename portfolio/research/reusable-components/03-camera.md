# Physical camera sources

Checked 2026-11-01. These are actual camera meshes, not Three.js virtual-camera controls. Two existing Poly Pizza candidates are carried forward; source preview inspection now distinguishes their silhouettes and verifies both license links. No new camera modeled.

## C1 — Nick Ladd digital camera (best subject fit)

| Required field | Evidence |
| --- | --- |
| GitHub / demo | **No GitHub repository exposed.** [Original model/preview page](https://poly.pizza/m/4A3SYVh_smq); viewer functionality not verified here |
| Exact files | Publisher lists OBJ/GLTF; download archive and inner geometry filenames **not verified**. Do not invent a `camera.glb` source path |
| Visual preview | [Publisher image](previews/camera-nick-ladd.jpg): black digital stills camera, lens, raised finder/flash and red shutter control. Mirrorless-specific hardware identity not established |
| Asset / code license | Publisher HTML's exact link is [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/), independently retrieved this pass. Retain creator/source/license notices and identify changes as required. Code N/A; model viewer site's code is not supplied as a reusable component |
| Existing animations | No lens/shutter/rig animation verified. Static appearance only |
| Direct reuse | Existing mesh/material design; this is a better match for still photography than C2's film-reel silhouette |
| Modification | Inspect actual geometry and separate movable nodes; connect chosen existing animation/transition primitives rather than promise unavailable clips. Whole-object movement can avoid altering a mesh if individual parts are fused |
| Next/R3F fit | GLTF listed, so existing Drei loader likely appropriate; actual package/texture/parts untested. Low/moderate inspection/adapter effort |

**Rank:** #1 subject-fit preview, licensing publisher evidence clear, existing motion absent. Prior “exact license version unknown” is corrected to a verified publisher CC BY 3.0 link; downloaded archive rights remain uninspected.

## C2 — Kai Fan film camera

| Required field | Evidence |
| --- | --- |
| GitHub / demo | **No GitHub repo supplied.** [Model/preview page](https://poly.pizza/m/1pI-40LVzWX); no verified live animation |
| Exact files | OBJ/GLTF listed; archive/inner filenames unverified |
| Visual preview | [Publisher image](previews/camera-kai-fan.jpg): pale-blue **movie camera with two reels**, not a mirrorless camera. This is a concrete visual correction to earlier text-only research |
| Asset / code license | Exact publisher link [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/), independently retrieved; required credit/notice/change handling. Code N/A |
| Existing animation | None verified; reel spin/lens motion are not supplied features established by this research |
| Direct reuse | Existing film-camera model for a filmmaking/creative interpretation |
| Modification | User must choose that interpretation; inspect parts/size/materials and wire selected existing behavior. Do not assume film reels are independently animatable |
| Next/R3F fit | GLTF route plausible, untested. Moderate inspection and semantic/art-fit decision; not a direct replacement if still photography is required |

**Rank:** #2 stylized alternate silhouette; clear publisher license, no verified authored movement. Do not call this a verified mirrorless asset.

## C3 — Khronos AntiqueCamera (strongest GitHub provenance, different style)

| Required field | Evidence |
| --- | --- |
| GitHub / demo | [Model repo directory](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/AntiqueCamera); [official existing viewer](https://github.khronos.org/glTF-Sample-Viewer-Release/?model=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/AntiqueCamera/glTF-Binary/AntiqueCamera.glb). Viewer rendering not verified here |
| Exact files | `Models/AntiqueCamera/glTF-Binary/AntiqueCamera.glb`, `Models/AntiqueCamera/README.md`, `Models/AntiqueCamera/screenshot/screenshot.jpg`, `LICENSES/LicenseRef-LegalMark-UX3D.txt` |
| Visual preview | [Official screenshot](previews/antique-camera-upstream.jpg); vintage bellows camera/tripod, not digital/mirrorless |
| Asset license | Model-specific README: UX3D 2018, Maximillan Kamps, **CC0 1.0**; separately records a UX3D mark. [Mark terms](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/LICENSES/LicenseRef-LegalMark-UX3D.txt) do not grant unrelated trademark use; retain/review the notice |
| Code license | Mesh itself needs no app code from Sample Assets. Optional existing [Khronos viewer code](https://github.com/KhronosGroup/glTF-Sample-Viewer) is **Apache-2.0**, independently checked, not the model's license. Do not embed a second viewer in our R3F scene |
| Existing motion | README explicitly describes a static model; no authored shutter animation established |
| Direct reuse / changes | Existing GLB and appearance; inspect/optimize texture/mesh cost and decide whether vintage tripod fits the user's intended camera. No conversion or optimization performed |
| Next/R3F fit | Direct GLB loader format; asset cost/appearance differs and remains unbenchmarked. Moderate inspection/optimization risk; no guessed mobile performance |

**Rank:** #1 GitHub/license traceability, #3 fit for a compact modern photography portal. Two modern/film mesh leads plus this fully traceable alternative exist; **no complete licensed camera-plus-lens/shutter R3F interaction component was verified**.
