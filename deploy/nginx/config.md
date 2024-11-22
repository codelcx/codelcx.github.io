# 基础配置

## 作用域

### main

```bash
pid /usr/local/nginx/logs/nginx; # master进程ID存储的文件路径
dameon on; # 默认启动守护进程，关闭终端依旧能够提供服务
worker_processes  1; # woker进程个数，一个CPU内核对于一个进程数
```



### events

```bash
events {
	# 默认on,处理惊群问题，设置网络连接序列化
	accept_mutex off;
  # 默认off，同时处理接受请求
	multi_accept on;
	# worker最大连接数，最大值取决于系统支持打开的最大文件句柄数量
	worker_connection 1024; 
	# 默认无，指定事件驱动
	use epoll; 
}
```



### http

```bash
http {
    # 根据后缀匹配请求的资源，将对应的type返回给浏览器，浏览器根据type的类型进行解析
    include       mime.types; 
    # 若未找到对应的type，则使用默认typ
    default_type  application/octet-stream;

    sendfile        on; # 启用零复制
    keepalive_timeout  65; # 保持长连接的时间
}
```



### http server

匹配时优先级：准确、首段通配符、尾段通配符、正则  `（与配置server顺序无关）`

不匹配时优先级：匹配`listen`且包含 `default_server` 、匹配`listen`的第一个`server`

```bash
# 虚拟主机 vhost (可多个)
server {
  listen	80;
  server_name  localhost1 localhost2; # 多个主机和域名用空格隔开
}

# 通配符只能出现在首段和尾段
server {
	listen 80;
	server_name *.example.com;
}

server {
	listen 80;
	server_name www.example.*;
}

server {
	listen 80;
	server_name ~^[a-z]\.example\.com; 
}

server {
	listen 80 default_server;
	default_type text/plain;
	return 200 'default_server'
}
```



### http server location

`uri`变量是待匹配请求字符串，首先匹配非正则表达式，找到匹配度最高的一个，再匹配正则表达式，如果能够匹配到则直接访问，否则访问匹配度最高的那一个

```shell
location [= | ~ | ~* | ^~ | @] uri

= 严格匹配，匹配则停止
^~匹配路径前缀，匹配则停止
~区分大小写匹配
~*不区分大小写匹配
```

```bash
# 匹配 /abc /abcd /abedef.. ...
location /abc {}

# 匹配 /abc
location =/abc {}

# ~开头表示正则，匹配以abc开头\w结尾的路径 \w表示[0-9a-zA-Z_]
location ~/abc\w$ {}
```



## 重要指令

### root

```shell
root path 
# path: 表示请求资源时查找资源的根目录
# 作用域：http、server、location  
```

```shell
# 访问 /images/example.png 
location /images {
	root /usr/local/nginx/images;
}

# root 处理结果 = root + location
```



### alias

```shell
alias path 
# path: 表示请求资源时查找资源的根目录
# 作用域：location
```

```shell
# 访问 /images/example.png 
location /images {
	alias /usr/local/nginx/images;
}

# alias 处理结果 = 直接替换location
# 如果location以/结尾则alias必须以/结尾，root无此要求
```



### index

```shell
index file ... 
# 配置网站首页
# 可以添加多个文件，会逐个匹配直到匹配上
# 作用域：http、server、location
```

```shell
location / {
	root html;
	index index.html; 
}
```



### error_page

```shell
error_page code [...code] uri
# 配置错误页面
# 作用域：http, server, location, if in location
```

```shell
# 指定跳转地址
server {
	error_page 404 http://www.error.com;
}

# 指定重定向地址
server {
    error_page   500 502 503 504  /50x.html;
    location =/50x.html {
    	root html;
    }
}

# 配合location@符号
server {
	error_page 404 @error;
	location @error {
		default_type text/plain;
		return 404 'NOT FOUND PAGE';
	}
}

# 修改状态码
server {
	error_page 404 =200 /50x.html;
	location =/50x.html {
		root html;
	}
}
```



### use

https://nginx.org/en/docs/ngx_core_module.html#use

```bash
use method # 设置事件驱动模型,作用域：events
```



### user

配置worker进程的用户和用户组

```shell
user user_name [group_name]

# 默认,省略组名则等于用户名
user nobody nobody

# 例子
user www

# 添加用户，默认创建目录 /home/www
useradd www
```



### sendfile

计算机执行IO操作时，CPU不需要将数据从一个存储区域复制到另一个存储区域，从而可以减少上下文切换以及CPU的拷贝时间。它是一种I/O操作优化技术

```bash
sendfile on|off # 作用域：http、server、location
```

```shell
# 两者可以兼容，如大文件传输时，最后一份数据无法填满缓冲区则忽视tcp_nopush

tcp_nopush on|off 
# 开启sendfile才会生效，使用缓冲区，填满后再发送数据，提升网络包传输效率
tcp_nodelay on|off 
# 开启keepalive才会生效，有数据就发送，提升网络传输实时性
```

```shell
http {
	sendfile on; # 默认off
	tcp_nopush on; # 默认off
	tcp_nodelay on; # 默认on
	keepalive_time 65;
}
```

 ![image-20240522185057756](assets/image-20240522185057756.png)

![image-20240522185253100](assets/image-20240522185253100.png) 



### add_header

```shell
add_header name value [always] 
# always: 无论浏览器是否支持都添加该响应头
# 作用域：http、server、location
```



### set

设置变量，不要与[内置变量](https://nginx.org/en/docs/varindex.html)重名

```shell
set $variable value 
# 作用域：http、server、if
# value：可以是字符串、变量、变量组合
```



### if

```shell
if (condition) {} # 作用域：server、location
```

```shell
# 零和空字符串为false
if ($parmas)

# =、!= 比较
if ($request_method = POST)

# 正则比较，~区分大小写，~*不区分大小写，!~ | !~* 取反
if($http_user_agen ~ MSIE)

# -f | !-f 文件是否存在
if (!-f $request_filename)

# -d | !-d 目录是否存在
# -e | !-e 目录和文件是否存在
# -x | !-x 文件是否是可执行的
```



### break

同作用域之前的配置生效，后面的无效；终止当前的匹配并把当前URI在本Location中进行重定向访问

```shell
break; # 作用域: server、location、if
```

```shell
location /example {
	if ($args) {
		break;
	}
	
	return 200
}

# 访问：/example?1, 结果是404而不是200
# nginx默认行为：root未配置，会从当前安装目录下的html开始找;index未配置,会从html目录下寻找对应index.html
# 在html目录下创建example目录，并在该目录下创建index.html
# 再次访问，显示index.html页面，状态码为301，永久重定向
```



### return

直接向客户端返回，后面的配置无效

```shell
# 作用域：server、location、if
return code [text]
return code
return URL # 状态码302,临时重定向
```

