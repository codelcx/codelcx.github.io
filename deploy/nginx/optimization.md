# 高可用



##  基本概念

场景：当对外提供服务的NGINX宕机时，为了继续提供服务应该启动备用机

如何监听NGINX是否宕机？提供服务的机器都使用 `keepalived` ，它们之间可以相互监听

如何保证对外提供的IP在切换机器时不受影响？ 使用虚拟IP（VIP)，可在 `keepalived` 配置文件中配置

**keepalived：** 主要是使用VRRP协议实现高可用

**VRRP：** 虚拟路由冗余协议，将两台或多台路由设备虚拟成一个设备，对外提供虚拟路由IP（VIP）。在路由器组内部，正在工作的是`MASTER`并且拥有这个VIP，有它实现针对虚拟路由器的各种网络功能。其他设备不拥有该`VIP`，状态为`BACKUP`，不执行对外网络功能，只接收`MASTER`的VRRP状态（心跳检测）。`MASTER`会定时告知`BACKUP`自己的状态，指定时间内`BACKUP`收到该通知则认为正常。当`MASTER`失效时，`BACKUP`将竞争选择决策出新的`MASTER`，继续提供网络功能，但是会丢弃原`MASTER`的请求和数据。

##  环境搭建

```shell
# 创建文件夹
mkdir /root/
# 下载并上传至服务器
https://keepalived.org/download.html
# 解压
tar -zxf keepalived-2.0.20.tar.gz
# 编译安装
cd keepalived-2.0.20
./configure --sysconf=/etc --prefix=/usr/local
make && make install
# 启动keepalived
cd /usr/local/sbin
./keepalived
# 关闭keepalived
ps -ef | grep keepalived
kill -9 <PID>


# 配置文件：/etc/keepalived/keepalived.conf
# 配置脚本(启动和关闭)：/usr/local/sbin/keepalived
```

##  配置文件

```shell
global_defs {
	# 接收通知的邮箱地址
   notification_email {
     acassen@firewall.loc
     failover@firewall.loc
     sysadmin@firewall.loc
   }
   # 发送通知的邮箱地址
   notification_email_from Alexandre.Cassen@firewall.loc
   # smpt服务地址
   smtp_server 192.168.200.1
   # smpt服务连接超时时间
   smtp_connect_timeout 30
   # 运行keepalived服务的标识，可随意设置
   router_id LVS_DEVEL
   # 此次接收的通告与上次的通告来自相同的master则跳过检查，检查耗时
   vrrp_skip_check_adv_addr
   # 严格遵守VRRP协议
   vrrp_strict
   # 在一个接口发送两个ARP之间的延时，可精确到毫秒
   vrrp_garp_interval 0
   # 在一个网卡上每组消息之间的延时
   vrrp_gna_interval 0
}
```

```shell
# 自定义脚本
vrrp_scripit <script_name> {
	# 脚本
	script <path>
	# 执行脚本的周期，单位秒
	interval <time>
	# 权重计算
	weight <number>
}
```

```shell
vrrp_instance VI_1 {
	  # 状态设置，MASTER|BACKUP
    state MASTER
    # VRRP实例访问的接口，主要用于发送VRRP数据包
    interface eth0
    # 0-255
    virtual_router_id 51
    # 竞争权重
    priority 100
    # 定时告知backup的时间间隔，单位秒
    advert_int 1
    # 认证类型
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    # 虚拟主机，可设置多个，用户均可访问
    virtual_ipaddress {
        192.168.200.16
        192.168.200.17
        192.168.200.18
    }
    # 应用脚本
    track_script {
    	<script_name>
    }
}
```

```shell
# lvs
# virtual_server IP PORT 定义虚拟主机IP和端口
# virtual_server fwmark int 定义ipvs防火墙打标，实现基于防火墙的集群
# virtual_server group string  定义服务器虚拟组
virtual_server 192.168.200.100 443 {
    # 检查后端服务的时间间隔
    delay_loop 6
    # 定义调度方法 rr|wrr|lc|wlc|blc|sh|dh
    lb_algo rr
    # 集群类型
    lb_kind NAT
    # 持久连接时长
    persistence_timeout 50
    # 服务协议 TCP|UDP|SCTP
    protocol TCP

    real_server <IP> <PORT> {}
}
```

##  案例配置

```bash
# 同一组的路由才能切换，加入同一组的前提：实例名称、虚拟路由ID、身份验证相同
global_defs {
	router_id routerName1 
}

vrrp_instance vName {
	state MASTER
	inteface ens33 
	virtual_router_id 51
	priority 100 
	advert_int 1 
	authentication { 
		auth_type PASS
		auth_pass 1111
	}
	virtual_ipaddress { 
		192.168.9.200
	}
}
```

```bash
global_defs {
	router_id routerName2 
}

vrrp_instance vName {
	state BACKUP
	inteface ens33 
	virtual_router_id 51
	priority 50 
	advert_int 1 
	authentication { 
		auth_type PASS
		auth_pass 1111
	}
	virtual_ipaddress {
		192.168.9.200
	}
}
```



##  脚本监控

keepalived只能监控网络故障和本身的故障，当出现故障时能够进行切换，VIP将漂移到新的`MASTER`，由该NGINX提供服务。但是如果NGINX出现异常，仅keepalived无法保持系统的正常运行，因此需要根据业务进程的运行状态决定是否进行主备切换。

解决：通过脚本监控业务进程，一旦发生错误直接 kill keepalived 进程，启用其它机器

**脚本内容**

```shell
#!/bin/bash
num=`ps -C nginx --no-header | wc -l`
if [ $num -eq 0 ];then
	/usr/local/nginx/sbin/nginx
	sleep 2
	if [ `ps -C nginx --no-header | wc -l` -eq 0 ];
		killall keepalived
	fi
fi
```

```shell
#!/bin/bash
num=`ps -C nginx --no-header | wc -l`
if [ $num > 0 ];then
	exit 0
else
	exit 1
fi
```



**添加脚本**

```shell
# 创建脚本
cd /etc/keepalived
vi ck_nginx.sh
# 设置权限
chmod 755 ck_nginx.sh
```

```shell
vrrp_scripit ck_nginx {
	script "/etc/keepalived/ck_nginx.sh"
	interval 2
	weight -10
}
```

**权重计算原因**

主机异常后启用备用机，但是主机修复好后又会参与`MASTER`竞争，对于业务繁忙的网站将会浪费资源。因此可通过将所有`keepalive.conf` 的`state`状态都改为`BACKUP`，通过权重竞争。