#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const file = process.argv[2];

if (!file) {
  console.error("Usage: node inspect-session.mjs <session.jsonl>");
  process.exit(1);
}

const path = resolve(file);
const lines = readFileSync(path, "utf8")
  .split(/\n/)
  .map((line) => line.trim())
  .filter(Boolean);

const entries = lines.map((line, index) => {
  try {
    return JSON.parse(line);
  } catch (error) {
    throw new Error(`Invalid JSON at line ${index + 1}: ${error.message}`);
  }
});

const header = entries.find((entry) => entry.type === "session");
if (!header) {
  throw new Error("Missing session header");
}

const roleCounts = new Map();
const children = new Map();
const labels = [];

for (const entry of entries) {
  if (entry.message?.role) {
    roleCounts.set(entry.message.role, (roleCounts.get(entry.message.role) ?? 0) + 1);
  }

  if (entry.type === "label") {
    labels.push({ label: entry.label, entryId: entry.entryId });
  }

  if ("parentId" in entry && entry.id) {
    const key = entry.parentId ?? "<root>";
    const list = children.get(key) ?? [];
    list.push(entry.id);
    children.set(key, list);
  }
}

let branchCount = 0;
for (const list of children.values()) {
  if (list.length > 1) {
    branchCount += list.length - 1;
  }
}

console.log(`Session: ${header.id}`);
console.log(`Version: ${header.version}`);
console.log(`CWD: ${header.cwd}`);
console.log(`Entries: ${entries.length - 1}`);
console.log(`Branches: ${branchCount}`);
console.log("Roles:");

for (const [role, count] of [...roleCounts.entries()].sort()) {
  console.log(`  ${role}: ${count}`);
}

if (labels.length > 0) {
  console.log("Labels:");
  for (const item of labels) {
    console.log(`  ${item.label}: ${item.entryId}`);
  }
}
