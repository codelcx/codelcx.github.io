# 负载均衡

##  基本概念

**作用**

```
1、解决服务器高并发压力
2、提供故障转移，实现高可用
3、添加或减少服务器数量（横向扩展），增强可扩展性
4、负载均衡器过滤，提高系统安全性
```



**方式**

```
1、手动选择
2、DNS轮询
3、四层/七层负载均衡
```



**四层负载均衡**

指的是OSI模型中的传输层，主要是基于`IP+PORT`的负载均衡

```
实现方式：
硬件：F5、BIG-IP、Radware...
软件：LVS、NGINX、Hayproxy...
```



**七层负载均衡**

指的是OSI模型中的应用层，主要是基于虚拟机的URL或主机IP的负载均衡

```
实现方式：
软件：NGINC、Haryproxy
```



**四层和七层负载均衡区别**

```
四层的数据包在底层分发，七层数据包在最顶端分发，因此四层比七层效率高
四层不识别域名，七层识别域名

实际环境采用的模式：四层(LVS)+七层(NGINX)
```



##  均衡状态

| 状态         | 描述                                     |
| ------------ | ---------------------------------------- |
| down         | 不参与负载均衡                           |
| backup       | 预留备份服务器                           |
| max_fails    | 允许请求的失败次数，默认1                |
| fail_timeout | 经过max_fails失败后服务暂停时间，默认10s |
| max_conns    | 限制最大接收的连接数，默认0              |



##  均衡策略

| upstream支持的策略 | 描述             |
| ------------------ | ---------------- |
| 轮询               | 默认             |
| weight             | 权重             |
| ip_hash            | 依据IP分配       |
| least_conn         | 依据最少链接方式 |
| url_hash           | 依据URL分配      |
| fair               | 依据响应时间     |

```shell
stream name # name:自定义名称，作用域：http
```

基本配置

```bash
upstream groups {
  server 192.168.9.52:80;
  server 192.168.9.62:80;
}

server {
	listen       80;
	server_name  localhost; 

	location / {
  	proxy_pass http://groups;
	}
}
```



**轮询**

默认使用轮询策略，逐一转发，适用于无状态请求（请求方的每次请求都当作第一次请求）

```bash
upstream groups {
  server 192.168.9.52:80 weight=15; 
  server 192.168.9.62:80 weight=10;
  server 192.168.9.72:80 weight=5;
}
```



**ip_hash**

将来自相同IP的请求固定访问同一个的服务器，无法保证均衡，可配合`redis`解决

```
upstream groups {
  ip_hash;
}
```



**url_hash**

将来自相同URL的请求固定访问同一个的服务器，要配合缓存命中使用。同一个资源多次请求可能会到达不同服务器，导致不必要的多次下载，缓存命中率不高，造成资源浪费

适用于固定资源在一个单独服务器的情况

```
upstream groups {
	hash $request_uri;
}
```



**least_conn**

将请求转发给连接数较少的服务器。因为轮询算法会将请求均发给服务器，但是服务器响应时间不一样，响应时间长的会造成较高的负载。

适合用于服务器处理时间不一样的情况

```
upstream groups {
  least_conn;
}
```



**fair**

nginx默认不支持使用

```shell
# 下载模块
https://github.com/gnosek/nginx-upstream-fair
# 上传文件并解压缩
mkdir -p nginx/module
unzip nginx-upstream-fair-master.zip
# 重命名
mv nginx-upstream-fair-master fair
# 添加模块
cd /root/nginx/core/nginx-1.16.1
./configure --add-module=/root/nginx/module/fair
# 编译,如果有错误需要解决后再编译
make
# 更新配置
cd /usr/local/nginx/sbin
mv nginx nginxold # 备份
cd /root/nginx/core/nginx-1.16.1 # 安装目录
mv objs/nginx /usr/local/nginx/sbin
make  upgrade
```

解决错误:ngx_http_upstream_srv_conf_t’没有名为‘default_port’

```shell
cd src/http
# 打开文件
vi ngx_http_upstream.h
# 直接输入搜索
/nginx_http_upstream_srv_conf_s
# 找到 in_port_t 在其下方添加
in_port_t default_port;
```



##  四层均衡

[stream_core_module](https://nginx.org/en/docs/stream/ngx_stream_core_module.html)

```shell
./configure --with-stream # 添加steam模块
```

```shell
stream {
	upstream redisGroup {}
	upstream tomcatGroup {}

	server {
		listen 81;
		proxy_pass redisGroup;
	}
	
	server {
		listen 82;
		proxy_pass tomcatGroup;
	}
}
```

