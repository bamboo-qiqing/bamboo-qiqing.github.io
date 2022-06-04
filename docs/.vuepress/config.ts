import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Bamboo",
  description: "一个懒懒的菜鸡博客",

  base: "/",

  theme,
});
