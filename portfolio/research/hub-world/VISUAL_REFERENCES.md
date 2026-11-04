# Hub visual moodboard

**2026-11-01 · Proposed reference set supplied by the user.** These are reference choices, not claims that the user personally loves or has played these games. No hub implementation or new 3D models were created.

**Direction:** the warmth of Life Is Strange, the atmosphere of Stray and the interaction mechanics of The Room. [Open the visual board](visual-references/moodboard.html).

## The Room: Old Sins — attic dollhouse

![Actual dollhouse screenshot in the attic](visual-references/old-sins-dollhouse.jpg)

**Borrow:** one carefully framed object as an invitation into another world; close inspection and a clear return to the larger hub. For our desk, camera approaches the selected robot/ball/camera/development object and reveals that category's world. The object must stay recognizable throughout the approach.

**Adapt:** four explicit category targets rather than hidden puzzle prerequisites. Keep entry short, cancellable and usable with keyboard/touch/reduced motion. The still establishes composition, not verified timing or animation mechanics.

[Fireproof's official game description](https://www.fireproofgames.com/games/theroomoldsins) describes the multi-room dollhouse and rooms as portals. Screenshot retrieved from [MiniReview](https://minireview.io/pt/puzzle/the-room-old-sins); copyright Fireproof Studios. Proprietary visual reference, not a reusable production asset.

## Stray — Clementine's Midtown apartment

![Actual screenshot of Clementine's apartment and its low table](visual-references/stray-clementine.jpg)

**Borrow:** layered amber practical light and cooler environmental fill, tactile wood/fabric, plants and a lived-in focal area. Apply atmosphere around the desk while maintaining readable silhouettes and selectable objects. This is an apartment/table lighting reference, not a desk layout to duplicate.

**Adapt:** reduce dense clutter and expensive volumetrics. Try baked/low-cost lighting and material response before real-time effects. Don't use smoke, saturated color or darkness to conceal unclear interaction targets.

Room designer [Kime Honma's primary project page](https://cookime.artstation.com/projects/X1vdmw) credits room design/set dressing and lighting with Viv; raw image access returned 403. This actual gameplay screenshot comes from [Gamepressure's apartment walkthrough](https://www.gamepressure.com/stray-1/the-clementines-clue-puzzle-midtown/zb10064). Proprietary Stray imagery, BlueTwelve/Annapurna; no model/texture/audio reuse grant verified.

## Life Is Strange — Max's dorm desk

![Actual screenshot of Max at the dorm desk](visual-references/max-dorm-desk.jpg)

**Borrow:** warm window light, wood, a usable work surface and belongings that explain who lives here. Our robot, ball, camera and development object should read as personal possessions, rather than product cards on a platform. Surrounding props should connect to real projects/interests once the user confirms content.

**Adapt:** reserve breathing room around the four targets. Use user-cleared photos/notes and license-cleared props; don't reproduce Max's specific photographs, posters, stickers or room assets.

Desk screenshot via [TechTudo's review](https://www.techtudo.com.br/review/life-strange.ghtml). Below, the [official Feral manual](https://www.feralinteractive.com/en/manuals/lifeisstrange/latest/steam/) provides a separate dorm/dresser interaction reference, **not another desk view**. Life Is Strange copyright Square Enix, originally developed by DON'T NOD; Feral publishes the Mac/Linux version. Images are proprietary references.

![Official manual: Max's dorm personal details and object labels](visual-references/max-dorm-context.jpg)

## Compare the references to our current concept

![Existing CC0 Quaternius desk candidate, not a rendered hub](previews/quaternius-desk.jpg)

| Dimension | Reference evidence | Hub concept / current gap | Future screenshot comparison |
| --- | --- | --- | --- |
| Warmth and story | Max's wood desk, window light and personal belongings | H1 desk supplies geometry only; lighting, user-specific props and composition are unimplemented | Do the objects feel owned and used? Are personal details meaningful and rights-cleared? |
| Atmosphere and depth | Clementine's warm/cool layers and tactile surroundings | Desk candidate's flat publisher backdrop supplies no room atmosphere | Does the desk remain the focal area with readable objects, foreground/background separation and restrained contrast? |
| Object-to-world entry | Dollhouse framed as the container of smaller spaces; official room-portal description | CameraControls/covered-swap proposal remains unimplemented | Can the selected object's identity and destination be understood during approach, entry and return? |
| Discoverability | Game object prompts and carefully lit focal objects | Proposed labels/highlight/DOM controls have not been rendered | Are all four targets identifiable without searching, hover or color alone? |
| Coherence | Each reference is a complete environment with consistent materials | Our source catalog contains disparate object silhouettes/materials | Do imported assets share scale, light direction and material response without flattening their character? |

**Comparison status:** concept/asset analysis only. There is no implemented hub screenshot to compare honestly yet. The old editorial robot screenshot is superseded and must not be presented as the hub. Future agents must attach actual browser screenshots beside these references and record observed differences, corrections and unresolved gaps before calling a visual milestone complete.

## Rights and evidence

These downloaded screenshots are research references only, excluded from `public/` and the production asset manifest. No proprietary game models, textures, sounds or UI were acquired. Use the [licensed-source catalog](SOURCES.md) for production candidates. Actual download URLs, source pages, rights notes, sizes and SHA256 values are retained in [provenance.json](visual-references/provenance.json). No gameplay was executed to verify the games' timing or transitions; interpretations above are visual analysis and the intended adaptation.


## Actual implementation comparison — 2026-11-02, D-018

The approved warm Cinematic room and robot workshop now exist. Compared the actual [desk](../../output/playwright/robot-journey/01-desk.png), [reaction](../../output/playwright/robot-journey/02-hover-wave.png), [approach](../../output/playwright/robot-journey/03-camera-approach.png), [workshop](../../output/playwright/robot-journey/04-workshop.png) and mobile captures against the three images above.

- **Max's desk / Life Is Strange:** retained warm wood/rug, mug, notes and personal objects. The composition is a three-quarter room view rather than the reference's intimate desk crop; placeholder notes still lack the owner's actual project stories.
- **Clementine / Stray:** preserved amber practical lighting against cool ambient fill, plants and shelf shadows. The simpler licensed meshes/materials and untextured walls have less wear/density; no volumetrics or expensive effects added to hide that gap.
- **Old Sins / The Room:** browser-tested robot approach → distinct workbench world → explicit return with restored desk pose. Covered single-world swap conveys entry; no nested visible portal, architectural depth illusion or puzzle mechanics claimed.

Adjusted existing robot orientation to make the authored Wave legible and moved its label off the face. Room geometry and all stored model bytes remain preserved. See [review/evidence/limits](../../docs/ROBOT_WORKSHOP_REVIEW.md). References remain research-only, absent from production assets.

## Robotics showcase comparison — 2026-11-02, D-022

Compared the actual [two-exhibit workshop](../../output/playwright/robotics-exhibits/02-workshop.png), [selected controller](../../output/playwright/robotics-exhibits/05-hands-selected.png) and [portrait layout](../../output/playwright/robotics-exhibits/08-mobile-workshop.png) with all three original reference images, visually reopened in this session.

- **Stray / Clementine:** retained amber lamp pool on the right, cooler blue-green room fill and a plant at the edge. Two spaced silhouettes and lower prop density suit the requested uncluttered showcase. Walls/materials remain much simpler and cleaner than Clementine's dense, worn apartment.
- **Life Is Strange / Max's desk:** warm wooden workbench and small technical sketches make the exhibits belong to a workspace. Project-specific personal storytelling is deliberately provisional: both nameplates state Placeholder model; user-cleared photos are still missing. Framing is a wider three-quarter bench, not Max's close side view.
- **The Room / Old Sins:** existing robot approach and return still frame one world as a destination. Inside it, restrained rings, front nameplates and direct model selection give explicit object affordances. No hidden puzzle, nested portal or detail zoom added.

Mobile initially cut off the left label; widened only the workshop portrait projection to correct it. Desktop viewpoint/desk and licensed model files remain preserved. No proprietary reference media enters production.

## Robotics project inspection — D-023 · 2026-11-02

Compared actual [Guiding Hands inspector](../../output/playwright/robotics-details/04-guiding-panel.png), [Rover inspector](../../output/playwright/robotics-details/03-rover-panel.png), [mobile sheet](../../output/playwright/robotics-details/mobile-02-rover.png) and [scrolled project notes](../../output/playwright/robotics-details/mobile-04-inspiration.png) against the same three reference images.

- **The Room / Old Sins:** explicit object inspection now opens project notes while leaving the larger room visible. No camera/portal mechanic added; existing object-to-workshop journey remains. This is a readable overlay, not a proprietary game interface reproduction.
- **Stray / Clementine:** retained warm lamp/right-side amber and cool teal room fill. The dark translucent inspector and amber selection edge sit within that lighting palette; no full-screen backdrop dims the room. Model/material wear and atmospheric density remain simpler than the reference.
- **Life Is Strange / Max's desk:** preserved wooden bench, personal-prop context and project-first storytelling. Nameplates are now readable plaques and always declare placeholder models. Real Guiding Hands notes replace generic claims in the inspector; actual photos and Rover summary remain missing. Wide three-quarter framing is preserved rather than Max's tight side crop.

Desktop keeps both stations in view beside the right-hand inspector. Mobile keeps the upper room visible above a52svh lower sheet; lower labels/bench parts can be covered while notes are open, with project switching also available in sheet navigation. Closing restores full scene/navigation and selected-control focus. No game-reference asset reuse or room redesign.

## Guiding Hands hardware illustration — D-024 · 2026-11-02

Actual [workshop view](../../output/playwright/guiding-hardware/02-workshop.png), [hardware crop](../../output/playwright/guiding-hardware/03-hardware-crop.png) and [project inspector](../../output/playwright/guiding-hardware/04-guiding-panel.png) show the bounded replacement. Same reference trio retained, with no proprietary media in production.

- **Life Is Strange / Max's desk:** warm wood/personal workbench retained; imported webcam/projector and original stylized compute board now explain the project's intended hardware more specifically than the generic monitor. Small plant/paper stack add restrained workplace context. It remains a wider three-quarter composition; actual owner photos/final hardware are unconfirmed, so the exhibit explicitly says illustrative.
- **Stray / Clementine:** same amber practical lamp and cool teal fill, with readable cream projector, dark webcam and muted PCB/fan. Lower, wider equipment cluster leaves more negative wall space than the old tall monitor. Materials/room are simpler and cleaner than the reference; no new volumetrics or busy dressing.
- **The Room / Old Sins:** the same object-to-world journey and explicit object inspection survive. Clicking any of the webcam, Jetson or projector opens the existing shared inspector; no camera zoom or portal was added. Ring and nameplate distinguish the selection group; labels disclose stylization.

The projection area is a static original diagram, not real footage or an inference/game demo. The schematic is intentionally low in the bench view; no claim that tiny printed marks are fully readable on mobile. Main nameplates and panel note carry the clear representation label. No room/camera redesign or other world.

## Guiding Hands default-view refinement — D-025 · 2026-11-03

Reopened all three retained reference images and compared the actual [default1280×880 scene](../../output/playwright/guiding-refinement/01-default-workshop.jpg) and [portrait390×844 view](../../output/playwright/guiding-refinement/04-portrait-workshop.jpg). Same default three-quarter camera, no room redesign.

- **The Room / Old Sins:** the lit miniature/workbench stays the clear object cluster, with explicit plaques and intact object-to-world journey. All four Guiding parts select the existing inspector; no new portal/zoom. Ours has two openly labeled exhibits and simpler geometry/materials, rather than the reference's dense miniature architecture and puzzle discovery.
- **Stray / Clementine:** warm lamp/wood against cool teal walls retained. Small local neutral fill exposes projector lens, dark webcam and Jetson fan/connectors; no extra room props or volumetrics. Materials/density remain much cleaner and simpler than Clementine's layered textiles/plants/light pools.
- **Life Is Strange / Max's desk:** wooden personal work surface preserved, now with authentic owner-repository imagery supplying project context. One tiny plant rather than more decoration; paper stack omitted. Wider three-quarter framing than Max's close side view. Actual final hardware/photos remain unconfirmed, so labels/panel retain illustrative/stylized wording.

Projection board is upright and native-aspect; micro diagnostic text is not claimed readable in portrait. Caption and full panel identify it as an archived prototype still. No reference-game imagery/assets reused in production. Full screenshots establish visual acceptance; the partial detail crop is excluded.

## Marc Alexis identity/header — D-026 · 2026-11-04

Compared actual [after desk1600×1100](../../output/playwright/portfolio-identity/01-after-desk.png), [archived same-framing before](../../output/playwright/portfolio-identity/before-desk-archived.png), [portrait](../../output/playwright/portfolio-identity/mobile-01-desk.png) and [workshop](../../output/playwright/portfolio-identity/05-workshop.png) with the retained reference trio. Room framing, materials, assets and lights remain unchanged; new work is HTML identity/navigation only.

- **Life Is Strange / Max's desk:** warm wood/window/practical lighting and personal work surface remain. Marc's name and modest greeting now give the existing environment an owner without extra props. The serif greeting supplies a human tone; no card conceals the desk. Wider miniature view remains distinct from Max's intimate side framing.
- **Stray / Clementine:** existing amber work pool/cool teal ambient and deep background retained. Ivory/amber header and small dark About dialog use the existing palette; room stays visible behind it. Surface detail/prop density remain much simpler than Stray. No glass-heavy chrome, new lights or volumetrics.
- **The Room / Old Sins:** recognizable object-to-workshop journey is intact; persistent name/nav provides orientation and conventional personal destinations. Empty header space still allows orbit/picking, robot mesh entry and exact return tested. Identity does not add puzzles, portals or new object labels.

Portrait keeps all three nav items/name visible, with a compact second row at320px. Short-landscape caption initially crossed an exhibit plaque; final compact left column clears it, both buttons retained and live status visually clipped rather than removed. Existing room projection is small at740×360 and micro-label density remains an inherited limitation; no camera/3D mobile redesign under Objective1. Proprietary reference assets remain outside production.
