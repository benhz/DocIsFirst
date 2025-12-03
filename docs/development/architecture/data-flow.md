# 数据流与事件

## 数据流分类

### 1. 同步数据流（请求-响应）
用户发起请求 → API 网关 → 业务服务 → 返回结果

**示例**：用户查询订单
```
用户 → Gateway → order-service → MySQL → 返回订单详情
```

### 2. 异步数据流（事件驱动）
服务 A 发布事件 → 消息队列 → 服务 B 订阅处理

**示例**：订单创建后发送通知
```
order-service 发布 "订单创建" 事件 
    → Kafka 
    → notification-service 订阅并发送通知
```

## 核心业务流程

### 下单流程

```
1. 用户提交订单
   ↓
2. order-service 验证库存（调用 product-service）
   ↓
3. order-service 创建订单（写 MySQL）
   ↓
4. order-service 发布 "订单创建" 事件（Kafka）
   ↓
5. payment-service 订阅事件，发起支付
   ↓
6. notification-service 订阅事件，发送通知
```

### 支付成功流程

```
1. 支付回调
   ↓
2. payment-service 更新支付状态
   ↓
3. 发布 "支付成功" 事件
   ↓
4. order-service 订阅事件，更新订单状态
   ↓
5. notification-service 订阅事件，通知用户
```

## 事件设计

### 事件命名规范
格式：`{domain}.{entity}.{action}`

示例：
- `order.created` - 订单创建
- `payment.succeeded` - 支付成功
- `user.registered` - 用户注册

### 事件结构

```json
{
  "event_id": "uuid",
  "event_type": "order.created",
  "timestamp": "2025-12-03T10:00:00Z",
  "source": "order-service",
  "data": {
    "order_id": "12345",
    "user_id": "67890",
    "amount": 100.00
  }
}
```

## 数据一致性

### 最终一致性
通过事件机制保证最终一致：
- 订单服务创建订单
- 发布事件
- 其他服务异步处理
- 最终达到一致状态

### 分布式事务
使用 Saga 模式：
- 将大事务拆成多个本地事务
- 通过补偿机制保证一致性

### 示例：订单取消（Saga）
```
1. order-service 取消订单
2. 发布事件
3. payment-service 退款
4. product-service 恢复库存
如果某步失败 → 执行补偿事务
```

## 缓存策略

### 缓存层级
```
L1: 应用内存缓存（本地缓存）
L2: Redis 缓存（分布式缓存）
L3: MySQL 数据库
```

### 缓存更新策略
- **Cache Aside**：读时更新，写时失效
- **Write Through**：同时更新缓存和数据库
- **Write Behind**：异步更新数据库

### 缓存失效
- **主动失效**：数据更新时删除缓存
- **被动失效**：设置 TTL 自动过期

## 消息队列

### Kafka 使用场景
- 事件驱动
- 日志收集
- 数据同步

### Topic 设计
- `order-events` - 订单相关事件
- `payment-events` - 支付相关事件
- `user-events` - 用户相关事件

### 消费者组
每个服务独立的消费者组，互不影响。

## 下一步

- 查看 [系统架构](./system-architecture.md) 了解整体架构
- 查看 [服务划分](./services.md) 了解各服务职责
