# TomatoLab-Agent

**学生入口（Local）**：启动后打开 `http://localhost:5173/`。**演示入口（Hosted）**：未独立部署。**GitHub URL**：暂未公开（本地仓库交付）。**API 接口**：无独立后端；领域契约位于 `frontend/src/adapters/`。

番茄遗传转化实验的自主学习支持工具。以课程 protocol 为唯一事实来源，覆盖资料问答、配药计算、进度台账、师生沟通、报告自查五个功能，并把协议内部六处不一致单独标注，不替使用者改数。

## 三分钟启动

```bash
npm --prefix frontend install
npm --prefix frontend run dev -- --host 127.0.0.1 --port 5173
```

浏览器打开 `http://localhost:5173/`；另一个终端运行 `npm --prefix frontend run build` 与 `npm --prefix frontend test`。端口占用时 Vite `strictPort` 会直接报错，换端口需改 `vite.config.ts`。

## 当前状态

- 默认页面：工作台（四道闸门 + 七环节日程 + 待核对提醒）。
- 已实现：协议条目检索问答、加药表正反向换算、六阶段台账（本机保存与 JSON 导出）、两版师生沟通话术、报告要素自查、原文摘录与出处页。
- DEMO / SAMPLE：全部数据为课程 protocol 摘录与本地规则计算，不调用任何线上大模型，台账仅存于本机 `localStorage`。
- 待接入：真实大模型问答、多人在线台账与教师端。这两项已在课程作品说明里作为后续计划列出，本仓库不含服务端。

## 学生任务

从 `frontend/src/adapters/qa.ts` 与 `frontend/src/data/tomato.ts` 开始：补一条协议问答条目，必须带 `source`（协议小节）与 `tag`（资料 / 待核对 / 未覆盖）。详见 `docs/STUDENT_START_HERE.md` 与 `docs/ROADMAP_7_DAYS.md`。

## 目录

```
frontend/           Vue 3 + Vite 单页应用
  src/adapters/     领域契约（可单独替换，界面不感知实现）
  src/components/   七个功能面板
  src/data/         课程 protocol 摘录数据（tomato.ts）
  public/protocol/  课程原文 PDF（课程内部资料，不对外分发）
docs/               架构、课程档案、数据边界、待核对、启动、路线图、迁移、许可
submissions/        课程作品说明（docx / pdf）与界面截图
```
