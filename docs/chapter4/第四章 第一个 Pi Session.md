# 第四章 第一个 Pi Session：交互、命名与恢复

第三章已经完成安装配置。本章专注 Pi 的第一个可恢复 session：如何启动、提问、命名、查看 session 信息、恢复、选择历史 session，以及什么时候使用 ephemeral mode。

## 4.1 本章目标与最终产物

完成本章后，你应该能：

- 启动 interactive mode。
- 用 print mode 执行一次只读任务。
- 给 session 命名并查看 session 文件信息。
- 使用 `pi -c` 和 `pi -r` 恢复历史 session。
- 判断什么时候使用 `--no-session`。

本章最终产物是一个命名 session，以及一份 first-run checklist。

## 4.2 三种启动方式

| 模式 | 命令 | 适合 |
|---|---|---|
| Interactive mode | `pi` | 长任务、持续协作、需要 TUI |
| Print mode | `pi -p "..."` | 一次性任务、shell pipeline |
| Ephemeral mode | `pi --no-session` | 临时实验、不保存历史 |

## 4.3 第一个 interactive session

进入项目目录：

```bash
cd /path/to/project
pi
```

输入第一个只读 prompt：

```text
List the files in this project and explain what each top-level directory is for.
```

这个 prompt 的目标是让 Pi 先观察项目，而不是马上修改文件。

## 4.4 命名与查看 session

命名 session：

```text
/name Explore how-to-Pi
```

查看 session 信息：

```text
/session
```

你应该能看到：

- session file 或 session id。
- 当前 cwd。
- message count。
- token/cost 信息。

命名的好处是后续 `/resume` 或 `pi -r` 更容易找到。

## 4.5 恢复 session

恢复最近 session：

```bash
pi -c
```

打开 session picker：

```bash
pi -r
```

使用特定 session：

```bash
pi --session <path-or-id>
```

从已有 session fork：

```bash
pi --fork <path-or-id>
```

## 4.6 Print mode

`-p` 适合一次性任务：

```bash
pi -p "Summarize this repository in 5 bullet points."
```

给一次性任务命名：

```bash
pi --name "Repository summary" -p "Summarize this repository."
```

如果不想保存 session：

```bash
pi --no-session -p "Explain what this repository teaches."
```

## 4.7 本章示例

示例文件：

```bash
code/chapter2-first-session/README.md
```

它包含可复制的 first-run checklist。

建议执行顺序：

```bash
pi --version
pi --no-session -p "Say hello and print the current working directory name."
pi
```

然后在 TUI 内执行：

```text
/name First how-to-Pi session
/session
```

## 4.8 预期结果

| 操作 | 预期 |
|---|---|
| `pi --version` | 输出 Pi 版本号 |
| `pi --no-session -p ...` | 返回一次性回答，不保存 session |
| `/name ...` | 当前 session 有可读名称 |
| `/session` | 显示 session id/file/cwd 等信息 |
| `pi -c` | 恢复最近 session |
| `pi -r` | 打开 session picker |

## 4.9 常见问题

| 问题 | 处理方式 |
|---|---|
| `pi` command not found | 回到第三章检查安装和 `PATH` |
| 认证后仍然不可用 | 确认 provider、model 和账号权限 |
| session 太多找不到 | 用 `/name` 命名关键 session，用 `pi -r` 搜索 |
| 不想保存实验记录 | 使用 `--no-session` |
| print mode 输出不完整 | 检查 provider 错误、stderr 和退出码 |

## 4.10 本章小结

第一个 session 的重点不是让 Pi 完成复杂任务，而是确认交互、命名、查看、恢复和 ephemeral mode 都可用。后面所有实践都会建立在这个闭环上。

## 习题

1. 创建一个命名 session，并用 `/session` 找到 session file 路径。
2. 用 `pi -p` 对当前仓库做一次只读总结。
3. 用 `pi --no-session` 做一个临时实验，确认不会保存到 session 列表。
4. 用 `pi -r` 找到刚才命名的 session。

## 参考资料

- [Pi Quickstart](https://pi.dev/docs/latest/quickstart)
- [Using Pi](https://pi.dev/docs/latest/usage)
- [Sessions](https://pi.dev/docs/latest/sessions)
