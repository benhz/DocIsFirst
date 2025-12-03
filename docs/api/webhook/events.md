# Webhook 事件

## 用户事件

- `user.created` - 用户注册
- `user.updated` - 用户信息更新
- `user.deleted` - 用户删除

## 订单事件

- `order.created` - 订单创建
- `order.paid` - 订单支付成功
- `order.shipped` - 订单发货
- `order.completed` - 订单完成
- `order.cancelled` - 订单取消

## 支付事件

- `payment.succeeded` - 支付成功
- `payment.failed` - 支付失败
- `payment.refunded` - 退款成功

## 事件数据示例

### order.created

```json
{
  "event": "order.created",
  "timestamp": "2025-12-03T10:00:00Z",
  "data": {
    "order_id": "12345",
    "user_id": "67890",
    "amount": 100.00,
    "status": "pending"
  }
}
```
