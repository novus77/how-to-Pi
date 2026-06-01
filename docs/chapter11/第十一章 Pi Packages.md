# 第十一章 Pi Packages：把能力分发给团队

当 extension、skill、prompt template 只给自己用，本地目录足够。当能力要给团队复用时，就需要版本、来源、安装方式、审查流程和回滚策略。Pi package 是这个分发层。

## 11.1 本章目标与最终产物

完成本章后，你应该能：

- 解释 Pi package 解决的问题。
- 设计一个包含 extension、skill、prompt 的 package。
- 临时加载本地 package。
- 区分 npm、git、本地路径三种来源。
- 写出 package 安全审查 checklist。

本章最终产物是一个团队可安装的 Pi package 设计草案。

## 11.2 Package 解决什么问题

Package 可以包含：

- Extensions。
- Skills。
- Prompt templates。
- Themes。

它解决的是分发和治理问题：

| 问题 | 没有 package | 使用 package |
|---|---|---|
| 团队复用 | 手动复制文件 | 统一安装来源 |
| 版本 | 文件漂移 | tag 或 npm version |
| 审查 | 不知道加载了什么 | review package source |
| 回滚 | 手动恢复 | 切回旧版本/ref |
| 项目配置 | 每人不同 | `.pi/settings.json` 声明 |

## 11.3 安装方式

```bash
pi install npm:@org/pi-workflow@1.0.0
pi install git:github.com/org/pi-workflow@v1
pi install ./local-package
```

临时试用：

```bash
pi -e ./code/chapter8-skill-package
```

项目级安装可以写入 `.pi/settings.json`，让团队成员启动 Pi 时自动加载缺失 package。

## 11.4 Package 结构

```text
pi-team-workflow/
├── package.json
├── extensions/
│   └── safety.ts
├── skills/
│   └── repo-review/
│       └── SKILL.md
├── prompts/
│   └── release-note.md
└── README.md
```

`package.json` 中声明 Pi resources：

```json
{
  "name": "@org/pi-team-workflow",
  "version": "1.0.0",
  "pi": {
    "extensions": ["extensions/*.ts"],
    "skills": ["skills/*"],
    "prompts": ["prompts/*.md"]
  }
}
```

## 11.5 本仓库示例

示例：

```bash
code/chapter8-skill-package/
```

它只包含 skill，是最小 package：

```text
code/chapter8-skill-package/
├── package.json
└── skills/
    └── repo-review/
        └── SKILL.md
```

加载：

```bash
pi -e ./code/chapter8-skill-package
```

之后可以要求：

```text
Use the repo-review skill to review current changes.
```

## 11.6 团队 settings 示例

项目级 `.pi/settings.json` 可以声明 package：

```json
{
  "packages": [
    "git:github.com/org/pi-team-workflow@v1.0.0"
  ]
}
```

建议：

- git package 使用 tag 或 commit。
- npm package 使用明确 version。
- 不使用 floating branch 作为团队默认配置。

## 11.7 安全审查

Package 的安全风险高于普通文档，因为它可能包含 extension，而 extension 运行在本机权限下。

安装前检查：

| 检查项 | 原因 |
|---|---|
| 是否包含 lifecycle scripts | 避免安装时执行未知代码 |
| extension 是否访问网络 | 可能传输敏感数据 |
| 是否执行 shell 命令 | 可能改变本机状态 |
| package 来源是否 pin 版本 | 避免隐式升级 |
| README 是否说明权限 | 让使用者知道风险 |
| 是否读取 secret 文件 | 防止泄露 `.env` 或 token |

## 11.8 团队分发策略

推荐顺序：

1. 本地路径试用。
2. Git tag 分发给小团队。
3. 稳定后发布 npm package。
4. 在项目 `.pi/settings.json` 中固定 package 来源。
5. 建立升级和回滚流程。

不要一开始就追求公开发布。先让 package 在一个真实团队 workflow 中跑通。

## 11.9 Package README 模板

```markdown
# @org/pi-team-workflow

## Resources

- extensions/safety.ts
- skills/repo-review
- prompts/release-note.md

## Permissions

This package registers local extensions. Review source before installing.

## Install

```bash
pi install git:github.com/org/pi-team-workflow@v1.0.0
```

## Uninstall

```bash
pi remove git:github.com/org/pi-team-workflow
```
```

## 11.10 常见问题

| 问题 | 建议 |
|---|---|
| skill 和 extension 怎么放一起 | 用 package 聚合，职责仍然分开 |
| 要不要自动更新 | 团队 package 应 pin version/ref |
| package 出问题怎么回滚 | 保留上一版 tag，settings 改回旧 ref |
| 能不能安装第三方 package | 可以，但必须 review source |
| package 是不是越大越好 | 不是，按 workflow 拆包更容易审查 |

## 11.11 本章小结

Pi package 是团队复用层。它不是为了把所有东西打包，而是为了让 extension、skill、prompt template 和 theme 有明确来源、版本和审查流程。第十五章会把 safety extension 和 repo-review skill 组合成 Repo Workflow Agent。

## 习题

1. 把第八章的 safety extension 和第十章的 repo-review skill 设计成同一个 package。
2. 写一个 package README，说明权限、安装和卸载方式。
3. 为团队 package 设计版本升级策略。
4. 设计一个回滚流程：新 package 出问题时如何恢复旧版本？

## 参考资料

- [Pi Packages](https://pi.dev/docs/latest/packages)
- [Settings](https://pi.dev/docs/latest/settings)
- [Extensions](https://pi.dev/docs/latest/extensions)
- [Skills](https://pi.dev/docs/latest/skills)
