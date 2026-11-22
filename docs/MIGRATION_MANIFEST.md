# Migration manifest

源有三类：①课程实验讲义 `tomato Protocol-转基因修订版最新2022-9-2.docx`（课程内部资料，只读引用）；②此前在本机做的一版对话式实验学习助手（技能配置文件与两个网页版应用）；③参考仓库 `MindTrace-Agent` 的文档范式（README / AGENTS / docs 分层）。

新项目没有继承任何源仓库的 `.git`；课程讲义不随仓库分发，只保留 EXIF 无关的 PDF 预览（`frontend/public/protocol/`）。

| 源 | 目标 | 处理 | 依赖与原因 |
|---|---|---|---|
| 课程 protocol 八个小节 | `frontend/src/data/tomato.ts`、`docs/COURSE_PROFILE.md` | 摘录并结构化，逐条标 `source` | 原文含表格与图文混排，需人工核对；冲突处单列，不自动修正 |
| protocol 第七部分加药表 | `MEDIA`、`STOCKS`、`dosing.ts` | 转成数值表 + 换算函数 | 原文只有体积，没有终浓度，需代码折算 |
| 对话版技能配置（SKILL.md 与课程档案） | 本仓库 `adapters/` + `data/` | 重写为可测试的前端契约 | 原技能运行在对话环境，不能直接搬进网页 |
| 前版单页网页应用 | `components/` 七个面板 | 重写 UI，保留信息架构（问答 / 配药 / 台账 / 沟通 / 原文） | 原应用由云端构建器生成，代码不可导出，故整面板重写 |
| 前版多人在线应用（账号、班级、教师端） | 无 | 不迁移进本仓库，仅在文档说明为另附形态 | 依赖云端平台与服务端，本仓库承诺离线可复现 |
| 课程作品说明（docx / pdf） | `submissions/`、`docs/report/` | 原样归档 | 提交材料，不再改动 |
| `MindTrace-Agent` 文档结构 | `README.md`、`AGENTS.md`、`docs/*` | 借用章节与语气，内容全部替换 | 只参考组织方式，未复制任何源文件 |

无直接复制的源代码文件。协议参数全部来自课程讲义原文，代码与文档为新写。
