# Chapter 4 First Session Checklist

Run these commands from a project directory.

## Install

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
pi --version
```

## Authenticate

Use interactive login:

```text
/login
```

Or set a provider key before starting Pi:

```bash
export ANTHROPIC_API_KEY="your-key"
```

## Start an interactive session

```bash
pi
```

Suggested first prompt:

```text
List the top-level files in this project and explain what each one is for.
```

Name the session:

```text
/name Explore how-to-Pi
```

Inspect session metadata:

```text
/session
```

## Print mode

```bash
pi --name "Repository summary" -p "Summarize this repository in 5 bullet points."
```

## Ephemeral mode

```bash
pi --no-session -p "Explain what this repository teaches."
```
