---
title: 展示和统计
icon: icon-test
article: false
---
::: tip
插件的展示主要以侧边栏的形式展示，插件的统计主要以页面的形式展示。

统计弄能还暂未实现，有好的意见欢迎提出。

展示功能主要包括：当前项目、历史点击、其他项目Restful Api列表的展示。
:::

::: danger
所有的列表都可以点击跳转到达对应的文件，至于其它项目的点击是否可以直接打开项目，或者提供一种可选择的配置，后期会酌情提供。
:::

## 当前项目Restful Api列表
当前项目Restful Api列表，主要包含以下几个功能：
- [x] 列表缩放
- [x] 刷新
- [x] 展示
- [x] [注释显示](describe.md)
- [x] [重命名](describe.md#重命名)

### 展示
::: tip
列表的展示由图所示，此处以[Ruoyi Cloud 版本](https://gitee.com/y_project/RuoYi-Cloud)为例。
默认是开启了注释显示，关闭可以在[配置](setting.md)中进行关闭。列表展示方式主要为模块->类名->方法名的树级列表展示。其中也展示了url提供者类型和url的请求类型，详情查看[搜索与筛选 ](searchAndFilter.md#搜索)。
:::

  ![当前项目Restful Api列表](/assets/images/restfulCloud/presentationAndStatistics-1654518716915.png)

## 历史点击列表
历史点击列表，主要是为了展示我们常用并且常常查询的url地址，有很多时候开发者需要用到该场景。其中包含以下几个功能：
- [x] 展示
- [x] [注释显示](describe.md)
::: tip
历史点击列表展示方式为项目->方法名的树级列表展示。其中也展示了url提供者类型和url的请求类型，详情查看[搜索与筛选 ](searchAndFilter.md#搜索)。
未支持Class级别的树级列表展示，同时取消了重命名、刷新、列表缩放，后期如果大家需要，可以提供。
:::

![历史点击](/assets/images/restfulCloud/presentationAndStatistics-1654522546442.png)

## 其它项目列表
其它项目列表主要用于展示除了当前项目以外的其它项目的Url列表。
其他项目列表的展示方式为项目->模块->类>方法的树级列表展示。除了未提供列表缩放和重命名以外，其他的和当前项目类同。此处只是为了更好的区分当前项目和其它项目所做的区分。

![其它项目列表](/assets/images/restfulCloud/presentationAndStatistics-1654523094673.png)

