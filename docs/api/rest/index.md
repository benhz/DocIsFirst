# REST API 概览

## API 列表

### 用户 API
- [用户管理](./users.md)

### 商品 API
- [商品管理](./products.md)

### 订单 API
- [订单管理](./orders.md)

## 通用规范

### 请求方法
- `GET`: 查询
- `POST`: 创建
- `PUT`: 更新（全量）
- `PATCH`: 更新（部分）
- `DELETE`: 删除

### 分页
```bash
GET /api/v1/users?page=1&page_size=20
```

响应：
```json
{
  "code": 0,
  "data": {
    "items": [...],
    "total": 100,
    "page": 1,
    "page_size": 20
  }
}
```

### 排序
```bash
GET /api/v1/users?sort=created_at&order=desc
```

### 过滤
```bash
GET /api/v1/users?status=active&role=admin
```
