# Robot sources

Checked 2026-11-01. Existing research/asset inventory is reused; no new robot authored. Ranking: R1 is reuse-ready at the source/license level; R2 is a promising but blocked alternative. Live rendering and license checks are separate.

## R1 — RobotExpressive

| Required field | Evidence |
| --- | --- |
| GitHub / demo | [Three.js repo/example](https://github.com/mrdoob/three.js/blob/dev/examples/webgl_animation_skinning_morph.html); [official demo](https://threejs.org/examples/webgl_animation_skinning_morph.html) |
| Exact files | `examples/webgl_animation_skinning_morph.html`; `examples/models/gltf/RobotExpressive/RobotExpressive.glb`; `examples/models/gltf/RobotExpressive/README.md`; root `LICENSE`. React playback helper: [Drei `src/core/useAnimations.tsx`](https://github.com/pmndrs/drei/blob/master/src/core/useAnimations.tsx) |
| Visual preview | [Official thumbnail](previews/robotexpressive-upstream.jpg): stylized articulated yellow robot. The prior prototype's actual imported-asset screenshot is separate local evidence, not proof the upstream demo ran here |
| Code license | [Three MIT](https://github.com/mrdoob/three.js/blob/dev/LICENSE), [Drei MIT](https://github.com/pmndrs/drei/blob/master/LICENSE), verified separately from model |
| Asset/animation license | [Exact model README](https://github.com/mrdoob/three.js/blob/b924f0cad4058dc4dde71445c796980c3cd5b5ed/examples/models/gltf/RobotExpressive/README.md): CC0 1.0, Tomás Laulhé, Don McCurdy modifications. Copyright attribution not required; provenance retained. Imported clips belong to this documented model, not a general license for unrelated animation libraries |
| Existing behavior | Example constructs clip actions, loops states, runs gestures once, crossfades, restores previous state after finished gesture, and exposes facial morphs. Actual local GLB has 14 clips, including Idle, Walking, Wave, Yes and ThumbsUp; prior manifest records exact inventory |
| Direct reuse | Existing GLB/rig/clips/morphs and the example's `fadeToAction`, `createEmoteCallback`, `restoreState` logic. Prefer existing `useGLTF`/`useAnimations` helpers for React integration rather than recreating a mixer hook |
| Modification | Replace lil-gui controls with chosen portfolio inputs; adapt example lifecycle into the existing single R3F canvas, cancel/clean clips and honor motion settings. Hover attention and route linkage are glue around existing animation, not supplied complete portfolio behavior |
| Next/R3F fit | Strong: same Three asset/API; loader/playback helpers already available. Do not embed the example's independent renderer/RAF loop. No new package install or integration tested in this pass |

**Rank:** visual quality: appealing stylized specimen (preview judgment); functionality: strongest verified authored-animation set; licensing: clear; effort: small/moderate adapter work. Reuse recommendation remains for user selection.

Existing acquisition: 463,988 bytes, unchanged GLB, SHA-256 `047f5e5fb3bb6d378bd1df16ca6137f2a596c99b3a1b5690b4020c05aaf6f319`. See `public/models/robot-manifest.json` and prior `research/assets.md`; no reacquisition or transformation performed here. The [Quaternius editable pack](https://quaternius.com/packs/animatedrobot) is an existing Blend/FBX/OBJ authoring alternative for this same character, not a second robot design.

## R2 — Jorge's Chappie

| Required field | Evidence |
| --- | --- |
| GitHub / demo | [Jorge repository](https://github.com/Jorge-Cuevas90003/Jorge-Cuevas90003.github.io); [live site](https://jorge-cuevas90003.github.io/) |
| Exact files | At commit `bd4d7c169f4e485b836e64f544d489fd398bba28`: `models/chappie/chappie_anim.glb`, `assets/index-DcagGn9F.js`, `assets/index-DQPpKdS8.css`, `index.html`, `LICENSE`. There are **no editable src modules, package.json, README or source map in the inspected tree** |
| Visual preview | [Session screenshot](previews/jorge-live-unrendered.jpg) is black. **Robot appearance cannot be ranked from this capture.** No successful live 3D observation claimed |
| Code license | [Root MIT](https://github.com/Jorge-Cuevas90003/Jorge-Cuevas90003.github.io/blob/bd4d7c169f4e485b836e64f544d489fd398bba28/LICENSE), Jorge Cuevas 2025. Bundled dependencies keep their separate notices |
| Model/clip/texture license | **Unverified.** No model-specific credit/license in the tree; GLB asset metadata reports generator/version but no copyright/license. Root software MIT is not treated as a verified grant for third-party character/animations/textures. Audio rights also unverified |
| Existing behavior | Inspected robot-specific bundle: cloned scene, action/mixer helper, Idle/Waving actions, section-specific clip choices, head/chest bone reactions, tap hit region, section-camera interpolation, detail drawer and cinematic overlay. Remote GLB JSON contains 14 clips: Idle, Waving, Talking variants, Salute, Pointing Forward, Standing Clap, Hip Hop Dancing variants, Arm Stretching, Golf Pre-Putt, Kneeling Pointing, Using A Fax Machine |
| Direct reuse | **On hold for asset rights.** Code concepts are present, but do not copy the entire deployed bundle. Best next source request is the author's original component project plus asset/animation provenance |
| Modification | Extract application code from minified dependency bundle or obtain editable source; separate robot controller/camera/drawer/audio. Pin/review Draco decoder and WebP support. GLB is 3,092,288 bytes with 22 embedded image records and Draco/mesh-quantization/WebP extensions; no performance inference follows |
| Next/R3F fit | React/R3F-style helpers detected in compiled code; original package versions unavailable. Not a drop-in Next component. Single-canvas/lifecycle/keyboard/static fallback integration would need review |

**Rank:** visual quality unverified; functionality rich by source inspection, not runtime proof; licensing blocked; effort high due deployment-only source. This is a priority inspection/reference, **not a second cleared robot**.

Additional lead not promoted: [Khronos BrainStem README](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/BrainStem/README.md) describes an articulated animated robot but identifies a Poser EULA, not CC0/MIT. It is not presented as an unrestricted open-source alternative without reviewing that separate grant. Two robot leads are documented; only RobotExpressive currently satisfies the verified reuse license chain.
