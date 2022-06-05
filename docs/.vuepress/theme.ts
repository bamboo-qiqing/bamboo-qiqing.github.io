import {hopeTheme} from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default hopeTheme({
    hostname: "https://vuepress-theme-hope-v2-demo.mrhope.site",

    author: {
        name: "Bamboo",
        url: "https://mrhope.site",
    },

    iconAssets: "//at.alicdn.com/t/font_3449437_wsh6mugd7pb.css",

    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope",

    docsDir: "demo/src",

    // navbar
    navbar: navbar,

    // sidebar
    sidebar: sidebar,

    footer: "人生似幻化，终当归空无。",

    displayFooter: true,

    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

    blog: {
        description: "一个懒懒的菜鸡",
        // intro: "/intro.html",
        medias: {
            Gitee: "https://gitee.com/bamboo-qiqing",
            GitHub: "https://github.com/bamboo-qiqing",
            Zhihu: "https://www.zhihu.com/people/guo-qing-25-76-5",
        },
    },

    encrypt: {
        config: {
        },
    },

    plugins: {
        blog: {
            autoExcerpt: true,
        },

        // 如果你不需要评论，可以直接删除 comment 配置，
        // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
        // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
        comment: {
            /**
             * Using giscus
             */
            type: "giscus",
            repo: "vuepress-theme-hope/giscus-discussions",
            repoId: "R_kgDOG_Pt2A",
            category: "Announcements",
            categoryId: "DIC_kwDOG_Pt2M4COD69",

            /**
             * Using twikoo
             */
            // type: "twikoo",
            // envId: "https://twikoo.ccknbc.vercel.app",

            /**
             * Using Waline
             */
            // type: "waline",
            // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
        },

        mdEnhance: {
            enableAll: true,
            presentation: {
                plugins: ["highlight", "math", "search", "notes", "zoom"],
            },
        },
    },
});
