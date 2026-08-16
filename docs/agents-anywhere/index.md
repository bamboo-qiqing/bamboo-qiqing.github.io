# 远程 Agent

Agents Anywhere 让你从 Web 或 Android 控制另一台设备上的 Codex。服务端已经部署，你只需要使用已有账号登录，并在运行 Codex 的设备上安装 Connector。

## 数据在哪里执行

<figure class="doc-figure">
  <img src="/images/agents-anywhere/flow.svg" alt="Web 或 Android 通过服务端控制本地 Connector 和 Codex" />
  <figcaption>控制端发送指令，Connector 设备负责执行 Codex、文件和终端操作。</figcaption>
</figure>

代码、工作区和 Codex 登录状态仍然保留在 Connector 所在设备。手机或浏览器只是控制端，关闭 Connector 后设备会离线。

## 推荐流程

1. [快速开始](/agents-anywhere/quickstart)：确认账号和被控设备。
2. [安装 Connector](/agents-anywhere/connectors)：按 Windows、macOS 或 Linux 配对。
3. [Web 控制台](/agents-anywhere/web-console)：创建 Session、处理审批、浏览文件和打开终端。
4. [Android 客户端](/agents-anywhere/android)：在手机上继续处理任务。
5. [常见错误](/agents-anywhere/troubleshooting)：处理配对、离线和 Runtime 问题。

::: warning 设备权限
Connector 能够访问被控设备允许的工作区、Shell 和终端。只在自己的设备上配对，不要分享配对命令、Connector Token 或远程终端输出。
:::
