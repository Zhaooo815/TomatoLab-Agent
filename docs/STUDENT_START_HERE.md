# Student start here

1. 读根目录 `README.md`，按三分钟启动跑起 `http://localhost:5173/`。
2. 打开 `frontend/src/data/tomato.ts`，先看清 `QA` 里每条记录的四个字段：`keywords`、`answer`、`source`、`tag`。
3. 第一任务：补三条协议问答，要求是——一条能命中（带`资料`标注与协议小节），一条属于六处待核对（必须标 `待核对` 并写「与教师确认」），一条是协议没有的内容（标 `未覆盖`，不许拿通用知识冒充协议结论）。每条都在 `frontend/src/adapters/adapters.test.ts` 里加断言。
4. 第二任务：在 `dosing.ts` 里核对 `reverseOf` 的口径，试着加一条「已知每升加量反推终浓度」的检查，要求结果同时给 mL 与 mg/L。
5. 第三任务：给 `ledger.ts` 的 `move` 加限制，禁止跨阶段跳转（现已限制相邻推进），回退时必须在待办里写返工原因，并补测试。
6. 每次改完运行 `npm --prefix frontend run build` 与 `npm --prefix frontend test`，再手动检查桌面与手机宽度下的界面。
7. 涉及试剂与菌操作的改动，输出必须保留 `data/tomato.ts` 里的 `SAFETY` 文案，不得删减。
