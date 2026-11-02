# Existing reveal and transition implementations

Checked 2026-11-01. Separate section reveals, component exits and route transitions; these are not interchangeable. No transition was implemented or installed in the app.

## T1 — Txemalon Reveal and project presentation

| Required field | Evidence |
| --- | --- |
| GitHub / demo | [Txemalon source](https://github.com/Txemalon/3d-portfolio), [live portfolio](https://txemaalbero.com). Page and ES→EN interaction observed; 3D keyboard not rendered/verified here |
| Exact files | `components/Reveal.tsx`, `app/globals.css` (`.reveal`, `.reveal-in`, reduced-motion rules); optional `components/ProjectModal.tsx`, `components/Carousel.tsx`, `components/smooth-scroll.tsx` |
| Visual preview | [Captured existing site](previews/txemalon-live.jpg); capture establishes appearance, not scroll timing or complete modal behavior |
| Code / asset licenses | [MIT](https://github.com/Txemalon/3d-portfolio/blob/main/LICENSE), actual text read. Reveal needs no external visual asset. Do not copy the author's project screenshots, resume, sounds or fonts under an assumed blanket asset grant |
| Existing behavior | Observer adds/removes entry class; directional transform/fade, delay/duration/threshold/once props; CSS reduced-motion bypass. Modal has overlay/dialog presentation, Escape dismissal, body/Lenis scroll lock and focus entry |
| Direct reuse | Existing `Reveal` wrapper plus its CSS, rather than writing another reveal observer. Modal only if that interaction is selected and audited |
| Modification | Essential content defaults hidden in `.reveal` until JS class is added: adapt progressive enhancement/no-JS policy. Preserve route links; short timings/user motion policy. Modal needs focus-trap/return-focus audit; language/Lenis/Carousel couplings must be removed or deliberately retained |
| Next/R3F fit | Strong React 19/Next 16 client-component match; no 3D coupling. Source uses standalone output; do not copy its deployment config into static export. Small reveal extraction; moderate modal extraction |

**Rank:** #1 low-dependency section-reveal reuse. Not a complete App Router route-exit solution.

## T2 — Motion AnimatePresence

| Required field | Evidence |
| --- | --- |
| GitHub / demo | [Motion repo](https://github.com/motiondivision/motion); [official live exit demo](https://examples.motion.dev/react/exit-animation); [documentation](https://motion.dev/docs/react-animate-presence) |
| Exact relevant source | Verified repo example `dev/react/src/examples/AnimatePresence-switch.tsx`; root `LICENSE.md`. This example demonstrates the same API/pattern, **not a claim that the deployed Hide/Show example is built from that exact repo file**. Deployed example's View Source exposes its own inline sample |
| Visual preview | [Before](previews/motion-exit-before.jpg), [after](previews/motion-exit-after.jpg). Actual Hide activation changed to Show and removed the displayed block; no animation duration/FPS measured |
| Code / asset licenses | Core and verified GitHub example under actual root **MIT** text (Motion B.V. 2024). Demo has CSS shapes, no model assets. Do not infer rights to paid Motion+ UI or copy the surrounding documentation site |
| Existing behavior | Keyed children animate entry/exit, conditional removal, opacity/scale and sequencing options. Live demo's built-in button toggles visibility |
| Direct reuse | Existing library component and public/example pattern. Use the library instead of hand-building presence/exit bookkeeping |
| Modification | Choose actual content keys and reduced-motion policy, clean cancellation, focus/scroll handling. Repo historical sample imports `framer-motion`; current docs use `motion/react`. Next App Router persistent layouts/unmount timing require a deliberate adapter; never promise route exits work merely by wrapping `children` |
| Next/R3F fit | React 19-compatible family per prior research; optional new dependency if selected, not installed here. DOM transitions coexist with canvas but do not animate skeletal clips. Small/moderate for inline sections, higher for cross-route choreography |

**Rank:** #1 general entry/exit behavior reuse; strongest observed interactive demo here. T1 remains smaller for simple scroll reveals. Neither is selected yet.

## T3 — Jorge cinematic section/camera transitions

[Repo](https://github.com/Jorge-Cuevas90003/Jorge-Cuevas90003.github.io), [live site](https://jorge-cuevas90003.github.io/), [blank capture](previews/jorge-live-unrendered.jpg). Exact files at commit `bd4d7c169f4e485b836e64f544d489fd398bba28`: `assets/index-DcagGn9F.js`, `assets/index-DQPpKdS8.css`. Minified symbols include `m8` (keyframe interpolation), `S8` (camera/section timing), `w8` (letterbox); fade overlay and drawer are in the same bundle. These symbol names are snapshot details, not stable interfaces.

**Code license:** verified root MIT. **Assets:** Chappie model, textures, animations and audio lack separate verified grants; omit/hold them. **Existing behavior:** camera interpolation, fades/letterbox heights, section changes and drawer presentation found in source, not observed rendering. **Direct reuse:** choreography code after obtaining editable source or carefully extracting licensed application portions; do not vendor the entire dependency bundle. **Changes:** separate source modules, current imports, motion cancellation, static/native routes, GPU costs and asset permissions. **Compatibility/effort:** R3F-style compiled implementation; unknown original versions, high adaptation effort. **Visual quality:** unranked due blank runtime capture. Rank as a reference/author-source request, not a cleared immediate reuse choice.
