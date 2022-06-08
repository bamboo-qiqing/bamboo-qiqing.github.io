---
index: false
icon: creative
title: Spring Caching
category:
 - 编程语言
tag:
 - java
---

从Spring 3.1版本开始，Spring Framework提供了一种代码影响最小，与事务支持类似的抽象缓存框架，可以在Spring中使用各种缓存来提高应用程序的性能。
Spring 4.1后，抽象缓存框架进行了更多的扩展，支持JSR-107 注释和更多自定义选项。

**Spring Caching 有以下几个特性：**

- 使用注解的方式，对于方法维度的缓存。
- 仅适用于固定参数请求，无论多少次请求，输出返回结果都相同的方法。
- 只是一种抽象缓存的逻辑，可以使开发者不必关注实现缓存的逻辑，不提供缓存的实现和实际的数据存储。
- 缓存抽象对多线程和多进程环境没有特殊处理，因为这些功能由缓存实现处理。如Redis

::: tip
Spring 提供了该抽象的一些实现java.util.concurrent.ConcurrentMap：基于 JDK的缓存、Ehcache 2.x、Gemfire 缓存、Caffeine和符合 JSR-107 的缓存（例如 Ehcache 3.x）。有关插入其他缓存存储和提供程序的更多信息，请参阅插入不同的后端缓存。
:::

Spring Caching 主要有两方面构成：

- 缓存声明：标识需要缓存的方法及其策略。

- 缓存配置：存储数据和从中读取数据的后备缓存。
