# Contributing

感谢你改进「Pi Agent 核心原理和实践」。这个项目优先接受能让学习路径更清晰、更可运行、更贴近 Pi 当前实现的贡献。

## 可以贡献什么

- Typo、错别字、链接修复。
- 对章节解释、图表、示例输出的改进。
- 新增 `extra-chapters/` 文章，例如团队配置、安全策略、CI 集成。
- 新增 `code/` 示例，但必须和某个章节或 extra chapter 对齐。
- 在 `community-projects/` 下提交 capstone 项目。

## 内容规则

- 正文默认中文；代码、命令、注释、文件名、提交信息使用 English。
- 不提交真实 API key、token、session 文件或私有仓库路径。
- 引用 Pi API 时优先链接到 [Pi latest docs](https://pi.dev/docs/latest) 或 [earendil-works/pi](https://github.com/earendil-works/pi)。
- 示例必须说明运行前提、运行命令和预期输出。

## 提交前检查

```bash
node scripts/verify-docs.mjs
```

如果示例依赖本机 Pi、模型账号或网络，请在 README 或章节中明确说明，不要把外部依赖伪装成本地纯测试。

## Capstone 提交格式

在 `community-projects/` 下创建目录：

```text
community-projects/
└── github-user-project-name/
    ├── README.md
    ├── .env.example
    ├── scripts/
    ├── prompts/
    └── outputs/
```

README 需要包含：

- 项目目标。
- Pi 使用方式。
- 安全边界。
- 示例输入和输出。
- 已知限制。
