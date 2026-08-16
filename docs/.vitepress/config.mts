import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-CN",
  title: "两颗枣树",
  description: "两颗枣树的个人项目与技术文档",
  cleanUrls: true,
  themeConfig: {
    logo: "/logo.svg",
    siteTitle: "两颗枣树",
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" },
      { text: "项目", link: "/projects/" },
      { text: "GitHub", link: "https://github.com/bamboo-qiqing" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "开始使用",
          items: [{ text: "概览", link: "/guide/" }],
        },
      ],
      "/projects/": [
        {
          text: "项目",
          items: [{ text: "项目概览", link: "/projects/" }],
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
