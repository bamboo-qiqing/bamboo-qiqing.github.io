# 安装 Connector

Connector 必须安装在真正拥有工作区和 Codex 的设备上。下载地址只使用 [Agents Anywhere Releases](https://github.com/anywhere-labs/Agents-Anywhere/releases)，不要从第三方网盘获取安装包。

## Windows

1. 下载 Windows Connector 安装包。
2. 完成安装并启动托盘程序。
3. 在服务 Web 控制台发起配对，按页面提示确认设备。
4. 检查设备状态为在线，Runtime 列表中出现 Codex。
5. 如需开机自动运行，在 Connector 设置中启用；不要把 Token 写进公共批处理文件。

如果 Windows Defender 或系统权限弹窗出现，确认安装包来自官方 Release 后再允许。工作区权限应限制在实际项目目录。

## macOS

根据芯片下载 Apple Silicon 或 Intel 版本：

1. 将 App 拖到 Applications 并启动。
2. 按系统提示允许网络、文件或辅助功能权限。
3. 回到 Web 控制台完成配对。
4. 确认 Codex 在本机终端可以正常运行。

首次授权后，如果设备仍离线，退出并重新打开 Connector，再检查系统隐私与安全设置。

## Linux

Linux 使用命令行 Connector。配对页面会显示完整命令，推荐直接复制页面生成的内容：

```bash
uvx anywhere-cli start \
  --server-url <AGENTS_ANYWHERE_SERVICE_URL> \
  --connector-id <CONNECTOR_ID> \
  --connector-token <CONNECTOR_TOKEN>
```

也可以先保存配置，再启动：

```bash
uvx anywhere-cli configure \
  --server-url <AGENTS_ANYWHERE_SERVICE_URL> \
  --connector-id <CONNECTOR_ID> \
  --connector-token <CONNECTOR_TOKEN>

uvx anywhere-cli start
```

默认配置路径是 `~/.agent-server/connector.json`。如果 Codex 不在 `PATH` 中，可在 Connector 设备上设置：

```bash
export CODEX_BIN=/path/to/codex
```

生产环境应使用 systemd、screen 或 tmux 保持进程常驻。临时验证可以使用：

```bash
screen -S agents-anywhere
# 在此处运行配对页面生成的命令
# Ctrl-A，再按 D 可离开但不停止进程
```

## 上线检查

- Connector 进程仍在运行。
- Web 中设备显示在线。
- Codex Runtime 显示已发现。
- 工作目录可以列出文件。
- 新 Session 能收到回复。
