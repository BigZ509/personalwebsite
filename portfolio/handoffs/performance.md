# Handoff — performance

> **Lead composition checkpoint — 2026-11-01 06:50 UTC:** Build/export and scoped actual-browser checks passed for D-016; screenshots/evidence under `output/playwright/compositions/`. One canvas, 237 draw/61,478 triangle submissions in observed frames; these include render/shadow work and are not FPS/unique-mesh benchmarks. 11 new source GLBs total 676,868 bytes plus existing robot. Actual renders are Chrome SwiftShader software WebGL. Physical devices/touch/hardware GPU/performance/conformance/context-loss/world travel untested. Connected Chrome WebGL failure showed fallback; no general cross-device pass claimed. Optimize only after composition selection.

> **Lead coordination — 2026-11-01 06:21 UTC, D-014:** New browser-proof rule in AGENTS/project skill: no 3D interaction success claim without actual input and visible scene result; screenshots alone do not prove motion. Mark Pass/Fail/Not tested, retain errors/artifacts, separate software rendering/emulation from physical devices. Playwright tooling and research board image loading were checked, but no hub browser journey, GPU measurement, accessibility conformance or device coverage was tested. [Audit](../docs/SKILL_AUDIT.md).

> **Lead coordination — 2026-11-01 05:58 UTC, D-012:** [Hub architecture](../research/hub-world/ARCHITECTURE.md) and [four phases](../research/hub-world/BUILD_PLAN.md) replace old editorial/default-scope assumptions. One canvas may still perform several portal passes; recommend one active world, bounded caches, no all-world physics/live previews, demand rendering only at rest, pause and semantic fallback. Camera demo actually failed WebGL context creation in Chrome; no animation or performance verified. All physical phones/tablets/GPUs and hub export/accessibility tests untested; old robot budgets are not furnished-room results. Next define/measure selected phase-1 assets only after authorization. Lead note, not a new specialist sign-off.

> **Lead coordination update — 2026-11-01 05:34 UTC:** User correction/D-011 stops prototype development/testing. Read [the source-selection catalog](../research/reusable-components/README.md). Compare existing-source cost/decoder/physics risks only; no new benchmarks, installs or implementations in this task. Chappie is 3,092,288 bytes with Draco/WebP and 22 embedded image records; this is metadata, not measured GPU cost. Miles has Cannon/scene/shadow/environment complexity; no live game or phone performance certified. Earlier Phase 1 budgets and Phase 2 reported tests are historical, not results for selected upstream sources. Session hit usage limit and is closed; lead completed catalog directly and added this user-requested coordination note, not a specialist runtime sign-off.

**Current status:** Ready for review  
**Last updated:** 2026-11-01 04:45:05 UTC  
**Owner:** performance  
**Assignment:** T4 research; proposals only, no implementation authorization

## State for lead

Core research is written in [research/performance.md](../research/performance.md): eight primary-source-backed findings, three remotely inspectable repositories with root code license text, critical alternatives, numeric planning hypotheses, and a robot acceptance matrix with an actual future test protocol. No other specialist's output is needed to review T4. All functional/performance tests remain **NOT RUN** because no app exists.

## Concrete recommendation to integrate

Propose initial semantic HTML and posters, ordinary destination/case-study anchors, deferred selective 3D, and static mobile/reduced-motion defaults with optional Enable 3D. Preserve those anchors during loading, failure, context loss and no JS. Prefer finite idle motion; persistent pause control if continuing motion is retained. A 3D control must not override reduced-motion preference.

Proposed H gates: initial shell ≤300 KiB; deferred robot ≤1.5 MiB including renderer/decoders/assets/environment; later complete deferred set ≤4 MiB; robot texture residency estimate ≤16 MiB, combined ≤32 MiB; robot ≤40k triangles/30 draws, combined ≤120k/80 draws; mobile DPR initially 1, cap 1.5 after evidence; mobile 30 fps target with measured rendered-frame gaps. **These are planning hypotheses, not measurements, standards, approved decisions or demonstrated feasibility.** Full definitions/accounting and revision triggers are in the report.

## Confirmed source corrections / integration cautions

- Official CWV good thresholds: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 at real-user p75 segmented mobile/desktop. [Official guidance](https://web.dev/articles/vitals).
- Lighthouse load TBT is a diagnostic proxy, scripted interactions are lab samples, and neither establishes field INP compliance. Post-launch field evidence may be unavailable at portfolio traffic levels.
- WCAG 2.5.8 AA is 24×24 CSS px with exceptions. **44×44 is a stricter proposed product target**, not the AA minimum. [W3C criterion](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html). Lead clarification incorporated.
- Reduced-motion interaction support is recommended as a product commitment; SC 2.3.3 is AAA. SC 2.2.2 autoplay pause obligations are a separate Level A issue. A short repeating loop does not excuse continuous motion.
- Avoid the proposed camera flash in the proof; no flashing required. Preserve keyboard-visible focus and touch/cancel behavior independently.
- Tool code licenses are separate from model/rig/animation/texture/environment licenses. No asset adoption clearance or universal compression-performance winner is claimed.

## Exact changed paths

- `/Users/bigz/personalwebsite/portfolio/research/performance.md`
- `/Users/bigz/personalwebsite/portfolio/updates/performance.md`
- `/Users/bigz/personalwebsite/portfolio/handoffs/performance.md`

No shared documents, other agents' files, application code, dependencies or Git metadata edited. No commits.

## Verification performed

- Read AGENTS.md, UPDATE.md, PROJECT_BRIEF.md, TASKS.md, DECISIONS.md and all three owned starter files.
- Ran `git status --short --branch`: exit 128, not a Git repository.
- Fetched original W3C standards/Understanding docs, Google CWV/SEO guidance, Khronos context-loss/compression specifications and maintainer tool docs.
- Fetched repository/source excerpts and actual license texts for glTF Transform (MIT), meshoptimizer/gltfpack (MIT), Khronos Sample Viewer (Apache-2.0), plus viewer third-party notices. This is documentary verification, not execution/full dependency clearance.
- Viewer and glTF Report demo fetches returned no readable lines: no interactive or rendering verification. Incorrect guessed model/license paths and corrected license fetches are disclosed in the report.
- Read-only Python Markdown consistency check passed, exit 0: dates, eight findings, hypothesis labels, threshold correction, failure scenarios and three license URLs present. Recorded in updates/performance.md. No app build, browser test, mobile test, animation test, compression experiment, accessibility-conformance test or benchmark ran.

## Exact next actions

1. **Lead, now:** Read recommendation, findings 1–8, H budget table and all-NOT-RUN matrix in research/performance.md. Integrate T4 into synthesis/robot plan; mark T4 Ready for review through lead-owned task/update files. Do not interpret these documents as approval.
2. **Lead + assets/architecture, before prototype:** Select licensed robot/art direction and physical devices; obtain per-file model/animation/texture/environment license evidence from assets and released loader/decoder-extension compatibility from architecture. Reconcile budgets openly if visual requirements exceed them.
3. **After existing prototype approval only:** Assign implementer. Establish HTML/direct-route/static fallback behavior and instrumentation first, then robot enhancement. Run five cold/five warm loads on recorded profiles/devices, collect lab interactions and actual rendered-frame traces, and execute every acceptance row including no JS, real simulated context loss, touch and reduced motion.
4. **Before expansion:** Review failures and actual evidence; keep static mobile if minimum rendering tier fails. Full four-object implementation remains behind existing approval gate. Post-launch p75 field CWV is a separate verification stage.

## Unresolved / blockers

No blocker to research review. Model/license choice, loader compatibility, actual target devices, GPU memory/performance and animation quality remain unresolved pre-prototype inputs. All live/demo/runtime observations are absent, not silently passed. Stack choice intentionally remains with architecture.

## Integration contract

Lead owns shared state/decisions/tasks. This researcher owns only these three performance files. Suggested decisions: HTML/fallback routing contract, static mobile default pending evidence, motion policy, provisional budgets and mandatory matrix evidence. All are proposals. No approval or permission request is pending from this researcher.
