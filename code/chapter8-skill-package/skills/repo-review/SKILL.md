---
name: repo-review
description: Review repository changes with a risk-first engineering lens before merging or publishing.
---

# Repo Review Skill

Use this skill when asked to review repository changes, pull requests, release candidates, or agent-generated code.

## Workflow

1. Inspect the requested diff or file set.
2. Prioritize correctness, safety, data loss, security, and missing verification.
3. Report findings first, ordered by severity.
4. Include exact file paths and line references when available.
5. Keep summary brief and secondary to findings.

## Checks

- Does the change alter public API behavior?
- Does it touch persistence, migration, auth, permissions, network, or filesystem operations?
- Are destructive commands or irreversible actions guarded?
- Are secrets, local paths, or session files committed?
- Is there a focused verification command?

## Output Format

```text
Findings:
- [P1] Short issue title
  File: path/to/file.ts:123
  Why it matters: ...
  Suggested fix: ...

Open questions:
- ...

Verification gaps:
- ...
```
