# Installed skill and browser-tool audit

**Checked 2026-11-01. Scope: setup/research only.** No application source, dependencies, runtime models or build output changed. The [complete on-disk inventory](SKILLS_INVENTORY.json) lists names, paths, scopes and SKILL.md hashes for **75 files**: 7 user, 5 system, 62 plugin-cache and 1 new project skill. Cache presence does not prove a plugin is enabled or injected into this turn.

## Requested setup

| Capability | Before | Installed/retained | Provenance |
| --- | --- | --- | --- |
| frontend-design | Missing from user/project/system skill locations and matching plugin cache | `/Users/bigz/.codex/skills/frontend-design`; user discovery symlink in `.agents/skills` | [Anthropic source](https://github.com/anthropics/skills/tree/ca45fc496a3436251f191354091d557da31c15b5/skills/frontend-design), exact commit `ca45fc496a3436251f191354091d557da31c15b5`; included actual Apache 2.0 license retained |
| react-best-practices | Missing | Installed as canonical **vercel-react-best-practices**, matching upstream frontmatter, plus discovery symlink | [Vercel source](https://github.com/vercel-labs/agent-skills/tree/1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62/skills/react-best-practices), commit `1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62`. SKILL.md declares MIT; no separate root/skill LICENSE file found in inspected tree. No license text invented |
| playwright skill | Missing | `/Users/bigz/.codex/skills/playwright` plus discovery symlink | [Official OpenAI source](https://github.com/openai/skills/tree/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/playwright), commit `49f948faa9258a0c61caceaf225e179651397431`; actual included Apache 2.0 license retained |
| Project 3D hub guidance | Missing | [portfolio-3d-hub](../../.agents/skills/portfolio-3d-hub/SKILL.md), project-scoped, implicit selection left enabled | Created with `$skill-creator` initializer, UI metadata and one conditional browser-QA reference. Covers R3F/Drei, CameraControls, rights, scene composition, selected visual references, mini-world lifecycle and evidence |
| Playwright test runtime | Already present | Existing `@playwright/test` **1.64.1**, CLI version command passed | Existing package/lock/config unchanged; local Chrome exists and config uses `channel: "chrome"`. No cached bundled browser found; none installed because this project already selects system Chrome |
| Playwright skill CLI | Not verified before setup | Official wrapper successfully ran `--help` and reports version **0.1.23** through `bash` | `npx` present. Installer archive did not preserve executable mode, so invoke `bash …/playwright_cli.sh` rather than assuming direct execution works. Sandboxed version lookup hit npm DNS failure; the authorized network check passed. No app browser suite or 3D interaction was run |

Installed using the existing skill-installer helper with pinned revisions; no old skills overwritten. User discovery aliases are symlinks to the same installations, not separately maintained copies. Current official [skill discovery guidance](https://learn.chatgpt.com/docs/build-skills) documents `.agents/skills` and symlink support. Skills should be available on the next turn; restart Codex if they do not appear. Explicit AGENTS paths also make the required instructions readable.

## Other audit findings

- Duplicate skill names found among existing Mobbin-related user/plugin files: `best-practices`, `plain-writing`, `redesign-screen`, `search`. They were preserved; this task does not authorize deleting or disabling unrelated installations. Use namespaced selection when needed rather than loading all duplicates.
- Some on-disk system/plugin skills are not in the currently advertised skill list. The inventory is not a claim that every cached tool/skill is connected or active. No connector permissions or global Codex configuration were changed.
- No dedicated installed 3D-hub skill was found before creation. Generic frontend advice alone does not establish asset rights, a usable camera round trip or actual browser rendering; the project skill adds those missing requirements.

## Validation and limits

The official creator `quick_validate.py` passed for all four added skills. The default Python lacked PyYAML; validation used an isolated `/tmp/portfolio-skill-validation` environment with PyYAML 6.0.3, not an app dependency. The validator checks skill structure/frontmatter, not future behavioral compliance.

The three requested game screenshots plus a separate official dorm-context image were downloaded with provenance and visually inspected. The [moodboard](../research/hub-world/visual-references/moodboard.html) was opened in Chrome; all four displayed images loaded with nonzero natural sizes, and a [viewport screenshot](../research/hub-world/visual-references/moodboard.png) records its three reference panels. This validates a research artifact only. It does not test a hub, camera motion or any game/portfolio 3D interaction.

No portfolio build, static export, test suite, GPU benchmark or physical-device test was run for this setup task. The browser-evidence rule is recorded in AGENTS and the project skill; it does not retroactively upgrade prior source observations into runtime passes.

Final file audit passed: 18 relevant Markdown files, 98 local links/HTML assets, four reference-image hashes, 75 skill inventory hashes and three discovery symlinks. The 15 application/config/test/server files have the same start/end digest, `4e6668a8bb381046eec8976959fb70e25c84b4ff43694dca11efb75cdd38a05f`.
