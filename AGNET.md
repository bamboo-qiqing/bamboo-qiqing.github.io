# 项目协作说明

## 项目识别

- 项目：`bamboo-qiqing.github.io`
- 站点名称：两颗枣树
- 类型：GitHub Pages 静态文档站点
- 框架：VitePress `1.6.4`
- 内容语言：中文（`zh-CN`）
- 包管理器：pnpm 7+
- 推荐 Node.js：18+

## 目录结构

- `docs/`：Markdown 文档源文件
- `docs/.vitepress/config.mts`：站点标题、导航、侧边栏、搜索和页脚配置
- `docs/.vitepress/theme/`：主题入口和自定义 CSS
- `docs/public/`：可直接通过根路径访问的静态资源
- `.github/workflows/docs.yml`：构建并发布到 GitHub Pages 的流程

## 常用命令

```bash
pnpm install
pnpm docs:dev       # 本地开发预览
pnpm docs:build     # 生产构建，输出 docs/.vitepress/dist
pnpm docs:preview   # 预览生产构建
```

## 内容约定

- 新文章放在 `docs/` 下合适的目录，使用 Markdown 编写。
- 新增栏目或页面后，同步修改 `docs/.vitepress/config.mts` 中的 `nav` 或 `sidebar`。
- 图片等静态资源放入 `docs/public/` 或文章附近，并使用相对路径引用。
- 不要手动编辑 `docs/.vitepress/dist/`，它是构建产物。

## 发布流程

向 `master` 分支推送会触发 `.github/workflows/docs.yml`，执行 `pnpm docs:build` 后将 `docs/.vitepress/dist/` 发布到 `gh-pages`。发布前应使用 Node.js 18 或更高版本完成本地构建验证。

## 当前状态

原 VuePress 文档、图片和主题配置已按项目迁移要求清除，当前是全新的最小 VitePress 站点骨架。Git commit 尚未创建；如需提交，应先确认提交信息和是否要同时调整 GitHub Actions 的 Node.js 版本。
