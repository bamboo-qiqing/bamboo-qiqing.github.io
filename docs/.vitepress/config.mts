import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-CN",
  title: "两颗枣树",
  description: "两颗枣树服务文档",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: "/logo.svg",
    siteTitle: "两颗枣树",
    nav: [
      { text: "首页", link: "/" },
      { text: "API 中转", link: "/relay/" },
      { text: "远程 Agent", link: "/agents-anywhere/" },
      { text: "常见问题", link: "/faq/" },
    ],
    sidebar: {
      "/relay/": [
        {
          text: "API 中转",
          items: [
            { text: "服务概览", link: "/relay/" },
            { text: "快速开始", link: "/relay/quickstart" },
            { text: "API Key 管理", link: "/relay/api-keys" },
            { text: "配置 Codex", link: "/relay/codex" },
            { text: "用量与额度", link: "/relay/usage" },
            { text: "故障排查", link: "/relay/troubleshooting" },
          ],
        },
      ],
      "/agents-anywhere/": [
        {
          text: "远程 Agent",
          items: [
            { text: "服务概览", link: "/agents-anywhere/" },
            { text: "快速开始", link: "/agents-anywhere/quickstart" },
            { text: "安装 Connector", link: "/agents-anywhere/connectors" },
            { text: "Web 控制台", link: "/agents-anywhere/web-console" },
            { text: "Android 客户端", link: "/agents-anywhere/android" },
            { text: "故障排查", link: "/agents-anywhere/troubleshooting" },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/bamboo-qiqing" }],
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "未找到相关结果",
                resetButtonTitle: "清除搜索",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                },
              },
            },
          },
        },
      },
    },
    outlineTitle: "本页目录",
    lastUpdatedText: "最后更新",
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    returnToTopLabel: "返回顶部",
    sidebarMenuLabel: "文档菜单",
    darkModeSwitchLabel: "外观",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    footer: {
      message: "人生似幻化，终当归空无。",
      copyright: "Copyright © 两颗枣树",
    },
  },
});
