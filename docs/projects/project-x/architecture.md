# Project X 架构

## 系统架构

```
┌─────────────────────────────┐
│       API Gateway           │
└─────────────────────────────┘
              ↓
┌─────────────────────────────┐
│     Project X Service       │
│  (Spring Boot Application)  │
└─────────────────────────────┘
              ↓
┌──────────┐  ┌──────────┐
│  MySQL   │  │  Redis   │
└──────────┘  └──────────┘
```

## 模块划分

### Controller 层
- UserController
- OrderController

### Service 层
- UserService
- OrderService

### DAO 层
- UserMapper
- OrderMapper

## 技术选型

| 组件 | 技术 | 版本 |
|-----|------|------|
| 语言 | Java | 17 |
| 框架 | Spring Boot | 3.0 |
| ORM | MyBatis | 3.5 |
| 数据库 | MySQL | 8.0 |
| 缓存 | Redis | 7.0 |

## 性能优化

- 使用 Redis 缓存热数据
- 数据库索引优化
- 异步处理耗时操作
