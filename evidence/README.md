# 实验一 · 基线登记与首个 Demo 的可审阅证据

课题：TomatoLab-Agent —— 番茄遗传转化实验学习智能体
学生：赵钰源　学号 202505030133　班级 2025 级种子科学与工程 1 班　指导教师：张茂泉

## 一、四个检查点登记

| # | 检查点 | 本项目状态 | 证据位置 |
| --- | --- | --- | --- |
| 1 | GitHub 用户名 / 仓库 | 用户名 **Zhaooo815**；仓库 https://github.com/Zhaooo815/TomatoLab-Agent（public，main 分支） | 仓库首页、第二节 |
| 2 | 移动云状态 | **未开通 / 未使用**：本机未安装移动云客户端，开发、构建与演示全部在本机完成（Windows 11 + Node 22），不依赖云主机 | 本文第三节说明 |
| 3 | Demo 截图 | 已附 3 张真实运行截图 | `screenshots/01-home.png`、`02-qa.png`、`03-dose.png` |
| 4 | Commit | 首个提交 `6302e78811ca670a2fcc5fc8baf3bc85aac0f162`（2026-11-22） | 本文第二节、GitHub 提交页 |

## 二、Commit 与仓库

```
仓库：https://github.com/Zhaooo815/TomatoLab-Agent   （public）
分支：main
首个提交：6302e78811ca670a2fcc5fc8baf3bc85aac0f162
提交页：https://github.com/Zhaooo815/TomatoLab-Agent/commit/6302e78811ca670a2fcc5fc8baf3bc85aac0f162
```

首个提交含 46 个文件：`README.md`、`AGENTS.md`、`.env.example`、`.gitignore`、`docs/` 8 篇、`frontend/`（5 个 adapters + 7 个面板 + 13 条断言 + `data/tomato.ts` + 协议 PDF）、`submissions/`、`evidence/`（本登记表、环境记录、3 张截图、构建与测试原始输出）。
`node_modules/`、`dist/`、`.env*` 按 `.gitignore` 排除，仓库体积约 1.4 MB，克隆后 `npm install` 即可复现。

## 三、移动云状态说明（如实登记）

- 未开通移动云（ecloud）主机或云电脑，本机也没有对应的登录状态；
- 本项目的运行条件只需 Node 22 + 浏览器，`npm run dev` 在 5173 端口起服务，整个 Demo 在本地即可完整演示，因此没有使用云端主机；
- 若课程要求必须在移动云主机上跑一遍，请告知规格与登录方式，我按仓库里的 `docs/STUDENT_START_HERE.md` 迁移：装 Node 22 → 克隆仓库 → `npm install` → `npm run dev` → 截同一组画面即可（预计 15 分钟内完成）。

## 四、Demo 截图说明（可审阅）

| 文件 | 画面 | 看什么 |
| --- | --- | --- |
| `01-home.png` | 首页工作台，七个面板入口 | 单页、无登录、无后端；含“四道闸门”判据（D0 剪叶 / D+1 侵染 / D+3 倒板 / D+50 转接） |
| `02-qa.png` | 资料问答：问“侵染后到底 48 h 倒板还是第二天倒板？” | 返回“待核对”标签 + 协议出处“四、侵染 / 五、倒板” + 两处原文并列 + 命中关键词 |
| `03-dose.png` | 配药计算：A2（MS）· 3 L | 四种母液体积（ZT 6 mL、IAA 0.3 mL、Kan 3 mL、Timentin 3 mL）与折算终浓度，可手算复核 |

三张截图均来自本仓库 `frontend` 的实际运行界面（`npm run dev` 后浏览器实拍），未做数据美化。

## 五、教师侧复核步骤（约 2 分钟）

1. `git clone https://github.com/Zhaooo815/TomatoLab-Agent` → `cd TomatoLab-Agent/frontend && npm install`
2. `npm run build`：应输出 31 modules、index.js 106.78 kB（gzip 41.59 kB）
3. `npm test`：应输出 13 passed（约 1 s）
4. `npm run dev` → 打开 http://localhost:5173，对照 `02-qa.png`、`03-dose.png` 复核画面与数值
5. 配药手算校验：Kan 母液 100 mg/mL，A2 每升 1 mL，则 3 L 取 3 mL，终浓度 100 mg/L

## 六、与课程设计报告的关系

- 报告 2.3 节“技术选型与运行环境”、附录 A 表 7 第 1—2 行，已同步为本节的仓库 URL 与 Commit SHA；
- 报告 3.4、第 4 章原写“仓库未推送远程”，已改为“已推送 GitHub、无 PR 与 CI”，与实际一致。
