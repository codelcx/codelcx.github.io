

# 环境准备



软件：Vmware

镜像：CentOS-7-x86_64-Minimal-2009.iso

CentOS：https://vault.centos.org/

XShell：https://www.xshell.com/zh/free-for-home-school/

Termius: https://termius.com/download/windows

Nginx: https://nginx.org/en/download.html 

> win+R -> msinfo32 ->系统信息



### 虚拟机配置

网卡配置

```bash
# 点击两次tab 将显示该目录下的文件
vi /etc/sysconfig/network-scripts/ 
vi /etc/sysconfig/network-scripts/ifcfg-ens33 

# i进入编辑模式，修改配置文件 
ONBOOT=yes 			    # 默认no，启用网卡
BOOTPROTO=static 		# 默认dhcp，使用静态IP分配
IPADDR=192.168.9.200 	# IP地址
NETMASK=255.255.255.0 	# 子网掩码
GATEWAY=192.168.9.2 	# 网关
DNS=8.8.8.8 		    # DNS

# 添加配置DNS
vi /etc/resolve.conf
nameserver 8.8.8.8

# 重启服务
systemctl restart network
```

vmare编辑 -> 虚拟网络编辑器 -> VMnet8 -> NAT设置 

```bash
192.168.9.0    # 子网IP
255.255.255.0  # 子网掩码
192.168.9.2    # 网关
```

主机电脑网络中配置网卡VMnet8

```bash
# IPV4协议中使用以下面IP地址 
192.168.9.1
255.255.255.0
# 禁用网卡再启动
```



### 关于防火墙

```bash
systemctl start firewalld.service # 开启防火墙
systemctl restart firewalld.service # 重启防火墙
systemctl stop firewalld.service # 关闭防火墙
systemctl disable firewalld.service # 禁止开机自启
firewall-cmd --zone=public --add-port=80/tcp --permanent # 放行端口
firewall-cmd --query-port=80/tcp # 查看端口是否开放
firewall-cmd --permanent --add-port=9001-9002/tcp # 批量放行
firewall-cmd --permanent --remove-port=9002/tcp # 移除端口
firewall-cmd --reload # 重新加载
firewall-cmd --list-all # 查看已配置规则
# 指定端口和IP访问
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.174.135" port protocol="tcp" port="8080" accept"
# 移除端口和IP访问
firewall-cmd --permanent --remove-rich-rule="rule family="ipv4" source address="192.168.174.135" port port="8080" protocol="tcp" accept" 
```



### NGINX安装(源码)

环境配置

```shell
gcc # 编译器
pcre pcre-devel # 正则表达式解析
zlib zlib-devel # 压缩库
openssl openssl-devel # SSL

yum install -y gcc pcre pcre-devel zlib zlib-devel openssl openssl-devel
rpm -qa gcc pcre pcre-devel ... # 查看依赖是否安装成功
```

源码下载

```shell
# XFTP上传下载的NGINX压缩包至虚拟机
wget https://nginx.org/download/nginx-1.16.1.tar.gz
```

管理安装包

```shell
mkdir -p nginx/core
mv nginx-1.16.1.tar.gz nginx/core
```

解压安装包

```shell
cd nginx/core
tar zxvf nginx-1.16.1.tar.gz
cd nginx-1.16.1
./configure # 直接回车或添加参数 --help可查看可添加的参数
```

编译并安装NGINX

```bash
make && make install
```

### NGINX安装(yum)

https://nginx.org/en/linux_packages.html



### NGINX启动

```shell
cd /usr/local/nginx/sbin # 根目录下
./nginx -t # 修改配置文件后需要测试配置文件是否无误
./nginx # 启动
./nginx -s stop # 快速停止
./nginx -s quit # 退出前完成已接受的请求
./nginx -s reload # 重新加载配置


ip addr # 测试启动成功与否，获取IP(192.168.9.200)，浏览器访问
```



### NGINX卸载

```shell
./nginx -s stop # 停止nginx

rm -rf /usr/local/nginx # 卸载nginx

make clean # 清除编译环境
```



### NGINX版本升级

问题： 如何不停止服务的前提下升级NGINX版本

1、备份旧版本sbin目录下的nginx

```shell
cd /usr/local/nginx/sbin
mv nginx nginxold
```

2、拷贝新版本编译后`/objs/nginx` 的可执行文件到原来目录下

```shell
cd /nginx/core/nginx-version/objs
cp nginx /usr/local/nginx/sbin
```

3、升级版本

```shell
cd /root/nginx/core/nginx-version
make upgrade 
```





### 查看进程

```shell
ps -ef | grep nginx
more /usr/local/nginx/logs/nginx.pid
```

| 信号     | 作用                                             |
| -------- | ------------------------------------------------ |
| TERM/INT | 立即关闭整个服务                                 |
| QUIT     | 优雅关闭整个服务，等待worker进程处理已接收的请求 |
| HUP      | 重新读取配置文件并使用服务对新配置项生效         |
| USR1     | 重新开启日志文件                                 |
| USR2     | 平滑升级到最新版nginx                            |
| WINCH    | 所有子进程不再接收处理新连接，关闭所有子进程     |

```shell
kill -sign pid # sign-信号 pid-marster线程ID
```



### 配置系统服务

1、创建脚本

```bash
vi /usr/lib/systemd/system/nginx.service 
```

脚本内容

```bash
[Unit] 
Description=nginx web service
After=network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
ExecQuit=/usr/local/nginx/sbin/nginx -s quit 
PrivateTmp=true
   
[Install]   
WantedBy=multi-user.target 
```

如果存在权限问题需要进行权限设置

```shell
chmod 755 /usr/lib/systemd/system/nginx.service 
```

2、重新加载

```bash
systemctl daemon-reload # 重新加载配置文件 （脚本）
systemctl reload nginx # 重新加载配置文件（nginx.conf）
```

3、重启nginx

```bash
systemctl status nginx # 查看是否正在启动nginx,启动则停止
systemctl start nginx # 启动nginx服务
systemctl restart nginx # 重启nginx服务
systemctl stop nginx # 停止nginx服务
systemctl reload nginx # 重新加载配置文件
```

4、开机自启

```bash
systemctl enable nginx # 开机自启
```



### 配置环境变量

无需每次执行命令都需要到安装目录下的`sbin`目录才能使用

```shell
# 1、修改环境文件
vi /etc/profile
# 最后一行添加
export PATH=$PATH:/usr/local/nginx/sbin

# 2、加载文件生效
source /etc/profile

# 3、测试
nginx -v
```





### 常用工具

curl：模拟网络请求

```bash
yum install -y curl
curl -I http://www.example.com # 返回响应头信息
curl -e "https://bilibili.com" -I http://www.example.com 
```

keepalived：提供服务故障切换和健康检查功能

```bash
yum install -y keepalived
/etc/keepalived/keepalived.conf # 配置文件位置
```

tree：树形显示目录解构

```shell
yum install -y tree # 树形结构目录
tree path # 命令格式
```

