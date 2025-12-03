# 用户 API

## 获取用户列表

```http
GET /api/v1/users
```

**参数**：
- `page` (int): 页码，默认 1
- `page_size` (int): 每页数量，默认 20

**响应**：
```json
{
  "code": 0,
  "data": {
    "items": [
      {
        "id": 123,
        "name": "Alice",
        "email": "alice@example.com",
        "created_at": "2025-01-01T00:00:00Z"
      }
    ],
    "total": 100
  }
}
```

## 获取用户详情

```http
GET /api/v1/users/{id}
```

**响应**：
```json
{
  "code": 0,
  "data": {
    "id": 123,
    "name": "Alice",
    "email": "alice@example.com"
  }
}
```

## 创建用户

```http
POST /api/v1/users
```

**请求体**：
```json
{
  "name": "Bob",
  "email": "bob@example.com",
  "password": "password123"
}
```

## 更新用户

```http
PUT /api/v1/users/{id}
```

## 删除用户

```http
DELETE /api/v1/users/{id}
```
