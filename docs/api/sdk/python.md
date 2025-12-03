# Python SDK

## 安装

```bash
pip install example-sdk
```

## 快速开始

```python
from example_sdk import Client

client = Client(
    api_key='YOUR_API_KEY',
    api_secret='YOUR_API_SECRET'
)

# 获取用户
user = client.users.get(123)
print(user)

# 创建订单
order = client.orders.create({
    'user_id': 123,
    'items': [{'product_id': 456, 'quantity': 2}]
})
```

## API 方法

与 JavaScript SDK 类似。
