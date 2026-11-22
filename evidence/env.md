# 环境核对记录（Checkpoint：开发环境）

采集时间：2026-11-22 16:26（UTC+8）　采集方式：本机 PowerShell 直接读取，非人工填写

| 项目 | 实际值 |
| --- | --- |
| 操作系统 | Microsoft Windows 11 家庭版 中文版，版本 10.0.26200，64 位 |
| CPU | Intel(R) Core(TM) Ultra 7 258V |
| 内存 | 31.5 GB |
| 显卡 | Intel(R) Arc(TM) 140V GPU (16GB) |
| Node.js | v22.23.2 |
| npm | 10.9.8 |
| Git | 2.56.1.windows.1（安装位置 D:\Program Files\Git） |
| 前端框架 | Vue 3.5 + Vite 7.3.8 + TypeScript 5.x |
| 数据与状态 | 单文件 `frontend/src/data/tomato.ts` + 浏览器 localStorage；无后端、无数据库、无密钥 |
| 启动命令 | `cd frontend && npm install && npm run dev` → http://localhost:5173 |
| 构建命令 | `npm run build` → `dist/`，31 modules，index.js 106.78 kB（gzip 41.59 kB），CSS 3.54 kB |
| 测试命令 | `npm test` → vitest 13 passed，用时 1.01 s |

## 原始输出

`evidence/logs/build-output.txt`（本次构建实录）：

```
> tomatolab-agent@0.1.0 build
> vue-tsc --noEmit && vite build

vite v7.3.8 building client environment for production...
transforming...
✓ 31 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.44 kB │ gzip:  0.33 kB
dist/assets/index-bYEJw7a4.css    3.54 kB │ gzip:  1.27 kB
dist/assets/index-BFG4HSog.js   106.78 kB │ gzip: 41.59 kB
✓ built in 639ms
```

`evidence/logs/test-output.txt`（本次测试实录）：

```
> tomatolab-agent@0.1.0 test
> vitest run --run

 RUN  v3.2.7 D:/学习智能体/TomatoLab-Agent/frontend

 ✓ src/adapters/adapters.test.ts (13 tests) 8ms

 Test Files  1 passed (1)
      Tests  13 passed (13)
   Duration  1.01s
```

## 说明

- 构建与测试均为**本次重新执行**的真实输出，命令与文件一一对应，可在任意装有 Node 22 的机器上复现。
- `dist/` 与 `node_modules/` 不入库（见 `.gitignore`），因此仓库体积小、不携带二进制产物；教师侧只需 `npm install && npm run dev` 即可看到同样界面。
- 运行不需要任何模型 API Key 或数据库账号，`.env.example` 只保留空字段；这也是本项目“无密钥、可离线复核”的设计前提。
