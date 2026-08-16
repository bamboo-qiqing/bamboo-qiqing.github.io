# 项目协作说明

## 项目识别

- 项目：`bamboo-qiqing.github.io`
- 站点名称：两颗枣树
- 类型：GitHub Pages 静态服务文档站点
- 框架：VitePress `1.6.4`
- 内容语言：中文（`zh-CN`）
- 包管理器：pnpm 7+
- 推荐 Node.js：18+

## 文档定位

站点面向服务客户，当前包含两个产品区：

- `docs/relay/`：API 中转的 Codex CLI/Desktop 用户指南，按“创建密钥 → 使用密钥 → 配置 → 排错”组织。
- `docs/agents-anywhere/`：对外名称为“手机远程控制”，底层基于 Agents Anywhere，包含 Web、Android 和 Windows/macOS/Linux Connector 操作指南。
- `docs/faq/`：跨产品常见问题。

API 中转控制台的公开地址是 `https://liangkezaoshu.top/`，API 端点是 `https://liangkezaoshu.top/v1`。手机远程控制的服务地址、账号和密钥继续使用尖括号占位符；文档不公开价格、购买方式、客服入口、后台部署细节或上游账号管理内容。

## 目录结构

- `docs/.vitepress/config.mts`：标题、导航、侧边栏、搜索和页脚配置。
- `docs/.vitepress/theme/`：全局主题样式和截图展示样式。
- `docs/public/images/`：本地流程图、脱敏控制台截图和官方公开素材。
- `.github/workflows/docs.yml`：构建并发布到 GitHub Pages 的流程。

## 常用命令

```bash
pnpm install
pnpm docs:dev       # 本地开发预览
pnpm docs:build     # 生产构建，输出 docs/.vitepress/dist
pnpm docs:preview   # 预览生产构建
```

构建必须使用 Node.js 18 或更高版本。远程旧环境的 Node.js 16 无法运行 VitePress 1.x/Vite 5 的 Web Crypto 依赖。

## 内容约定

- 以客户完成任务为主线，优先写“从哪里点、复制什么、如何验证、失败看哪里”。
- Sub2API 的 Codex 配置以控制台“使用密钥”动态生成内容为准，不固定写死模型名或认证字段。
- Agents Anywhere 的服务端已经部署；文档只讲已有账号登录、Connector 配对和客户端操作，不指导客户部署 Server。
- 除上述已确认公开的 API 中转地址外，不在代码块、截图、日志示例或页面文字中出现真实 API Key、Connector Token、邮箱、内部域名、设备名、工作区绝对路径或业务数据。
- 新增截图必须脱敏：遮盖地址栏、邮箱、余额、用户标识、API Key、Token、设备名、文件路径、Session 内容和业务数据。优先使用官方 Release 或上游仓库公开素材，不使用 GitHub 热链。
- 图片使用 `figure.doc-figure` 结构，提供准确 `alt` 文本和图注；真实控制台截图需来自临时演示账号。
- 不要手动编辑 `docs/.vitepress/dist/`，它是构建产物。

## 上游版本基线

- Sub2API：`v0.1.177`，用于核对用户端 API 密钥和 Codex 配置流程。
- Agents Anywhere：`v0.1.7`，用于核对 Connector、Session、Device 和 Android 能力。

上游项目更新后，先核对用户端菜单、Codex 配置弹窗、Connector 命令和 Android Release，再更新版本记录和相关页面。

## 发布流程

向 `master` 分支推送会触发 `.github/workflows/docs.yml`，执行 `pnpm docs:build` 后将 `docs/.vitepress/dist/` 发布到 `gh-pages`。提交前必须完成构建、链接、敏感信息和移动端显示检查。Git commit 和 push 需要在用户确认后执行。
