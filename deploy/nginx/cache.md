# 缓存集成

##  缓存指令

[http_proxy_module](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)

**proxy_cache_path：** 设置缓存文件的存放路径

```shell
proxy_cache_path path [levels=number] [keys_zone=name:size] [inactive=time] [max_size=size] 
# context:http

# levels: 指定缓存空间的目录，最多三层，目录名会以cache_key以MD5加密后的字符串为基准，根据设置截取
path: /usr/local/proxy_cache
example: 1a79a4d60de6718e8e5b326e338ae533
levels=1:2     /usr/local/proxy_cache/3/53
levels=2:2:1   /usr/local/proxy_cache/33/e5/a

# keys_zone：设置缓冲区的名称和大小
keys_zone=example:200m

# inactive: 指定缓存数据多长时间未被访问后将其删除
inactive=1d

# max_size: 设置最大缓存空间，如果存满，默认会覆盖缓存时间最长的资源
max_size=20g
```



**proxy_cache：** 开启或关闭缓存

```shell
proxy_cache zone_name|off  
# default:off 
# context: http、server、location

zone_name：缓存区名称，需要和proxy_cache_path设置的一致
```



**proxy_cache_key：** 设置缓存的key值，Nginx会将其进行MD5加密

```shell
proxy_cache_key key
# default: $scheme$proxy_host$request_uri
# context: http、server、location
```



**proxy_cache_valid：** 根据URL返回的不同状态码，设置不同的缓存时间

```shell
proxy_cache_valid [code...] time 
# context: http、server、location

# 优先级由上至下
proxy_cache_valid 200 302 10m;
proxy_cache_valid 404 1m;
proxy_cache_valid any 1m;
```



**proxy_cache_min_uses：** 设置资源被访问多少次后被缓存

```shell
proxy_cache_min_uses number 
# default：1 
# context：http、server、location
```



**proxy_cache_methods：** 设置哪些http方法会被缓存

```shell
proxy_cache_methods GET|HEAD|GET|POST|.. 
# default: GET HEAD
# context: http、server、location
```





##  缓存清除

第三方扩展模块：ngx_cache_pure

```shell
# 下载模块
https://github.com/FRiCKLE/ngx_cache_purge
# 上传文件并解压缩
mkdir -p nginx/module
unzip ngx_cache_purge-master.zip
# 重命名
mv ngx_cache_purge-master purge
# 添加模块
cd /root/nginx/core/nginx-1.16.1
./configure --add-module=/root/nginx/module/purge
# 编译
make
# 更新配置
cd /usr/local/nginx/sbin
mv nginx nginxold # 备份
cd /root/nginx/core/nginx-1.16.1 # 安装目录
mv objs/nginx /usr/local/nginx/sbin
make  upgrade
```

```shell
proxy_cache_purge zone_name key # context: location

location /purge {
	proxy_cache_purge example exampleKey;
}
```



##  动态缓存

对于经变化的文件不应该进行缓存，而是直接从服务器中获取；主要是根据以下两个指令判断，两个指令都可以指定多个条件并且多个条件中至少有一个不为空且不等于零时才成立。

**proxy_noe_cache：** 不缓存的条件

```shell
proxy_no_cache string ... # context: http、server、location

proxy_no_cache $cookie_nocache $arg_nocache $arg_comment
```

```shell
$cookie_nocache: 请求中cookie中键的名称为nocheche的值
$arg_nocache $arg_comment：请求的参数中属性名为nocache和comment的值
```

**proxy_cache_bypass：** 设置不从缓存中获取数据的条件，数据依据会被缓存

```shell
proxy_cache_bypass string ... # context: http、server、location

proxy_cache_bypass $cookie_nocache $arg_nocache $arg_comment
```

案例

```shell
location / {
	if ($request_uri ~ /.*\.js$) { # js文件不缓存
		set $nginx_nocache 1;
	}
	proxy_no_cache $cookie_nocache $arg_nocache $arg_comment $nginx_nocache;
	add_header Set-Cookie "nocache=999";
	add_header nginx-cache "$upstream_cache_status"; # MISS 未命中 HIT命中
}
```

