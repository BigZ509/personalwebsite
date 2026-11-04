# Guiding Hands hardware assets — D-024

Current user explicitly authorizes the Guiding Hands setup and original simplified Jetson geometry from official NVIDIA references. Preserve the existing desk, Rover, robotics panel/selection and world transitions. No other worlds, Git publication or deployment.

## Selected sources

| Item | Source / rights | Integration |
| --- | --- | --- |
| Projector by Andy Shaw | https://poly.pizza/m/cKhipxWkfSH ; publisher HTML license anchor CC BY3.0 | `projector.glb`; remove only brown base scene-root `group489012986`, retain geometry buffers/materials; resize/rotate on plinth |
| Webcam by dook | https://poly.pizza/m/afOuPVCoKj ; publisher HTML anchor CC BY3.0 | Original bytes, resize/rotate; generic device, not an actual-project replica |
| Plant/paper stack by reodesuxz | https://reodesuxz.itch.io/low-poly-office-tech-pack ; v1.0 archive LICENSE | Original selected GLBs integrated as small environment props, no other pack files/ZIP/blend shipped |
| Jetson Orin Nano study | Original code geometry; NVIDIA official references only | Simplified board, static cooler/fan, header and connector silhouettes; no official model/logo/texture/accuracy/endorsement |
| Projection area | Original static CanvasTexture/Surface | Explicitly illustrative diagram, not actual gameplay, live CV input or a fabricated demo |

Office pack public page says no file redistribution. **The downloaded archive LICENSE clarifies:** personal/commercial use in apps/projects and modification permitted; standalone-asset/asset-pack/library redistribution and AI training prohibited. Selected assets remain app-integrated with original license and rights notice. This is not a source asset library or a grant to reuse them separately. Original archive/source assets remain in `/private/tmp/guiding-hardware/` only; two selected props and LICENSE are included.

Optional https://poly.pizza/m/ZJiCTnor3L whiteboard (J-Toastie, page says CC Attribution) and https://poly.pizza/m/PvSjEbz11k monitor (CreativeTrio, CC0) were reviewed but **not imported**. They are unnecessary for the compact horizontal schematic setup and would increase clutter. No unsupported license/version claim for omitted models.

Official references opened/read:
- https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/
- https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
- https://developer.nvidia.com/embedded/learn/getting-started-jetson

Downloaded and visually inspected NVIDIA's numbered layout image outside production. Used broad board/cooler/header/connector shapes only. The guide identifies DisplayPort as the display output; we do not model an invented HDMI output or assert precise wiring. Decorative cables indicate the conceptual flow, not an electrical diagram. No reference image shipped.

Projector/webcam GLBs and previews inspected; native GLTFLoader verified node hierarchy/bounds and no authored animations. Original projector includes a brown platform. That single root is excluded by JSON scene metadata; stored geometry data unchanged. Original and adapted hashes, per-model bounds/counts and modifications are in `public/models/guiding-hardware/manifest.json`. CC BY credits and full license text retained under `public/licenses/guiding-hardware/`; existing credits link to them.

The setup illustrates intended hardware. It does not claim confirmed final devices, measured inference, clinical benefit, real camera access or finished demo footage. Both demo records stay null. Rover data/inspiration and confirmed Guiding Hands summary/repo/inspiration remain preserved.

Download provenance (exact publisher-linked originals):
- Projector: `https://static.poly.pizza/30ac9af4-426b-4d6d-a417-8f82f019c179.glb`; preview same UUID`.jpg`.
- Webcam: `https://static.poly.pizza/7e7ff053-90f0-4717-9d4d-7c2a077e25f0.glb`; preview same UUID`.jpg`.
- Pack: free name-your-price download flow, archive `LowPolyOfficeTechPack_v1.0.zip`; only listed selected GLBs integrated. Temporary signed download URL is not a stable production/source link.

Visual QA moved only the Guiding Hands portrait nameplate lower to expose the Jetson's front edge. Initial screenshot before correction retained. Bounds check now waits for rendered camera/Html projection to settle; an earlier premature bounds sample is retained but is not claimed as a failing overlap assertion.

## D-025 current presentation — 2026-11-03

Upright board replaces historical horizontal schematic marks with authentic unchanged archived repository FOREST MOTION prototype still. [Image provenance](../public/images/guiding-hands/provenance.json) records user authorization, URL, blob/hash,1120×760 dimensions and56832bytes. Archived metrics are not current measurements; still is not a demo video. No reference-game screenshot or NVIDIA image is shipped. Both demos remain unavailable.

All16 GLB hashes unchanged. Existing projector/webcam licenses/adaptation remain; only orientation/placement changes. reodesuxz plant remains, paper stack is no longer displayed (stored file/notice preserved). Original board supports/frame and stylized Jetson are code-native. Viewing arrangement does not assert precise optical alignment/wiring or actual final hardware. Short-range local fill; room/camera/Rover unchanged. [Current review](GUIDING_REFINEMENT_REVIEW.md).
