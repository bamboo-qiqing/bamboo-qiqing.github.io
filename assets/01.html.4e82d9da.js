import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as p,c as l,a as n,d as s,b as e,e as t,r as o}from"./app.b354d91e.js";const c={},r=t(`<h1 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h1><p>RabbitMQ 的环境变量都是以 <code>RABBITMQ_</code> 作为前缀，设置方式有如下两种：</p><ul><li><p>Shell 环境中设置</p><p>在 Shell 中设置，不需要 <code>RABBITMQ_</code> 这个前缀；</p><p>而且 <strong>优先级</strong> shell 最高，也就是说，当 shell 和 <code>rabbitmq-env.conf</code> 同时设置了一个变量，则 shell 中的生效</p></li><li><p><code>rabbitmq-env.conf</code> 环境变量配置文件中设置</p><p>默认路径在 <code>$RABBITMQ_HOME/etc/rabbitmq/</code> 目录下，可以在启动 RabbitMQ 服务时，指定 <code>RABBITMQ_CONF_ENV_FILE</code> 变量来设置此文件的路径</p></li></ul><h3 id="启动时使用环境变量" tabindex="-1"><a class="header-anchor" href="#启动时使用环境变量" aria-hidden="true">#</a> 启动时使用环境变量</h3><p>当采用 <code>rabbitmq-server -detached</code> 方式启动 RabbitMQ 服务时，此服务节点默认以 <code>rabbit@当前 Sheel 环境的 hostname）（主机名）</code>来命名。即 <code>rabbit@$HOSTNAME</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># echo $HOSTNAME</span>
study.centos.mrcode
<span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># hostname</span>
study.centos.mrcode
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是上面这样的，只会取第一个点前面的单词。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl cluster_status</span>
Cluster status of <span class="token function">node</span> rabbit@study
<span class="token punctuation">[</span><span class="token punctuation">{</span>nodes,<span class="token punctuation">[</span><span class="token punctuation">{</span>disc,<span class="token punctuation">[</span>rabbit@study<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>running_nodes,<span class="token punctuation">[</span>rabbit@study<span class="token punctuation">]</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>cluster_name,<span class="token operator">&lt;&lt;</span><span class="token string">&quot;rabbit@study&quot;</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>partitions,<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,
 <span class="token punctuation">{</span>alarms,<span class="token punctuation">[</span><span class="token punctuation">{</span>rabbit@study,<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要指定节点名称，可以在 <code>rabbitmq-server</code> 前添加变量来实现，如下所示</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># RABBITMQ_NODENAME=rabbit@study1 rabbitmq-server -detached</span>
Warning: PID <span class="token function">file</span> not written<span class="token punctuation">;</span> <span class="token parameter variable">-detached</span> was passed.
ERROR: epmd error <span class="token keyword">for</span> <span class="token function">host</span> study1: nxdomain <span class="token punctuation">(</span>non-existing domain<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>环境变量的使用方式是正常了，但是貌似不能随意指定。可能和版本有关系。</p><h3 id="通过配置文件使用环境变量" tabindex="-1"><a class="header-anchor" href="#通过配置文件使用环境变量" aria-hidden="true">#</a> 通过配置文件使用环境变量</h3><p>下面演示通过配置文件的方式来使用环境变量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入配置文件目录</span>
<span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># cd /opt/rabbitmq/etc/rabbitmq/</span>
<span class="token comment"># 发现没有环境配置文件</span>
<span class="token punctuation">[</span>root@study rabbitmq<span class="token punctuation">]</span><span class="token comment"># ll</span>
总用量 <span class="token number">4</span>
-rw-r--r--. <span class="token number">1</span> root root <span class="token number">23</span> <span class="token number">6</span>月  <span class="token number">29</span> 05:03 enabled_plugins

<span class="token comment"># 我们新建这个文件</span>
<span class="token punctuation">[</span>root@study rabbitmq<span class="token punctuation">]</span><span class="token comment"># vim rabbitmq-env.conf</span>
<span class="token comment"># 然后写一个 nodename 的变量</span>
<span class="token assign-left variable">NODENAME</span><span class="token operator">=</span>rabbit@node1

<span class="token comment"># 再启动看看该文件是否有生效，根据之前的测试，会读取到这个变量，并且会报错</span>
<span class="token punctuation">[</span>root@study rabbitmq<span class="token punctuation">]</span><span class="token comment"># rabbitmq-server -detached</span>
Warning: PID <span class="token function">file</span> not written<span class="token punctuation">;</span> <span class="token parameter variable">-detached</span> was passed.
ERROR: epmd error <span class="token keyword">for</span> <span class="token function">host</span> node1: nxdomain <span class="token punctuation">(</span>non-existing domain<span class="token punctuation">)</span>
<span class="token comment"># 能读取到，并且报错了，配置文件是生效的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于默认的取值规则，可以在 <code>$RABBITMQ_HOME/sbin/rabbitmq-defaults</code> 文件中查看</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@study sbin<span class="token punctuation">]</span><span class="token comment"># cat /opt/rabbitmq/sbin/rabbitmq-defaults</span>
<span class="token comment">#!/bin/sh -e</span>

<span class="token comment">### next line potentially updated in package install steps</span>
<span class="token assign-left variable">SYS_PREFIX</span><span class="token operator">=</span><span class="token variable">\${RABBITMQ_HOME}</span>

<span class="token comment">### next line will be updated when generating a standalone release</span>
<span class="token assign-left variable">ERL_DIR</span><span class="token operator">=</span>

<span class="token assign-left variable">CLEAN_BOOT_FILE</span><span class="token operator">=</span>start_clean
<span class="token assign-left variable">SASL_BOOT_FILE</span><span class="token operator">=</span>start_sasl

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;<span class="token variable">\${RABBITMQ_HOME}</span>/erlang.mk&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token comment"># RabbitMQ is executed from its source directory. The plugins</span>
    <span class="token comment"># directory and ERL_LIBS are tuned based on this.</span>
    <span class="token assign-left variable">RABBITMQ_DEV_ENV</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token keyword">fi</span>

<span class="token comment">## Set default values</span>

<span class="token assign-left variable">BOOT_MODULE</span><span class="token operator">=</span><span class="token string">&quot;rabbit&quot;</span>

<span class="token assign-left variable">CONFIG_FILE</span><span class="token operator">=</span><span class="token variable">\${SYS_PREFIX}</span>/etc/rabbitmq/rabbitmq
<span class="token assign-left variable">LOG_BASE</span><span class="token operator">=</span><span class="token variable">\${SYS_PREFIX}</span>/var/log/rabbitmq
<span class="token assign-left variable">MNESIA_BASE</span><span class="token operator">=</span><span class="token variable">\${SYS_PREFIX}</span>/var/lib/rabbitmq/mnesia
<span class="token assign-left variable">ENABLED_PLUGINS_FILE</span><span class="token operator">=</span><span class="token variable">\${SYS_PREFIX}</span>/etc/rabbitmq/enabled_plugins

<span class="token assign-left variable">PLUGINS_DIR</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${RABBITMQ_HOME}</span>/plugins&quot;</span>

<span class="token comment"># RABBIT_HOME can contain a version number, so default plugins</span>
<span class="token comment"># directory can be hard to find if we want to package some plugin</span>
<span class="token comment"># separately. When RABBITMQ_HOME points to a standard location where</span>
<span class="token comment"># it&#39;s usually being installed by package managers, we add</span>
<span class="token comment"># &quot;/usr/lib/rabbitmq/plugins&quot; to plugin search path.</span>
<span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$RABBITMQ_HOME</span>&quot;</span> <span class="token keyword">in</span>
    /usr/lib/rabbitmq/*<span class="token punctuation">)</span>
        <span class="token assign-left variable">PLUGINS_DIR</span><span class="token operator">=</span><span class="token string">&quot;/usr/lib/rabbitmq/plugins:<span class="token variable">$PLUGINS_DIR</span>&quot;</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>

<span class="token assign-left variable">CONF_ENV_FILE</span><span class="token operator">=</span><span class="token variable">\${SYS_PREFIX}</span>/etc/rabbitmq/rabbitmq-env.conf
<span class="token comment"># 可以看到在这里引用了 rabbitmq-env.conf 路径</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先给出官方的配置文档：</p>`,17),d={href:"https://www.rabbitmq.com/rabbitmq-env.conf.5.html",target:"_blank",rel:"noopener noreferrer"},u={href:"https://www.rabbitmq.com/configure.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.rabbitmq.com/configure.html#supported-environment-variables",target:"_blank",rel:"noopener noreferrer"},m=t(`<p>下面总结一些常用的 RabbitMQ 变量，完成的变量还是去官方查找（笔者发现下面的某些变量在最新版本的官方文档中就已经不在了，还是需要去官方文档看才保险）</p><ul><li><p>RABBITMQ_NODE_PORT</p><p>监听客户端链接的端口号。</p><p>默认为 5672</p></li><li><p>RABBITMQ_DIST_PORT</p><p>RabbitMQ 节点内部通信端口，默认值为 RABBITMQ_NODE_PORT + 20000，即 25672，如果设置了 kernel.inet_dist_listen_min 或 kernel.inect_dist_listen_max 则此环境失效</p></li><li><p>RABBITMQ_NODENAME</p><p>RabbitMQ 节点名称，默认为 <code>rabbit@$HOSTNAME</code>，在每个 Erlang 节点和集群的组合中，节点名称必须唯一</p></li><li><p>RABBITMQ_CONF_ENV_FILE</p><p>环境变量配置文件地址，指定文件 <code>rabbitmq-env.conf</code> 的地址。</p><p>默认值为 <code>#RABBITMQ_HOME/etc/rabbitmq/rabbitmq-env.conf</code></p></li><li><p>RABBITMQ_USE_LONGNAME</p><p>使用长名称命名，如果当前的 hostname 为 node1.longname，那么默认情况下创建的节点名为 rabbit@node1。</p><p>将此参数设置为 true 时，创建的节点名称为 rabbit@node1.longname</p></li><li><p>RABBITMQ_CONFIG_FILE</p><p>配置文件路径。</p><p>默认值为 <code>$RABBITMQ_HOME/etc/rabbitmq/rabbitmq</code> ，注意，该文件没文件后缀</p></li><li><p>RABBITMQ_MNESIA_BASE</p><p>RABBITMQ_MNESIA_DIR 的父目录。除非明确设置了 RABBITMQ_MNESIA_DIR 目录，否则每个节点都应该配置这个环境变量</p><p>默认值为：<code>$RABBITMQ_HOME/var/lib/rabbitmq/mnesia</code></p><p>对于 RabbitMQ 的操作用户来说，需要对当前目录可读、科协、可创建文件及子目录的权限</p></li><li><p>RABBITMQ_MNESIA_DIR</p><p>包含 RabbitMQ 服务节点的数据库、数据存储及集群状态等目录</p><p>默认值为：<code>$RABBITMQ_MNESIA_BASE/$RABBITMQ_NODENAME</code></p></li><li><p>RABBITMQ_LOGS</p><p>RabbitMQ 服务于 Erlang 相关的日志。</p><p>默认值为 <code>$RABBITMQ_LOG_BASE/$RABBITMQ_NODENAME</code>.log\`</p></li><li><p>RABBITMQ_LOG_BASE</p><p>RabbitMQ 服务日志所在基础目录。</p><p>默认值为 <code>$RABBITMQ_HOME/var/log/rabbitmq</code></p></li><li><p>RABBITMQ_SASL_LOGS</p><p>RabbitMQ 服务与 Erlang 的 SASL（System Application Support Libraries）相关的日志。</p><p>默认值为 <code>$RABBITMQ_LOG_BASE/$RABBITMQ_NODENAME-sasl.log</code></p></li><li><p>RABBITMQ_PLUGINS_DIR</p><p>插件所在路径。</p><p>默认值为 <code>$RABBITMQ_LOG_BASE/plugins</code></p></li></ul><p>如果没有特殊需求，不建议更改 RabbitMQ 环境变量。在生产环境中，对于配置和日志有特殊的管理目录，那么可以参考以下相应的配置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 配置文件地址</span>
<span class="token assign-left variable">CONFIG_FILE</span><span class="token operator">=</span>/apps/conf/rabbitmq/rabbitmq
<span class="token comment"># 环境变量的配置文件地址</span>
<span class="token assign-left variable">CONF_ENV_FILE</span><span class="token operator">=</span>/apps/conf/rabbitmq/rabbitmq-env.conf
<span class="token comment"># 服务日志地址</span>
<span class="token assign-left variable">LOG_BASE</span><span class="token operator">=</span>/apps/logs/rabbitmq
<span class="token comment"># mnesia 路径</span>
<span class="token assign-left variable">MNESIA_BASE</span><span class="token operator">=</span>/app/dbdat/rabbitmq/mnesia

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function v(k,_){const a=o("ExternalLinkIcon");return p(),l("div",null,[r,n("ul",null,[n("li",null,[n("a",d,[s("rabbitmq-env.conf"),e(a)])]),n("li",null,[n("a",u,[s("configure"),e(a)])]),n("li",null,[n("a",b,[s("supported-environment-variables"),e(a)]),s(" 支持的环境变量")])]),m])}const h=i(c,[["render",v],["__file","01.html.vue"]]);export{h as default};
