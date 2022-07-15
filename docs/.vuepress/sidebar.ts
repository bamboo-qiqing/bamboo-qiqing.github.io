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
                        "ehcache",
                    ],
                    link: "caching/",
                }
            ]
        }
    ],

    "/code/rabbitmq": [
        '',
        '01/',
        {
            text: '相关概念介绍',
            collapsable: true,
            children: [
                '02/',
                '02/01.md',
                '02/02.md'
            ]
        },
        {
            text: '客户端开发向导',
            collapsable: true,
            children: [
                '03/',
                '03/01.md',
                '03/02.md',
                '03/03.md',
                '03/04.md',
                '03/05.md',
                '03/06.md'
            ]
        },
        {
            text: 'RabbitMQ 进阶',
            collapsable: true,
            children: [
                '04/',
                '04/01.md',
                '04/02.md',
                '04/03.md',
                '04/04.md',
                '04/05.md',
                '04/06.md',
                '04/07.md',
                '04/08.md',
                '04/09.md',
                '04/10.md'
            ]
        }, {
            text: 'RabbitMQ 管理',
            collapsable: true,
            children: [
                '05/',
                '05/01.md',
                '05/02.md',
                '05/03.md',
                '05/04.md',
                '05/05.md',
                '05/06.md'
            ]
        }, {
            text: 'RabbitMQ 配置',
            collapsable: true,
            children: [
                '06/',
                '06/01.md',
                '06/02.md',
                '06/03.md'
            ]
        }, {
            text: 'RRabbitMQ 运维',
            collapsable: true,
            children: [
                '07/',
                '07/01.md'
            ]
        }
    ]
});
