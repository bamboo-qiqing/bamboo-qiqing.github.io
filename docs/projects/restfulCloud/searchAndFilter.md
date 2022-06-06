---
title: 搜索与筛选 
icon: icon-test12 
article: false
---
Restful Cloud 查找默认是搜索所有已经缓存过的项目，并且可以根据Request Type类型进行筛选。
插件也提供了SOA接口的兼容，对与消费接口的消费端和提供端也做了区分。

## 搜索
::: tip
Restful Api使用的快捷键是alt+q,开发者可以根据url查询，此处以[Ruoyi Cloud 版本](https://gitee.com/y_project/RuoYi-Cloud)为例。

根据不同的Url提供方式，做了类型的划分，划分主要方式为，不同类型的图标，有以下四种（由于俺不太会图标，有更好看的欢迎提供）：

消费端![客户端](/assets/images/restfulCloud/bamboo_api_client.svg "客户端")、
服务端![服务端](/assets/images/restfulCloud/bamboo_api_server.svg "服务端")、
SOA消费端![SOA消费端](/assets/images/restfulCloud/bamboo_api_soa_client.svg "SOA消费端")、
SOA服务端![SOA服务端](/assets/images/restfulCloud/bamboo_api_soa_server.svg "SOA服务端")、

根据不同的请求类型，划分为：**GET**、**POST**、**PUT**、**DELETE**、**HEAD**、**OPTIONS**、**PATCH**、**TRACE**、**ALL**。
九种请求类型，需要特别注意的是，如果未指定请求类型，则默认为**ALL**。
:::

![搜索](/assets/images/restfulCloud/searchImage.jpg =800x400)
