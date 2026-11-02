# Task board — lead owns edits

Status values: `Not started`, `In progress`, `Blocked`, `Ready for review`, `Done`.  
Priorities: `P0` = blocking / essential, `P1` = important, `P2` = optional.

**Current authority: D-018.** User approved Cinematic with Cozy warmth and one robot/workshop/return interaction, preserving the room/assets. T26 governs execution. Other worlds remain blocked. Earlier phase gates below are historical where conflicting.

| ID | Priority | Owner | Task | Status | Dependencies | Deliverable |
| --- | --- | --- | --- | --- | --- | --- |
| T1 | P0 | design | Find 8–12 inspiring portfolios; identify 3 distinct visual directions | Done | None | Seven findings, 11 active sites + retired counterexample, three directions reviewed |
| T2 | P0 | assets | Evaluate reusable 3D objects, models, interaction animations and licenses | Done | None | Seven findings, eight candidates/routes, licenses/limits and handoff reviewed |
| T3 | P0 | architecture | Research open-source implementations and compare stack / interfaces | Done | None | Nine findings, four repos, compatibility/contracts/tree/schema and proposal review accepted |
| T4 | P0 | performance | Plan accessibility, WebGL/mobile optimization, SEO, recruiter navigation | Done | None | Eight findings, three tool/license comparisons, H budgets and all-NOT-RUN matrix reviewed |
| T5 | P0 | lead | Synthesize findings; compare options, risks and recommendations | Done | T1–T4 reviewed | `docs/IMPLEMENTATION_RECOMMENDATION.md`, research index, snapshot |
| T6 | P1 | lead | Propose one-object robot proof of concept and acceptance criteria | Done | T5 findings integrated; no execution authorization | `docs/ROBOT_PROTOTYPE_PLAN.md` |
| T7 | P1 | lead | Implement bounded robot proof of concept | Blocked | User correction D-011: source selection before any more code | Existing unfinished prototype frozen; no further fixes/builds authorized |
| T8 | P0 | user | Choose visual direction; approve architecture and robot scope | Done | User Phase 2 authorization | Field Notes provisional, Next/TS export, R3F/Drei, RobotExpressive, mobile fallback |
| T9 | P0 | lead + user | Review robot evidence; approve expansion or request revisions | Blocked | T7; device/accessibility results | Prototype review and next authorization |
| T10 | P1 | user + content owner | Confirm biography, resume, project facts/links and photo rights | Not started | Confirm content before publishing | Evidence-backed content inventory |
| T11 | P1 | future implementation owner | Build semantic content routes and project case studies | Blocked | T9; T10 content | Independently navigable pages |
| T12 | P1 | future object owners | Add basketball, camera and microchip using approved robot contract | Blocked | T9; measured budgets | Three isolated object modules + fallbacks |
| T13 | P1 | future QA/release owner | Validate routes, licensing, accessibility, SEO and production performance | Blocked | T11–T12; publication authority | Recorded checks and reviewed release |
| T14 | P0 | lead | Inventory and verify reusable sources, prioritizing four named repos | Done | Existing research reused; read-only upstream inspection | `research/reusable-components/`: 13 candidate records, 9 Markdown files, 11 previews, disclosed gaps |
| T15 | P0 | user | Inspect examples and select sources/behaviors to reuse | Ready for review | T14 | Choose candidate IDs and issue separate development authorization |
| T16 | P0 | lead | Focused desk-hub source/architecture/mini-world planning | Done | Reuse T14 catalog; primary source/license checks | `research/hub-world/`: five reports, two existing previews, graph and four phases; 20-file/80-link audit passed, frozen app digest unchanged |
| T17 | P0 | user | Select desk/object sources and review camera/world architecture | Ready for review | T16; supersedes narrower T15 review | Choose H1/H2, object bundle and covered-swap/portal approach; explicitly authorize phase 1 if desired |
| T18 | P0 | future hub owner | Phase 1: desk hub only | Blocked | T17 and explicit development authority | Single-canvas composition, semantic fallback, asset manifest and static export evidence |
| T19 | P1 | lead + user | Phase 2: robot + one Robotics mini world | Ready for review | User D-018; T26 | Full accessible select/travel/world/return round trip and recorded tests |
| T20 | P1 | future world owners | Phase 3: remaining mini worlds | Blocked | T19 reviewed; source/content/rights selection and expansion authority | Basketball/About, photography and software worlds using accepted lifecycle |
| T21 | P1 | future QA owner | Phase 4: polish and optimization | Blocked | T20; named physical-device checks and phase authority | Measured budgets, cleanup/return/context-loss checks, accessibility and production/export evidence |
| T22 | P0 | lead | Audit skills; install missing frontend/React/Playwright guidance; create project hub skill | Done | User setup authorization D-014 | Skill audit/inventory, four valid skills, verified Playwright tooling, required skill/browser-proof rules; final links/hashes/discovery audit passed |
| T23 | P0 | lead | Prepare actual three-game moodboard and concept comparison | Done | User proposed references D-015 | Local screenshots/provenance, HTML/Markdown board and captured browser preview; visual/image-load/hash checks passed; no hub implementation |
| T24 | P0 | lead + assets | Build and capture cozy/cinematic/stylized-game compositions of one populated 3D desk | Done | User D-016 authorization; reuse licensed sources | `/compositions/`, 11 licensed GLBs, three actual screenshots, successful build/export and scoped browser evidence; old app files unchanged |
| T25 | P0 | user | Review actual compositions and choose direction/revisions | Done | T24; D-018 | 02 Cinematic with warmth of 01 Cozy; preserve room/assets |
| T26 | P0 | lead + assets | Robot reaction, camera approach, workshop and exact return | Done | D-018 | `/hub/`, browser screenshots/test evidence, component/limitations memory |
| T27 | P1 | lead | Create GitHub personalwebsite repository and push | Blocked | D-021; auto-review requires explicit Keploy access approval | Local Working robot concept commit preparation; no remote creation/push; no deployment |
| T28 | P0 | user | Review robot reaction, travel, workshop and return | Ready for review | T26 | Approve or revise bounded flow before any other worlds |

## Task change protocol
Only lead edits this board. Each specialist posts proposed task changes, blockers, or completion evidence in `updates/<agent>.md` / `handoffs/<agent>.md`; the lead reflects reviewed changes here.

## Definition of research completion
- Source-backed findings, at least 5 substantial findings and ideally at least 3 confirmed working examples.
- Relevant pros/cons and why examples apply here.
- License status explicitly verified or recorded as unknown.
- Written next steps; clear ready-for-review handoff.

## Lead checkpoint — 2026-11-01

Initialized T1–T4 in parallel with separate file ownership. T5 synthesis and T6 scope drafting run while specialist evidence is collected. Clarified the original T6 dependency: writing a prototype proposal is research/planning and does not require prior visual approval; executing T7 does. Added explicit user/prototype/content/release gates. These future tasks do not authorize implementation.

### 2026-11-01 04:50 UTC — research review complete

Reviewed all four reports, progress logs and handoffs: 31 substantial findings. Lead independently spot-checked pivotal sources and integrated architecture review clarifications, finite-motion policy, explicit bundle hypotheses and approval gates. Read-only document audit passed: 23 Markdown files, no application files, all then-present local links/heading fragments valid, all four specialists Ready for review. T1–T6 Done means research/planning deliverables accepted, never website completion or user approval. T7 remains blocked; T8 awaits user review. No runtime, device, animation, accessibility-conformance or performance tests passed by documentary review.

### 2026-11-01 05:34 UTC — user correction / reusable-source catalog

Phase 2 work and its historical findings remain on disk. User rejects continuing that approach and requires source selection first. T7 is blocked again by D-011, regardless of prior T8 prototype authorization. T14 complete with exact-path/license/demo/preview/reuse/compatibility records and explicit limits; T15 is the only active user review gate. Source-code digest for 15 app/config/test/server files is unchanged across the catalog task. No app fixes, build, install, redesign or model generation performed in this pass.
