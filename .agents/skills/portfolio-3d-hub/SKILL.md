---
name: portfolio-3d-hub
description: Plan, integrate or visually review this project's R3F desk hub and mini worlds using licensed existing assets and the selected game references. Applies to hub scene, camera and interaction work, not unrelated UI or permission to start implementation.
---

# Portfolio 3D Hub

## Establish the current task

The workspace contains the app and persistent memory in `portfolio/`. From this skill directory, the workspace root is `../../..`. Read the app's `AGENTS.md`, current `UPDATE.md` and `docs/DECISIONS.md`; follow the latest user authorization. The default checkpoint is research/setup only. This skill never grants build, model-generation or deployment permission.

Use the existing [hub package](../../../portfolio/research/hub-world/README.md), [source catalog](../../../portfolio/research/reusable-components/README.md) and [visual references](../../../portfolio/research/hub-world/VISUAL_REFERENCES.md). Research only the missing evidence relevant to the current task; don't repeat the full survey or repair the rejected editorial prototype by default.

## Preserve the experience

Compose one cinematic desk/workbench, with robot → Robotics, basketball → About, camera → Photography and chip or selected development object → Software. Each portal needs idle, hover/focus, select, mini-world and return states. Keep normal category links and readable content independent of WebGL.

The proposed references are The Room: Old Sins' attic dollhouse (object-to-world mechanics), Stray's Clementine apartment (atmosphere) and Life Is Strange's Max dorm desk (warmth and personal storytelling). They are the user's proposed reference set, not claims about games the user personally loves. Follow any later swaps in project memory.

For composition, judge camera height/distance, focal hierarchy, readable object silhouettes, key/fill light, material warmth and intentional personal props. Leave negative space around selectable objects. Use the reference board to support these choices; don't drift into isolated cards or a typography-first landing page. Apply `frontend-design` to scene/HUD visual decisions within this brief, not as permission to replace the hub concept.

## Reuse before authoring

Before recommending or importing an asset/component, identify the exact source path and revision, demo/preview, existing behavior, changes needed and Next/R3F compatibility. Record model, texture, animation, audio and code rights separately; preserve required attribution and modification notices. Unknown grants remain on hold.

Game screenshots are visual reference only: no extracting or shipping proprietary game models, textures, audio or UI. Start from the selected source catalog. RobotExpressive already supplies rig/clips; use `useGLTF`/`useAnimations` and the official state/emote pattern. Inspect selected binary hierarchy/bounds rather than inventing animation tracks the asset doesn't contain. Avoid generating substitute models or rebuilding a documented component without a task-specific reason and user scope.

## R3F and transitions

- Retain Next.js + TypeScript static export and compatible React/Fiber/Drei majors. Read `vercel-react-best-practices` for relevant component, loading and performance changes; server-only rules do not justify adding runtime servers to a static export.
- Keep one lazy canvas, renderer and camera writer. Use Fiber events for picking; real DOM controls provide keyboard/focus equivalents. Adapt existing hover/press/emissive code where selected. Clone cached materials for per-object mutations and respect shared geometry/texture ownership.
- Use Drei `CameraControls` for `setLookAt`, framing, saved poses and travel. Don't introduce a second orbit/tween writer or recreate interpolation. Calibrate approach/world/return poses against the actual assets.
- Default proposal: one active destination at rest, selected world loaded on intent, camera approach, covered swap, world reveal. `MeshPortalMaterial` is the existing alternative for visible portal blending; one canvas can still incur extra portal render passes. Don't silently enable four live portal scenes.
- Keep selection/loading/travel/world/return coordination separate from asset reactions. Cancel stale completions on Back, new selection, route departure, errors and context loss. Preserve hub pose and invoking control, restore focus on return, stop inactive-world animation/picking and bound destination memory.
- Reduced motion skips camera flights and idle loops; touch does not depend on hover. Pause/offscreen behavior, static fallbacks and immediate content links are required. Demand rendering saves work only while animations have actually stopped.

## Visual QA and claims

For scene changes, compare actual browser screenshots with the reference images at a comparable viewpoint. Name the reference and explain differences in lighting, framing, material warmth, prop density, portal discoverability and personal storytelling. Capture the real implementation; never substitute an upstream demo, generated mockup or old prototype screenshot.

**Do not claim a 3D interaction works until that exact interaction has actually been exercised in a browser with visible 3D rendering.** Passing a build, a DOM status change or a screenshot of a blank canvas is insufficient. Read [browser QA](references/browser-qa.md) when planning or performing validation. Use `playwright` for applicable browser automation, or the provided browser-control tool when environment policy requires it; missing tools do not justify fabricated results.

Record browser/OS/viewport, hardware versus software rendering, action and visible result, screenshot/trace paths, console errors and untested devices. Source-inspected, visually observed and measured are distinct evidence levels. Update the lead-owned snapshot/handoff and assigned progress files within their ownership rules. Stop at the authorized phase's review boundary.
