#!/usr/bin/env node

import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, normalize, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const requiredFiles = [
  "README.md",
  "README_EN.md",
  "CONTRIBUTING.md",
  "LICENSE",
  ".env.example",
  "docs/index.html",
  "docs/home.md",
  "docs/README.md",
  "docs/_sidebar.md",
  "docs/Preface.md",
  "docs/chapter1/第一章 初识 Pi Agent.md",
  "docs/chapter2/第二章 Coding Agent 发展脉络.md",
  "docs/chapter3/第三章 Pi 生态与安装配置.md",
  "docs/chapter4/第四章 第一个 Pi Session.md",
  "docs/chapter5/第五章 Agent Loop.md",
  "docs/chapter6/第六章 Context 工程.md",
  "docs/chapter7/第七章 Session Tree.md",
  "docs/chapter8/第八章 Tools 与安全边界.md",
  "docs/chapter9/第九章 Extensions 实战.md",
  "docs/chapter10/第十章 Skills 与 Prompt Templates.md",
  "docs/chapter11/第十一章 Pi Packages.md",
  "docs/chapter12/第十二章 SDK 实战.md",
  "docs/chapter13/第十三章 JSON 与 RPC 模式.md",
  "docs/chapter14/第十四章 调试测试与可观测性.md",
  "docs/chapter15/第十五章 综合案例 Repo Workflow Agent.md",
  "docs/chapter16/第十六章 毕业设计.md",
];

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    failures.push(`Missing required file: ${file}`);
  }
}

const markdownFiles = [
  "README.md",
  "README_EN.md",
  "CONTRIBUTING.md",
  "docs/README.md",
  "docs/home.md",
  "docs/_sidebar.md",
  "docs/Preface.md",
  ...requiredFiles.filter((file) => file.startsWith("docs/chapter")),
  "extra-chapters/README.md",
  "community-projects/example-repo-workflow/README.md",
];

const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g;

for (const file of markdownFiles) {
  const absolute = join(root, file);
  if (!existsSync(absolute)) continue;

  const content = readFileSync(absolute, "utf8");
  let match;
  while ((match = linkPattern.exec(content))) {
    const target = match[1];
    if (
      target.startsWith("http://") ||
      target.startsWith("https://") ||
      target.startsWith("#") ||
      target.startsWith("mailto:")
    ) {
      continue;
    }

    const withoutAnchor = decodeURIComponent(target.split("#")[0]);
    if (!withoutAnchor) continue;

    const resolved = normalize(join(dirname(absolute), withoutAnchor));
    if (!resolved.startsWith(root)) {
      failures.push(`Link escapes repository: ${file} -> ${target}`);
      continue;
    }

    if (!existsSync(resolved)) {
      failures.push(`Broken link: ${file} -> ${target}`);
      continue;
    }

    if (statSync(resolved).isDirectory()) {
      continue;
    }
  }
}

const envExample = readFileSync(join(root, ".env.example"), "utf8");
const suspiciousSecretPatterns = [
  /sk-[A-Za-z0-9]{20,}/,
  /AIza[0-9A-Za-z_-]{20,}/,
  /AKIA[0-9A-Z]{16}/,
];

for (const pattern of suspiciousSecretPatterns) {
  if (pattern.test(envExample)) {
    failures.push(`Suspicious secret-like value in .env.example: ${pattern}`);
  }
}

if (failures.length > 0) {
  console.error("Documentation verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Documentation verification passed.");
