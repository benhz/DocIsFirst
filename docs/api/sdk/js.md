# JavaScript SDK

## 安装

```bash
npm install @example/sdk
```

## 快速开始

```javascript
import { Client } from '@example/sdk';

const client = new Client({
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_API_SECRET'
});

// 获取用户
const user = await client.users.get(123);
console.log(user);

// 创建订单
const order = await client.orders.create({
  user_id: 123,
  items: [{ product_id: 456, quantity: 2 }]
});
```

## API 方法

### 用户
- `client.users.list()` - 获取列表
- `client.users.get(id)` - 获取详情
- `client.users.create(data)` - 创建
- `client.users.update(id, data)` - 更新
- `client.users.delete(id)` - 删除

### 订单
- `client.orders.create(data)` - 创建订单
- `client.orders.get(id)` - 获取详情
- `client.orders.cancel(id)` - 取消订单

## 错误处理

```javascript
try {
  const user = await client.users.get(123);
} catch (error) {
  console.error(error.code);    // 错误码
  console.error(error.message); // 错误信息
}
```
