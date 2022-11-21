import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as s,e}from"./app.b354d91e.js";const t="/assets/image-20200624103616650.7cd6a7cc.png",o={},c=e('<h1 id="消费端的确认与拒绝" tabindex="-1"><a class="header-anchor" href="#消费端的确认与拒绝" aria-hidden="true">#</a> 消费端的确认与拒绝</h1><h2 id="确认" tabindex="-1"><a class="header-anchor" href="#确认" aria-hidden="true">#</a> 确认</h2><p>为了保证消息队列可靠的达到消费者，RabbitMQ 提供了消息确认机制（message acknowledgement）。消费者在订阅队列时，可以指定 autoAck 参数，</p><ul><li>当为 false 时：RabbitMQ 会 <strong>等待消费者显式回复确认信号</strong> 后才从内存（或磁盘）中移除消息（先打上删除标记，之后再删除）</li><li>当为 true 时：RabbitMQ 会自动把发送出去的消息设置为确认，然后从删除，而 <strong>不管消费者是否真正消费到了这些消息</strong></li></ul><p>当 autoAck 参数设置为 false 时，对于 RabbitMQ 服务器而言，队列中的消息分成了两个部分：</p><ul><li><p>等待投递给消费者的消息</p></li><li><p>已经投递给消费者，但还没有收到消费者确认信号的消息</p><p>如果一直 <strong>没有收到消费者的确认信号</strong>，<strong>并且消费者</strong> 此消息的消费者 <strong>已经断开连接</strong>，则会安排该 <strong>消息重新进入队列</strong></p></li></ul><p>RabbitMQ 不会为未确认的消息设置过期时间，是否要重新投递给消费者的唯一依据是：<strong>消费者未确认并且已经断开链接</strong>，这允许消费者消费一条消息的时间可以很久很久</p><p>web 管理平台（后面会讲解）：</p><p><img src="'+t+`" alt="image-20200624103616650"></p><ul><li>ready：等待投递给消费者的消息数量</li><li>uncacknowledged ：已经投递给消费者，但是还未收到确认信号的消息数量</li></ul><p>也可以通过相应的命令来查看上述消息：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@study ~<span class="token punctuation">]</span><span class="token comment"># rabbitmqctl list_queues name messages_ready messages_unacknowledged</span>
Listing queues
queue_demo	<span class="token number">52</span>	<span class="token number">0</span>
<span class="token comment"># 可以看到这个队列中有 52 条消息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="客户端获取消息队列中的消息数量" tabindex="-1"><a class="header-anchor" href="#客户端获取消息队列中的消息数量" aria-hidden="true">#</a> 客户端获取消息队列中的消息数量</h2><p>对应的 客户端 API 可以这样获取</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 检查该队列是否存在</span>
<span class="token comment">// 获取一次消费数量，就需要检查一次</span>
<span class="token keyword">final</span> <span class="token class-name">AMQP<span class="token punctuation">.</span>Queue<span class="token punctuation">.</span>DeclareOk</span> declareOk <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">queueDeclarePassive</span><span class="token punctuation">(</span><span class="token constant">QUEUE_NAME</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 获取队列中的消息数量</span>
<span class="token keyword">final</span> <span class="token keyword">int</span> messageCount <span class="token operator">=</span> declareOk<span class="token punctuation">.</span><span class="token function">getMessageCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">final</span> <span class="token keyword">int</span> consumerCount <span class="token operator">=</span> declareOk<span class="token punctuation">.</span><span class="token function">getConsumerCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="拒绝消息" tabindex="-1"><a class="header-anchor" href="#拒绝消息" aria-hidden="true">#</a> 拒绝消息</h2><p>在消费者接收到消息后，如果想明确 <strong>拒绝</strong> 而不是 <strong>确认</strong>，可以使用 <code>Basic.Reject</code> 命令，对应的 API 是 <code>channel.basicReject</code> 方法来拒绝这个消息。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">basicReject</span><span class="token punctuation">(</span><span class="token keyword">long</span> deliveryTag<span class="token punctuation">,</span> <span class="token keyword">boolean</span> requeue<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>deliveryTag：可以看作是消息的编号，64 位长整型值。</li><li>requeue：是否重入队列 <ul><li>true：会将这条消息重新存储队列，分配给下一个消费者</li><li>false：会从队列中移除</li></ul></li></ul><p><code>Basic.Reject</code> 只能拒绝一条消息，批量消息可以使用 <code>Basic.Nack</code> 命令，对应 API 如下</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">basicNack</span><span class="token punctuation">(</span><span class="token keyword">long</span> deliveryTag<span class="token punctuation">,</span> <span class="token keyword">boolean</span> multiple<span class="token punctuation">,</span> <span class="token keyword">boolean</span> requeue<span class="token punctuation">)</span>
    <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>deliveryTag 和 requeue 的含义与单条的相同。</p><p>multiple：</p><ul><li>false：只拒绝 deliveryTag 这一条消息</li><li>true：拒绝 deliveryTag 编号之前所有未被当前消费者确认的消息。</li></ul><div class="custom-container tip"><p class="custom-container-title">提示</p><p>将 requeue 设置为 true，可以启用「死信队列」功能。死信队列可以通过 <strong>检测被拒绝或则未送达的消息</strong> 来追踪问题。下个章节会详细讲解</p></div><h2 id="重入队列" tabindex="-1"><a class="header-anchor" href="#重入队列" aria-hidden="true">#</a> 重入队列</h2><p>AMQP 中 <code>Basic.Recover</code> 具备可重入队列的特性，对应客户端 API 如下</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Basic<span class="token punctuation">.</span>RecoverOk</span> <span class="token function">basicRecover</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> requeue<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>requeue：将此 channel 未确认的消息，重新发送给消费者</p><ul><li>false：将发送给之前相同的消费者</li><li>true：重新加入到队列中</li></ul>`,30),l=[c];function p(i,u){return n(),s("div",null,l)}const k=a(o,[["render",p],["__file","05.html.vue"]]);export{k as default};
