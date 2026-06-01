# Pi Agent Course Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Markdown-first Chinese course project for "Pi Agent Core Principles and Practice" with Docsify documentation, runnable examples, contribution paths, and verification scripts.

**Architecture:** Keep `README.md` as the repository entry, `docs/` as the online reading source, `code/` as chapter-aligned runnable examples, and `scripts/` as local quality gates. Use official Pi latest docs and the upstream GitHub repository as the source of truth for CLI, extension, session, SDK, RPC, and JSON event stream behavior.

**Tech Stack:** Markdown, Docsify, Node.js scripts, TypeScript extension examples, JSONL session examples, Pi CLI.

---

### Task 1: Repository Course Shell

**Files:**
- Modify: `README.md`
- Create: `README_EN.md`
- Create: `CONTRIBUTING.md`
- Create: `LICENSE`
- Create: `.env.example`

- [x] **Step 1: Define project promise**

Write the Chinese project overview, audience, learning outcomes, quick start, chapter table, example commands, contribution link, and license note.

- [x] **Step 2: Add lightweight English entry**

Create `README_EN.md` that points English readers to the Chinese course and official Pi resources.

- [x] **Step 3: Add contribution contract**

Create contribution rules for typo fixes, chapter improvements, examples, extra chapters, and capstone submissions.

- [x] **Step 4: Add environment template**

Create `.env.example` with provider key placeholders only.

### Task 2: Docsify Site

**Files:**
- Create: `docs/index.html`
- Create: `docs/README.md`
- Create: `docs/_sidebar.md`
- Create: `docs/Preface.md`

- [x] **Step 1: Configure Docsify**

Add a lightweight Docsify shell with sidebar, search, pagination, copy-code, zoom-image, Mermaid, and syntax highlighting.

- [x] **Step 2: Create docs homepage**

Add the course landing page, learning outcomes, quick start, chapter navigation, and contribution paths.

- [x] **Step 3: Create sidebar**

Ensure all chapter links match actual files.

- [x] **Step 4: Create preface**

Explain scope, assumptions, prerequisites, and reading strategy.

### Task 3: Core Chapters

**Files:**
- Create: `docs/chapter1/Chapter1-What-Is-Pi.md`
- Create: `docs/chapter2/Chapter2-First-Session.md`
- Create: `docs/chapter3/Chapter3-Agent-Loop.md`
- Create: `docs/chapter4/Chapter4-Context.md`
- Create: `docs/chapter5/Chapter5-Session-Tree.md`
- Create: `docs/chapter6/Chapter6-Tools-And-Safety.md`
- Create: `docs/chapter7/Chapter7-Extensions.md`
- Create: `docs/chapter8/Chapter8-Skills-And-Packages.md`
- Create: `docs/chapter9/Chapter9-Providers-And-Models.md`
- Create: `docs/chapter10/Chapter10-Programmatic-Usage.md`
- Create: `docs/chapter11/Chapter11-Engineering.md`
- Create: `docs/chapter12/Chapter12-Capstone.md`

- [x] **Step 1: Write conceptual arc**

Each chapter contains why it matters, learning objectives, core concepts, examples, common pitfalls, exercises, summary, and references where applicable.

- [x] **Step 2: Add diagrams and tables**

Use Mermaid and Markdown tables for agent loop, session tree, extension surfaces, and integration choices.

- [x] **Step 3: Align examples**

Each chapter references the matching `code/` directory when it has runnable assets.

### Task 4: Runnable Examples

**Files:**
- Create: `code/chapter2-first-session/README.md`
- Create: `code/chapter4-project-context/AGENTS.md`
- Create: `code/chapter4-project-context/README.md`
- Create: `code/chapter5-session-inspector/inspect-session.mjs`
- Create: `code/chapter5-session-inspector/sample-session.jsonl`
- Create: `code/chapter6-tool-safety/safety-extension.ts`
- Create: `code/chapter7-extension-basics/index.ts`
- Create: `code/chapter8-skill-package/package.json`
- Create: `code/chapter8-skill-package/skills/repo-review/SKILL.md`
- Create: `code/chapter10-programmatic-usage/json-events.mjs`
- Create: `code/chapter10-programmatic-usage/rpc-client.mjs`
- Create: `code/chapter10-programmatic-usage/sdk-minimal.ts`

- [x] **Step 1: Add non-secret examples**

Use examples that can be inspected without credentials and clearly mark examples that require a local Pi installation.

- [x] **Step 2: Add session parser**

Implement a dependency-free Node.js JSONL parser that summarizes entry counts, roles, branches, and labels.

- [x] **Step 3: Add Pi extension examples**

Use official `ExtensionAPI`, `Type`, `registerTool`, `registerCommand`, and event hook patterns.

- [x] **Step 4: Add programmatic usage clients**

Add JSON event stream and RPC subprocess examples, plus SDK minimal usage.

### Task 5: Verification

**Files:**
- Create: `scripts/verify-docs.mjs`
- Create: `community-projects/example-repo-workflow/README.md`
- Create: `extra-chapters/README.md`

- [x] **Step 1: Add local docs verifier**

Check internal Markdown links, sidebar targets, required chapter files, and `.env.example` secret safety.

- [x] **Step 2: Run verifier**

Run `node scripts/verify-docs.mjs`.

- [x] **Step 3: Run runnable example**

Run `node code/chapter5-session-inspector/inspect-session.mjs code/chapter5-session-inspector/sample-session.jsonl`.

- [x] **Step 4: Inspect git diff**

Run `git status --short` and review changed files.
