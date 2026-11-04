# Guiding hardware implementation plan

Spec: ../specs/2026-11-02-guiding-hardware-design.md

1. Inspect/download requested models and office license, preserve notices/hashes/bounds, adapt projector base only. Check NVIDIA reference; omit optional props that add clutter.
2. Add isolated GuidingHandsSetup/Jetson components using existing Asset/Surface/CatmullRomLine adapters; update representation labels honestly. Preserve parent interaction and camera lifecycle.
3. Build/type/unit checks; actual desktop and mobile/reduced-motion browser selection/panel/return and visible assets, reference comparison, screenshots, independent review and lead memory.

Review focus: no fake official Jetson/assets/media; app-integrated office rights separated from asset-library rights; imported scene orientation/base removal; legibility and picking; no source texture/material ownership regression. No dependencies/other worlds/Git/deploy.
