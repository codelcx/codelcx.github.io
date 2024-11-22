# 静态资源

## 资源压缩

使用gzip对静态资源压缩，可在 `http server location` 配置

```shell
nginx_http_gzip_module
nginx_http_gzip_static_module
nginx_http_gunzip_moduule
```

```shell
http {
	gzip on;
	gzip_types application/javascript text/plain; # 压缩的MIME类型，可设置多个
	gzip_comp_level 1; # 压缩等级1-9，等级越高效率越低
	gzip_vary off; # 是否告知客户端启用gzip，响应头：Vary：Accept-Encoding
	gzip_diable "MSIE [1-6]"; # 根据use-agent值关闭gzip功能
	gzip_http_version 1.1 # 启用gzip的最低http版本
  gzip_min_length 1k; # Content-length值大于该值时才压缩
}
```

**gzip_proxid：** nginx作为反向代理服务器时是否对服务器返回的结果gzip压缩

```shell
gzip_proxid off|expired|noc-cache|...

# off: 关闭压缩
# expired：header头包含Expires时压缩
# no-cache：header头包含Cache-COntrol:no-cache时压缩
# no-store：header头包含Cache-COntrol:no-store时压缩
# private：header头包含Cache-COntrol:no-cache时压缩
# no_last_modified: header头不包含Last-Modified时压缩
# no_etag: header头不包含ETag时压缩
# auth：header头包含Authorization时压缩
# any：无条件压缩
```

 **http_gzip_static_module：** nginx默认不包括该模块，需要添加，主要作用：gzip和sendfile共存问题

访问资源之前将资源进行压缩为 `同名.gz`,服务器返回时会寻找 `同名.gz`

```shell
gzip_static on|off|awalys # 默认off，on表示客户端不支持时不启用压缩
```

```shell
# 添加模块 http_gzip_static_modul
cd /usr/local/nginx/sbin
mv nginx nginxold # 备份
cd /root/nginx/core/nginx-1.16.1 # 安装目录
make clean # 情况编译内容
./configure --with-http_gzip_static_module
make # 编译
mv objs/nginx /usr/local/nginx/sbin # 移动编译后的二进制文件
cd ..
make  upgrade
```



## 浏览器缓存

**expires：** 控制页面缓存，控制响应头 `Expires、Cache-Control`

```shell
expires [modified] time
expires epoch|max|off
# 默认：expires off
# 作用域：http、server、location
# time: 过期时间，单位秒；
# 整数和零：Cache-Control：max-age=time；
# 负数：Cache-control=no-cache，必走弱缓存 
epoch：Cache-control=no-cache
max: Cache-Control:max-age=315360000(10年)
```

**add_header：** 添加指定响应头

```shell
add_header Cache-control no-cache 
```

| Cache-control值                                   | 描述                                           |
| ------------------------------------------------- | ---------------------------------------------- |
| must-revalidate                                   | 可缓存但必须再向服务器进行确认                 |
| must-revalidate                                   | 可缓存但必须再向服务器进行确认                 |
| no-store                                          | 不缓存请求或者响应的任何内容                   |
| no-transform                                      | 代理不可更改媒体类型                           |
| public                                            | 可向任意地方提供响应的缓存                     |
| private                                           | 仅向特定用户返回响应                           |
| must-revalidate	可缓存但必须再向服务器进行确认 | 要求中间缓存服务器对缓存的响应有效性再进行确认 |
| max-age=<秒>                                      | 响应最大Age值                                  |
| s-maxage=<秒>                                     | 公共缓存服务器响应最大Age值                    |



## 跨越问题

```shell
location / {
	add_header Access-Control-Allow-Origin: IP1,IP2; 
	#允许请求的IP,*表示所有	
	add_header Access-Control-Allow-Methods: POST,GET,DELETE,PUT; 
	#允许请求的方式
}
```



## 防盗链

内联资源的请求，浏览器会在请求头中自动添加 `refer` 指向浏览器当前的URL

```bash
https://www.example.com  
# 当前浏览器的URL，其中包含JS、CSS、IMG...
# 请求资源时会在请求头中添加refer： https://www.example.com
```

假设只有在请求 `https://www.example.com` 站点时才允许访问资源，其余方式都不允许

```shell
valid_referens none|block|server_names|string 
# 作用域：server、location

# none：请求头不存在 `refer`，允许访问
# blocked：请求头 `refer` 不为空，但是值被防火墙或代理服务器伪装，如不带 `http://, httts://` 等协议头的资源允许访问
# server_names：指定具体的域名或IP
# string：正则表达式 
```

```bash
localtion ~*/(js|css|img) {
	valid_referers none blocked www.example.com;
	
	# 匹配上时该值为0
	if ($valid_referer) {
		# return 403; # 返回错误页面
		# rewrite ^/ /error.png # ^/表示匹配所有，返回错误图片
	}
}
```



## 路径重写

[ngx_http_rewrite_module](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html)，该模块依赖于`PCRE(正则表达式库)`

应用场景：域名跳转、域名镜像、独立域名、合并目录、防盗链

```bash
# 根据regex（正则表达式）部分内容，重定向到replacement
# 作用域：server、location、if
rewrite    <regex>   <replacement>  [flag];
关键字				正则				替代内容     flagt标记

# replacement：以http:// 或 https:// 开头则不会对URI处理而是直接返回

# flag标记说明： 
# last  本条规则匹配完成后，终止匹配之后的规则，重新请求匹配新的1ocation规则，
# break 本条规则匹配完成即终止，不再匹配后面的任何规则，以replacement为location并执行同break指令的逻辑
# redirect 返回302临重定向，游览器地址会显示跳转后的URL地址
#permanent 返回301永久重定向，测览器地址栏会显示跳转后的URL地址
```

```shell
# $n 表示匹配正则表达式中的第n个括号`()`
location / {
  rewrite ^/([0-9]+).html$ /index.html?page=$1 break;
}
```

**rewrite_log：** 将重写信息写入错误日志文件中，开启后将会以notice级别写入error_log指令配置的日志文件中

```shell
rewrite_log on; 
# 默认off
# 作用域：http、server、location、if 
error_log logs/error.log notice;
```



## 动静分离

静态资源：html、js、css、img..

动态资源：后台应用程序的业务处理

优点：nginx处理静态资源的效率高且并发量大，可提高访问速度，降低动态资源和静态资源的耦合度，即使服务器宕机也不影响页面静态资源的展示

```
场景1：静态资源比较少的项目，可以将静态资源直接存放在NGINX服务器上
场景2：静态资源多的项目，将其存放在静态资源服务器上，通过NGINX反向代理
```



