# Architecture

Vue 3 + Vite 单页项目，无后端。`App.vue` 只负责左侧导航、主舞台与右栏；`components/` 放七个业务面板；`adapters/` 放可替换的领域契约；`data/tomato.ts` 放从课程 protocol 整理出的结构化数据；`public/protocol/` 放原文 PDF。端口固定 5173，`strictPort: true`。

## 数据流

```
data/tomato.ts  ──→  adapters/*  ──→  components/*  ──→  App.vue
（事实源）           （规则与契约）      （界面与交互）       （导航与布局）
```

面板只调 adapter 的公开函数，不自己算浓度、不自己拼出处标注。换成另一门课（例如水稻）时，替换 `data/` 与 `docs/COURSE_PROFILE.md` 即可，adapter 签名不动。

## 五个 adapter 契约

| 文件 | 入口函数 | 输入 | 输出 |
|---|---|---|---|
| `qa.ts` | `ask(q)` | 自然语言问题 | `{ kind, text, source, tag, matched, mode }` |
| `dosing.ts` | `doseOf(medium, liters)` / `reverseOf(...)` | 培养基代号 + 体积 | `{ rows[], base, liters }` |
| `ledger.ts` | `create / move / patch / list / exportJson` | 记录与目标阶段 | 台账记录，非法操作抛错 |
| `messaging.ts` | `compose(input)` | 课程、实验、步骤、问题、已尝试、期望 | `{ brief, formal }` |
| `review.ts` | `review(text)` | 报告段落或记录 | `{ items[], warnings[], covered }` |

`qa.ts` 的三档标注：`资料`（能定位到协议小节）、`待核对`（协议内部不一致或留白，指向教师）、`未覆盖`（协议没有这一条，直接说没有）。检索是关键词匹配，不调用任何外部模型，因此离线可复现，也不会编造浓度与时长。

`review.ts` 只做要素覆盖与表述提醒，不打分、不评级，避免工具替代教师判断。

## 双形态说明

1. **仓库内单机版**（本仓库）：`npm run dev` 起本地服务，台账存浏览器 localStorage。适合个人使用与代码评审，可离线复现。
2. **线上多人版**（另附，不进本仓库）：此前用云端应用构建器部署过一版，含账号、班级邀请码、云端台账与教师端。它依赖平台托管，代码不由本仓库维护，因此不声称「仓库可一键复现多人在线」。评审以本仓库单机版为准。

## 取舍记录

- 不接线上大模型：课程环境不保证网络与密钥，规则检索能让每条答案都带出处、可离线复核。
- 不做扫码登录：需要开放平台资质，课程周期内无法落地。
- 不在后端存原始数据表：工具只记录进度与问题，不替代实验记录本。
- 台账只存本机：单机版不承诺多人同步，需要共享时导出 JSON 交给教师。
