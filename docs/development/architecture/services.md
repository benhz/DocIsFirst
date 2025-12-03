# 服务划分

## 服务清单

| 服务名称 | 职责 | 技术栈 | 数据库 |
|---------|------|--------|--------|
| user-service | 用户管理 | Java Spring Boot | MySQL |
| order-service | 订单管理 | Java Spring Boot | MySQL |
| product-service | 商品管理 | Java Spring Boot | MySQL |
| payment-service | 支付处理 | Java Spring Boot | MySQL |
| notification-service | 消息通知 | Python Flask | MongoDB |
| search-service | 搜索服务 | Python Flask | ElasticSearch |

## 服务详情

### user-service（用户服务）
**职责**：
- 用户注册、登录、登出
- 个人信息管理
- 用户状态管理

**API**：
- `POST /api/users/register` - 注册
- `POST /api/users/login` - 登录
- `GET /api/users/{id}` - 获取用户信息
- `PUT /api/users/{id}` - 更新用户信息

**依赖**：
- Redis（Session 缓存）
- 平台账号服务

---

### order-service（订单服务）
**职责**：
- 订单创建、查询、取消
- 订单状态流转
- 订单统计

**API**：
- `POST /api/orders` - 创建订单
- `GET /api/orders/{id}` - 查询订单
- `PUT /api/orders/{id}/cancel` - 取消订单

**依赖**：
- user-service（用户信息）
- product-service（商品信息）
- payment-service（支付处理）

---

### payment-service（支付服务）
**职责**：
- 发起支付
- 支付回调处理
- 退款处理

**API**：
- `POST /api/payments` - 发起支付
- `POST /api/payments/callback` - 支付回调
- `POST /api/payments/{id}/refund` - 退款

**依赖**：
- 第三方支付（支付宝、微信）

## 服务依赖关系

```
order-service
    ├─> user-service
    ├─> product-service
    └─> payment-service
        └─> 第三方支付

search-service
    ├─> product-service
    └─> ElasticSearch
```

## 服务边界

### 原则
- **单一职责**：每个服务只负责一个业务领域
- **松耦合**：服务间通过 API/事件通信，不直接访问数据库
- **高内聚**：相关功能放在一个服务内

### 反模式
❌ **不要**跨服务直接访问数据库  
❌ **不要**让服务相互循环依赖  
❌ **不要**把所有功能塞在一个服务里  

## 服务治理

### 服务注册与发现
使用 Consul / Nacos

### 配置管理
使用 Spring Cloud Config / Apollo

### 链路追踪
使用 Jaeger / Zipkin

## 下一步

- 查看 [系统架构](./system-architecture.md) 了解整体架构
- 查看 [数据流](./data-flow.md) 了解服务间数据流转
