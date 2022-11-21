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
    }, {
        text: "编程语言",
        icon: "code",
        prefix: "/code/",
        children: [
            {
                text: "Java",
                icon: "java",
                link: "java/"
            },
            {
                text: "Spring",
                icon: "spring-edf462fec682b9d48cf628eaf9e19521",
                link: "spring/"
            }
        ]
    },{
        text: "中间件",
        icon: "icon-mqxiaoxiduilieMQ",
        prefix: "/code/",
        children: [
            {
                text: "RabbitMQ",
                icon: "java",
                link: "rabbitmq/"
            },
        ]
    }
]);
