# Microchip sources and verified gaps

Checked 2026-11-01. Two existing geometry candidates are documented. **No complete open-source R3F microchip component with authored circuit pulses/boot transition was verified.** A keyboard is not counted as a microchip, and a 2D footprint is not called a 3D preview.

## M1 — iPoly3D DIP microchip

| Required field | Evidence |
| --- | --- |
| GitHub / demo | **No GitHub repo exposed.** [Original listing/viewer](https://poly.pizza/m/tIp60lIg43); live WebGL interaction not verified |
| Exact source files | FBX/GLTF listed; archive and inner filenames unverified. No invented file path |
| Visual preview | [Publisher image](previews/microchip-ipoly3d.jpg): black rectangular DIP-style body with silver pins along two sides, not a square CPU |
| Asset / code license | Publisher HTML links exactly to [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). This resolves the previous unspecified-CC0-version gap at publisher-link level. Archive still uninspected. Code N/A |
| Existing animations | No rig, pin animation, circuit sweep or boot effect verified |
| Direct reuse | Finished chip mesh/material silhouette; no need to author a substitute chip |
| Modification | Inspect actual groups/triangles, frame in existing canvas and connect selected existing interaction primitives. Traces are not promised as part of the model |
| Next/R3F fit | GLTF listed, existing `useGLTF` path likely; untested binary. Low/moderate asset adaptation, behavior still a separate source choice |

**Rank:** #1 visual/format simplicity and publisher license evidence. Static mesh, not a completed animated component.

## M2 — KiCad existing LQFP-32 model (conditional reserve)

| Required field | Evidence |
| --- | --- |
| GitHub / maintained source | [Archived KiCad mirror](https://github.com/KiCad/kicad-packages3D); README points to [current GitLab library](https://gitlab.com/kicad/libraries/kicad-packages3D). Do not claim the GitHub mirror is maintained |
| Exact file | [`Package_QFP.3dshapes/LQFP-32_7x7mm_P0.8mm.wrl`](https://github.com/KiCad/kicad-packages3D/blob/master/Package_QFP.3dshapes/LQFP-32_7x7mm_P0.8mm.wrl); root `LICENSE.md`. Actual WRL header and materials fetched |
| Demo / visual preview | **No working web demo or rendered preview verified.** Existing CAD file can be inspected in an appropriate viewer, but no viewer is installed/run here and no 2D footprint is passed off as a model render |
| Asset license | Actual file header: **CC BY-SA 4.0 with KiCad library exception**; [full library terms](https://github.com/KiCad/kicad-packages3D/blob/master/LICENSE.md) verified. Exception addresses electronic designs; do not assume a portfolio asset collection is exempt. Retain attribution/license and resolve share-alike for redistributed/adapted model before adoption |
| Code license | Geometry data, not an application component; executable source license N/A. An optional loader/converter has its own code license |
| Existing interactions | None; existing physical package geometry only |
| Direct reuse | Existing QFP geometry/proportions/pins; no new modeling required |
| Modification | Inspect actual model visually and convert existing VRML/CAD to glTF or evaluate an existing VRML loader. Conversion is future work after source selection, not done here. No circuitry/boot effect supplied |
| Next/R3F fit | Not a `useGLTF` drop-in. Format/license/preview work makes effort high relative to M1; no size, quality or runtime compatibility guarantee |

**Rank:** #2 reserve for square-package preference; model-specific licensing is explicit but stricter, visual quality unranked, no ready WebGL demo, high integration effort. **The requested two fully verified, previewable animated chip candidates were not found in this focused pass.** M1 is the current visual shortlist; M2 remains conditional rather than falsely “ready.”

Reusable behavior support, if selected later: Txemalon's existing `Keycap` emissive/press interpolation in `components/FrozenKeyboard.tsx` and its `Reveal` component are readable sources. They are **not** chip models or pre-authored chip animations; adapting those behaviors would be explicit integration work, not a claim that a finished chip interaction already exists.
