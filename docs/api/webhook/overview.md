# Webhook 概览

## 什么是 Webhook

Webhook 允许你在特定事件发生时接收实时通知。

## 配置 Webhook

1. 登录平台
2. 进入「开发者中心」→「Webhook」
3. 添加 Webhook URL
4. 选择订阅的事件
5. 保存配置

## Webhook 请求格式

```http
POST https://your-domain.com/webhook
Content-Type: application/json
X-Webhook-Signature: sha256=xxx

{
  "event": "order.created",
  "timestamp": "2025-12-03T10:00:00Z",
  "data": {
    "order_id": "12345",
    "user_id": "67890"
  }
}
```

## 验证签名

```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}
```

## 重试机制

- 失败后自动重试 3 次
- 重试间隔：1min, 5min, 15min
- 超时时间：5 秒

## 下一步

- 查看 [事件列表](./events.md)
- 查看 [示例代码](./examples.md)
