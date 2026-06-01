# how-to-Pi

「Pi Agent 核心原理和实践」是一套面向工程师的中文教程，目标不是复述 Pi 官方文档，而是把 Pi 当作一个可扩展的 terminal coding agent harness 来拆解：agent loop、tool calling、session tree、context compaction、extensions、skills、packages、SDK、RPC 和 JSON event stream。

Pi 当前定位是 terminal-based coding agent。上游仓库 [earendil-works/pi](https://github.com/earendil-works/pi) 包含 `@earendil-works/pi-coding-agent`、`@earendil-works/pi-agent-core`、`@earendil-works/pi-ai` 和 `@earendil-works/pi-tui` 等包。最新官方文档见 [pi.dev/docs/latest](https://pi.dev/docs/latest)。

## 适合谁

- 熟悉 TypeScript、Node.js 和命令行工具。
- 已经使用过 coding agent，想理解 agent harness 的工程边界。
- 关心 session、context、tool safety、extension、programmatic integration 的长期可维护性。
- 希望基于 Pi 构建团队内部 workflow、工具扩展或自动化 agent。

## 学完能做什么

- 解释 Pi 的核心运行循环，以及 model、message、tool、observation、session 的关系。
- 安装和配置 Pi，并用 project instructions 管理 agent 行为边界。
- 解析 Pi JSONL session 文件，理解 branch、label、compaction 的数据结构。
- 编写 TypeScript extension，注册自定义 command、tool 和 event hook。
- 编写技能和 package skeleton，让能力按需加载和复用。
- 使用 `--mode json`、`--mode rpc` 或 SDK 把 Pi 嵌入外部脚本和工具。
- 设计一个 repo workflow agent，并用清晰的安全边界交付。

## 章节质量标准

本教程按开源课程项目组织，而不是零散文章集合。每个核心章节都尽量包含目标与最终产物、核心机制图表、动手实践、工程取舍、常见故障、习题和参考资料。配套代码放在 `code/`，毕业项目和社区案例放在 `community-projects/`。

## 快速开始

安装 Pi：

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

进入项目目录后启动：

```bash
pi
```

本教程本地阅读：

```bash
npx docsify-cli serve docs
```

也可以用静态服务器预览：

```bash
python3 -m http.server 3000 -d docs
```

## 课程目录

| 部分 | 章节 | 主题 | 示例 |
|---|---|---|---|
| 0 | [前言](docs/Preface.md) | 学习承诺、边界与路线 | - |
| 1 | [第一章 初识 Pi Agent](docs/chapter1/第一章%20初识%20Pi%20Agent.md) | terminal coding harness 的边界 | - |
| 1 | [第二章 Coding Agent 发展脉络](docs/chapter2/第二章%20Coding%20Agent%20发展脉络.md) | 从 Chat CLI 到 Agent Harness | - |
| 1 | [第三章 Pi 生态与安装配置](docs/chapter3/第三章%20Pi%20生态与安装配置.md) | CLI、provider、model、settings | - |
| 2 | [第四章 第一个 Pi Session](docs/chapter4/第四章%20第一个%20Pi%20Session.md) | 交互、print mode、命名与恢复 | `code/chapter2-first-session/` |
| 2 | [第五章 Agent Loop](docs/chapter5/第五章%20Agent%20Loop.md) | message、tool call、observation | - |
| 2 | [第六章 Context 工程](docs/chapter6/第六章%20Context%20工程.md) | AGENTS.md、skills、compaction | `code/chapter4-project-context/` |
| 2 | [第七章 Session Tree](docs/chapter7/第七章%20Session%20Tree.md) | JSONL、branch、fork、label | `code/chapter5-session-inspector/` |
| 3 | [第八章 Tools 与安全边界](docs/chapter8/第八章%20Tools%20与安全边界.md) | 内置工具、权限、危险操作拦截 | `code/chapter6-tool-safety/` |
| 3 | [第九章 Extensions 实战](docs/chapter9/第九章%20Extensions%20实战.md) | event、command、custom tool | `code/chapter7-extension-basics/` |
| 3 | [第十章 Skills 与 Prompt Templates](docs/chapter10/第十章%20Skills%20与%20Prompt%20Templates.md) | 按需加载的工作流知识 | `code/chapter8-skill-package/` |
| 3 | [第十一章 Pi Packages](docs/chapter11/第十一章%20Pi%20Packages.md) | 团队分发、版本固定、安全审查 | `code/chapter8-skill-package/` |
| 4 | [第十二章 SDK 实战](docs/chapter12/第十二章%20SDK%20实战.md) | Node.js 中嵌入 AgentSession | `code/chapter10-programmatic-usage/` |
| 4 | [第十三章 JSON 与 RPC 模式](docs/chapter13/第十三章%20JSON%20与%20RPC%20模式.md) | event stream、RPC、外部集成 | `code/chapter10-programmatic-usage/` |
| 4 | [第十四章 调试测试与可观测性](docs/chapter14/第十四章%20调试测试与可观测性.md) | 事件、日志、验证、安全审计 | `scripts/verify-docs.mjs` |
| 5 | [第十五章 综合案例 Repo Workflow Agent](docs/chapter15/第十五章%20综合案例%20Repo%20Workflow%20Agent.md) | review、release、report workflow | `community-projects/` |
| 5 | [第十六章 毕业设计](docs/chapter16/第十六章%20毕业设计.md) | 团队级 Pi Workflow Agent | `community-projects/` |

## 示例运行

检查文档内部链接和课程结构：

```bash
node scripts/verify-docs.mjs
```

解析 session JSONL：

```bash
node code/chapter5-session-inspector/inspect-session.mjs code/chapter5-session-inspector/sample-session.jsonl
```

运行 JSON event stream 客户端示例需要本机已安装并认证 Pi：

```bash
node code/chapter10-programmatic-usage/json-events.mjs "List files"
```

## 贡献

欢迎提交 typo 修复、章节改进、可运行示例、extra chapters 和 capstone 项目。提交前请先运行：

```bash
node scripts/verify-docs.mjs
```

更多规则见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## License

MIT
