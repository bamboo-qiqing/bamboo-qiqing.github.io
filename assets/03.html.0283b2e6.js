import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as s,e}from"./app.b354d91e.js";const t={},i=e(`<h1 id="web-端管理" tabindex="-1"><a class="header-anchor" href="#web-端管理" aria-hidden="true">#</a> Web 端管理</h1><p>使用 rabbitmqctl 工具管理 RabbitMQ，当前的用户需要拥有访问 Erlang cookie 的权限，由于服务器可能是以 guest 或则 root 用户身份来运行的，因此需要获得这些文件的访问权限，有可能就引申出来一些权限的管理问题。</p><p>还可以通过 RabbitMQ managemnent 插件来管理，它同样是由 Erlang 语言编写的，和 RabbitMQ 服务运行在同一个 erlang 虚拟机中。</p><p>该插件就是涵盖了所有 RabbitMQ 管理的功能。</p><p>使用 Web 管理界面需要启用 RabbitMQ management 插件，插件都默认放在 <code>$RABBITMQ_HOME/plugins</code> 目录下（也就是 RabbitMQ 安装目录下）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># ls /opt/rabbitmq/plugins/</span>
amqp_client-3.6.15.ez                        rabbitmq_federation-3.6.15.ez               rabbitmq_sharding-3.6.15.ez           rabbitmq_web_mqtt_examples-3.6.15.ez
cowboy-1.0.4.ez                              rabbitmq_federation_management-3.6.15.ez    rabbitmq_shovel-3.6.15.ez             rabbitmq_web_stomp-3.6.15.ez
cowlib-1.0.2.ez                              rabbitmq_jms_topic_exchange-3.6.15.ez       rabbitmq_shovel_management-3.6.15.ez  rabbitmq_web_stomp_examples-3.6.15.ez
rabbit_common-3.6.15.ez                      rabbitmq_management-3.6.15.ez               rabbitmq_stomp-3.6.15.ez              ranch-1.3.2.ez
rabbitmq_amqp1_0-3.6.15.ez                   rabbitmq_management_agent-3.6.15.ez         rabbitmq_top-3.6.15.ez                README
rabbitmq_auth_backend_ldap-3.6.15.ez         rabbitmq_management_visualiser-3.6.15.ez    rabbitmq_tracing-3.6.15.ez            recon-2.3.2.ez
rabbitmq_auth_mechanism_ssl-3.6.15.ez        rabbitmq_mqtt-3.6.15.ez                     rabbitmq_trust_store-3.6.15.ez        sockjs-0.3.4.ez
rabbitmq_consistent_hash_exchange-3.6.15.ez  rabbitmq_random_exchange-3.6.15.ez          rabbitmq_web_dispatch-3.6.15.ez
rabbitmq_event_exchange-3.6.15.ez            rabbitmq_recent_history_exchange-3.6.15.ez  rabbitmq_web_mqtt-3.6.15.ez
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>.ez</code> 结尾的就是插件了，其中 <code>rabbitmq_management-3.6.15.ez</code> 则是 web 管理插件。</p><h2 id="rabbitmq-plugins" tabindex="-1"><a class="header-anchor" href="#rabbitmq-plugins" aria-hidden="true">#</a> rabbitmq-plugins</h2><p>管理插件的工具就是 rabbitmq-plugins，语法如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rabbitmq-plugins <span class="token punctuation">[</span>-n node<span class="token punctuation">]</span> <span class="token punctuation">{</span>command<span class="token punctuation">}</span> <span class="token punctuation">[</span>command options<span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token builtin class-name">command</span> 参数：
	enable：启用插件
	disable：关闭插件
	list：查看当前插件使用情况
<span class="token builtin class-name">command</span> options 参数：
	plugin-name：插件名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启用插件" tabindex="-1"><a class="header-anchor" href="#启用插件" aria-hidden="true">#</a> 启用插件</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rabbitmq-plugins <span class="token builtin class-name">enable</span> <span class="token punctuation">{</span>plugin-name<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>实践练习</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启用 rabbitmq_management 插件</span>
<span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmq-plugins enable rabbitmq_management</span>
The following plugins have been enabled:
  amqp_client
  cowlib
  cowboy
  rabbitmq_web_dispatch
  rabbitmq_management_agent
  rabbitmq_management

Applying plugin configuration to rabbit@study<span class="token punctuation">..</span>. started <span class="token number">6</span> plugins.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启用 rabbitmq_management 插件后，需要重启 rabbitmq 服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 书上没有讲解怎么重启，笔者只能这样重启了</span>
<span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl stop</span>
Stopping and halting <span class="token function">node</span> rabbit@study
<span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmq-server -detached</span>
Warning: PID <span class="token function">file</span> not written<span class="token punctuation">;</span> <span class="token parameter variable">-detached</span> was passed.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开放防火墙，插件会使用 15672 提供服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">15672</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后访问，你的机器上的 15672 端口，比如笔者的 <code>http://192.168.4.250:15672</code>, 就能看到管理界面了</p><h2 id="查看插件使用情况" tabindex="-1"><a class="header-anchor" href="#查看插件使用情况" aria-hidden="true">#</a> 查看插件使用情况</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rabbitmq-plugins list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>实践练习</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmq-plugins list</span>
 Configured: E <span class="token operator">=</span> explicitly enabled<span class="token punctuation">;</span> e <span class="token operator">=</span> implicitly enabled
 <span class="token operator">|</span> Status:   * <span class="token operator">=</span> running on rabbit@study
 <span class="token operator">|</span>/
<span class="token punctuation">[</span>e*<span class="token punctuation">]</span> amqp_client                       <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>e*<span class="token punctuation">]</span> cowboy                            <span class="token number">1.0</span>.4
<span class="token punctuation">[</span>e*<span class="token punctuation">]</span> cowlib                            <span class="token number">1.0</span>.2
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_amqp1_0                  <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_auth_backend_ldap        <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_auth_mechanism_ssl       <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_consistent_hash_exchange <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_event_exchange           <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_federation               <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_federation_management    <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_jms_topic_exchange       <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>E*<span class="token punctuation">]</span> rabbitmq_management               <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>e*<span class="token punctuation">]</span> rabbitmq_management_agent         <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_management_visualiser    <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_mqtt                     <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_random_exchange          <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_recent_history_exchange  <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_sharding                 <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_shovel                   <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_shovel_management        <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_stomp                    <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_top                      <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_tracing                  <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_trust_store              <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>e*<span class="token punctuation">]</span> rabbitmq_web_dispatch             <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_web_mqtt                 <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_web_mqtt_examples        <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_web_stomp                <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> rabbitmq_web_stomp_examples       <span class="token number">3.6</span>.15
<span class="token punctuation">[</span>  <span class="token punctuation">]</span> sockjs                            <span class="token number">0.3</span>.4

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面也说明了：</p><ul><li>e：是隐式启用</li><li>E：显式启用</li><li><code>*</code> 在运行中的插件</li></ul><p>可以看到上面 rabbitmq_management 是 <code>E*</code> ，就是我们刚才显式启用的。</p><h2 id="关闭插件" tabindex="-1"><a class="header-anchor" href="#关闭插件" aria-hidden="true">#</a> 关闭插件</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rabbitmq-plugins disable <span class="token punctuation">{</span>plugin-name<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="web-界面" tabindex="-1"><a class="header-anchor" href="#web-界面" aria-hidden="true">#</a> web 界面</h2><p><code>http://192.168.4.250:15672</code> 后，可以使用我们创建的账户来登录</p><p>对于 web 界面的功能，这里就不再记录了，书上也只是截图了，其实他对应了前面讲解的一些管理功能。只是图形化了，可以参考前面的功能去界面上找对应的页面</p>`,31),p=[i];function l(c,o){return a(),s("div",null,p)}const r=n(t,[["render",l],["__file","03.html.vue"]]);export{r as default};
