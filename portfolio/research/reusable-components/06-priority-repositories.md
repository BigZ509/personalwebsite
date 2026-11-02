# Priority repository source audit

Checked 2026-11-01. GitHub metadata/file contents used through connector; missing tree/large-file capabilities supplemented by read-only public GitHub API/raw requests. Nothing cloned, installed, executed or integrated.

## Jorge — rich implementation, deployment-only public source

Head commit `bd4d7c169f4e485b836e64f544d489fd398bba28`, 2026-06-14. Inspected recursive tree not truncated. Exact app files are only `index.html`, `assets/index-DcagGn9F.js` (1,334,984 bytes listed), `assets/index-DQPpKdS8.css`; model is `models/chappie/chappie_anim.glb` (3,092,288 bytes). No package.json, README, source map or editable `src` in this tree. README/package fetches returned 404, which is explained by the tree, not interpreted as a nonexistent repository.

Root `LICENSE` is MIT (2025 Jorge Cuevas); blob SHA `97a5514ea52c661d81cc9cf2f42389a50d1ada72`. Model-specific license absent from inspected repo/GLB metadata. Read-only binary JSON inspection found 14 clip names and 22 embedded images, with Draco/WebP/quantization extensions. These facts establish asset contents, not rights, visual quality or speed. See [R2](01-robot.md#r2--jorges-chappie) and [T3](05-transitions.md#t3--jorge-cinematic-sectioncamera-transitions).

**Reuse decision:** ask for original robot/camera-controller source and model/animation provenance. Do not rebuild an imitation from its appearance; do not copy the whole minified bundle as a portfolio foundation. Existing behavior is valuable, but the present public source is a poor extraction boundary and asset adoption is blocked.

## Txemalon — readable components, closest stack match

Head commit `52cfcb8f8e1c192d9dc44edb3cb70feae79d49d7`, 2026-06-01. Actual package file: Next 16.2.4, React 19.2.4, Fiber ^9.6, Drei ^10.7.7, Three ^0.184, TS ^5, Lenis ^1.3.23 and Simple Icons. Our frozen app is Next 16.4.3/React 19.3.1/Fiber 9.8.2/Drei 10.7.9/Three 0.187; same major families do not equal an installed compatibility test.

| Exact source | Reuse opportunity | Modification/rights boundary |
| --- | --- | --- |
| `components/FrozenKeyboard.tsx` | Existing `Keycap` hover/touch press and emissive interpolation; `Keyboard` idle/section pose interpolation; active-section observer | 29,420-byte component couples themes/language/skills, sound, font and canvas. Extract selected existing behavior, not a fresh reimplementation; remove its independent Canvas when integrating into a shared renderer |
| `lib/skills.ts`, `lib/seasons.ts`, `components/SeasonProvider.tsx` | Existing section-highlight/theme data contracts | Personal branding and theme choices are not approved design directions; keep only selected behavioral inputs |
| `components/Reveal.tsx` + `.reveal` CSS | Existing directional reveal with duration/delay/threshold/once | Preserve no-JS readability and chosen motion policy; see T1 |
| `components/ProjectModal.tsx`, `components/Carousel.tsx` | Existing detail view/carousel | Language/Lenis coupling and focus containment need audit; author's project screenshots are not our portfolio content |
| `components/smooth-scroll.tsx` | Existing Lenis wrapper | Optional, not required for reuse; no decision to add smooth scrolling |
| `next.config.ts` | Documents current deployment model | Uses `output: 'standalone'` and runtime headers, not our static export. Do not copy this config |
| `public/fonts/*.typeface.json`, `public/sounds/switch_{press,release}.mp3` | Existing rendering/sound inputs | No separate rights text located in tree for these files; do not infer permission from code MIT. Generated keyboard geometry belongs to code; external fonts/sounds/marks require independent provenance |

Actual root [MIT text](https://github.com/Txemalon/3d-portfolio/blob/main/LICENSE) read; blob SHA `7bf1c9be43175e974777dcec4242a48cdc619df3`. `Reveal.tsx` SHA `b0ac0cf118a18b115231fa70902347da24a41a7a`; `FrozenKeyboard.tsx` SHA `d4b1738dfa33ed42a7a8da5166730100ffabd4f7`. Live DOM renders and changing ES to EN visibly changed content. Keyboard not present in captured browser viewport; no press/lighting/scroll-motion timing success claimed. [Screenshot](previews/txemalon-live.jpg).

**Reuse decision:** strongest readable application source for selected UI/reveal/hover behavior. It supplies a keyboard, **not** robot, basketball, physical camera or microchip geometry; do not count it as four asset candidates or redesign around a keyboard without user selection.

## Benjamin Miles — focused existing basketball logic

Head commit `31962febdb32a596e9e820624e11b3df004dae54`, 2022-11-28. [B1](02-basketball.md#b1--benjamin-miles-existing-shooting-implementation) records exact functions and migration constraints. `src/App.jsx` blob SHA `91f5c814315169b4f742414f6518b08ede8c2195`; MIT license SHA `6c677826ea34141243e663f6d7d2060c124e6a9a`. GIF fetched from `public/preview.gif` (251,648 bytes). CodeSandbox returned 403/security verification; no challenge bypassed. Its shooting/scoring source is available even though this session cannot certify the live game.

**Reuse decision:** adapt selected existing game components after choosing whether full physics or a short shot interaction is desired. Preserve behavior/source notices and fix known cleanup/migration details; no rewrite from scratch is recommended.

## Three.js RobotExpressive — direct asset and animation reference

[R1](01-robot.md#r1--robotexpressive) records the exact model/README/source paths and prior pinned acquisition. Current official example source blob SHA `b935ca6f032a49c9b4bb8c9fe5719ce0f9b6f408`. Existing authored clips, crossfade and one-shot restoration remove the need to author replacement skeletal animation. Current vanilla example creates its own renderer/GUI; only its chosen animation/controller logic belongs in an R3F adapter. Helper source `pmndrs/drei/src/core/useAnimations.tsx` was read; blob SHA `8f82616fff98b345a6b9243d76fce5a34ff5b9e0`. Reuse the installed helper/API rather than duplicate it.

## No-code scope verification

At task start, 15 application/config/test/server files hashed collectively to SHA-256 `4e6668a8bb381046eec8976959fb70e25c84b4ff43694dca11efb75cdd38a05f`. A final read-only digest check will confirm they stayed unchanged. Research screenshots are stored only under this catalog; no preview/model is copied into `public/`. No app build, install, model generation, fix or redesign is authorized by this audit.
