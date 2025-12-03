# 订单 API

## 创建订单

```http
POST /api/v1/orders
```

**请求体**：
```json
{
  "user_id": 123,
  "items": [
    {
      "product_id": 456,
      "quantity": 2
    }
  ]
}
```

## 获取订单详情

```http
GET /api/v1/orders/{id}
```

## 取消订单

```http
PUT /api/v1/orders/{id}/cancel
```
