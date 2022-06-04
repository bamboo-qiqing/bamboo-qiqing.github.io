import {navbar} from "vuepress-theme-hope";

export default navbar([
    "/",
    {
        text: "项目列表",
        icon: "list",
        prefix: "/projects/",
        children: [
            {
                text: "Restful Cloud",
                icon: "edit",
                link: "restfulCloud/home"
            }
        ]
    }
]);
