# Browser evidence for the desk hub

Read when preparing or performing QA, not for every source lookup. Tool setup does not authorize building or resuming the portfolio.

## Minimum evidence for an interaction claim

1. Open the actual current build and confirm the 3D scene visibly renders. Record URL/build identity, browser, OS and viewport; identify software rendering such as SwiftShader separately from hardware GPU testing.
2. Exercise the claimed action with real browser input. For canvas picking, use a fresh screenshot/known camera pose and record the actual hit; DOM labels alone do not prove the mesh reacted.
3. Observe the intended visible state. For animated claims, observe the sequence through browser interaction/video/trace or multiple timed captures; one still cannot prove motion. Keep supporting screenshots and any console/load errors.
4. Mark each tested path Pass/Fail/Not tested, with evidence. A failed WebGL context is Blocked for 3D verification; a successful fallback test remains a separate result.

## Phase-appropriate paths

| Path | Observe |
| --- | --- |
| Idle / pause | Existing clip or ambient action visible; pause and hidden-tab policy behave as claimed |
| Hover / focus | Correct object highlights/reacts and label appears; focus ring and keyboard selection equivalent |
| Click / tap / Enter / Space | Actual selected object reacts; a drag does not accidentally enter a world |
| Entry / world / return | Camera approach, correct destination, accessible return, restored camera pose and focus |
| Interruption | Cancel loading/travel, rapid selection, browser Back, route departure and model failure don't reopen stale worlds |
| Reduced motion | No flight, looping idle or flashes; all destinations still reachable |
| Fallback | WebGL unavailable/context lost: usable DOM links, status and retry/content path |

The currently authorized phase determines which paths exist. Do not build missing worlds merely to fill the matrix.

## Reference comparison

Read the app's `research/hub-world/VISUAL_REFERENCES.md`. Capture the real hub overview plus affected hover, approach, world and return states. Compare against the named game screenshots: The Room for object/world framing; Stray for layered lighting; Life Is Strange for warmth and meaningful personal props. Use similar crops/aspect ratios where practical, retain full originals and label any crops. Do not equate matching colors with matching composition.

Report concrete mismatches and changes made, or explicitly defer them. A proposed asset preview can be compared as an asset, but is not proof of an implemented hub. No implementation currently exists for this reference direction; its comparison remains Not tested until authorized work is rendered.

## Performance and accessibility evidence

Record actual transfer sizes, draw/triangle counts and frame-time samples when claiming performance. Browser emulation and desktop software rendering are not physical-phone tests. Name untested devices and avoid accessibility-conformance claims based only on automated checks. Verify the selected routes/static export after authorized implementation; no build is required merely to edit this skill or reference board.
