# Example Repo Workflow Agent

This is a template for the Chapter 16 capstone submissions.

## Goal

Build a Pi-based workflow that reviews a repository, creates an implementation plan, executes only approved changes, and reports verification evidence.

## Required Files

```text
community-projects/github-user-repo-workflow/
├── README.md
├── .env.example
├── AGENTS.md
├── prompts/
├── extensions/
├── scripts/
└── outputs/
```

## Example Input

```text
Review the current changes and identify correctness risks before merge.
```

## Expected Output

```text
Findings:
- [P1] ...

Verification:
- Command: node scripts/verify-docs.mjs
- Result: pass

Limitations:
- No provider-specific behavior was tested.
```

## Safety Boundary

- Default to read-only analysis.
- Ask before editing files.
- Block destructive git commands.
- Never print or upload secrets.
