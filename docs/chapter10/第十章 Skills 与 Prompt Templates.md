# 第十章 Skills 与 Prompt Templates：按需加载的工作流知识

不是所有复用能力都应该写成 extension。很多能力只是工作流、检查清单、参考文档和辅助脚本。Skill 解决的是“按需加载知识和流程”，prompt template 解决的是“复用一段固定 prompt”。

## 10.1 本章目标与最终产物

完成本章后，你应该能：

- 区分 skill、prompt template、extension 和 package。
- 编写一个 `SKILL.md`。
- 解释 progressive disclosure。
- 临时加载一个 skill package。
- 判断什么时候把 prompt template 升级为 skill。

本章最终产物：

```bash
code/chapter8-skill-package/
```

## 10.2 Skill 的边界

Skill 是一个目录，至少包含 `SKILL.md`：

```text
my-skill/
├── SKILL.md
├── scripts/
├── references/
└── assets/
```

`SKILL.md` 的 frontmatter：

```markdown
---
name: repo-review
description: Review repository changes and produce risk-focused findings.
---
```

Pi 启动时扫描 skill 名称和 description；当任务匹配时，agent 再读取完整 `SKILL.md`。这叫 progressive disclosure：只有必要的能力细节才进入上下文。

## 10.3 Skill vs Prompt Template vs Extension

| 需求 | Prompt template | Skill | Extension |
|---|---|---|---|
| 复用一段短 prompt | 适合 | 也可以但偏重 | 不适合 |
| 固定 SOP 和检查清单 | 不够 | 适合 | 不适合 |
| 附带脚本和参考资料 | 不适合 | 适合 | 可配合 |
| 注册可调用 tool | 不适合 | 不适合 | 适合 |
| 拦截 tool call | 不适合 | 不适合 | 适合 |
| 修改 TUI | 不适合 | 不适合 | 适合 |
| 跨 harness 复用 | 一般 | 适合 | 通常不适合 |

## 10.4 示例 skill：repo-review

示例目录：

```bash
code/chapter8-skill-package/skills/repo-review/SKILL.md
```

它定义了 review workflow：

- Inspect diff or file set.
- Prioritize correctness, safety, data loss, security, missing verification.
- Report findings first.
- Include file paths and line references.
- Keep summary brief.

这个 skill 适合第十五章综合案例复用。

## 10.5 临时加载 skill package

示例 package：

```bash
code/chapter8-skill-package/package.json
```

内容：

```json
{
  "name": "how-to-pi-repo-review-skill",
  "version": "0.1.0",
  "private": true,
  "pi": {
    "skills": [
      "skills/repo-review"
    ]
  }
}
```

临时加载：

```bash
pi -e ./code/chapter8-skill-package
```

然后输入：

```text
Use the repo-review skill to review the current repository changes.
```

## 10.6 Prompt template 适合什么

Prompt template 更轻量，适合把重复 prompt 做成 slash command 风格的文本展开。

适合 prompt template：

```text
Summarize this diff as release notes with sections: Added, Fixed, Changed, Breaking.
```

适合 skill：

```text
A full release review workflow with prerequisites, checks, scripts, risk categories, and output format.
```

判断标准：如果只是一段文本，用 prompt template；如果需要流程、脚本、参考资料和验收标准，用 skill。

## 10.7 Skill 写作质量标准

| 项目 | 要求 |
|---|---|
| `name` | 短、稳定、可命令化 |
| `description` | 说明何时使用，不要泛化 |
| Workflow | 步骤清晰，可执行 |
| Output format | 明确最终输出 |
| References | 大资料放 `references/`，不要全塞进 `SKILL.md` |
| Scripts | 可运行脚本放 `scripts/` |
| Safety | 写清边界，但 runtime guard 交给 extension |

## 10.8 常见陷阱

| 陷阱 | 修正 |
|---|---|
| Skill 描述太泛 | description 要写清触发场景 |
| Skill 里塞大量无关文档 | 拆到 references，按需读取 |
| 把安全策略写成 skill | 安全拦截应在 extension/tool 层 |
| Skill 输出格式不明确 | 写具体模板 |
| Skill 和 prompt template 混用 | 短文本用 prompt，流程用 skill |

## 10.9 本章小结

Skill 是知识和流程复用，prompt template 是短 prompt 复用，extension 是 runtime 行为扩展，package 是分发单元。选对层级比写更多内容更重要。

## 习题

1. 为你的团队 code review 流程写一个 skill。
2. 把一个常用 prompt template 改写成 skill，并比较差异。
3. 给 `repo-review` skill 增加“Verification gaps”输出段。
4. 设计一个 release-notes skill 的 frontmatter 和目录结构。

## 参考资料

- [Skills](https://pi.dev/docs/latest/skills)
- [Prompt templates](https://pi.dev/docs/latest/prompt-templates)
- [Pi Packages](https://pi.dev/docs/latest/packages)
