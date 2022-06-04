import {navbar} from "vuepress-theme-hope";

export default navbar([
    "/",
    {
        text: "项目列表",
        icon: "xiangmuliebiao",
        prefix: "/projects/",
        children: [
            {
                text: "Restful Cloud",
                icon: "haitun",
                link: "restfulCloud/home"
            }
        ]
    }
]);
