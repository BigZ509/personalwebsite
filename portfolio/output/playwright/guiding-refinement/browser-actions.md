# Native browser action record — D-025

Final static export served at `http://127.0.0.1:4184/hub/`; own QA tab only. Chrome/macOS via CUA, visible 3D. Actual CSS viewports 1280×880 and 390×844 (browser zoom affects requested override dimensions). Screenshots and JSON record final build `hsoZYZ1tyte_JMdQWewVf`.

1. Enter workshop using semantic Visit robotics workshop control. Capture default view and live camera datasets.
2. Desktop actual mesh clicks: projector (672,389), Jetson (710,445), webcam (865,451), board (823,329). Assert Guiding dialog after each; close between. Escape restores Guiding control focus; Space reopens it. Camera datasets unchanged.
3. Rover mesh (445,334) opens Rover; panel navigation switches to Guiding. Neither project renders video/iframe because both videos are null.
4. Pause motion; Back immediately restores exact original desk pose. Enter re-enters workshop while paused.
5. Resize to portrait; Resume motion; capture full scene. Pointer clicks projector (205,401), Jetson (227,425), webcam (290,427), board (277,376) each open Guiding; close between.
6. Drag from Jetson (227,425) to (257,444); camera moves, dialog remains closed. Escape returns Desk; original pose and entry-control focus restored.
7. Read native error/warning logs; only existing Clock warnings. Reset temporary viewport override, close own QA tab, stop own server. User preview untouched.

Coordinates refer to recorded screenshots/viewports only. This is pointer coverage, not physical touch/device emulation. Manual Pause is not proof of initial OS reduced-motion preference. GPU/browser version unavailable through the native DOM inspector. Partial hardware crop excluded from acceptance; full captures are authoritative.
