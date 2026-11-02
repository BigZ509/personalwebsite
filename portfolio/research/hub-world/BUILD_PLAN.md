# Phased hub build plan — awaiting authorization

**2026-11-01. No phase below has started.** Research/selection completion is not development permission. Stop after this package for the user's source and architecture review.

## Phase 1 — Desk hub only

**Scope:** selected existing desk/room assets in a single lazy canvas, calibrated constrained camera, lighting and responsive framing. Keep four category positions/labels identifiable; full object behaviors and mini worlds wait for later phases. Provide static category links and a usable no-WebGL/reduced-motion shell from the start.

**Reuse:** H1 desk or verified H2 pieces, I2 event system, C1 CameraControls. No full-site static redesign, new model authoring or transplanted room app with missing rights.

**Acceptance:** user reviews actual asset-based composition and camera framing; one WebGL context; category navigation usable while loading/failing; static production export/reload passes; asset manifest records exact files/hashes and code/model/texture licenses. Record initial transfer, renderer counters and named test environment. Stop for composition review before increasing scope.

## Phase 2 — One object + one mini world

**Scope:** RobotExpressive on the desk and one Robotics mini world composed from selected existing assets. Implement idle, hover/focus, click/Enter/Space/tap, camera approach, world entry and Return to desk. Begin with covered single-world switching; add one MeshPortalMaterial comparison only if explicitly selected.

**Reuse:** R1 model/clips and official blending/restore technique through Drei; I1-style existing reactions if selected; C1 transition methods. The Robotics world can start as a small workshop stage with readable project links; its exact environment assets must be selected first, not silently invented.

**Acceptance:** round trip works repeatedly with focus/camera restoration; cancel loading/travel and browser Back; direct world hash; failed model/context loss returns usable content; reduced motion snaps; touch never needs hover. No four-world preload. Capture screenshot/video of the real hub-to-world round trip, production/export results and physical-device observations. Review before expansion. The old editorial robot proof is not this phase's acceptance evidence.

## Phase 3 — Remaining worlds

| Portal | Proposed destination / source reuse | Gate |
| --- | --- | --- |
| Basketball | Small court/personal scene; selected ball mesh plus Miles `Ball`/`Hoop`/`Court` interactions if desired | Test current-major physics port, cleanup and capped active balls; inspect live behavior before accepting port |
| Camera | Photography studio/gallery scene using selected camera and user-cleared photography | Select actual environment/display assets, supply photo rights; no claimed pre-authored lens/flash animation |
| Chip or keyboard | Software workbench/project-display scene; selected chip mesh or Txemalon keyboard/press behavior | User chooses software object; project content/links and any icon/font rights verified |

Use the accepted phase-2 lifecycle and camera adapter, not a new navigation implementation per object. Each destination independently lazy-loads; only the active destination animates/picks. Exiting a game or failed asset must always return to hub. Review each complete round trip; do not equate three imported meshes with three finished mini worlds.

## Phase 4 — Polish and optimization

Tune selected existing asset materials/lighting, camera paths and handoff cover. Compare one portal blend if desired and measured; retain the cheaper path if render/memory cost is poor. Optimize actual selected assets with existing tooling, compression/texture limits and notices; verify decoder tradeoffs. Add audio only if separately selected/licensed, opt-in and nonessential.

**Acceptance:** physical mobile/desktop testing; keyboard/screen-reader/touch and reduced-motion checks; slow/failing assets/context-loss recovery; memory after repeated world round trips; resize/orientation/zoom; production static export and host deep-link behavior; source/license notices; screenshot/video and explicit untested-device list. Measure before claiming performance or accessibility conformance. Publish/deploy only with separate authority.

## Review decisions before phase 1

1. **Desk:** H1 traditional wooden desk, or H2 modern modular direction after archive inspection? H3 furnished room remains reference-only without grants.
2. **Switching:** accept CameraControls + covered single-world handoff initially, or require an early one-portal MeshPortalMaterial comparison?
3. **Objects:** R1 robot; B2 ball and optional B1 mini-game; C1 digital camera versus film/vintage alternatives; M1 chip versus Txemalon keyboard. Existing catalog records the unresolved binary/rights gaps.
4. **Scope:** authorize phase 1 only, with phase-2 review gate, if the recommendation matches the intended scene. No authorization inferred from the pivot itself.

## Known limits / exact next work

The hub composition and camera poses have not been rendered. Kenney inner file paths are blocked by ZIP access. Object archive filenames remain unknown where noted. Julien's room lacks verified grants; Jorge's Chappie assets lack verified grants/editable source. No complete licensed four-world portfolio was found for direct transplantation, and no complete animated chip implementation was verified. The recommendation assembles existing assets and library mechanisms with project-specific integration.

After user selection and explicit development authority, inspect only the selected archives/rights, pin acquisition sources, and implement phase 1. Do not reopen the full portfolio survey or repair the rejected editorial prototype by default.
