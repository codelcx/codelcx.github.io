# 面试题（网络协议）

## HTTP1.1/2.0

1、多路复用

```
http1.1：每个请求响应都需要建立TCP连接，增加延迟和开销
http2.0：允许同一个TCP连接发送多个请求和响应，提高性能和效率
```

:::tip 原理实现

http2.0 引入二进制数据和流的概念，其中帧对数据进行序列标识，对方收到数据后可以按序列合并数据。也正因如此能够并行的传输数据，传输完成后根据ID组合对应的数据

:::

2、服务器推送

```
http1.1：请求和响应一对一
http2.0：引入 `Server Push` 机制，服务器可主动推送资源
```

```js
const http2 = require('http2');
const Koa = require('koa');
const app = new Koa();
 
// 创建HTTP/2服务器推送的资源
const pushResource = (pushStream, path) => {
  const fileStream = fs.createReadStream(path);
  fileStream.pipe(pushStream);
};
 
// 创建HTTP/2服务器，需要SSL/TLS证书
const server = http2.createSecureServer(
  {
    key: fs.readFileSync('server-key.pem'),
    cert: fs.readFileSync('server-cert.pem')
  },
  app.callback()
);
 
server.on('stream', (stream, headers) => {
  // 访问路径 /push-this时自动推送资源
  if (headers[':path'] === '/push-this') {
    server.pushStream(
        { ':path': '/pushed-resource' }, 
        (err, pushStream, headers) => {
            if (err) throw err;
            pushResource(pushStream, 'path-to-your-resource.js');
    });
  }
 
  stream.respond({ 'content-type': 'text/html' });
  stream.end('<html><body>Hello HTTP/2!</body></html>');
});
 
server.listen(443);
```

3、头部压缩

```
http1.1：每个请求和响应头部都包含大量重复信息，增加网络传输开销
http2.0：使用 `hpack`算法压缩头部，降低网络传输开销
```

4、二进制协议

```
http1.1：采用文本传输，易于阅读和调试，但效率低
http2.0：采用二进制传输，提高传输效率
```

5、请求优先级

```
http1.1：所有请求优先级相同
http2.0：允许为每个请求设置优先级，优先加载重要资源
```

6、流量控制

```
HTTP/1.0：没有流量控制的机制
HTTP/2.0 支持流量控制，可以防止一个请求占用过多的带宽，影响其他请求的进行
```



## 浏览器并发限制

**带宽和资源管理**：每个并发请求都会占用一定的带宽和系统资源（如 CPU 和内存）。如果同时发起大量的并发请求，可能会导致带宽和资源被过度占用，影响其他应用的性能。

**网络拥塞**：过多的并发请求可能会导致网络拥塞，增加数据包延迟和丢失的风险。这会降低整体的网络性能，并可能导致请求失败。

**服务器压力**：服务器需要处理每个请求，包括解析请求、处理业务逻辑、生成响应等。如果同时处理大量的并发请求，服务器可能会过载，导致响应时间变长。

**用户体验**：过多的并发请求可能会导致页面加载速度变慢，用户体验变差。例如，如果页面上的图片和脚本同时加载，可能会导致页面闪烁或卡顿。

**安全性和稳定性**：过多的并发请求可能会增加服务器的安全风险，如拒绝服务（DoS）攻击。同时，过多的并发请求也可能导致服务器不稳定。



## 浏览器强弱缓存

**强缓存**：强缓存是指浏览器直接从本地缓存中获取资源，无需向服务器发送请求。强缓存的资源在有效期内可以直接使用，无需再次下载。强缓存的资源可以通过 HTTP 响应头设置有效期

- `Cache-Control`：可以设置 `max-age`（最大缓存时间，单位为秒）等属性。
- `Expires`：指定资源的过期时间，是一个 HTTP 日期。

**弱缓存**：弱缓存是指浏览器在获取资源时，会向服务器发送一个条件请求（如 `If-Modified-Since` 或 `If-None-Match`），询问资源是否已经更新。如果资源没有更新，服务器会返回一个 304 状态码，告诉浏览器可以使用缓存中的资源。如果资源已经更新，服务器会返回新的资源，并更新缓存。

- `Last-Modified`：资源的最后修改时间，服务器会在响应头中返回这个时间。
- `ETag`：资源的唯一标识符，服务器会在响应头中返回这个标识符。



## 浏览器路由模式

Hash 实现原理

```
它依赖URL中的哈希部分（# 后面的内容）
浏览器解析URL会忽略哈希部分，哈希值变化时，浏览器不会重新加载页面，只是页面内容更新
```

```
https://example.com/#/home、https://example.com/#/about
浏览器都会请求相同的资源 https://example.com，根据哈希部分决定显示不同页面 
```

Hash 路由控制

```
哈希变化时会触发 hashchange 事件，可通过 window.location.hash 获取或设置哈希部分 
```

Hash 优缺点

```
兼容性强：所有浏览器都支持
无需服务器：路由状态通过哈希值传递

不利于SEO：哈希部分不会被服务器识别，搜索引擎无法抓取不同路由内容
URL不美观：URL包含#符号，地址不直观
```



History 实现原理

```
它是HTML5引入的新路由模式，需要使用浏览器的 History API 管理路由
```

```
https://example.com/#/home、https://example.com/#/about
浏览器会根据URL请求不同的资源，但是页面不会重新加载
```

History 路由控制

```
以下方法改变URL不刷新页面： 
history.pushState // 添加新路由
history.replaceState // 替换当前路由
history.go(n) // 正值前进，负值后退
history.back() // 后退一步
history.foward() // 前进一步

popstate：点击浏览器前进后退按钮时触发事件
```



## 浏览器解决跨域

浏览器为安全考虑提出的同源策略，阻止不同源（协议、端口、域名）之间的资源请求

1、CORS（跨资源共享）

```js
// 最常用的解决方案，服务器需要在响应头中添加以下请求头，允许特定资源访问 
Access-Control-Allow-Origin: * 
```

2、JSONP（JSON with Padding）

```js
// 旧的解决方案，通过动态创建script绕过跨域
// script虽然可以跨域请求资源，但无法直接访问资源中的内容

// client.ts
function handleResponse(data) {
  console.log(data);
}

const script = document.createElement('script');
script.src = 'https://example.com/api/data?callback=handleResponse';
document.head.appendChild(script);


// server.ts
const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
  const data = { message: 'Hello, world!' };
  const callback = req.query.callback;
  res.send(`${callback}(${JSON.stringify(data)})`);
});
```

3、代理服务器

```js
// 服务器之间不存在跨域，跨域仅发生在浏览器

// 开发环境：vite.config.ts
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}


// 生产环境：nginx、apache 
server {
    listen 80;
    server_name example.com;

    location /api {
        proxy_pass http://backend-server.com;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

