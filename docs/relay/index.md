# API 中转

API 中转把平台提供的模型分组包装成一个统一入口。你只需要维护自己的 API Key 和 Codex 配置，平台负责认证、分组路由、用量记录和请求转发。

::: tip 本文档适用范围
本栏目只介绍客户侧的 Codex CLI 和 Codex Desktop 使用方式，不包含 Sub2API 服务端部署、上游账号管理或后台配置。
:::

## 工作关系

<figure class="doc-figure">
  <img src="/images/relay/flow.svg" alt="Codex 通过 API Key 访问两颗枣树中转并转发到模型分组" />
  <figcaption>客户端、API 中转和模型分组之间的请求关系。</figcaption>
</figure>

平台实际展示的分组和模型以控制台为准；文档不会固定写入某一个模型名或价格。

## 推荐阅读顺序

1. [快速开始](/relay/quickstart)：第一次配置 Codex。
2. [API Key 管理](/relay/api-keys)：创建、停用和保护密钥。
3. [配置 Codex](/relay/codex)：查看不同操作系统的配置位置和重启要求。
4. [用量与额度](/relay/usage)：核对请求、Token 和额度。
5. [故障排查](/relay/troubleshooting)：按状态码快速定位问题。

## 验证版本

文档内容按 Sub2API `v0.1.177` 的用户端能力整理。控制台的“使用密钥”弹窗会随版本更新生成配置；当弹窗内容与本文档不一致时，以弹窗生成的配置为准。

::: warning 密钥安全
API Key 等同于调用凭据。不要把完整密钥放进 Git、截图、日志、公开 Issue 或聊天记录；反馈问题时只提供密钥末四位。
:::
