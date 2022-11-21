import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as a,e as t}from"./app.b354d91e.js";const e={},i=t(`<h1 id="多租户与权限-vhost" tabindex="-1"><a class="header-anchor" href="#多租户与权限-vhost" aria-hidden="true">#</a> 多租户与权限：vhost</h1><p>每一个 RabbitMQ 服务器都能创建 <strong>虚拟的消息服务器</strong>，称之为 <strong>虚拟主机（virtual host）</strong>，简称 <strong>vhost</strong>。</p><p>vhost 本质上是一个独立的小型 RabbitMQ 服务器，拥有自己独立的队列、交换器、绑定关系等，并且 <strong>拥有自己独立的权限</strong>。</p><p>vhost 可避免队列和交换器等命名冲突，<strong>vhost 之间是绝对隔离的</strong>，无法将 vhost1 中的交换器与 vhost2 中的队列进行绑定，这样的机制既保证了安全性，又确保可移植性。</p><p>如果使用的 RabbitMQ 达到一定规模的时候，<strong>建议用户对业务功能、场景进行归类区分，并分配独立的 vhost</strong></p><p>vhost 是 AMQP 概念的基础，客户端在联机的时候 <strong>必须指定一个 vhost</strong>。RabbitMQ 默认创建的 vhost 为 <code>/</code>，使用默认的用户名 guest 和密码 guest 就可以访问它。但是为了安装和方便，建议重新建立一个新的用户来访问它。</p><p>下面对 rabbitmqctl 进行讲解</p><h2 id="创建-vhost-add-host" tabindex="-1"><a class="header-anchor" href="#创建-vhost-add-host" aria-hidden="true">#</a> 创建 vhost：add_host</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rabbitmqctl add_host <span class="token punctuation">{</span>vhost<span class="token punctuation">}</span>

vhost: 就是 vhost 名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实践练习</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl add_vhost vhost1</span>
Creating vhost <span class="token string">&quot;vhost1&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vhost-查看-list-vhosts" tabindex="-1"><a class="header-anchor" href="#vhost-查看-list-vhosts" aria-hidden="true">#</a> vhost 查看：list_vhosts</h2><p>查看 vhost 的相关信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rabbitmqctl list_vhosts <span class="token punctuation">[</span>vhostinfoitem<span class="token punctuation">..</span>.<span class="token punctuation">]</span>

vhostinfoitem 参数：
	name： vhost 名称
	tracing：表示是否使用了 RabbitMQ 的 trace 功能。trace 功能 RabbitMQ 扩展中讲解
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实践练习</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl list_vhosts name tracing</span>
Listing vhosts
vhost1	<span class="token boolean">false</span>
/	    <span class="token boolean">false</span>

<span class="token comment"># 打开 trace 功能</span>
<span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl trace_on</span>
Starting tracing <span class="token keyword">for</span> vhost <span class="token string">&quot;/&quot;</span>

<span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl list_vhosts name tracing</span>
Listing vhosts
vhost1	<span class="token boolean">false</span>
/	    <span class="token boolean">true</span>			<span class="token comment"># 可以看到这里变成了 true</span>
	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除-vhost-delete-host" tabindex="-1"><a class="header-anchor" href="#删除-vhost-delete-host" aria-hidden="true">#</a> 删除 vhost：delete_host</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rabbitmqctl delete_host <span class="token punctuation">{</span>vhost<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除一个 vhost ，同时也会删除下面的队列、交换器、绑定关系、用户权限、参数和策略等信息。</p><p>实践练习</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl delete_vhost vhost1</span>
Deleting vhost <span class="token string">&quot;vhost1&quot;</span>

<span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl list_vhosts</span>
Listing vhosts
/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="权限授予-set-permissions" tabindex="-1"><a class="header-anchor" href="#权限授予-set-permissions" aria-hidden="true">#</a> 权限授予：set_permissions</h2><p>AMQP 协议中并没有指定权限在 vhost 级别还是在服务器级别实现，由具体的应用自定义。</p><p>在 RabbitMQ 中，权限以 vhost 为单位。在 <strong>创建一个用户时</strong>，用户通常会被 <strong>指派给至少一个 vhost</strong>，意味着该用户只能访问被指派的 vhost 内的资源。</p><p>授予权限命令为</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rabbitmqctl set_permissions <span class="token punctuation">[</span>-p vhost<span class="token punctuation">]</span> <span class="token punctuation">{</span>user<span class="token punctuation">}</span> <span class="token punctuation">{</span>conf<span class="token punctuation">}</span> <span class="token punctuation">{</span>write<span class="token punctuation">}</span> <span class="token punctuation">{</span>read<span class="token punctuation">}</span>

参数含义：
 <span class="token variable"><span class="token variable">\`</span><span class="token parameter variable">-p</span> vhost<span class="token variable">\`</span></span>：给哪一个 vhost 授权用户访问权限
 user：给哪一个用户指定权限
 conf： 用于匹配用户在哪些资源上拥有可配置权限的正则表达式；指：队列和交换器的创建及删除之类的操作
 write：用于匹配用户在哪些资源上拥有可写权限的正则表达式；指：发布消息
 read： 用于匹配用户在哪些资源上拥有可读权限的正则表达式；指：与消息有关的操作，包括读取消息及清空整个队列等
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下表展示了不同 AMQP 命令的列表和对应的权限</p><table><thead><tr><th>AMQP 命令</th><th>可配置</th><th>可写</th><th>可读</th></tr></thead><tbody><tr><td><code>Exchange.Declare</code></td><td>exchange</td><td></td><td></td></tr><tr><td><code>Exchange.Declare(with AE)</code></td><td>exchange</td><td>exchange(AE)</td><td>exchange</td></tr><tr><td><code>Exchange.Delete</code></td><td>exchange</td><td></td><td></td></tr><tr><td><code>Queue.Declare</code></td><td>queue</td><td></td><td></td></tr><tr><td><code>Queue.Declare(with DLX)</code></td><td>queue</td><td>exchange(DLX)</td><td>queue</td></tr><tr><td><code>Queue.Delete</code></td><td>queue</td><td></td><td></td></tr><tr><td><code>Exchange.Bind</code></td><td></td><td>exchange(destination)</td><td>exchange(source)</td></tr><tr><td><code>Exchange.Unbind</code></td><td></td><td>exchange(destination)</td><td>exchange(source)</td></tr><tr><td><code>Queue.Bind</code></td><td></td><td>queue</td><td>exchange</td></tr><tr><td><code>Queue.Unbind</code></td><td></td><td>queue</td><td>exchange</td></tr><tr><td><code>Basic.Publish</code></td><td></td><td>exchange</td><td></td></tr><tr><td><code>Basic.Get</code></td><td></td><td></td><td>queue</td></tr><tr><td><code>Basic.Consume</code></td><td></td><td></td><td>queue</td></tr><tr><td><code>Queue.Purge</code></td><td></td><td></td><td>queue</td></tr></tbody></table><p>实践练习：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 示例 1. 授予 admin 用户可访问虚拟主机 vhost1，并且在所有资源上都具备可配置、可写、可读的权限</span>
<span class="token comment"># 	 前提是 vhost 要存在</span>
<span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl set_permissions -p vhost1 admin &quot;.*&quot; &quot;.*&quot; &quot;.*&quot;</span>
Setting permissions <span class="token keyword">for</span> user <span class="token string">&quot;admin&quot;</span> <span class="token keyword">in</span> vhost <span class="token string">&quot;vhost1&quot;</span>

<span class="token comment"># 示例 2. 授予 admin 可访问虚拟主机 vhost2，在 queue 开头的资源上具备可配置权限，并在所有资源上拥有可写、可读权限</span>
<span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl set_permissions -p vhost2 admin &quot;^queue.*&quot; &quot;.*&quot; &quot;.*&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vhost-权限查看-list-permissions" tabindex="-1"><a class="header-anchor" href="#vhost-权限查看-list-permissions" aria-hidden="true">#</a> vhost 权限查看：list_permissions</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rabbitmqctl list_permissions <span class="token punctuation">[</span>-p vhost<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看虚拟主机上的权限</p><p>实践练习：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl list_permissions -p vhost1</span>
Listing permissions <span class="token keyword">in</span> vhost <span class="token string">&quot;vhost1&quot;</span>
admin	.*	.*	.*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="用户权限查看-list-user-permissions" tabindex="-1"><a class="header-anchor" href="#用户权限查看-list-user-permissions" aria-hidden="true">#</a> 用户权限查看：list_user_permissions</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rabbitmqctl list_user_permissions <span class="token punctuation">{</span>username<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显示用户权限</p><p>实践练习：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl list_user_permissions admin</span>
Listing permissions <span class="token keyword">for</span> user <span class="token string">&quot;admin&quot;</span>
vhost1	.*	.*	.*
/		.*	.*	.*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="清除权限-clear-permissions" tabindex="-1"><a class="header-anchor" href="#清除权限-clear-permissions" aria-hidden="true">#</a> 清除权限：clear_permissions</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rabbitmqctl clear_permissions <span class="token punctuation">[</span>-p vhost<span class="token punctuation">]</span> <span class="token punctuation">{</span>username<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>实践练习</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl clear_permissions -p vhost1 admin</span>
Clearing permissions <span class="token keyword">for</span> user <span class="token string">&quot;admin&quot;</span> <span class="token keyword">in</span> vhost <span class="token string">&quot;vhost1&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rabbitmqctl-标准语法" tabindex="-1"><a class="header-anchor" href="#rabbitmqctl-标准语法" aria-hidden="true">#</a> rabbitmqctl 标准语法</h2><p>上述讲到的管理功能都是通过 rabbitmqctl 来操作的。它通过 <strong>连接各个 RabbitMQ 节点来执行所有操作</strong>。</p><p>如果有节点没有运行，将显示诊断信息：不能到达或因不匹配的 Erlang cookie（后续章节：RabbitMQ 运维中讲解）而拒绝连接。</p><p>标准语法如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rabbitmqctl <span class="token punctuation">[</span>-n node<span class="token punctuation">]</span> <span class="token punctuation">[</span>-t timeout<span class="token punctuation">]</span> <span class="token punctuation">[</span>-q<span class="token punctuation">]</span> <span class="token punctuation">{</span>command<span class="token punctuation">}</span> <span class="token punctuation">[</span>command options<span class="token punctuation">..</span>.<span class="token punctuation">]</span>

参数说明：
	<span class="token parameter variable">-n</span> node：默认节点是「rabbit@hostname」, <span class="token function">hostname</span> 是主机名称。
		     在一个名为「node.hidden.com」的主机上，RabbitMQ 节点的名称通常是 rabbit@node <span class="token punctuation">(</span>除非是 RABBITMQ_NODENAME 参数在启动时被设置了自定义的值<span class="token punctuation">)</span>
		     在 linux 指令的 <span class="token variable"><span class="token variable">\`</span><span class="token function">hostname</span> <span class="token parameter variable">-s</span><span class="token variable">\`</span></span> 下，通常输出的就是 @ 后面的信息
	<span class="token parameter variable">-t</span> timeout：操作超时时间，单位是秒。只适用于 list_xxx 类型的命令，默认无超时
	-q：启用 quiet 模式，可以屏蔽一些消息的输出。默认不开启
	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><p>实践练习：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 演示 -q 和 -t timeout 的效果</span>
<span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl list_vhosts</span>
Listing vhosts
vhost1
/
<span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl list_vhosts -q</span>
vhost1				<span class="token comment"># 使用 -q 看到这里少了一列 vhosts 的输出</span>
/
<span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl list_vhosts -q -t 1</span>
vhost1
/
<span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl list_vhosts -q -t 0</span>
Error: <span class="token punctuation">{</span>timeout,0.0<span class="token punctuation">}</span>
<span class="token comment"># 这里可以看到超时信息了</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,52),d=[i];function o(c,l){return n(),a("div",null,d)}const u=s(e,[["render",o],["__file","01.html.vue"]]);export{u as default};
