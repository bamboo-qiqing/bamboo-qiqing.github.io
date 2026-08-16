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
    search: { provider: "local" },
    footer: {
      message: "人生似幻化，终当归空无。",
      copyright: "Copyright © 两颗枣树",
    },
  },
});
