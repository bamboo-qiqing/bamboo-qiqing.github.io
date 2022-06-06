import { defineUserConfig } from "vuepress";
import {searchPlugin} from "@vuepress/plugin-search";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Bamboo",
  description: "一个懒懒的菜鸡博客",

  base: "/",

  theme,
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索',
        },
      },
    }),
  ],
});
