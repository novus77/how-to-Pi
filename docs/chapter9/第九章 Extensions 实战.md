# 第九章 Extensions 实战：事件、命令和自定义工具

Prompt 适合一次性指令，skill 适合按需加载知识，但它们不能直接订阅 Pi runtime 事件、注册本机工具或拦截危险动作。Extension 是 Pi 的代码级扩展点。

本章会写一个最小但完整的 extension：启动时提示、注册 slash command、注册 custom tool，并监听 tool execution 事件。

## 9.1 本章目标与最终产物

完成本章后，你应该能：

- 解释 extension 与 skill 的边界。
- 使用 `pi -e ./path.ts` 临时加载 extension。
- 注册一个 slash command。
- 注册一个 custom tool，让模型主动调用。
- 监听 runtime event。
- 识别 extension 的安全风险。

本章最终产物：

```bash
code/chapter7-extension-basics/index.ts
```

## 9.2 Extension 适合解决什么问题

| 需求 | 是否适合 extension | 原因 |
|---|---|---|
| 增加 `/deploy` 这样的命令 | 适合 | 需要运行本机逻辑 |
| 给模型一个可调用工具 | 适合 | 需要 `pi.registerTool()` |
| 拦截危险 shell 命令 | 适合 | 需要监听 `tool_call` |
| 编写 code review SOP | 不优先 | skill 更合适 |
| 临时要求 agent 更谨慎 | 不优先 | prompt 更合适 |
| 分发给团队 | extension 本身不够 | 应打包成 Pi package |

判断原则：**需要 runtime hook 或本机代码，就考虑 extension。只是知识和流程，就优先 skill。**

## 9.3 加载位置

| Location | Scope | 适用场景 |
|---|---|---|
| `~/.pi/agent/extensions/` | global | 个人长期使用 |
| `.pi/extensions/` | project | 团队项目共享 |
| `pi -e ./path.ts` | current run only | 快速实验 |

本章推荐临时加载：

```bash
pi -e ./code/chapter7-extension-basics/index.ts
```

## 9.4 最小 extension

```typescript
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerCommand("hello", {
    description: "Say hello",
    handler: async (args, ctx) => {
      ctx.ui.notify(`Hello ${args || "world"}!`, "info");
    },
  });
}
```

Pi 会加载 default export，并把 `ExtensionAPI` 传入。你通过 `pi` 注册能力，通过 handler 中的 `ctx` 访问当前 session、UI 和 runtime 上下文。

## 9.5 Extension API surfaces

| Surface | API | 用途 |
|---|---|---|
| Event | `pi.on(event, handler)` | 监听 session、agent、tool、input 生命周期 |
| Tool | `pi.registerTool(definition)` | 让 LLM 调用新能力 |
| Command | `pi.registerCommand(name, options)` | 增加 slash command |
| Session | `pi.appendEntry()`、`pi.setSessionName()` | 写入自定义 session 状态 |
| Runtime | `ctx.compact()`、`ctx.reload()`、`ctx.shutdown()` | 控制当前 runtime |
| UI | `ctx.ui.notify()`、`ctx.ui.confirm()` | 和用户交互 |
| Provider | `pi.registerProvider()` | 注册 custom provider |

不要一开始就使用所有 surface。高质量 extension 通常只解决一个明确问题。

## 9.6 本章示例拆解

文件：

```bash
code/chapter7-extension-basics/index.ts
```

它包含四个能力。

### 9.6.1 启动提示

```typescript
pi.on("session_start", async (_event, ctx) => {
  ctx.ui.notify("how-to-Pi course extension loaded.", "info");
});
```

用途：确认 extension 已加载。

### 9.6.2 Tool failure notification

```typescript
pi.on("tool_execution_end", async (event, ctx) => {
  if (event.isError) {
    ctx.ui.notify(`Tool failed: ${event.toolName}`, "warn");
  }
});
```

用途：把 tool failure 变成可见提示。

### 9.6.3 Slash command

```typescript
pi.registerCommand("course-status", {
  description: "Show how-to-Pi extension status",
  handler: async (_args, ctx) => {
    const sessionName = pi.getSessionName() || "unnamed";
    ctx.ui.notify(`Course extension active. Session: ${sessionName}`, "info");
  },
});
```

运行：

```text
/course-status
```

### 9.6.4 Custom tool

```typescript
pi.registerTool({
  name: "course_echo",
  label: "Course Echo",
  description: "Echo a short message for extension learning exercises.",
  parameters: Type.Object({
    message: Type.String({ description: "Message to echo" }),
  }),
  async execute(_toolCallId, params) {
    return {
      content: [{ type: "text", text: `Echo: ${params.message}` }],
      details: { length: params.message.length },
    };
  },
});
```

让模型调用：

```text
Use the course_echo tool to echo "hello pi".
```

`content` 会进入模型上下文；`details` 更适合 UI、调试或结构化状态。

## 9.7 运行与预期输出

运行：

```bash
pi -e ./code/chapter7-extension-basics/index.ts
```

预期：

1. Pi 启动后出现 extension loaded 通知。
2. `/course-status` 能显示当前 session 名。
3. 要求模型使用 `course_echo` 时，模型应能调用该工具。
4. 如果有 tool failure，会出现 warning notification。

如果没有看到 custom tool 被调用，不一定是 extension 没加载。可能是 prompt 不够明确，或模型选择用自然语言回答。可以直接要求：

```text
Call the course_echo tool with message "hello pi".
```

## 9.8 安全边界

Extension 运行在本机权限下。它能读取文件、执行命令、访问网络，风险高于 skill。

安装或共享 extension 前检查：

| 检查项 | 原因 |
|---|---|
| 是否执行 shell command | 可能改变系统状态 |
| 是否上传数据 | 可能泄露代码或 secret |
| 是否读取 `.env` 或 keychain | 高敏感操作 |
| 是否注册同名工具覆盖内置工具 | 可能改变 agent 行为 |
| 是否在无 UI 模式下默认允许危险操作 | CI 中尤其危险 |

## 9.9 常见问题

| 问题 | 可能原因 | 处理 |
|---|---|---|
| extension 没加载 | 路径错误或 TypeScript import 错误 | 用 `pi -e ./path.ts` 明确加载 |
| command 不出现 | 注册名冲突或加载失败 | 查看启动日志，同名 command 会有 suffix |
| custom tool 不被模型调用 | prompt 不明确或 tool description 弱 | 改 description 或直接要求调用 |
| `typebox` 找不到 | 依赖不在 Pi extension 环境可解析范围 | 安装依赖或使用官方示例同款 import |
| headless 模式 UI 调用失败 | 无 TUI | 检查 `ctx.hasUI` |

## 9.10 本章小结

Extension 是 Pi 的 runtime 编程接口。它让你把 Pi 从“可配置”推进到“可编程”：注册 command、tool、event hook，甚至定制 UI 和 provider。它也带来本机权限风险，因此团队共享时应通过 package、版本固定和代码审查管理。

## 习题

1. 给 `/course-status` 增加当前 `ctx.cwd` 输出。
2. 给 `course_echo` 增加最大长度限制，超过 100 个字符时返回错误。
3. 在 `message_end` 时统计 assistant response 数量，并用 `ctx.ui.notify()` 显示。
4. 参考第八章，把 `rm -rf` 拦截加入本章 extension。

## 参考资料

- [Extensions](https://pi.dev/docs/latest/extensions)
- [TUI Components](https://pi.dev/docs/latest/tui)
- [Pi Packages](https://pi.dev/docs/latest/packages)
