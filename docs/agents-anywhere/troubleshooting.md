# 远程 Agent 故障排查

| 表现 | 检查位置 | 处理方法 |
| --- | --- | --- |
| 无法配对 | 服务地址、配对页面命令、系统时间 | 重新打开配对流程，复制新命令，不要复用旧 Token |
| 设备离线 | Connector 进程、网络、系统休眠 | 重启 Connector，保持设备唤醒并检查日志 |
| 找不到 Codex | Codex 是否已安装/登录、`PATH`、`CODEX_BIN` | 本地先运行 Codex；Linux 设置正确的 `CODEX_BIN` |
| Session 不同步 | Connector WebSocket、服务端地址、网络代理 | 确认 Connector 在线后刷新 Session，必要时重启 Connector |
| 审批卡住 | 浏览器/手机是否仍在线、Session 是否被接管 | 重新打开 Session，明确拒绝或处理待审批项 |
| 文件打不开 | 工作目录、Connector 本地权限、文件是否存在 | 在设备本地确认路径，再从工作区根目录重新选择 |
| 终端断开 | Shell 进程、设备休眠、网络 | 重新打开终端；长任务使用持久化会话 |
| Android 无法连接 | 服务地址、账号、网络权限 | 检查服务地址是否包含正确协议，再重新登录 |

## Linux 日志与进程

先在运行 Connector 的终端查看错误，不要直接公开完整日志。若使用 screen：

```bash
screen -r agents-anywhere
```

如果需要重新配对，先在控制台撤销旧设备，再生成新的配对命令。

## 提交诊断信息

提供发生时间、设备系统、Connector 版本、Session 名称和错误摘要即可。请删除 Connector Token、账号信息、工作区绝对路径、环境变量和终端中的密钥。
