# seckill

秒杀模块

#### 使用技术
`docker` `redis` `react` `kafka` `mysql` `eggjs` `zookeeper` `jmeter` `ES6` `webpack` ...

## 快速开始

> 启动之前要先启动四个基础服务，和一个 `kafka` 客户端服务,命令如下：
```bash
docker-compose up
node seckill_kafka_consumer.js
```
---
## 基础服务
### 启动之前
- 修改`yml`文件里的 `KAFKA_ADVERTISED_HOST_NAME` 成本地IP
- 运行 `docker-compose up`

### docker 启动之后
- 打开控制台 输入 `docker ps` 查看所有的容器id
- 根据上面的结果 输入 `docker exec -it <容器ID> /bin/sh`
- 在redis 容器里面输入 `redis-cli` 进入Redis管理，然后输入 `set count 100` 来初始化商品记数为100，不然请求seckill/seckill 时会一直报 `sold out!`
- 在 mysql 容器里面输入 `mysql -u root -proot` 进入mysql管理界面，然后输入 `alter user 'root'@'%' identified with mysql_native_password by 'root';` 修改mysql认证模式，不然会导致mysql连接不上。
- 在 kafka 容器里面 进入到`cd /opt/kafka_2.11-1.11.0/bin` 然后运行 `./kafka-topics.sh --create --zookeeper <本机IP>:2181/kafka --replication-factor 2 --partitions 10 --topic CAR_NUMBER` 来创建一个topic 不然会造成 `seckill_kafka_consumer.js` 因找不到topic 启动失败。

### docker 全部修改完成之后
- 找到 `app.js` 所在的目录 在终端里输入 `node app.js` 启动web服务
- 找到 `seckill_kafka_consumer.js` 所在的目录 在终端里输入 `node seckill_kafka_consumer.js` 启动 kafka 消息队列的客户端

---

### 完成
> 打开 `JMeter` 开始测试


