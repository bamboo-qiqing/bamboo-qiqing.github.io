import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e as t}from"./app.b354d91e.js";const e={},o=t(`<h1 id="集群搭建" tabindex="-1"><a class="header-anchor" href="#集群搭建" aria-hidden="true">#</a> 集群搭建</h1><p>单机问题就是不能高可用，吞吐量有瓶颈、存储有瓶颈。搭建集群才能解决这些</p><p>但是 RabbitMQ 集群不能保证消息的万无一失，当集群中一个 RabbitMQ 节点崩溃时，该节点上的所有队列中的消息也会丢失。RabbitMQ 集群中的所有节点都会备份所有的元数据信息，包括以下内容：</p><ul><li>队列元数据：队列名称和属性</li><li>交换器元数据：交换器名称和属性</li><li>绑定关系元数据：交换器与队列或交换器与交换器之间的绑定关系</li><li>vhost 元数据：为 vhost 内的队列、交换器和绑定提供命名空间及安全属性</li></ul><p>但是不会备份消息（可以通过特殊的镜像队列解决这个问题）。</p><p>基于存储空间和性能的考虑， 在 RabbitMQ 集群中 <strong>创建队列</strong>，集群只会在 <strong>单个节点</strong> 上创建队列的进程并包含完整的队列信息（元数据、状态、内容），这样只有 **队列的宿主节点 **知道队列的所有信息，<strong>其他节点只知道队列的元数据</strong> 和 <strong>指向该队列存在的那个节点的指针</strong>。因此当集群节点崩溃时，该节点的队列进程和关联的绑定都会消失。订阅这个队列的上的消费者也会丢失所订阅的信息，并且任何匹配该队列绑定信息的新消息也会消失。</p><p><strong>交换器</strong> 其实只是一个名称和绑定列表，当消息发布到交换器时，实际上是由 <strong>所连接的信道</strong> 将 <strong>消息上的路由键同交换器的绑定列表进行比较</strong>，然后再路由消息。当创建一个新的交换器时，RabbitMQ 要做的是 <strong>将绑定列表添加到集群中的所有节点上</strong>，这样，每个节点的每条信道都可以访问到新的交换器了</p><h2 id="多机多节点配置" tabindex="-1"><a class="header-anchor" href="#多机多节点配置" aria-hidden="true">#</a> 多机多节点配置</h2><p>每台机器上部署一个 RabbitMQ，组成的 RabbitMQ 集群。</p><p>由于 RabbitMQ 集群对延迟非常敏感，需要在局域网中组成集群，广域网集群可以使用 Federation 或则 Shovel 来代替。</p><h3 id="部署节规划" tabindex="-1"><a class="header-anchor" href="#部署节规划" aria-hidden="true">#</a> 部署节规划：</h3><table><thead><tr><th>名称</th><th>ip</th></tr></thead><tbody><tr><td>node1</td><td>192.168.0.2</td></tr><tr><td>node2</td><td>192.168.0.3</td></tr><tr><td>node3</td><td>192.168.0.4</td></tr></tbody></table><p>在三台机器上安装好 RabbitMQ。然后修改各个节点的 <code>/etc/hosts</code> 文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 让机器之间通过 hostname 访问</span>
<span class="token function">vim</span> /etc/hosts

<span class="token number">192.168</span>.110.10 node1
<span class="token number">192.168</span>.110.12 node2
<span class="token number">192.168</span>.110.13 node3

<span class="token comment"># 设置每台机器的 hostname，用 hostname 命令</span>
hostnamectl  set-hostname node1

<span class="token comment"># 配置每个节点上的 nodename，内容配置为上面设置的 hostname</span>
/opt/rabbitmq/etc/rabbitmq/rabbitmq-env.conf
<span class="token comment"># 内容为对应的 hostname</span>
<span class="token assign-left variable">NODENAME</span><span class="token operator">=</span>rabbit@node1

<span class="token comment"># 修改完成之后，重启机器让 hostname 生效</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编辑 RabbitMQ 的 cookie 文件，<strong>确保各个节点的 cookie 文件使用的是同一个值</strong>。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cookie 文件默认路径在：/var/lib/rabbitmq/.erlang.cookie</span>
<span class="token comment"># 或则在： $HOME/.erlang.cookie</span>
<span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># vim /root/.erlang.cookie</span>
TGPVCOQIXBHWWDHUCJGP
<span class="token comment"># 可以用其中的一台上面的 cookie 复制到其他节点上</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>cookie 相当于密匙令牌，所以要一致。</p><h3 id="配置集群" tabindex="-1"><a class="header-anchor" href="#配置集群" aria-hidden="true">#</a> 配置集群</h3><p>可以通过：</p><ul><li>rabbitmqctl ：常用，本节讲解这种</li><li>rabbitmq.config 配置文件</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 先启动三个节点的 RabbitMQ 服务</span>
rabbitmq-server <span class="token parameter variable">-detached</span>

<span class="token comment"># 目前这三个节点都是独立的单节点集群</span>
<span class="token comment"># 可以查看他们的集群状态信息</span>
<span class="token punctuation">[</span>root@study rabbitmq<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl cluster_status</span>
Cluster status of <span class="token function">node</span> node1@node1
<span class="token punctuation">[</span><span class="token punctuation">{</span>nodes,<span class="token punctuation">[</span><span class="token punctuation">{</span>disc,<span class="token punctuation">[</span>node1@node1<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>running_nodes,<span class="token punctuation">[</span>node1@node1<span class="token punctuation">]</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>cluster_name,<span class="token operator">&lt;&lt;</span><span class="token string">&quot;node1@node1&quot;</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>partitions,<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>alarms,<span class="token punctuation">[</span><span class="token punctuation">{</span>node1@node1,<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span>


<span class="token comment"># 然后以 node1 为基准，将其他两个节点加入到 node1 节点的集群中</span>
<span class="token comment"># 加入要执行以下命令，在其他两个节点上执行</span>
<span class="token comment"># 0. 要先打开每台机器上的 4369 端口，加入集群需要访问这个端口</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">4369</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">25672</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--reload</span>

<span class="token comment"># 1. 停止 rabbitmq 应用</span>
rabbitmqctl stop_app
<span class="token comment"># 2. 重置</span>
rabbitmqctl reset
<span class="token comment"># 3. 加入集群</span>
<span class="token punctuation">[</span>root@node2 ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl join_cluster rabbit@node1</span>
Clustering <span class="token function">node</span> rabbit@node2 with rabbit@node1
<span class="token comment"># 3. 启动 rabbitmq 应用</span>
rabbitmqctl start_app

<span class="token comment"># 再次查看集群状态</span>
<span class="token punctuation">[</span>root@node1 ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl cluster_status</span>
Cluster status of <span class="token function">node</span> rabbit@node1
<span class="token punctuation">[</span><span class="token punctuation">{</span>nodes,<span class="token punctuation">[</span><span class="token punctuation">{</span>disc,<span class="token punctuation">[</span>rabbit@node1,rabbit@node2,rabbit@node3<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>running_nodes,<span class="token punctuation">[</span>rabbit@node2,rabbit@node3,rabbit@node1<span class="token punctuation">]</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>cluster_name,<span class="token operator">&lt;&lt;</span><span class="token string">&quot;rabbit@node1&quot;</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>partitions,<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>alarms,<span class="token punctuation">[</span><span class="token punctuation">{</span>rabbit@node2,<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span>rabbit@node3,<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span>rabbit@node1,<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
 <span class="token comment"># 发现已经加入进来了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关闭集群" tabindex="-1"><a class="header-anchor" href="#关闭集群" aria-hidden="true">#</a> 关闭集群</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 关闭 node2 节点的应用</span>
<span class="token punctuation">[</span>root@node2 ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl stop_app</span>
Stopping rabbit application on <span class="token function">node</span> rabbit@node2

<span class="token comment"># 然后查看集群状态</span>
<span class="token comment"># 会看到 running_nodes 中的确少了一个</span>
<span class="token punctuation">[</span>root@node1 ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl cluster_status</span>
Cluster status of <span class="token function">node</span> rabbit@node1
<span class="token punctuation">[</span><span class="token punctuation">{</span>nodes,<span class="token punctuation">[</span><span class="token punctuation">{</span>disc,<span class="token punctuation">[</span>rabbit@node1,rabbit@node2,rabbit@node3<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>running_nodes,<span class="token punctuation">[</span>rabbit@node3,rabbit@node1<span class="token punctuation">]</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>cluster_name,<span class="token operator">&lt;&lt;</span><span class="token string">&quot;rabbit@node1&quot;</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>partitions,<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>alarms,<span class="token punctuation">[</span><span class="token punctuation">{</span>rabbit@node3,<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span>rabbit@node1,<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果关闭了集群中的所有节点，则需要确保 <strong>最后关闭的那个节点是第一个启动</strong> 的，如果不是最后关闭的节点被第一个启动，该节点会默认等待 30 秒（新版有重试机制，时间另算），等待最后一个节点的启动，等待不到，则自己启动失败。</p><p>如果因为最后一个节点启动不了，可以参考前一章节的集群管理命令，将这个节点踢出去，选择其他的节点启动。（也可以本章下一小节的内容）</p><h2 id="集群节点类型" tabindex="-1"><a class="header-anchor" href="#集群节点类型" aria-hidden="true">#</a> 集群节点类型</h2><p>查看集群状态信息时，会看到 <code>{nodes,[{disc,[rabbit@node1,rabbit@node2,rabbit@node3]}</code> 的信息。其中 <strong>disc</strong> 就是 RabbitMQ 节点的类型。有两种类型：</p><ul><li><p>disc：磁盘节点</p><p>元数据保存在磁盘上</p></li><li><p>ram：内存节点</p><p>将所有的 队列、交换器、绑定关系、用户、权限和 vhost 的 <strong>元数据</strong> 都存储在内存中。</p></li></ul><p>单节点的集群中，只能有磁盘类型的节点，否则重启 RabbitMQ 后，所有系统配置信息都会丢失。在集群节点中，可以选择配置部分节点为内存节点，可以获得更好的信息。</p><p>比如将 node2 加入节点时指定为内存节点</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 加入节点时指定 --ram 参数</span>
<span class="token punctuation">[</span>root@node2 ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl join_cluster rabbit@node1 --ram</span>
Clustering <span class="token function">node</span> rabbit@node2 with rabbit@node1

<span class="token comment"># 如果已经加入了集群，则可以更改节点类型</span>
rabbitmqctl change_cluster_node_type <span class="token punctuation">{</span>disc,ram<span class="token punctuation">}</span>

<span class="token punctuation">[</span>root@node1 ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl cluster_status</span>
Cluster status of <span class="token function">node</span> rabbit@node1
<span class="token punctuation">[</span><span class="token punctuation">{</span>nodes,<span class="token punctuation">[</span><span class="token punctuation">{</span>disc,<span class="token punctuation">[</span>rabbit@node1,rabbit@node3<span class="token punctuation">]</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span>ram,<span class="token punctuation">[</span>rabbit@node2<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>running_nodes,<span class="token punctuation">[</span>rabbit@node3,rabbit@node1<span class="token punctuation">]</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>cluster_name,<span class="token operator">&lt;&lt;</span><span class="token string">&quot;rabbit@node1&quot;</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>partitions,<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>alarms,<span class="token punctuation">[</span><span class="token punctuation">{</span>rabbit@node3,<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span>rabbit@node1,<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在集群中创建队列、交换器或则绑定关系时，这些操作直到 <strong>所有集群节点都成功提交元数据变更后才会返回</strong>，这就意味着磁盘节点会耗费更多的时间，而内存节点将耗费更少的时间。</p><ul><li>内存节点：提供出色的性能</li><li>磁盘节点：能保证集群配置信息的高可靠性</li></ul><p>RabbitMQ· 只要求在 <strong>集群中至少有一个磁盘节点</strong>，当节点加入或则离开集群时，他们必须将变更通知到至少一个磁盘节点。如果 <strong>只有一个磁盘节点</strong>，该节点 <strong>崩溃</strong> 的话，那么 <strong>将不能执行创建队列、交换器、绑定关系、用户、更改权限、添加或删除集群节点的操作了</strong>，但是可以继续收发信息。</p><p>内存节点重启后，会连接到预先配置的磁盘节点，下载当前集群元数据的副本。当在集群中添加内存节点时，确保告知其所有的磁盘节点（<strong>内存节点唯一存储到磁盘的元数据信息是集群中磁盘节点的地址</strong>），只要内存节点可以找到至少一个磁盘节点，那么它在重启后，就能重新加入集群</p><h3 id="如何选择磁盘节点类型" tabindex="-1"><a class="header-anchor" href="#如何选择磁盘节点类型" aria-hidden="true">#</a> 如何选择磁盘节点类型？</h3><p>如上所述，再看场景：只有在使用 RPC 功能时，创建队列、交换器绑定关系等的操作会很频繁，其他的场景都不频繁，所以建议都使用磁盘节点类型</p><h2 id="剔除单个节点" tabindex="-1"><a class="header-anchor" href="#剔除单个节点" aria-hidden="true">#</a> 剔除单个节点</h2><p>剔除单个节点有两种方式</p><h3 id="适合不再运行-rabbitmq-应用" tabindex="-1"><a class="header-anchor" href="#适合不再运行-rabbitmq-应用" aria-hidden="true">#</a> 适合不再运行 RabbitMQ 应用</h3><p>当一个节点不再运行 RabbitMQ 应用时，可以使用如下命令。比如将 node2 剔除</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 关闭 node2  </span>
<span class="token punctuation">[</span>root@node2 ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl stop_app</span>

<span class="token comment"># 在其他节点上将 node2 踢出去</span>
<span class="token punctuation">[</span>root@node1 ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl forget_cluster_node rabbit@node2</span>
Removing <span class="token function">node</span> rabbit@node2 from cluster
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种操作方式之后， node2 节点就无法运行起来了。</p><p>这本书讲的太乱了。完全才堆砌功能，也不说场景？感觉特别乱</p><p>下面的由于无法前面强制剔除了 node2， node2 无法启动了，下面的实验也无法做下去了，只记录</p><p>前面提到过，当关闭集群最后一个节点，该节点无法启动时，可以通过 forget_cluster_node 命令将此节点剔除当前集群。比如，集群按照 node3、node2、node1 的顺序关闭，如果要启动集群，就要先启动 node1 节点。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 按顺序关闭节点</span>
<span class="token punctuation">[</span>root@node3 ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl stop</span>
<span class="token punctuation">[</span>root@node2 ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl stop</span>
<span class="token punctuation">[</span>root@node3 ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl stop</span>

<span class="token comment"># 如果由于 node1 节点启动不起来了。</span>
<span class="token comment"># 可以在 node2 上剔除 node1 节点</span>
<span class="token comment"># 这里使用  -offline 是离线模式，由于 node2 启动不起来</span>
<span class="token punctuation">[</span>root@node2 ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl forget_cluster_node rabbit@node1 -offline</span>
<span class="token comment"># 然后启动</span>
<span class="token punctuation">[</span>root@node2 ~<span class="token punctuation">]</span><span class="token comment"># rabbitmq-server -detached</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="第二种方式" tabindex="-1"><a class="header-anchor" href="#第二种方式" aria-hidden="true">#</a> 第二种方式</h2><p>就是在能启动的情况下，哪个节点要退出，就使用 reset 命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@node2 ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl stop_app</span>
<span class="token punctuation">[</span>root@node2 ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl reset</span>
<span class="token punctuation">[</span>root@node2 ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl start_app</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,50),p=[o];function i(c,l){return s(),a("div",null,p)}const r=n(e,[["render",i],["__file","01.html.vue"]]);export{r as default};
