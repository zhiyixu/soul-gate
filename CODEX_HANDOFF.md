# Codex 项目交接

请先阅读 README.md、docs/development-plan.md 和本文，再阅读源码。

## 当前版本

- 2026-10-13 发布的第一阶段核心原型。
- 试玩：https://spirit-gate-forest.g4jkvtct6g.chatgpt.site
- 对应原始源代码 commit：7aedba92131a9b933318c4b0cf74223b24ffa7d7
- 原 Site project_id：appgprj_6acdd31ed5e88191981912047492da12
- 单人；猫形态；双跳、冲刺、爪击、御金、凝冰；三枚灵印；Boss；检查点及通关。
- 当前是原生 JavaScript ES Modules + Canvas，未使用 Phaser、React、TypeScript 或后端。
- 不存在独立 PNG 精灵、地图图片、音频文件；相关素材均以绘图或合成代码实现，详见 docs/assets.md。

## 本地运行

无需 npm install，运行环境只需浏览器；测试需要支持 ES Modules 的 Node.js。

在本项目目录执行：

```bash
python3 -m http.server 8000 --directory dist
```

Windows 若使用 Python Launcher：

```powershell
py -m http.server 8000 --directory dist
```

访问 http://localhost:8000 。不要双击 index.html 用 file:// 打开，ES Modules 应通过 HTTP 加载。

测试：

```bash
node test-engine.mjs
```

## 继续开发的第一项任务

先运行自动测试，再启动本地预览。若当前 Codex 环境提供受支持的浏览器工具，实际测试开始、移动、二段跳、三种攻击、冰桥、死亡复苏、暂停与通关。原始构建环境只完成模拟与 Canvas 帧检查，未完成真实浏览器端到端验证。

优先修复阻断性问题、角色可见性、操作反馈和关卡提示。保留当前可用版本；根据用户明确选择推进开发计划中的后续阶段。

## 部署与同步

此 ZIP 是可移植源码快照，不携带 .git、访问凭据或活动的 Sites hosting 配置。开发计划及交接文档为额外附带文件。

本地改动不会自动更新已经发布的 Site。若后续环境提供 Sites 能力且用户要更新原站点，应使用上面的既有 project_id 读取、打开最新远端源代码后合并修改，保持既有访问范围，并遵循 Sites 工作流重新发布。不要仅凭旧快照覆盖可能已更新的远端版本。

若环境没有 Sites 发布能力，可在本地继续开发，或提交用户选择的 GitHub 仓库；不要声称已同步线上。

## 项目结构

| 文件 | 用途 |
| --- | --- |
| dist/engine.js | 无 DOM 的状态模拟、关卡配置、敌人、技能、胜负 |
| dist/render.js | 所有角色、场景与特效的 Canvas 绘图 |
| dist/main.js | 输入、UI、音效合成、localStorage 纪录 |
| dist/index.html | 页面、HUD、帮助、控制入口 |
| dist/style.css | 响应式界面样式 |
| test-engine.mjs | 自动测试及完整通关模拟 |
| docs/development-plan.md | 四阶段开发计划 |
| docs/assets.md | 素材来源和编辑位置 |

