# 安全控制

###  SSL支持

[ngx_http_ssl_module](https://nginx.org/en/docs/http/ngx_http_ssl_module.html)

```shell
# 添加模块 ngx_http_ssl_module
cd /usr/local/nginx/sbin
mv nginx nginxold # 备份
cd /root/nginx/core/nginx-1.16.1 # 安装目录
make clean # 情况编译内容
./configure --with-http_ssl_module
make # 编译
mv objs/nginx /usr/local/nginx/sbin # 移动编译后的二进制文件
make  upgrade
```



###  SSL密码

指定密码格式

```shell
# 查看支持的密码格式
openssl ciphers
# 设置密码格式
ssl_ciphers ciphers; # http、server
```



###  生成证书

1、第三方服务购买，如腾讯云、阿里云，前提是需要有一个域名

2、openssl生成(学习使用)

```shell
openssl version # 确认openssl存在
mkdir /root/cert # 创建存放证书的目录
cd /root/cert
openssl genrsa -des3 -out server.key 1024 
openssl req -new -key server.key -out server.csr
cp server.key server.key.org
openssl rsa -in server.key.org -out server.key
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```



###  配置证书

指定带有PEM格式证书

```shell
ssl_certificate file # http、server
```

指定证书密钥

```shell
ssl_certificate_key file # http、server
```

配置证书

```
server {
	listen 80;
	server_name www.example.com;
	rewrite ^(.*) https://www.example.com$1;
}

server {
	listen 443 ssl;
	server_name www.example.com;
	
	ssl_certificate server.crt;
	ssl_certificate_key server.key;
	
	ssl_session_cache    shared:SSL:1m;
  ssl_session_timeout  5m;

  ssl_ciphers  HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers  on;

	location / {
		root html;
		index index.html;
	}
}
```

