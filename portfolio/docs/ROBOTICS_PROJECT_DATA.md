# Robotics project data — D-023 · 2026-11-02

User supplied/confirmed the Guiding Hands repository and inspiration, supplied KnightHacks as a candidate to verify, and explicitly said **neither demo video is confirmed**. Keep both videos unavailable until the user provides them. Gesture Rover inspiration is provisional, not confirmed personal wording.

| Field | Gesture Rover | Guiding Hands |
| --- | --- | --- |
| Name | User-confirmed | User-confirmed |
| Summary | No confirmed functional description; plain pending summary | Local MediaPipe hand detection/calibrated gestures control a forest game; projected board is intended setup, not asserted validated hardware |
| Inspiration | “Exploring gesture-based control of physical robots.” User supplied provisional description; label accordingly | “Making hand-movement rehabilitation exercises more engaging through an interactive computer-vision game.” User confirmed |
| GitHub | Unavailable; candidate repository not verified as rover | [BigZ509/guiding-hands](https://github.com/BigZ509/guiding-hands), user confirmed and fetched |
| Demo | Unavailable by explicit user instruction | Unavailable by explicit user instruction |
| Model | Generic licensed RobotExpressive stand-in | D-024 illustrative hardware/CV setup: licensed webcam/projector, original stylized Jetson and two small environment props |

Guiding Hands supporting sources read via GitHub connector:
- [README](https://github.com/BigZ509/guiding-hands/blob/main/README.md), blob `f814ad60c5395081c850a59556a1033a00243749`: local tracking, calibration, browser-game bridge and setup. No performance/medical efficacy claims carried over.
- [CONTEXT](https://github.com/BigZ509/guiding-hands/blob/main/CONTEXT.md), blob `5571e707034a72cf4befcdcbbd2b4599d05819d4`: projected forest game motivation and intended hardware. Therapeutic effectiveness explicitly unestablished. No medical advice or efficacy claim added to panel.

Candidate [leonelh06-lgtm/Knight-Hacks-IX](https://github.com/leonelh06-lgtm/Knight-Hacks-IX) verification:
- Current main tree `7a46431c672a37288427dcb35693aa0e2d9a2fe0` fetched recursively (not truncated). Paths describe game/frontend/gesture-control/test code, not a verified rover implementation. Root README lookup404.
- [CONTEXT](https://github.com/leonelh06-lgtm/Knight-Hacks-IX/blob/main/CONTEXT.md) is the same blob as the Guiding Hands context (`5571e...`).
- [controls.py](https://github.com/leonelh06-lgtm/Knight-Hacks-IX/blob/main/gesture_control/controls.py), blob `393977630b7ccbad4e60b7724761b25ac4fe05fa`: camera-independent hand/game movement control.
- [relay.mjs](https://github.com/leonelh06-lgtm/Knight-Hacks-IX/blob/main/game/fight/relay.mjs), blob `6af3b454ca3445aecf4d8e1409fc67146180e303`: UDP gesture packets to WebSocket browser-game clients.
- **Conclusion limited to inspected current main:** could not verify Gesture Rover code, so do not associate this URL with that exhibit. Historical branches/other private repos not searched. This is not a claim that no rover code exists anywhere.

A real `recordings/handtest.mp4` exists in Guiding Hands (blob `f93c5421159dc51a13e062280e38a734f513587d`,15,057,989bytes). Exploratory download was outside production. File-protocol browser inspection was blocked; no video-content/playback verification claimed. **Do not embed or relabel this test input recording as a demo.** User explicitly said videos are unconfirmed, which supersedes exploratory media consideration. No downloaded footage ships with the application.

Runtime source of truth: `src/features/hub/exhibits.ts`. Optional video schema/component is ready for a future supplied URL; both present records use `video:null`. No autoplay, guessed URL, blank anchor, synthetic demo or invented project result.

## D-024 visual representation update

Guiding Hands now uses an illustrative hardware setup, not the generic monitor stand-in. This does not verify final equipment or hardware performance. Original stylized Jetson is not an official model or exact replica; projection-area marks are schematic, not a real demo. Source facts, confirmed GitHub/inspiration and BOTH unavailable demo videos remain unchanged. See [asset/rights/source record](GUIDING_HARDWARE_ASSETS.md).

## D-025 visual representation update — 2026-11-03

The board now displays an original archived experimental FOREST MOTION screenshot from [benchmark-results/smol-live-smoke.png](https://github.com/BigZ509/guiding-hands/blob/main/benchmark-results/smol-live-smoke.png), blob `db6b70a793833c3a1acf28e76a7e618d5c302585`. Original1120×760 image is unchanged and shown at native aspect; visible metrics are archived diagnostic text, not new measurements. This is a static prototype still, not either project's demo video. Both `video:null` values, all confirmed project facts/links/inspiration and Rover uncertainty remain unchanged. Setup remains illustrative; Jetson stylized/unofficial. Only one tiny pack plant remains visible, paper stack omitted. [Provenance](../public/images/guiding-hands/provenance.json), [review](GUIDING_REFINEMENT_REVIEW.md).
