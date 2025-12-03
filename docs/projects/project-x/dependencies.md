# Project X 依赖关系

## 上游依赖（调用方）

- API Gateway

## 下游依赖（被调用方）

### 内部服务
- **user-service**: 获取用户信息
- **payment-service**: 支付处理

### 外部服务
- **支付宝**: 第三方支付
- **短信服务**: 发送验证码

### 基础设施
- **MySQL**: 业务数据库
- **Redis**: 缓存
- **Kafka**: 消息队列

## 依赖影响

| 依赖 | 影响 | 降级方案 |
|-----|------|---------|
| user-service | 高 | 使用缓存 |
| payment-service | 高 | 同步转异步 |
| 短信服务 | 低 | 延迟重试 |

## 依赖版本

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>3.0.0</version>
  </dependency>
  <!-- 更多依赖... -->
</dependencies>
```
