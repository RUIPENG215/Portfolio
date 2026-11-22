# 个人作品集网站（王睿鹏 / Wang Ruipeng）

Vite + React 19 + TypeScript + Tailwind 3 + framer-motion 12 + react-router 7。部署在 Vercel（`vercel.json` 含 SPA 重写和缓存头）。

## 常用命令
- `npm run dev`：本地开发，端口 5173
- `npm run build`：`tsc -b && vite build`，提交前必须通过
- `npm run lint`

## 目录约定
- `src/pages/`：页面。中英文是两套页面（`Landing`/`LandingZh`、`Humanities`/`HumanitiesZh` 等），改版式时两边都要看
- `src/data/`：内容数据。人文页照片在 `humanitiesData.tsx`，新增照片只改数据，页面自动适配
- `src/components/humanities/`：人文页组件（照片墙 Hero、网格/胶片/索引三种展厅模式、大图查看器）
- `src/components/motion/`：全站动效（光标、侧边标尺进度、SplitText、Magnetic 等）
- `public/Humanity/IMG_xx.webp`：人文页照片，自带徕卡水印边框，边框色实测 `#131313`

## 设计偏好（用户明确提过的）
- 整体风格：克制的高级感，动画要精致，不要花哨
- 英文首页 Hero 保持黑色底 + 光效，不要粒子/空间场（试过，用户不喜欢）
- 首页显示 Hero 时不要竖向标尺进度，滚过 Hero 后才出现
- 页面切换不用纯色遮罩，也不要整页 blur 滤镜（线上会掉帧）
- 人文页：首屏照片墙一次放下全部照片，聚成椭圆，不要滚动侵入文字；照片墙直接放在奶油底上，不做渐变遮罩和单独窗口
- 人文页黑色展厅：标题区是不吸附的章节标题；以横屏浏览为主，网格 4–5 列
- 大图查看器背景用 `#131313`，画框严格按照片比例，不留黑边
- 导航栏经过深色区域（带 `data-nav-dark`）时只换文字颜色，不加底色

## 设计项目页（Design 详情页）
- 每个项目单独设计一页（像 Wisp），不要用通用模板：`WispCaseStudy`(9)、`SparkCaseStudy`(8)、`MtaCaseStudy`(6)、`BioCaseStudy`(5)、`KnoberCaseStudy`(3)、`LampCaseStudy`(1)、`XidieCaseStudy`(4)，在 `DesignProject.tsx` 里按 id 路由。共用零件在 `components/casestudy/`（`primitives`、`Viewer` 大图查看器、`StatusHalo`、`casestudy.css`），每页自己的样式在同目录 `<name>.css`。这些项目的数据里 `content: []`，页面内容写在各自的 tsx 里
- 旧的通用模板（ProjectCaseStudy / designStories）已删除；`DesignProject.tsx` 底部的 content-blocks 旧版式只剩隐藏项目（2、7）在用
- 每页深色区域都要加 `data-nav-dark`，否则导航栏文字看不见
- 交互三项目（5/6/8）的首屏 `hero.webp` 和索引缩略图 `thumb.webp` 是用户用 AI 生成的：首屏延续页面深色配色、主体偏右；缩略图是浅暖底产品静物，与工业设计项目统一。生成图要写实，避免全息/粒子/悬浮面板
- 不再使用的旧图放在 `archive/design-old/`（不在 public，不部署），需要时移回 `public/Design_N/`
- Figma 源文件：Portfolio 文件里的 "项目一"(Bio) / "项目二"(MTA) section 和 SparkPilot 画板；4x 导出放在 `~/code/figma-export`（仓库外），按图层坐标×4 裁图
- 学校合作项目（米理 × 西交 Project Work）用户都是 Team leader，概览和署名里要写
- 素材来自用户的 PPT 原件时，网图、素材图、卡通形象、第三方网站截图不放；第三方数据重排成网页表格并注明来源
- 首屏大图不要被放大到超过原生像素（会糊）；文字不要压在产品或阴影上
- 并排的图用 `cs-row` 等高排列，不要强行裁成同一比例
- Foodbox（id 2）已隐藏，AeroVertex（id 7）未完成也隐藏

## 性能与移动端注意
- 整屏高度用 `100svh`，不要用 `100vh`/`h-screen`（手机地址栏会让画面跳动）
- 避免整页 `filter: blur`；`backdrop-blur` 少用
- 小点按目标在手机上至少约 40px 高
- 鼠标专属效果用 `useFinePointer` 判断，触屏设备走拖动/点击
- Tailwind 3 坑：`/97` 这种透明度无效；framer 的内联 transform 会覆盖 Tailwind 的 transform 类；需要 sticky 时用 `overflow-x-clip` 而非 `overflow-x-hidden`

## 推送
- 提交后需 `git push origin main`，Vercel 自动部署
