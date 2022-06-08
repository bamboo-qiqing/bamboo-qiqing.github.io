import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/projects/restfulCloud": [
        "/projects/restfulCloud/home",
        "/projects/restfulCloud/introduction",
        {
            text: "功能",
            icon: "gongneng",
            prefix: "",
            collapsable: true,
            children: [
                "searchAndFilter",
                "presentationAndStatistics",
                "describe",
                "setting",
                "database",
            ]
        }
    ],
    "/code/spring": [
        {
            text: "Spring Framework",
            collapsable: true,
            prefix: "/code/spring/framework/",
            children: [
                {
                    text: "Spring Caching",
                    prefix: "caching/",
                    collapsable: true,
                    children:[
                        "cacheDeclaration",
                        "configureCacheStorage"
                    ],
                    link: "caching/",
                }
            ]
        }
    ]
});
