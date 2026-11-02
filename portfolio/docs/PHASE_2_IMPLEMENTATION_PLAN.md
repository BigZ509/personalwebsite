# Bounded Robot Prototype Implementation Plan

> Execute inline using the writing-plans/executing-plans workflow. User's Phase 2 authorization supplies the approval to execute; no further planning confirmation is required.

**Goal:** Deliver one polished Field Notes robot specimen, accessible interactions, a placeholder robotics destination, a production static export and review evidence.
**Architecture:** Static server-rendered editorial shell and `/robotics/` page. One lazy client canvas enhances a semantic button; a separate ordinary link always reaches robotics. A small pure interaction policy controls motion and visual state, independent of rendering/loading.
**Tech stack:** Next.js, TypeScript, React, React Three Fiber, Drei and Three.js. No animation framework, physics or other 3D objects.
**Spec:** User Phase 2 authorization; `docs/ROBOT_PROTOTYPE_PLAN.md` subject to the amendments below.

## Global constraints and rulings

- Scope only robot proof, no full portfolio or deployment. Work in existing `portfolio/` checkout; no Git repository exists to isolate, commit or merge.
- User approves Field Notes provisionally, Next static export, R3F/Drei and RobotExpressive. Previous “approval pending” entries remain historical and are superseded by D-010.
- User requires Enter/Space equivalent interaction. Use a native specimen button and a separate normal Robotics link. Buttons reveal the inline placeholder with optional short feedback; links never wait for animation. This avoids assigning button keyboard semantics to an anchor.
- User asks natural idle: subtle breathing while motion is enabled, with persistent Pause motion and automatic visibility suspension; reduced motion has no animated transform.
- Mobile begins with a static specimen and optional Enable 3D. Navigation/reveal works before 3D, during loading, no WebGL, failed asset or lost context.
- Original SVG fallback is a small code-native illustration. No bitmap generation/asset substitution is required. Capture the implemented homepage for deliverable 2.

## File responsibilities

- `package.json`, `next.config.ts`, `tsconfig.json`: minimal locked static-export setup.
- `src/app/{layout,page,globals.css}`, `src/app/robotics/page.tsx`: static composition, readable standalone placeholder and Field Notes styles.
- `src/features/robot/RobotSpecimen.tsx`: accessible specimen button, load/failure/motion policy, reveal section and lazy boundary.
- `src/features/robot/RobotScene.tsx`: only Canvas, lighting, model clone/material tint, idle/notice/activation motion, lifecycle suspension.
- `src/features/robot/interaction.ts`: small pure state/motion policy tested by Node's built-in runner.
- `public/robot-poster.svg`: original static artwork; `public/models/robot-expressive.glb` and provenance/notice files: assets agent only.
- `tests/interaction.test.ts`, `tests/prototype.spec.ts`, `playwright.config.ts`: interaction policy tests and browser regression scenarios against static output.
- `docs/PROTOTYPE_REVIEW.md`, `docs/COMPONENT_ARCHITECTURE.md`: evidence, checklist, performance observations, screenshot links, limitations and next review gate.

## Review focus

1. Space must activate specimen button once, Enter must work, links retain native behavior.
2. Reduced-motion changes during animation must cancel motion; paused/offscreen/hidden states must not keep rendering continuously.
3. Model failure/context loss/load timeout must preserve static artwork and usable destination/reveal.
4. Mobile before opt-in and direct robotics visits must not transfer the 3D model/renderer.
5. Repeated reveal/reset and navigation must not leave stale timers, focus loss, duplicate canvases or scroll traps.

## Task 1 — interaction contract and setup

- [ ] Record authorization and start T7. Read published stable package peer/engine metadata and pin compatible versions.
- [ ] Write Node tests for `robotReducer(state,event)` and `canAnimate(policy)` before implementation: activation opens exactly once; reset clears activation; reduced motion/paused/hidden/offscreen disable animation. Observe the missing implementation failure, then implement and run suite.
- [ ] Install only required runtime/build/browser-test dependencies and record graph compatibility.

## Task 2 — static composition and accessible enhancement

- [ ] Write browser acceptance scenarios for static title/direct link, specimen reveal by click/Enter/Space, reset, reduced motion, no-JS, no-WebGL, failed model and mobile opt-in before feature implementation. Initial run must fail before feature exists.
- [ ] Build Field Notes shell and original poster; add semantic reveal button with `aria-expanded`/`aria-controls`, direct anchor, inline placeholder and standalone robotics route.
- [ ] Lazy import the scene only after the load policy allows it. Keep static DOM/poster and independent error boundary. Handle timeout/context loss, native focus, Escape/reset and preference/visibility changes.

## Task 3 — robot rendering and visual feedback

- [ ] Acquire/inventory pinned CC0 model through assets specialist; no other objects.
- [ ] Frame the actual model with a fixed camera, shared material tint, subtle breathing, cursor-aware attention/head turn/eye light, and short activation accent while inline robotics reveals.
- [ ] Use one canvas, stop updates hidden/offscreen/paused; reduced motion stays poster. Cap DPR, omit shadows/postprocessing/environment downloads; clean resources/listeners.
- [ ] Production build/static export, typecheck and interaction tests must pass before browser QA.

## Task 4 — evidence, review and persistent memory

- [ ] Serve exported `out/`; run browser tests and inspect desktop/mobile composition; capture homepage screenshot. Record any unavailable graphics/device capability explicitly.
- [ ] Measure transferred asset/output sizes and available browser timing/frame observations; compare proposed budgets without calling lab samples field CWV.
- [ ] Perform an independent code review, address material defects, rerun relevant/full checks, then update specialist-owned memory through their agents and lead-owned shared state.
- [ ] Finish with prototype review request. No full portfolio, public deployment, merge, push or other-object implementation.

## Execution ledger

- Start: existing research/docs only, Node v24.13.1, npm 11.8.0; `git status --short` reports no repository. User authorization covers implementation setup; no additional approval pause.
- Ruling: prototype reveal is an inline section plus an ordinary `/robotics/` fallback link, satisfying short visual feedback and immediate usable navigation simultaneously.
- Ruling: use native Node tests for pure policy and Playwright for user-observable browser paths; no redundant component snapshot tests or new motion library.
- Task 1: complete — published peers/engines checked; pins installed with no peer errors; 94 installed packages, installer audit reported zero vulnerabilities. Watched three real policy assertions fail against stubs, implemented reducer/policy and observed 3/3 pass.
- Task 2: complete — browser acceptance initially failed for missing homepage heading. Static shell/reveal/robotics route implemented; production Next export and typecheck pass. Initial 10 browser scenarios passed, then expanded to 13 passing scenarios.
- Task 3: complete for initial evidence — unchanged pinned CC0 GLB acquired (463,988 bytes), actual Idle and one Canvas render through Chrome SwiftShader. Renderer reports 19 draws / 3,237 triangles. Real context-loss, pause and offscreen checks passed. Physical-device performance remains untested.
- Task 4: in progress — screenshots/browser observations captured; independent architecture/design/performance review requested. Additional recovery check added for the visible Retry 3D control before final handoff.
