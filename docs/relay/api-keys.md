# 创建 API Key

API Key 是 Codex 访问中转服务的凭据。一个密钥可以绑定一个分组，并单独设置额度、速率、有效期和 IP 限制。

## 1. 打开 API 密钥

登录[两颗枣树控制台](https://liangkezaoshu.top/)，在左侧进入 **API 密钥**。第一次进入时会看到空列表，点击右上角或空状态中的 **创建密钥**。

<figure class="doc-figure">
  <a href="/images/relay/api-keys-empty.png" target="_blank" rel="noreferrer">
    <img src="/images/relay/api-keys-empty.png" alt="API 密钥页面的空列表和创建密钥按钮，敏感信息已隐藏" loading="lazy" />
  </a>
  <figcaption>API 密钥页面：从右上角或空状态创建第一把密钥。界面截图已脱敏。</figcaption>
</figure>

## 2. 填写创建表单

按实际用途填写名称和分组，其余限制按需开启。不要为了“更安全”随意填写不确定的 IP 或过短的有效期，否则 Codex 可能在配置完成后立即被拒绝。

<figure class="doc-figure">
  <a href="/images/relay/create-api-key.png" target="_blank" rel="noreferrer">
    <img src="/images/relay/create-api-key.png" alt="创建 API 密钥弹窗，包含名称、分组和限制选项，敏感信息已隐藏" loading="lazy" />
  </a>
  <figcaption>创建密钥弹窗：先选择分组，再决定是否启用各项限制。</figcaption>
</figure>

| 字段 | 怎么填 |
| --- | --- |
| 名称 | 用设备或用途命名，例如 `codex-mac`、`codex-work`。 |
| 分组 | 选择管理员为 Codex 开放的分组；可用模型和倍率以列表为准。 |
| 自定义密钥 | 一般保持关闭；只有在需要固定凭据格式时才开启。 |
| IP 限制 | 只有出口 IP 固定时才启用，移动网络或代理环境不要猜测填写。 |
| 额度限制 | 单位为 USD；页面提示的 `0` 表示不限制。 |
| 速率限制 | 需要限制并发或请求频率时再开启。 |
| 密钥有效期 | 按项目周期设置；临时测试可设置较短时间。 |

填写完成后点击 **创建**。创建成功后不要把完整密钥放进仓库、截图或聊天记录。

## 3. 从列表进入 Codex 配置

回到列表，确认密钥处于活跃状态、分组正确，再点击该行的 **使用密钥**。这个入口会根据当前服务版本和分组生成 Codex 配置，下一步直接按[配置 Codex](/relay/codex)操作。

<figure class="doc-figure">
  <a href="/images/relay/api-key-created.png" target="_blank" rel="noreferrer">
    <img src="/images/relay/api-key-created.png" alt="创建成功后的 API 密钥列表，展示状态和使用密钥等操作，敏感信息已隐藏" loading="lazy" />
  </a>
  <figcaption>创建成功后的列表：密钥值只显示掩码，使用密钥是配置 Codex 的入口。</figcaption>
</figure>

## 4. 后续管理

- **禁用**：临时停止调用，恢复后再启用。
- **编辑**：调整分组或限制；修改后重新检查 Codex 配置。
- **删除**：确认没有设备继续使用后再删除，删除后不能恢复。
- **轮换**：怀疑泄露时，先创建并验证新密钥，再禁用、删除旧密钥。

反馈问题时只提供密钥末四位、分组和状态码，不要发送完整密钥。
