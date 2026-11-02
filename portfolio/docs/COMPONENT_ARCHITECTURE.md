# Robot prototype component architecture

**Scope:** Phase 2, one specimen and placeholder robotics content only. User-authorized Next.js/TypeScript static export, React Three Fiber/Drei and RobotExpressive. No other objects, CMS, motion library or deployment.

## Files and boundaries

| File | Responsibility |
| --- | --- |
| `src/app/layout.tsx` | Static document, language, prototype title/description, noindex while content is a draft |
| `src/app/page.tsx` | Field Notes header, server-authored intro passed as children, observations/footer, native Robotics link |
| `src/app/robotics/page.tsx` | Standalone, server-rendered placeholder; reachable directly and without JS/WebGL |
| `src/app/globals.css` | Warm paper/sage editorial composition, Georgia/system sans fonts, responsive styles, focus and reduced-motion rules |
| `src/features/robot/RobotSpecimen.tsx` | Client interaction shell, native button and inline reveal, user motion pause, preference/visibility/intersection policy, lazy loading, timeout, retry and error fallback |
| `src/features/robot/interaction.ts` | Pure reducer and motion-policy function; no router, rendering or browser dependencies |
| `src/features/robot/RobotScene.tsx` | Only Canvas; model loading/cloning, material tint, authored Idle, pointer attention, activation accent, lighting, context loss and private-resource cleanup |
| `public/robot-poster.svg` | Original code-native illustration for loading, mobile, reduced motion, no JS and failures |
| `public/models/robot-expressive.glb` | Approved imported model; exact provenance/inventory in adjacent manifest |
| `public/licenses/RobotExpressive.md` | Unchanged upstream model-specific CC0 statement and creator/modifier attribution |
| `scripts/serve.mjs` | Local-only static output server with genuine unknown-route 404 and clean directory URLs |
| `tests/` | Real policy tests and production-output browser regression checks; no component snapshots |

## Render and input flow

```text
Static HTML: title + intro + poster + native /robotics/ links
       │
       └─ hydrate RobotSpecimen
          ├─ reduced motion / mobile before opt-in → still poster
          ├─ unavailable WebGL / failed model / timeout → still poster + usable controls
          └─ allowed → dynamic import → one Canvas → imported RobotExpressive

Native specimen button (pointer / focus / Enter / Space)
       ├─ updates presentation state
       └─ reveals inline robotics placeholder immediately

Native Robotics anchor → /robotics/ (never awaits animation)
```

The specimen is a **button**, with `aria-expanded` and `aria-controls`, because it reveals a section and needs native Space activation. It does not pretend to be a link. The independent Robotics anchors preserve context menus, copying, opening in a new tab and ordinary no-JS navigation. Static content and route imports do not depend on Three/Fiber/Drei.

## Interaction/motion contract

`robotReducer(state,event)` records hover/focus independently, idempotent activation/reveal, reset, and a monotonically increasing activation count. Repeated activation while open does not restart another transition. Reset returns focus to the native specimen button; the revealed heading receives focus without forcing a scroll jump.

`canAnimate({reduced,paused,visible,inView})` permits movement only when all four conditions allow it. The approved natural idle uses the actual imported Idle clip at reduced speed plus a subtle group breathing offset. Hover/focus causes cursor-aware orientation and a modest emissive tint; activation applies a bounded 350 ms positional accent while content is already revealed. There is no animation-complete routing callback.

One mixer owns the robot's authored rig motion. The outer group owns overall yaw/breathing/accent; a small head offset is applied after the mixer. Per-clone material tints leave the original GLB bytes and cached geometry unchanged. Pause uses demand rendering; hidden/offscreen uses no continuous frame loop. Reduced-motion visits use the still poster and no canvas. No HDRI, texture download, real-time shadows, physics, postprocessing or additional animation dependency is required.

The client checks WebGL2 before mounting the renderer, releases that transient probe context, and mounts at most one DOM canvas. Runtime context loss or load/decoder error unmounts the scene and retains the poster. Loading is bounded to 10 seconds. Late/unmounted frame callbacks do not control navigation.

## Build and dependencies

Pinned direct runtime set: Next 16.4.3, React/ReactDOM 19.3.1, Fiber 9.8.2, Drei 10.7.9, Three 0.187.0. TypeScript 5.9.3; Node 24.13.1 used. npm package lock preserves the resolved graph; no peer overrides/legacy-peer flags. Installed peers and engines were checked. Exact manifest evidence and caveats live in `research/architecture.md`.

`next.config.ts` specifies `output: 'export'`, `trailingSlash: true`, unoptimized images and Strict Mode. `npm run build` emits `out/index.html`, `out/robotics/index.html` and a 404. This uses real Next.js, not Vinext. Local system fonts avoid font-network requests and keep the prototype dependency budget small; final font selection remains a design review item.

Commands: `npm test`, `npm run typecheck`, `npm run build`, `npm run preview`, `npm run test:browser`. The preview server is local only. For another machine, install with `npm ci` using a compatible Node version and build first.

## Verification boundaries

Browser tests use installed Chrome and SwiftShader software WebGL. Mobile tests emulate viewport and touch; they are not tests on a physical phone. Canvas draw/triangle counters are renderer observations, not FPS, presented-frame timing or field Core Web Vitals. See `PROTOTYPE_REVIEW.md` for final evidence, checklist and untested devices.
