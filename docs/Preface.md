# 前言：怎样学习 Pi Agent

## 为什么需要这门教程

很多 coding agent 教程停留在 prompt、快捷键或工具清单。那些内容有用，但不足以回答更长期的问题：agent 为什么能持续推进一个工程任务？上下文什么时候会失真？工具调用为什么需要权限和审计？session 为什么要保存成树，而不是简单聊天记录？extension 和 skill 的边界在哪里？

Pi 适合作为这些问题的学习对象，因为它暴露了足够多的工程面：

- CLI 和 TUI 提供日常交互。
- `@earendil-works/pi-agent-core` 处理 agent runtime、tool calling 和状态。
- `@earendil-works/pi-ai` 抽象多 provider model API。
- `@earendil-works/pi-coding-agent` 把 session、extensions、skills、packages、settings 和 programmatic modes 组织起来。

## 学习承诺

这门教程不承诺把 Pi 的每个 UI 细节列完。它承诺帮助你建立一个可迁移的 mental model，并交付一组可以修改、运行、扩展的示例。

完成后，你应该能独立判断：

- 一个需求应该通过 prompt、skill、extension、package 还是外部 SDK 集成解决。
- 哪些操作必须有用户确认。
- 如何设计 session 和 context 策略，避免 agent 在长任务中失焦。
- 如何把 Pi 放进团队工程流程，而不是只作为个人命令行工具。

## 先决条件

建议你已经具备：

- Node.js 20+。
- 基本 TypeScript 经验。
- 基本 shell、Git、JSONL 概念。
- 至少一个可用 LLM provider 账号，或能使用 Pi 支持的 subscription provider。

安装 Pi：

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

认证方式：

```bash
pi
/login
```

或设置 provider API key，例如：

```bash
export ANTHROPIC_API_KEY="your-key"
```

## 推荐阅读方式

先按顺序读第一章到第七章，建立核心模型。之后可以分两条线推进：

- 想扩展 Pi：读第八章到第十一章。
- 想嵌入外部工具：读第十二章到第十四章。

最后用第十五章的综合案例和第十六章的毕业设计把知识合成一个真实 workflow。

## 版本说明

本文以 2026-06-01 可访问的 Pi latest docs 和 npm latest `@earendil-works/pi-coding-agent@0.78.0` 为依据。Pi 仍在演进，遇到 API 差异时以 [官方最新文档](https://pi.dev/docs/latest) 和本机安装包的 TypeScript definition 为准。
