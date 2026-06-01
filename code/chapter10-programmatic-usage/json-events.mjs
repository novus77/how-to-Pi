#!/usr/bin/env node

import { spawn } from "node:child_process";

const prompt = process.argv.slice(2).join(" ") || "List files";
const child = spawn("pi", ["--mode", "json", prompt], {
  stdio: ["ignore", "pipe", "pipe"],
});

let buffer = "";
const counts = new Map();

child.stdout.setEncoding("utf8");
child.stdout.on("data", (chunk) => {
  buffer += chunk;
  let newlineIndex;

  while ((newlineIndex = buffer.indexOf("\n")) >= 0) {
    const line = buffer.slice(0, newlineIndex).trim();
    buffer = buffer.slice(newlineIndex + 1);
    if (!line) continue;

    const event = JSON.parse(line);
    counts.set(event.type, (counts.get(event.type) ?? 0) + 1);

    if (event.type === "message_update" && event.assistantMessageEvent?.type === "text_delta") {
      process.stdout.write(event.assistantMessageEvent.delta);
    }
  }
});

child.stderr.pipe(process.stderr);

child.on("exit", (code) => {
  console.error("\n\nEvent counts:");
  for (const [type, count] of [...counts.entries()].sort()) {
    console.error(`  ${type}: ${count}`);
  }
  process.exit(code ?? 1);
});
