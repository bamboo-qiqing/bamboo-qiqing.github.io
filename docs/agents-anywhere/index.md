# 远程 Agent

Agents Anywhere 让你从 Web 或 Android 控制另一台设备上的 Codex。你不需要在自己的设备上部署 Server，只需要使用已有账号登录服务，并在运行 Codex 的设备上安装 Connector。

## 三个部分

<figure class="doc-figure">
  <img src="/images/agents-anywhere/flow.svg" alt="Web 或 Android 通过服务端控制本地 Connector 和 Codex" />
  <figcaption>远程控制面与本地执行环境的边界。</figcaption>
</figure>

代码、工作区和 Codex 本地登录状态仍然保留在 Connector 所在设备。远程控制台只是发送指令和展示结果。

## 推荐阅读顺序

1. [快速开始](/agents-anywhere/quickstart)：把第一台设备配对上线。
2. [安装 Connector](/agents-anywhere/connectors)：按系统选择安装方式。
3. [Web 控制台](/agents-anywhere/web-console)：管理 Session、审批、文件和终端。
4. [Android 客户端](/agents-anywhere/android)：在手机上继续处理任务。
5. [故障排查](/agents-anywhere/troubleshooting)：处理离线、配对和 Runtime 问题。

## 验证版本

本栏目按 Agents Anywhere `v0.1.7` 和仓库文档中的 Codex Connector 能力整理。桌面端、Android APK 和 CLI 的版本可能分别发布，下载时以官方 Release 页面为准。

::: warning 设备权限
Connector 能够访问被控设备允许的工作区、Shell 和终端。只在自己的设备上配对，不要把配对命令、Connector Token 或远程终端输出分享给他人。
:::
