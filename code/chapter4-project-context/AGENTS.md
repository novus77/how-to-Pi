# AGENTS.md

## Communication

Use Chinese for user-facing prose. Use English for code, comments, identifiers, commands, and commit messages.

## Engineering Rules

- Prefer small, reviewable changes.
- Follow existing project structure before adding abstractions.
- Do not commit secrets, local session files, or real API keys.
- Do not run destructive git commands such as `git reset --hard`, `git checkout --`, or force push unless the user explicitly asks.
- Use `rg` for text search when available.

## Verification

Before claiming work is complete, run the most relevant verification command and report the exact command.

For documentation-only changes, run:

```bash
node scripts/verify-docs.mjs
```

For Node.js examples, run the specific example command from the chapter README.
