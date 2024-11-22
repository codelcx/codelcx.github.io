# 日志管理



```shell
tail -f path # 查看文件内容
```

## 访问日志

https://nginx.org/en/docs/http/ngx_http_log_module.html

```shell
# 语法
access_logo off|on
access_log path [format 
	     [buffer=size] [gzip[=level]] 
	     [flush=time] [if=condition]]  

# path: 指定日志存放位置
# format： 指定日志格式
# buffer：指定日志写入时缓存大小
# gzip：写入日志前压缩，等级1-9
# flush：缓存有效时间
# if：条件为false则不写入日志

# 作用域
http、server、location

# 默认
access_log logs/access_log combined
```



## 日志格式

https://nginx.org/en/docs/http/ngx_http_log_module.html#log_format

```bash
log_format name [escape=default|json|none] string  ...

# 作用域
http

# 默认
log_format combined "..."

# 例子, format 和 name 需要一致
log_format myformat 'this is my format'
access_log logs/access_log myformat
```



## 错误日志

https://nginx.org/en/docs/ngx_core_module.html#error_log

```bash
error_log file [level]
default: error_log logs/error.log error

# 等级越高输出内容越少，IO操作越少
level: debug|info|notice|warn|error|crit|alert|emerg

# 作用域
main、http、server、location
```



## 日志切割

安装验证

```bash
rpm -ql logrotate # 查看是否已安装，默认是存在的
yum install -y logrotate
```

文件结构

```shell
/etc/logrotate.conf # 主配置文件
/usr/sbin/logrotate # 二进制文件
/etc/logrotate.d/   # 自定义配置文件
/var/lib/logrotate/logrotate.status # 日志执行记录状态文件
```

命令参数

```shell
-?, --help	# 帮助
-d, --debug	# 测试配置文件
-f, --fore	# 立即执行配置文件
-v, --verbose	# 显示配置文件信息
--usage	# 显示指令基本用法
```

```shell
logrotate -v /etc/logrotate.conf
```

配置说明

| 配置项               | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| daily                | 每天滚动一次                                                 |
| weekly               | 指定滚动周期为每周                                           |
| monthly              | 指定滚动周期为每月                                           |
| notifempty           | 如果文件为空，则不滚动                                       |
| missingok            | 如果文件不存在，则不滚动                                     |
| rotate 7             | 保留最近7个日志文件                                          |
| compress             | 压缩日志文件                                                 |
| delaycompress        | 延迟压缩，延迟到下一次日志分割的时候。注意这个要结合 compress 一起使用 |
| create 640 root root | 新建日志文件的属主及权限，如果 nginx 不是`root`用户运行的要特别注意 |
| sharedscripts        | 共享脚本，即日志滚动完成后再运行脚本，否则每滚动一个日志文件都要运行一次脚本 |
| postrotate           | 日志滚动完成后运行的脚本，有些业务日志可以不需要这个脚本     |
| copytruncate         | 用于还在打开中的日志文件，把当前日志备份并截断；是先拷贝再清空的方式，拷贝和清空之间有一个时间差，可能会丢失部分日志数据。 |
| nocopytruncate       | 备份日志文件不过不截断                                       |
| create 640 root root | 新建日志文件的属主及权限，如果 nginx 不是`root`用户运行的要特别注意 |
| nocreate             | 不建立新的日志文件                                           |
| errors address       | 滚动时的错误信息发送到指定的 Email 地址                      |
| mail address         | 把滚动的日志文件发送到指定的 Email 地址                      |
| nooldldir            | 滚动后的日志文件放入指定的目录,这里是/log，必须和当前日志文件在同一个文件系统。 |
| nooldldir            | 滚动后的日志文件和当前日志文件放在同一个目录下               |
| sharedscripts        | 共享脚本，即日志滚动完成后再运行脚本，否则每滚动一个日志文件都要运行一次脚本 |
| prerotate            | 在滚动之前需要执行的指令，例如修改文件的属性等动作，必须独立成行 |
| postrotate           | 在滚动之后需要执行的指令，例如重新启动 (`kill -HUP`) 某个服务；必须独立成行 |
| dateext              | 使用当期日期作为命名格式                                     |
| dateformat           | .%s 配合 dateext 使用，紧跟在下一行出现，定义文件切割后的文件名，必须配合 dateext 使用，只支持 `%Y`/`%m`/`%d`/`%s` 四个参数 |
| size log-size        | 当日志文件到达指定的大小时才滚动，以下为合法格式：`size = 5`或`size 5` （>= 5 个字节就滚动） `size = 100k`或`size 100k` `size = 100M`或`size 100M`。 |

实战案例

```shell
sudo vi cd /etc/logrotate.d/nginx # 编辑配置文件
```

```shell
/var/log/nginx/*.log {
	create 0640 root root 
	daily
	rotate 30
	missingok
	notifempty
	olddir /data/nginx-log
	delaycompress
	sharedscripts
	postrotate
		/bin/kill -USR! `cat /run/nginx.pid 2>/dev/null` 2>dev/null || true
	endscript
}
```

```shell
sudo logrotate -d /etc/logrotate.d/nginx # 测试配置文件
sudo logrotate -f /etc/logrotate.d/nginx # 手动执行配置文件
```



定时任务

::: tip 

`logrotate.d`下的配置是在`logrotate.conf`执行时才会执行

`logrotate.conf`默认是按周执行一次，即使设置每天轮转一次，也需要等待执行周期才会触发轮转操作

:::

```shell
crontab -e

# 每天凌晨执行
0 0 * * * /usr/sbin/logrotate -vf /etc/logrotate.d/nginx
```

