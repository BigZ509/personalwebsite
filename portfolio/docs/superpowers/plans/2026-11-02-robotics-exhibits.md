# Robotics showcase implementation plan

Spec: ../specs/2026-11-02-robotics-exhibits-design.md

1. Adapt only workshop composition into two licensed placeholder exhibits; retain desk/camera code. Use small typed catalog and scene interaction props.
2. Wire mesh hover/select and equivalent DOM buttons, guarded during travel; reset on world swaps; compact responsive HUD and nameplates. No details.
3. Run unit/type/build checks. Browser-test actual rendered geometry, keyboard/touch/reduced motion, drag and preserved round trip. Capture source-bound evidence, compare game references and update lead memory.

Review focus: focus and hover must remain independent; inactive/travelling scenes must not pick; labels must be legible on mobile; selected status must not imply real project appearance; original desk camera and one Canvas must survive. Work in existing clean checkout to keep user preview/current workspace synchronized; no Git actions.
