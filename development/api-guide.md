---
sidebar_position: 2
title: API 开发指南
---

# API 开发指南

本指南介绍如何开发和设计高质量的 API 接口。

## RESTful API 设计原则

### 1. 使用合适的HTTP方法

- **GET**: 获取资源
- **POST**: 创建资源
- **PUT**: 更新资源（完整更新）
- **PATCH**: 更新资源（部分更新）
- **DELETE**: 删除资源

### 2. 资源命名规范

使用名词复数形式，保持一致性：

```
✅ 好的设计
GET /api/users          # 获取用户列表
GET /api/users/123      # 获取特定用户
POST /api/users         # 创建用户
PUT /api/users/123      # 更新用户
DELETE /api/users/123   # 删除用户

❌ 不好的设计
GET /api/getUsers
POST /api/createUser
GET /api/user/123
```

### 3. 使用查询参数进行过滤和分页

```
GET /api/users?page=1&limit=20
GET /api/users?role=admin&status=active
GET /api/users?sort=createdAt:desc
```

## API响应格式

### 成功响应

```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "张三",
    "email": "zhangsan@example.com"
  },
  "meta": {
    "timestamp": "2024-12-03T10:00:00Z"
  }
}
```

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "用户不存在",
    "details": {
      "userId": "123"
    }
  },
  "meta": {
    "timestamp": "2024-12-03T10:00:00Z"
  }
}
```

## HTTP状态码

使用标准的HTTP状态码：

- **200 OK**: 成功
- **201 Created**: 创建成功
- **204 No Content**: 成功但无返回内容
- **400 Bad Request**: 请求参数错误
- **401 Unauthorized**: 未授权
- **403 Forbidden**: 禁止访问
- **404 Not Found**: 资源不存在
- **500 Internal Server Error**: 服务器错误

## API版本控制

推荐使用URL路径进行版本控制：

```
/api/v1/users
/api/v2/users
```

## 示例代码

### Node.js + Express

```javascript title="routes/users.js"
const express = require('express');
const router = express.Router();

// 获取用户列表
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const users = await User.find()
      .limit(limit)
      .skip((page - 1) * limit);

    res.json({
      success: true,
      data: users,
      meta: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: await User.countDocuments()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message
      }
    });
  }
});

// 创建用户
router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: error.message
      }
    });
  }
});

module.exports = router;
```

## 安全最佳实践

:::danger 安全警告
永远不要在API响应中返回敏感信息，如密码哈希、令牌等。
:::

### 1. 使用HTTPS

生产环境必须使用HTTPS加密传输。

### 2. 输入验证

```javascript
const { body, validationResult } = require('express-validator');

router.post('/users',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: '输入验证失败',
          details: errors.array()
        }
      });
    }
    // 处理请求...
  }
);
```

### 3. 限流

使用中间件限制请求频率：

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 最多100个请求
});

app.use('/api/', limiter);
```

### 4. 身份认证

使用JWT进行身份认证：

```javascript
const jwt = require('jsonwebtoken');

// 生成token
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// 验证token中间件
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      error: { code: 'NO_TOKEN', message: '未提供认证令牌' }
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: { code: 'INVALID_TOKEN', message: '无效的认证令牌' }
    });
  }
};
```

## API文档

推荐使用 Swagger/OpenAPI 生成API文档：

```javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Qicat API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
```

## 测试

使用 Jest 和 Supertest 进行API测试：

```javascript title="__tests__/users.test.js"
const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  test('GET /api/users - should return user list', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('POST /api/users - should create user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: '测试用户'
    };

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe(userData.email);
  });
});
```

## 性能优化

### 1. 使用缓存

```javascript
const redis = require('redis');
const client = redis.createClient();

router.get('/users/:id', async (req, res) => {
  const cacheKey = `user:${req.params.id}`;

  // 先查缓存
  const cached = await client.get(cacheKey);
  if (cached) {
    return res.json({
      success: true,
      data: JSON.parse(cached),
      cached: true
    });
  }

  // 查数据库
  const user = await User.findById(req.params.id);

  // 存入缓存
  await client.setex(cacheKey, 3600, JSON.stringify(user));

  res.json({ success: true, data: user });
});
```

### 2. 数据库查询优化

```javascript
// 使用字段投影，只返回需要的字段
const users = await User.find({}, 'name email avatar');

// 使用索引
userSchema.index({ email: 1 });

// 使用聚合优化复杂查询
const stats = await User.aggregate([
  { $match: { status: 'active' } },
  { $group: { _id: '$role', count: { $sum: 1 } } }
]);
```

## 相关资源

- [RESTful API 最佳实践](https://restfulapi.net/)
- [HTTP 状态码参考](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
- [JWT 官方文档](https://jwt.io/)

---

继续学习 [后端开发](./backend/nodejs-guide) 或 [前端开发](./frontend/react-guide)。
