# 素材与编辑位置

当前游戏没有外部素材依赖，不存在缺失的精灵表或贴图包。所有画面与音效都是代码实现。

| 素材 | 源文件 / 位置 | 说明 |
| --- | --- | --- |
| 猫的像素形象与动画 | dist/render.js：cat | 身体、耳朵、眼睛、尾巴、移动与攻击动画 |
| 普通灵影、守卫、Boss | dist/render.js：spirit | 像素形象、生命条、冰冻覆盖 |
| 树、树冠、蕨类、地面、河流、月亮 | dist/render.js：tree、crown、fern、render | 确定性的程序化绘图与多层视差 |
| 灵境之门 | dist/render.js：gate | 关闭/开启状态与光效 |
| 灵印、冰桥、飞刃、粒子 | dist/render.js：render | 按游戏状态绘制 |
| 关卡坐标与碰撞体 | dist/engine.js：createGame | 3600 × 540 世界、地面、树枝、敌人和收集物 |
| 页面图标与角色 HUD | dist/index.html、dist/style.css | Unicode、CSS 与内嵌 SVG favicon |
| 音效 | dist/main.js：tone | Web Audio 振荡器实时合成，无录制音频文件 |
| 字体 | dist/style.css | 使用系统字体，无外部字体下载 |

未来如果加入独立素材，可以新建 dist/assets/sprites、dist/assets/tiles、dist/assets/audio。新增资源应记录来源、用途和授权情况，并保持统一像素比例及调色板。

原作仅作为主题与玩法启发；此包没有收录番剧视频、截图、原作音轨或下载的官方角色素材。
