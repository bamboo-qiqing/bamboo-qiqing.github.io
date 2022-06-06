---
title: 配置
icon: icon-test16
article: false
---

## 注释配置
![配置](/assets/images/restfulCloud/describe-1654525288813.png)
### 是否开启注释
是否开启注释默认是开启的，可以在配置中关闭，影响是全局的。所有的注释都不会生效，所有的项目都不会显示注释。
### 注释的优先顺序
提供注释的框架有三种：
- [x] odianyun
- [x] Swagger
- [x] javadoc
::: tip
三种方式默认顺序是odianyun->Swagger->javadoc，优先顺序可以在配置中重新定义，如图所示
odianyun是开发者自己公司的框架，后期可能会单独作为一个插件，Swagger是开源的框架，javadoc是java自带的注释，可以自行搜索。
:::
