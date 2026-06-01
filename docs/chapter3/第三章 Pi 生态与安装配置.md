# 第三章 Pi 生态与安装配置：CLI、Providers、Models 与 Settings

本章把 Pi 跑起来，并解释运行时最容易混淆的几个概念：CLI、provider、model、thinking level、settings、session directory 和 resource discovery。

如果第一章解决“Pi 是什么”，第二章解决“Pi 为什么出现”，本章解决“Pi 如何进入你的开发环境”。

## 3.1 本章目标与最终产物

完成本章后，你应该能：

- 安装或升级 Pi CLI。
- 选择认证方式：`/login` 或 API key。
- 区分 provider、model 和 thinking level。
- 理解全局 settings 与项目 settings 的覆盖关系。
- 写出一个最小 `.pi/settings.json`。
- 完成一次本地验收：`pi --version`、`pi -p`、`/session`。

本章最终产物是一个可以启动 Pi 的本地环境，以及一份不含 secret 的项目级 settings 草案。

## 3.2 安装 Pi CLI

官方 npm 安装方式：

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

`--ignore-scripts` 会跳过 dependency lifecycle scripts。Pi 正常 npm 安装不依赖 install scripts，这个选项降低供应链风险。

macOS 或 Linux 也可以使用 installer：

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

卸载 npm 安装的 Pi：

```bash
npm uninstall -g @earendil-works/pi-coding-agent
```

验收：

```bash
pi --version
```

本教程写作时，npm latest 查询到的 `@earendil-works/pi-coding-agent` 版本为 `0.78.0`。如果你看到更新版本，以本机版本和官方 latest docs 为准。

## 3.3 认证方式

Pi 支持两类常见认证路径。

### 3.3.1 Subscription provider login

启动 Pi：

```bash
pi
```

进入 TUI 后运行：

```text
/login
```

这种方式适合使用 Pi 支持的订阅型 provider。

### 3.3.2 API key

也可以在 shell 中设置 provider key：

```bash
export ANTHROPIC_API_KEY="your-key"
export OPENAI_API_KEY="your-key"
export GOOGLE_GENERATIVE_AI_API_KEY="your-key"
```

不要把真实 key 写进：

- `README.md`
- `.pi/settings.json`
- `.env.example`
- session 分享文件
- issue / PR 评论

本仓库只提供 `.env.example`。

## 3.4 Provider、Model 与 Thinking Level

| 概念 | 例子 | 责任 |
|---|---|---|
| Provider | `anthropic`、`openai`、`google` | 认证、API transport、请求格式 |
| Model | provider 下的具体模型 ID | 上下文窗口、输出能力、工具能力、成本 |
| Thinking level | `off`、`minimal`、`low`、`medium`、`high`、`xhigh` | 推理预算或 reasoning 配置 |

一个 provider 可以有多个 model；同一个任务在不同 model 上的工具调用质量、速度和成本可能不同。

选择模型时不要只看 benchmark。Coding agent 更关心：

- 工具调用是否稳定。
- 长上下文是否可靠。
- 失败时错误是否清晰。
- 成本和延迟是否适合当前 workflow。
- 是否支持你需要的 reasoning 或多模态能力。

## 3.5 Settings 文件

Pi 使用 JSON settings 文件，项目 settings 覆盖全局 settings。

| Location | Scope |
|---|---|
| `~/.pi/agent/settings.json` | Global |
| `.pi/settings.json` | Project |

最小项目 settings 示例：

```json
{
  "defaultProvider": "anthropic",
  "defaultThinkingLevel": "medium",
  "sessionDir": ".pi/sessions",
  "compaction": {
    "enabled": true,
    "reserveTokens": 16384,
    "keepRecentTokens": 20000
  },
  "enableSkillCommands": true
}
```

注意：settings 适合放可共享配置，不适合放 secret。

## 3.6 Resource discovery

Pi 可以加载多种资源：

| Resource | 典型位置 | 作用 |
|---|---|---|
| Extensions | `.pi/extensions/`、`~/.pi/agent/extensions/` | runtime 事件、命令、工具、UI |
| Skills | `.pi/skills/`、`.agents/skills/`、`~/.pi/agent/skills/` | 按需加载的工作流能力 |
| Prompt templates | prompts 目录或 package 声明 | 可复用 prompt |
| Themes | themes 目录或 package 声明 | TUI 主题 |
| Packages | npm、git、本地路径 | 分发以上资源 |

项目级资源适合团队共享；全局资源适合个人习惯。

## 3.7 最小验收流程

在一个测试仓库中执行：

```bash
pi --version
```

然后运行一次 print mode：

```bash
pi --no-session -p "Say hello and list the current working directory name."
```

再启动交互模式：

```bash
pi
```

在 TUI 中执行：

```text
/session
```

预期结果：

- `pi --version` 输出版本号。
- `pi --no-session -p ...` 能得到一次性回答。
- `/session` 能显示当前 session 信息。
- 如果认证未完成，Pi 应给出 provider/auth 相关提示，而不是静默失败。

## 3.8 常见安装与配置问题

| 问题 | 可能原因 | 处理 |
|---|---|---|
| `pi: command not found` | npm global bin 不在 `PATH` | 查看 `npm bin -g` 或 node manager 配置 |
| provider auth 失败 | key 未导出或 `/login` 未完成 | 重新导出 key 或执行 `/login` |
| model 不可用 | model ID 不匹配或账号无权限 | 用官方 providers/models 文档核对 |
| settings 不生效 | 写到了错误位置 | 确认是 `~/.pi/agent/settings.json` 还是 `.pi/settings.json` |
| session 不想保存 | 默认持久化 | 使用 `--no-session` |
| 启动时不想联网 | 更新检查或 package 检查 | 使用 `--offline` 或 `PI_OFFLINE=1` |

## 3.9 本章小结

安装 Pi 不只是装一个 CLI。你需要理解 provider、model、thinking level、settings 和资源发现路径。后续章节会在这个基础上逐步使用 session、context、extension、skill 和 package。

## 习题

1. 在一个测试仓库中创建 `.pi/settings.json`，只包含 `sessionDir` 和 `compaction` 配置。
2. 用 `pi --no-session -p` 跑一次只读问题，并记录输出。
3. 列出你的全局资源和项目资源应该分别放哪些内容。

## 参考资料

- [Pi Quickstart](https://pi.dev/docs/latest/quickstart)
- [Using Pi](https://pi.dev/docs/latest/usage)
- [Providers](https://pi.dev/docs/latest/providers)
- [Settings](https://pi.dev/docs/latest/settings)
- [Custom models](https://pi.dev/docs/latest/models)
- [Custom providers](https://pi.dev/docs/latest/custom-provider)
