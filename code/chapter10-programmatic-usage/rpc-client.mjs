#!/usr/bin/env node

import { spawn } from "node:child_process";

const prompt = process.argv.slice(2).join(" ") || "Say hello in one sentence.";
const child = spawn("pi", ["--mode", "rpc", "--no-session"], {
  stdio: ["pipe", "pipe", "pipe"],
});

let buffer = "";
let accepted = false;

function send(command) {
  child.stdin.write(`${JSON.stringify(command)}\n`);
}

child.stdout.setEncoding("utf8");
child.stdout.on("data", (chunk) => {
  buffer += chunk;
  let newlineIndex;

  while ((newlineIndex = buffer.indexOf("\n")) >= 0) {
    const line = buffer.slice(0, newlineIndex).replace(/\r$/, "");
    buffer = buffer.slice(newlineIndex + 1);
    if (!line.trim()) continue;

    const message = JSON.parse(line);

    if (message.type === "response" && message.id === "req-1") {
      accepted = Boolean(message.success);
      console.error(`Prompt accepted: ${accepted}`);
    }

    if (message.type === "message_update" && message.assistantMessageEvent?.type === "text_delta") {
      process.stdout.write(message.assistantMessageEvent.delta);
    }

    if (message.type === "agent_end") {
      child.stdin.end();
    }
  }
});

child.stderr.pipe(process.stderr);

child.on("spawn", () => {
  send({ id: "req-1", type: "prompt", message: prompt });
});

child.on("exit", (code) => {
  if (!accepted) {
    console.error("Prompt was not accepted by RPC mode.");
  }
  process.exit(code ?? 1);
});
