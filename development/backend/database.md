---
sidebar_position: 2
---

# 数据库设计

数据库设计原则和最佳实践指南。

## 数据库选型

### MongoDB (NoSQL)

适用场景：
- 灵活的数据结构
- 快速原型开发
- 水平扩展需求
- 非关系型数据

### PostgreSQL (SQL)

适用场景：
- 复杂的关系数据
- 事务一致性要求高
- 需要复杂查询和分析
- 数据完整性要求严格

### Redis (缓存/队列)

适用场景：
- 会话存储
- 缓存层
- 消息队列
- 实时排行榜

## MongoDB 设计实践

### Mongoose 模型定义

```typescript title="src/models/User.ts"
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'banned';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, '邮箱是必填项'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, '请输入有效的邮箱地址']
    },
    password: {
      type: String,
      required: [true, '密码是必填项'],
      minlength: [8, '密码至少8个字符'],
      select: false // 默认查询不返回密码
    },
    name: {
      type: String,
      required: [true, '姓名是必填项'],
      trim: true,
      minlength: [2, '姓名至少2个字符'],
      maxlength: [50, '姓名最多50个字符']
    },
    avatar: {
      type: String,
      default: null
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'banned'],
      default: 'active'
    }
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      }
    }
  }
);

// 索引
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ name: 'text' }); // 文本搜索索引

// 保存前加密密码
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// 实例方法：比较密码
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// 静态方法：查找活跃用户
userSchema.statics.findActive = function () {
  return this.find({ status: 'active' });
};

export const User = mongoose.model<IUser>('User', userSchema);
```

### 数据库连接

```typescript title="src/config/database.ts"
import mongoose from 'mongoose';
import logger from '../utils/logger';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL!, {
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
    });

    logger.info(`MongoDB 已连接: ${conn.connection.host}`);

    // 监听连接事件
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB 连接错误:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB 已断开连接');
    });

    // 优雅关闭
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB 连接已关闭');
      process.exit(0);
    });

  } catch (error) {
    logger.error('MongoDB 连接失败:', error);
    process.exit(1);
  }
};
```

### 复杂查询示例

```typescript
// 分页查询
const getUsers = async (page = 1, limit = 20, search?: string) => {
  const query: any = { status: 'active' };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const [users, total] = await Promise.all([
    User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean(), // 返回纯 JavaScript 对象，性能更好
    User.countDocuments(query)
  ]);

  return {
    users,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};

// 聚合查询
const getUserStats = async () => {
  const stats = await User.aggregate([
    // 按角色分组统计
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        activeCount: {
          $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
        }
      }
    },
    // 按注册时间统计
    {
      $facet: {
        byRole: [
          { $group: { _id: '$role', count: { $sum: 1 } } }
        ],
        byMonth: [
          {
            $group: {
              _id: {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' }
              },
              count: { $sum: 1 }
            }
          },
          { $sort: { '_id.year': -1, '_id.month': -1 } },
          { $limit: 12 }
        ]
      }
    }
  ]);

  return stats[0];
};
```

## PostgreSQL 设计实践

### 使用 Prisma ORM

```prisma title="prisma/schema.prisma"
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  password  String
  avatar    String?
  role      Role     @default(USER)
  status    Status   @default(ACTIVE)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts     Post[]
  comments  Comment[]

  @@index([email])
  @@index([createdAt])
  @@map("users")
}

model Post {
  id          String   @id @default(uuid())
  title       String
  content     String
  published   Boolean  @default(false)
  authorId    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  author      User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  comments    Comment[]
  tags        Tag[]

  @@index([authorId])
  @@index([published])
  @@map("posts")
}

model Comment {
  id        String   @id @default(uuid())
  content   String
  postId    String
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@index([postId])
  @@index([authorId])
  @@map("comments")
}

model Tag {
  id    String @id @default(uuid())
  name  String @unique
  posts Post[]

  @@map("tags")
}

enum Role {
  USER
  ADMIN
}

enum Status {
  ACTIVE
  INACTIVE
  BANNED
}
```

### Prisma 查询示例

```typescript title="src/services/userService.ts"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 创建用户
export const createUser = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  return prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true
    }
  });
};

// 查询用户及其文章
export const getUserWithPosts = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      posts: {
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        take: 10
      }
    }
  });
};

// 事务操作
export const createPostWithTags = async (
  userId: string,
  title: string,
  content: string,
  tagNames: string[]
) => {
  return prisma.$transaction(async (tx) => {
    // 创建或查找标签
    const tags = await Promise.all(
      tagNames.map(name =>
        tx.tag.upsert({
          where: { name },
          create: { name },
          update: {}
        })
      )
    );

    // 创建文章并关联标签
    return tx.post.create({
      data: {
        title,
        content,
        authorId: userId,
        tags: {
          connect: tags.map(tag => ({ id: tag.id }))
        }
      },
      include: {
        tags: true,
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    });
  });
};

// 分页查询
export const getPosts = async (page = 1, limit = 20) => {
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        _count: {
          select: { comments: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.post.count({ where: { published: true } })
  ]);

  return {
    posts,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};

// 原生 SQL 查询
export const getTopAuthors = async () => {
  return prisma.$queryRaw`
    SELECT
      u.id,
      u.name,
      COUNT(p.id) as post_count
    FROM users u
    LEFT JOIN posts p ON u.id = p."authorId"
    WHERE u.status = 'ACTIVE'
    GROUP BY u.id, u.name
    ORDER BY post_count DESC
    LIMIT 10
  `;
};
```

## 数据库优化

### 1. 索引优化

```typescript
// 单字段索引
userSchema.index({ email: 1 });

// 复合索引
userSchema.index({ status: 1, createdAt: -1 });

// 唯一索引
userSchema.index({ email: 1 }, { unique: true });

// 文本索引（全文搜索）
userSchema.index({ name: 'text', bio: 'text' });

// 过期索引（TTL）
sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });
```

### 2. 查询优化

```typescript
// ❌ 避免：N+1查询问题
const users = await User.find();
for (const user of users) {
  user.posts = await Post.find({ authorId: user.id });
}

// ✅ 推荐：使用 populate 或 join
const users = await User.find().populate('posts');

// ✅ 推荐：使用聚合
const users = await User.aggregate([
  {
    $lookup: {
      from: 'posts',
      localField: '_id',
      foreignField: 'authorId',
      as: 'posts'
    }
  }
]);
```

### 3. 连接池配置

```typescript
// MongoDB
mongoose.connect(uri, {
  maxPoolSize: 10,
  minPoolSize: 5
});

// PostgreSQL (Prisma)
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // connection_limit = 20
}
```

### 4. 使用缓存

```typescript
import { createClient } from 'redis';

const redis = createClient();

export const getCachedUser = async (userId: string) => {
  const cacheKey = `user:${userId}`;

  // 先查缓存
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // 查数据库
  const user = await User.findById(userId).lean();

  // 存入缓存（1小时）
  await redis.setex(cacheKey, 3600, JSON.stringify(user));

  return user;
};
```

## 数据迁移

### Prisma 迁移

```bash
# 创建迁移
npx prisma migrate dev --name add_user_status

# 应用迁移到生产环境
npx prisma migrate deploy

# 重置数据库（开发环境）
npx prisma migrate reset
```

### MongoDB 迁移脚本

```typescript title="migrations/001_add_status_field.ts"
import mongoose from 'mongoose';
import { User } from '../src/models/User';

export const up = async () => {
  await User.updateMany(
    { status: { $exists: false } },
    { $set: { status: 'active' } }
  );
};

export const down = async () => {
  await User.updateMany(
    {},
    { $unset: { status: '' } }
  );
};
```

## 备份和恢复

### MongoDB

```bash
# 备份
mongodump --uri="mongodb://localhost:27017/mydb" --out=/backup

# 恢复
mongorestore --uri="mongodb://localhost:27017/mydb" /backup/mydb

# 备份特定集合
mongodump --uri="mongodb://localhost:27017/mydb" --collection=users --out=/backup
```

### PostgreSQL

```bash
# 备份
pg_dump -U username -d database_name > backup.sql

# 恢复
psql -U username -d database_name < backup.sql

# 备份到压缩文件
pg_dump -U username -d database_name | gzip > backup.sql.gz
```

## 最佳实践

:::tip 数据库设计原则
1. **规范化设计**：减少数据冗余（SQL）
2. **嵌入vs引用**：合理选择数据组织方式（NoSQL）
3. **索引策略**：为常用查询字段添加索引
4. **数据验证**：在模型层进行数据验证
5. **软删除**：使用状态字段而不是物理删除
6. **乐观锁**：使用版本号处理并发更新
7. **定期备份**：制定备份策略并测试恢复流程
8. **监控性能**：使用慢查询日志找出性能瓶颈
:::

## 相关资源

- [MongoDB 最佳实践](https://www.mongodb.com/docs/manual/administration/production-notes/)
- [Prisma 文档](https://www.prisma.io/docs/)
- [PostgreSQL 性能优化](https://wiki.postgresql.org/wiki/Performance_Optimization)

---

继续学习 [前端开发](../frontend/react-guide)。
