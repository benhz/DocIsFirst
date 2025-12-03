---
sidebar_position: 1
---

# Node.js 开发指南

全面的 Node.js 后端开发指南，帮助你构建高性能的服务器应用。

## 环境准备

### 安装 Node.js

推荐使用 nvm 管理 Node.js 版本：

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 安装 Node.js LTS 版本
nvm install --lts

# 使用特定版本
nvm use 18
```

### 项目初始化

```bash
# 创建项目目录
mkdir my-api
cd my-api

# 初始化 package.json
npm init -y

# 安装必要依赖
npm install express dotenv cors helmet
npm install -D nodemon typescript @types/node @types/express
```

## 项目结构

推荐的项目目录结构：

```
my-api/
├── src/
│   ├── config/          # 配置文件
│   │   └── database.ts
│   ├── controllers/     # 控制器
│   │   └── userController.ts
│   ├── models/          # 数据模型
│   │   └── User.ts
│   ├── routes/          # 路由
│   │   └── userRoutes.ts
│   ├── middlewares/     # 中间件
│   │   └── auth.ts
│   ├── services/        # 业务逻辑
│   │   └── userService.ts
│   ├── utils/           # 工具函数
│   │   └── logger.ts
│   └── app.ts           # 应用入口
├── tests/               # 测试文件
├── .env                 # 环境变量
├── .gitignore
├── package.json
└── tsconfig.json
```

## Express 应用搭建

### 基础服务器

```typescript title="src/app.ts"
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// 中间件
app.use(helmet());           // 安全头
app.use(cors());             // 跨域
app.use(express.json());     // JSON解析
app.use(express.urlencoded({ extended: true }));

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 路由
import userRoutes from './routes/userRoutes';
app.use('/api/users', userRoutes);

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production'
        ? '服务器内部错误'
        : err.message
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});

export default app;
```

### 环境变量配置

```bash title=".env"
NODE_ENV=development
PORT=3000

# 数据库
DATABASE_URL=mongodb://localhost:27017/mydb

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
```

## 路由和控制器

### 路由定义

```typescript title="src/routes/userRoutes.ts"
import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { userSchema } from '../schemas/userSchema';

const router = Router();

// 公开路由
router.post('/register', validate(userSchema.register), userController.register);
router.post('/login', validate(userSchema.login), userController.login);

// 需要认证的路由
router.use(authenticate);

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', validate(userSchema.update), userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
```

### 控制器

```typescript title="src/controllers/userController.ts"
import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createUser(req.body);
    const token = userService.generateToken(user.id);

    res.status(201).json({
      success: true,
      data: {
        user,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const result = await userService.authenticateUser(email, password);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const result = await userService.getUsers({
      page: Number(page),
      limit: Number(limit),
      search: search as string
    });

    res.json({
      success: true,
      data: result.users,
      meta: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: '用户不存在'
        }
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.deleteUser(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
```

## 数据验证

使用 Zod 进行数据验证：

```typescript title="src/schemas/userSchema.ts"
import { z } from 'zod';

export const userSchema = {
  register: z.object({
    body: z.object({
      email: z.string().email('无效的邮箱地址'),
      password: z.string().min(8, '密码至少8个字符'),
      name: z.string().min(2, '姓名至少2个字符')
    })
  }),

  login: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string()
    })
  }),

  update: z.object({
    body: z.object({
      name: z.string().min(2).optional(),
      avatar: z.string().url().optional(),
      bio: z.string().max(500).optional()
    })
  })
};
```

```typescript title="src/middlewares/validate.ts"
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: '输入验证失败',
            details: error.errors
          }
        });
      }
      next(error);
    }
  };
```

## 异步错误处理

创建自定义错误类：

```typescript title="src/utils/errors.ts"
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, 'NOT_FOUND', `${resource}不存在`);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = '未授权访问') {
    super(401, 'UNAUTHORIZED', message);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, 'VALIDATION_ERROR', message);
  }
}
```

## 日志记录

使用 Winston 进行日志管理：

```typescript title="src/utils/logger.ts"
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export default logger;
```

## 性能优化

### 1. 使用压缩

```typescript
import compression from 'compression';

app.use(compression());
```

### 2. 连接池

```typescript
import mongoose from 'mongoose';

mongoose.connect(process.env.DATABASE_URL!, {
  maxPoolSize: 10,
  minPoolSize: 5
});
```

### 3. 缓存

```typescript
import { createClient } from 'redis';

const redis = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

await redis.connect();

// 缓存中间件
export const cache = (duration: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = `cache:${req.originalUrl}`;
    const cached = await redis.get(key);

    if (cached) {
      return res.json(JSON.parse(cached));
    }

    // 重写res.json以缓存响应
    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      redis.setex(key, duration, JSON.stringify(body));
      return originalJson(body);
    };

    next();
  };
};
```

## 测试

```typescript title="tests/users.test.ts"
import request from 'supertest';
import app from '../src/app';
import { connectDB, closeDB } from './setup';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});

describe('User API', () => {
  let authToken: string;

  test('POST /api/users/register - 注册用户', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: '测试用户'
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
    authToken = response.body.data.token;
  });

  test('GET /api/users - 获取用户列表', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
```

## 部署

### Docker化

```dockerfile title="Dockerfile"
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/app.js"]
```

### 生产环境配置

```typescript
import cluster from 'cluster';
import os from 'os';

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`启动 ${numCPUs} 个工作进程`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`工作进程 ${worker.process.pid} 已退出，重启中...`);
    cluster.fork();
  });
} else {
  // 启动Express应用
  import('./app');
}
```

## 最佳实践

:::tip 开发建议
1. 使用 TypeScript 增强类型安全
2. 实现适当的错误处理
3. 使用环境变量管理配置
4. 编写单元测试和集成测试
5. 使用 ESLint 和 Prettier 保持代码质量
6. 实现日志记录和监控
7. 使用 Docker 容器化部署
:::

## 相关资源

- [Node.js 官方文档](https://nodejs.org/docs/)
- [Express.js 指南](https://expressjs.com/)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)

---

继续阅读 [数据库设计](./database) 指南。
