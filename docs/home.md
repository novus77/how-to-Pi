# how-to-Pi

### 《Pi Agent 核心原理和实践》

_从 terminal coding agent harness 的视角理解 Pi，并把它落到可复用、可审计、可分发的工程实践里。_

[![GitHub](https://img.shields.io/badge/GitHub-earendil--works%2Fpi-blue?style=flat&logo=github)](https://github.com/earendil-works/pi)
[![Pi Docs](https://img.shields.io/badge/Pi-Docs-brightgreen?style=flat)](https://pi.dev/docs/latest)
[![npm](https://img.shields.io/badge/npm-%40earendil--works%2Fpi--coding--agent-CB3837?style=flat&logo=npm&logoColor=white)](https://www.npmjs.com/package/@earendil-works/pi-coding-agent)
![Language](https://img.shields.io/badge/language-Chinese-brightgreen?style=flat)
![License](https://img.shields.io/badge/license-MIT-black?style=flat)

---

## 项目介绍

Pi 是一个 terminal-based coding agent。和普通 LLM Chat 不同，它不仅生成文本，还能在受控边界内读取文件、运行命令、调用工具、保存 session、加载 extensions 和 skills，并通过 JSON、RPC、SDK 嵌入外部系统。

本教程希望回答的问题不是“Pi 有哪些命令”，而是：

- 为什么 coding agent 需要 harness？
- Pi 的 agent loop、tool calling、session tree 和 compaction 如何协作？
- 什么时候该用 prompt、skill、extension、package 或 SDK？
- 如何把 Pi 用在团队级 repo workflow 中，而不是停留在个人实验？

这是一门偏工程实践的课程。读者应该具备基本 TypeScript、Node.js、shell 和 Git 经验。

## 你将收获什么

- 理解 Pi 在 coding agent 演进中的定位。
- 掌握 Pi 安装、认证、provider、model 和 settings 的基础配置。
- 能解释 message、tool call、observation、session、context、compaction 的关系。
- 能编写 TypeScript extension，注册 command、custom tool 和 event hook。
- 能编写 skill 和 prompt template，并用 Pi package 分发给团队。
- 能使用 SDK、JSON event stream 和 RPC mode 构建外部集成。
- 能完成一个 Repo Workflow Agent 综合案例。
- 能设计自己的团队级 Pi workflow agent 作为毕业项目。

## 在线阅读

本地预览：

```bash
npx docsify-cli serve docs
```

或：

```bash
python3 -m http.server 3000 -d docs
```

## 内容导航

| 章节 | 关键内容 | 状态 |
|---|---|---|
| [前言](Preface.md) | 学习承诺、边界、先决条件和阅读方式 | ✅ |
| **第一部分：Pi Agent 与 Coding Agent 基础** |  |  |
| [第一章 初识 Pi Agent](chapter1/第一章%20初识%20Pi%20Agent.md) | Pi 是什么，terminal coding harness 的边界 | ✅ |
| [第二章 Coding Agent 发展脉络](chapter2/第二章%20Coding%20Agent%20发展脉络.md) | 从 Chat CLI 到可扩展 Agent Harness | ✅ |
| [第三章 Pi 生态与安装配置](chapter3/第三章%20Pi%20生态与安装配置.md) | CLI、provider、model、settings、认证 | ✅ |
| **第二部分：掌握 Pi 的核心工作流** |  |  |
| [第四章 第一个 Pi Session](chapter4/第四章%20第一个%20Pi%20Session.md) | interactive mode、print mode、命名、恢复 | ✅ |
| [第五章 Agent Loop](chapter5/第五章%20Agent%20Loop.md) | message、tool call、observation、停止条件 | ✅ |
| [第六章 Context 工程](chapter6/第六章%20Context%20工程.md) | AGENTS.md、文件上下文、skills、compaction | ✅ |
| [第七章 Session Tree](chapter7/第七章%20Session%20Tree.md) | JSONL、branch、fork、label、resume | ✅ |
| **第三部分：扩展 Pi 的能力边界** |  |  |
| [第八章 Tools 与安全边界](chapter8/第八章%20Tools%20与安全边界.md) | 内置工具、权限、危险操作拦截 | ✅ |
| [第九章 Extensions 实战](chapter9/第九章%20Extensions%20实战.md) | event、command、custom tool、UI | ✅ |
| [第十章 Skills 与 Prompt Templates](chapter10/第十章%20Skills%20与%20Prompt%20Templates.md) | 按需加载的工作流知识 | ✅ |
| [第十一章 Pi Packages](chapter11/第十一章%20Pi%20Packages.md) | 团队分发、版本固定、安全审查 | ✅ |
| **第四部分：Pi 的编程化集成与工程化** |  |  |
| [第十二章 SDK 实战](chapter12/第十二章%20SDK%20实战.md) | 在 Node.js 中嵌入 AgentSession | ✅ |
| [第十三章 JSON 与 RPC 模式](chapter13/第十三章%20JSON%20与%20RPC%20模式.md) | JSON event stream、RPC protocol、外部 UI | ✅ |
| [第十四章 调试测试与可观测性](chapter14/第十四章%20调试测试与可观测性.md) | event、日志、验证、安全审计 | ✅ |
| **第五部分：综合案例与毕业项目** |  |  |
| [第十五章 综合案例 Repo Workflow Agent](chapter15/第十五章%20综合案例%20Repo%20Workflow%20Agent.md) | review、release、report workflow 综合案例 | ✅ |
| [第十六章 毕业设计](chapter16/第十六章%20毕业设计.md) | 设计你的团队级 Pi Workflow Agent | ✅ |

## 如何学习

建议按五个阶段推进：

1. **先建立概念**：读第一部分，理解 Pi 不是模型 wrapper，而是 coding agent harness。
2. **跑通核心工作流**：读第二部分，完成安装、session、context 和 JSONL inspection。
3. **开始扩展 Pi**：读第三部分，编写 safety extension、repo review skill 和 package skeleton。
4. **接入外部系统**：读第四部分，理解 SDK、JSON、RPC 的边界，选择合适集成方式。
5. **完成综合项目**：读第五部分，构建一个可审计的 Repo Workflow Agent。

每章都建议先读正文，再运行对应 `code/` 示例。不要只复制命令；重点是理解每个机制解决的工程问题。

## 章节结构

为了避免教程停留在概念介绍，每个核心章节都尽量遵守同一套结构：

- 本章目标与最终产物：说明读完后应该能做什么，以及会产出哪些文件或命令。
- 核心机制：用图表、表格或流程说明 Pi 的抽象边界。
- 动手实践：给出可执行命令、示例目录和预期观察点。
- 工程取舍：解释什么时候用 prompt、skill、extension、package、SDK、JSON 或 RPC。
- 常见问题：列出失败模式、排查路径和安全风险。
- 习题与参考资料：帮助读者把章节能力迁移到自己的项目。

## 配套代码

| 目录 | 内容 |
|---|---|
| `code/chapter2-first-session/` | 第一个 session checklist |
| `code/chapter4-project-context/` | `AGENTS.md` 项目指令示例 |
| `code/chapter5-session-inspector/` | JSONL session parser |
| `code/chapter6-tool-safety/` | safety extension |
| `code/chapter7-extension-basics/` | command + custom tool extension |
| `code/chapter8-skill-package/` | repo-review skill package |
| `code/chapter10-programmatic-usage/` | SDK、JSON、RPC 示例 |

先运行无需外部依赖的检查：

```bash
node scripts/verify-docs.mjs
node code/chapter5-session-inspector/inspect-session.mjs code/chapter5-session-inspector/sample-session.jsonl
```

## 社区精选与扩展章节

独立于正文的内容放在：

- `extra-chapters/`：补充文章、踩坑、对比、团队实践。
- `community-projects/`：读者毕业项目和 workflow agent。

建议投稿主题：

- Pi 与其他 coding agent 的工作流对比。
- Extension 开发踩坑。
- Team settings 和 package 分发实践。
- Session 分享和脱敏。
- Repo review、release notes、CI audit 等真实案例。

## 如何贡献

欢迎提交：

- 文档 typo 和断链修复。
- 章节扩写和图表补充。
- 可运行示例。
- Extra chapter。
- Capstone 项目。

提交前运行：

```bash
node scripts/verify-docs.mjs
```

详细规则见 [CONTRIBUTING.md](../CONTRIBUTING.md)。

## 参考资料

- [Pi latest docs](https://pi.dev/docs/latest)
- [earendil-works/pi](https://github.com/earendil-works/pi)
- [@earendil-works/pi-coding-agent](https://www.npmjs.com/package/@earendil-works/pi-coding-agent)
