const e=JSON.parse('{"key":"v-9000e75a","path":"/code/rabbitmq/03/02.html","title":"使用交换器和队列","lang":"zh-CN","frontmatter":{"summary":"使用交换器和队列 交换器和队列再 AMQP 中高层面的构建模块，应用程序需确保在使用他们的时候，就已经存在了，在使用之前需要先声明（declare）他们 创建临时队列： 上面创建一个持久化的、绑定类型为 direct 的交换器，同时也创建了一个非持久化的、排他的、自动删除的队列（队列名称由 RabbitMQ 自动生成）。这里交换器和队列没有设置特殊的参数。 ","head":[["meta",{"property":"og:url","content":"https://bamboo-qiqing.github.io/code/rabbitmq/03/02.html"}],["meta",{"property":"og:site_name","content":"Bamboo"}],["meta",{"property":"og:title","content":"使用交换器和队列"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://bamboo-qiqing.github.io/"}],["meta",{"property":"og:updated_time","content":"2022-07-15T03:26:30.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"使用交换器和队列"}],["meta",{"property":"article:modified_time","content":"2022-07-15T03:26:30.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"exchangeDeclare 方法详解","slug":"exchangedeclare-方法详解","link":"#exchangedeclare-方法详解","children":[{"level":3,"title":"exchangeDeclareNoWait","slug":"exchangedeclarenowait","link":"#exchangedeclarenowait","children":[]},{"level":3,"title":"exchangeDeclarePassive","slug":"exchangedeclarepassive","link":"#exchangedeclarepassive","children":[]}]},{"level":2,"title":"exchangeDelete 方法详解","slug":"exchangedelete-方法详解","link":"#exchangedelete-方法详解","children":[]},{"level":2,"title":"queueDeclare 方法详解","slug":"queuedeclare-方法详解","link":"#queuedeclare-方法详解","children":[]},{"level":2,"title":"queueDelete 方法详解","slug":"queuedelete-方法详解","link":"#queuedelete-方法详解","children":[]},{"level":2,"title":"queueBind 方法详解","slug":"queuebind-方法详解","link":"#queuebind-方法详解","children":[]},{"level":2,"title":"exchangeBind","slug":"exchangebind","link":"#exchangebind","children":[]},{"level":2,"title":"何时创建","slug":"何时创建","link":"#何时创建","children":[]}],"git":{"createdTime":1657855590000,"updatedTime":1657855590000,"contributors":[{"name":"guoqing","email":"15225822319@163.com","commits":1}]},"readingTime":{"minutes":5.48,"words":1645},"filePathRelative":"code/rabbitmq/03/02.md","localizedDate":"2022年7月15日"}');export{e as data};