# Portfolio identity and header design — D-026

Implement the user-supplied Objective1 brief as a bounded HTML overlay on the existing hub. Name Marc Alexis immediately; describe a computer science student and aspiring software engineer, software/robotics/creative interests. Keep scene/objects/lighting/camera/journey intact, no other worlds, new object labels or onboarding.

## Approach

Use the existing HubExperience HTML shell rather than a new layout around/re-mounting the Canvas. Persistent compact header: MARC ALEXIS left, About / Resume / GitHub right. Scene location/Pause/Back form a separate quiet utility row. Keep introduction in the existing lower-left caption area. A full top bar would cover more room; putting identity inside the Canvas would compromise accessible navigation. A new About page is unnecessary; native small dialog gives keyboard focus containment, Escape and return-focus without dependencies. Resume opens a short unavailable explanation because no asset/URL exists. GitHub profile comes from origin BigZ509/personalwebsite and user-confirmed identity. No guessed links.

## Visual language

Retain ivory #f5efde, amber #eac68f, cool room #162d3a, deep control #17333a and secondary #d0d9d5. Arial/Helvetica for clear navigation, existing Georgia serif for the modest personal greeting; no external font/network load. Name uses the requested capitals with restrained tracking. No large background card; existing header contrast wash, subtle text shadow, minimal buttons. Dialog solid dark surface with warm thin edge, limited width, room visible behind. No decorative motion.

## Behavior and acceptance

Header persists in desk/workshop/loading/fallback. About uses only confirmed biography. Resume clearly unavailable, not a broken anchor. Existing pause/back work; Escape inside native dialogs must not trigger workshop return or close project notes. Native dialog closes/restores nav focus. Identity state is local to its component so opening it does not re-render Canvas. Outside actual links/buttons, header/caption pointer events pass to scene. Responsive small header wraps at narrow widths; utility row fits, no full mobile scene redesign. Intro hides in workshop, existing workshop caption remains.

Verify actual visible browser desktop/portrait, header/navigation keyboard and pointer, existing mesh picks/robot round trip and exact camera return, manual pause, static export, unit/type checks. Capture before/after where tools permit and disclose any blocked browser paths. No commit/push/deploy. Current authorized spec is sufficiently detailed to proceed; implementation choices above are agent calls within it, not user-approved alternatives.
