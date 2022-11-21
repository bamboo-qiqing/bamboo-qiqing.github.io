import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as p,c,a as s,d as n,b as t,e as a,r as o}from"./app.b354d91e.js";const l={},u=a(`<h1 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h1><p>默认配置文件的位置和操作系统、RabbitMQ 版本有关，通过启动日志查看配置文件路径是最有效的方式。</p><p>默认的服务日志在：<code>$RABBITMQ_HOME/var/log/rabbitmq</code> 下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@study rabbitmq<span class="token punctuation">]</span><span class="token comment"># cat rabbit@study.log</span>

<span class="token operator">=</span>INFO <span class="token assign-left variable">REPORT</span><span class="token operator">==</span><span class="token operator">==</span> <span class="token number">30</span>-Jun-2020::05:21:26 <span class="token operator">==</span><span class="token operator">=</span>
Starting RabbitMQ <span class="token number">3.6</span>.15 on Erlang <span class="token number">19.3</span>
Copyright <span class="token punctuation">(</span>C<span class="token punctuation">)</span> <span class="token number">2007</span>-2018 Pivotal Software, Inc.
Licensed under the MPL.  See http://www.rabbitmq.com/

<span class="token operator">=</span>INFO <span class="token assign-left variable">REPORT</span><span class="token operator">==</span><span class="token operator">==</span> <span class="token number">30</span>-Jun-2020::05:21:26 <span class="token operator">==</span><span class="token operator">=</span>
<span class="token function">node</span>           <span class="token builtin class-name">:</span> rabbit@study
home <span class="token function">dir</span>       <span class="token builtin class-name">:</span> /root
config file<span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token builtin class-name">:</span> /opt/rabbitmq/etc/rabbitmq/rabbitmq.config <span class="token punctuation">(</span>not found<span class="token punctuation">)</span>
cookie <span class="token builtin class-name">hash</span>    <span class="token builtin class-name">:</span> pJEbdZ73MP/AuZep7/cVog<span class="token operator">==</span>
log            <span class="token builtin class-name">:</span> /opt/rabbitmq/var/log/rabbitmq/rabbit@study.log
sasl log       <span class="token builtin class-name">:</span> /opt/rabbitmq/var/log/rabbitmq/rabbit@study-sasl.log
database <span class="token function">dir</span>   <span class="token builtin class-name">:</span> /opt/rabbitmq/var/lib/rabbitmq/mnesia/rabbit@study

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>config file(s)</code> 这个就是配置文件的路径了。可以看到还显示了 not found。这里原因是我们没有这个配置文件的缘故。还可以检查 <code>RABBITMQ_CONFIG_FILE</code> 变量是否配置的是这个路径。</p>`,5),d={href:"https://www.rabbitmq.com/configure.html#config-file",target:"_blank",rel:"noopener noreferrer"},r=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>rabbit, <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>tcp_listeners, <span class="token punctuation">[</span><span class="token number">5673</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该配置将客户端连接的默认端口从 5672 修改为 5673.</p>`,2),b={href:"https://www.rabbitmq.com/configure.html#config-items",target:"_blank",rel:"noopener noreferrer"},v=a(`<h2 id="配置加密" tabindex="-1"><a class="header-anchor" href="#配置加密" aria-hidden="true">#</a> 配置加密</h2><p>配置文件中有一些敏感的配置项可以被加密，RabbitMQ 启动时可以对这些项进行解密。</p><p>对这些项进行加密并不是意味着系统的安全性增强了，而是遵从一些必要的规范，让一些敏感的数据不会出现在文本形式的配置文件中。</p><p>加密后的值以 <code>{encrypted,加密值}</code> 形式出现。比如下面配置中使用口令 <code>zzhpassphrase</code> 将密码 <code>guest</code> 加密</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>rabbit, <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>default_user, <span class="token operator">&lt;&lt;</span><span class="token string">&quot;guest&quot;</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">}</span>,
      <span class="token punctuation">{</span>default_pass,<span class="token punctuation">{</span>
      	<span class="token punctuation">{</span>encrypted,<span class="token operator">&lt;&lt;</span><span class="token string">&quot;xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx===假的值&quot;</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span>,
      <span class="token punctuation">{</span>loopback_users,<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,
      <span class="token punctuation">{</span>config_entry_decoder,<span class="token punctuation">[</span>
      	<span class="token punctuation">{</span>passphrase,<span class="token operator">&lt;&lt;</span><span class="token string">&quot;zzhpassphrase&quot;</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>loopback_users：配置为 <code>[]</code>，则可以使用非本地网络访问</li><li>config_entry_decoder：中 passphrase 配置的就是口令</li></ul><p>passphrase 中还可以用文件方式来赋值</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>rabbit, <span class="token punctuation">[</span>
	  <span class="token punctuation">..</span>.
      <span class="token punctuation">{</span>config_entry_decoder,<span class="token punctuation">[</span>
      	<span class="token punctuation">{</span>passphrase,<span class="token punctuation">{</span>file, <span class="token string">&quot;/path/to/passphrase/file&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加密串的产生：</p><div class="language-bas line-numbers-mode" data-ext="bas"><pre class="language-bas"><code>rabbitmqctl encode
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>比如下面演示 guest 加密串的值</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@study rabbitmq<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl encode &#39;&lt;&lt;&quot;guest&quot;&gt;&gt;&#39; zzhpassphrase</span>
<span class="token punctuation">{</span>encrypted,<span class="token operator">&lt;&lt;</span><span class="token string">&quot;gm+FzEoi1D2y66taDALT1/qvoW4n/mbI1xKVp12FexHJTV/dQgpn3N12dgh9sX1H6a1JRSXtCtf7uj6rUTPEzg==&quot;</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>对应的解密命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@study rabbitmq<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl encode --decode &#39;{encrypted,&lt;&lt;&quot;gm+FzEoi1D2y66taDALT1/qvoW4n/mbI1xKVp12FexHJTV/dQgpn3N12dgh9sX1H6a1JRSXtCtf7uj6rUTPEzg==&quot;&gt;&gt;}&#39; zzhpassphrase</span>
<span class="token operator">&lt;&lt;</span><span class="token string">&quot;guest&quot;</span><span class="token operator">&gt;&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，加密机制 PBKDF2 用来从口令中派生出密钥。默认的 Hash 算法是 SHA512，默认的迭代次数是 1000，以及默认的加密算法为 AES_256_CBC。可以在配置文件中进行修改。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>rabbit, <span class="token punctuation">[</span>
	  <span class="token punctuation">..</span>.
      <span class="token punctuation">{</span>config_entry_decoder,<span class="token punctuation">[</span>
      	 <span class="token punctuation">{</span>passphrase,<span class="token operator">&lt;&lt;</span><span class="token string">&quot;zzhpassphrase&quot;</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">}</span>,
      	 <span class="token punctuation">{</span>cipher, blowfish_cfb64<span class="token punctuation">}</span>,
      	 <span class="token punctuation">{</span>hash, sha256<span class="token punctuation">}</span>,
      	 <span class="token punctuation">{</span>iterations, <span class="token number">10000</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还可以通过 rabbitmqctl 设置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rabbitmqctl  ecnode <span class="token parameter variable">--cipher</span> blowfish_cfb64 <span class="token parameter variable">--hash</span> sha256 <span class="token parameter variable">--iterations</span> <span class="token number">10000</span> <span class="token string">&#39;&lt;&lt;&quot;guest&quot;&gt;&gt;&#39;</span> zzhpassphrase

<span class="token comment"># 查看支持的加密算法和 hash 算法</span>
<span class="token punctuation">[</span>root@study rabbitmq<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl encode --list-ciphers</span>
<span class="token punctuation">[</span>des3_cbc,des_ede3,des3_cbf,des3_cfb,aes_cbc,aes_cbc128,aes_cfb8,aes_cfb128,
 aes_cbc256,aes_ige256,des_cbc,des_cfb,blowfish_cbc,blowfish_cfb64,
 blowfish_ofb64,rc2_cbc<span class="token punctuation">]</span>
<span class="token punctuation">[</span>root@study rabbitmq<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl encode --list-hashes</span>
<span class="token punctuation">[</span>sha,sha224,sha256,sha384,sha512,md5<span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="优化网络配置" tabindex="-1"><a class="header-anchor" href="#优化网络配置" aria-hidden="true">#</a> 优化网络配置</h2><p>RabbitMQ 支持的所有协议都是基于 TCP 层面的。包括操作系统和 RabbitMQ 本身都提供了许多可调节的参数，除了操作系统内核参数和 DNS，所有的 RabbitMQ 设置都可以在 rabbitmq.config 配置文件中配置实现</p><p>网络本身就是一个非常宽泛的话题，本章只讲解一些关键的可调节参数的索引，抛砖引玉之用</p><p>RabbitMQ 在等待接收客户端连接时需要绑定一个或多个网络接口，并监听特定的端口。网络接口使用 <code>rabbit.tcp_listeners</code> 选项来配置。默认情况下，RabbitMQ 会在所有可用的网络接口上监听 5672 端口。</p><p>下面演示，如果指定一个 IP 地址和端口上进行监听</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>rabbit, <span class="token punctuation">[</span>
	  <span class="token punctuation">{</span>tcp_listeners, <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">&quot;192.168.0.2&quot;</span>,5672<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
	<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时监听 IPV4 和 IPv6</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>rabbit, <span class="token punctuation">[</span>
	  <span class="token punctuation">{</span>tcp_listeners, <span class="token punctuation">[</span>
	        <span class="token punctuation">{</span><span class="token string">&quot;127.0.0.1&quot;</span>,5672<span class="token punctuation">}</span>,
	         <span class="token punctuation">{</span><span class="token string">&quot;::1&quot;</span>,5672<span class="token punctuation">}</span>
	     <span class="token punctuation">]</span>
	   <span class="token punctuation">}</span>
	<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后面的笔者不想记录了，讲的有点粗糙，或则自己看不懂了。</p>`,27);function m(k,h){const e=o("ExternalLinkIcon");return p(),c("div",null,[u,s("p",null,[n("一个及其简单的 rabbitmq.config 文件配置。"),s("a",d,[n("这个是官方对应的说明"),t(e)]),n(" 中的一个例子")]),r,s("p",null,[n("完整的配置请查看 "),s("a",b,[n("官方文档的说明"),t(e)])]),v])}const x=i(l,[["render",m],["__file","02.html.vue"]]);export{x as default};
