# 配置 Codex

## 推荐方式：使用密钥弹窗生成配置

在 API Key 列表打开 **使用密钥 → Codex CLI**，选择系统标签并复制完整内容。该内容是当前服务版本和分组能力的唯一推荐来源，包含可能随 Codex 或 Sub2API 版本变化的认证字段。

### macOS / Linux

通常配置位于：

```text
~/.codex/config.toml
~/.codex/auth.json
```

如果目录不存在，可以先创建：

```bash
mkdir -p ~/.codex
```

将弹窗生成的环境变量放进当前 Shell 只适合临时验证；要长期使用，应按弹窗提示写入用户级配置，并检查文件权限。

### Windows

通常配置位于：

```text
%USERPROFILE%\.codex\config.toml
%USERPROFILE%\.codex\auth.json
```

可在文件资源管理器地址栏输入 `%USERPROFILE%\.codex` 打开目录。PowerShell 和命令提示符的环境变量写法不同，请直接复制对应标签，不要混用。

## Codex CLI 与 Desktop

两者共享 Codex 配置目录，但 Desktop 可能缓存进程级配置。保存后：

1. 完全退出 CLI 或 Desktop。
2. 重新启动客户端。
3. 新建 Task，不要复用已经打开的旧 Task。
4. 发送最小验证请求。

如果弹窗提供 **API Key Mode**，只有在需要图片执行器或服务提示该模式时才选择它；否则使用兼容模式即可。

## 手动检查项目

只在复制配置后仍然失败时检查：

- `base_url` 指向管理员提供的服务地址，而不是上游官方地址。
- `wire_api`/Responses 相关字段与弹窗输出一致。
- API Key 没有多余空格、换行或引号嵌套错误。
- 当前密钥绑定了 Codex 分组且处于活跃状态。
- 本机没有被旧的环境变量覆盖。

不要把固定模型名写入公共教程。模型列表和可用名称以当前分组的模型列表为准。

## 高级：WebSocket

部分版本会提供 Codex CLI WebSocket 配置。它不是新手默认路径：先用普通 Responses 配置完成验证，只有在服务管理员确认支持且普通连接满足不了需求时再启用。出现连接中断时，优先退回普通配置以区分客户端配置问题和传输层问题。

::: warning 配置文件保密
`auth.json` 和包含 `env_key`/Key 值的配置文件都不可提交到仓库。报告问题时只贴去掉密钥后的字段名和错误堆栈。
:::
