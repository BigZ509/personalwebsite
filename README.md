# personalwebsite

**Working robot concept:** authored hover/focus reaction, camera entry into a robotics workshop, and Back to Desk. [GitHub repository](https://github.com/BigZ509/personalwebsite) · [Working robot concept commit](https://github.com/BigZ509/personalwebsite/commit/0f67294c8205ef00d5db52011db74db3bf8e0c9d). Source, licensed assets, screenshots and recorded verification are included. Repository is public, created by the user; Keploy access explicitly approved. Application implementation remains stopped for visual review; no deployment.

A cinematic 3D desk portfolio built with Next.js/TypeScript, React Three Fiber and Drei, exported as static files. The approved direction combines Cinematic framing with Cozy warmth. One complete robot → Robotics workshop → Back to Desk interaction is ready for review; other worlds remain out of scope.

The app and persistent project memory live in [portfolio/](portfolio/). Start with [project state](portfolio/UPDATE.md), [robot review and test checklist](portfolio/docs/ROBOT_WORKSHOP_REVIEW.md), and [instructions](AGENTS.md).

## Run

Requires Node.js 22.18 or newer.

```bash
cd portfolio
npm ci
npm start
```

Open `http://localhost:3000/` (alias `/hub/`). `npm start` builds and serves the production preview on port3000, which is the stable viewing mode. Use `npm run dev` only for editing and open it through localhost; changing network addresses can block development hot reload and leave the loading screen stuck. Plain `npm run preview` serves an existing export on loopback4179.

## Review

[Desk screenshot](portfolio/output/playwright/robot-journey/01-desk.png) · [Robot reaction](portfolio/output/playwright/robot-journey/02-hover-wave.png) · [Workshop](portfolio/output/playwright/robot-journey/04-workshop.png) · [Asset credits](portfolio/public/licenses/desk-compositions/ATTRIBUTION.md).

The original three treatments remain at `/compositions/`. Screenshots come from actual Chrome/SwiftShader renders. Physical devices, hardware GPU performance, Safari/Firefox and screen readers remain unverified. See the review checklist for exact evidence and limitations.

Dependencies, caches, build output, local environment files and root ZIP archives are ignored by Git. Implementation is stopped for visual review. D-021 authorizes Git publication; main tracks the GitHub origin. Deployment and further website expansion remain unauthorized.
