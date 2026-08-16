# API 中转

通过两颗枣树提供的 API 地址，已安装的 Codex CLI 或 Codex Desktop 可以直接使用控制台分组。你只需要创建一个 API Key，再把控制台生成的配置放进 Codex。

::: tip 本文档适用范围
本文只介绍客户侧操作，不包含服务端部署、上游账号管理或后台配置。
:::

## 开始前

- 已拿到服务账号，并能登录控制台。
- 本机已经安装 Codex CLI 或 Codex Desktop。
- 你知道要使用的 Codex 分组；可用分组和模型以控制台显示为准。

## 四步完成配置

1. 在 **API 密钥** 页面[创建 API Key](/relay/api-keys)。
2. 在密钥列表点击 **使用密钥**，选择 **Codex**。
3. 按操作系统复制控制台生成的配置。
4. 完全退出并重启 Codex，发送一个最小测试请求。

## 服务地址

控制台地址：<https://liangkezaoshu.top/>

API 密钥页面显示的 API 端点是：

```text
https://liangkezaoshu.top/v1
```

只使用控制台显示的地址和“使用密钥”生成的内容，不要从旧教程中拼接地址、认证字段或模型名。

## 请求关系

<figure class="doc-figure">
  <img src="/images/relay/flow.svg" alt="Codex 通过 API Key 访问两颗枣树中转并转发到模型分组" />
  <figcaption>客户端、API 中转和模型分组之间的请求关系。</figcaption>
</figure>

分组决定可用模型、额度和计费方式；这些内容可能随服务配置变化，页面实际显示优先于本文示例。

请求成功后，可在左侧 **使用记录** 中按时间、模型和状态码核对调用；如果没有任何记录，通常说明 Codex 仍在使用旧配置。

::: warning 密钥安全
API Key 等同于调用凭据。只在可信设备上复制，不要把完整密钥放进 Git、截图、日志、公开 Issue 或聊天记录；反馈问题时只提供末四位。
:::
