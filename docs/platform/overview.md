---
sidebar_position: 1
---

# 平台与通用能力

这里汇总了在 Kubernetes 集群中运行的统一平台能力，所有产品都复用这些平台级服务。

## 核心能力

### 🤖 AI 与知识库能力
- **Dify** (namespace: `dify`)
  - AI 应用开发平台
  - 知识库管理
  - LLM 应用编排
  - 提示词工程

### 💾 数据存储能力
- **PostgreSQL** (namespace: `postgredb`)
  - 关系型数据库服务
  - 事务支持
  - 数据持久化

- **Redis** (namespace: `redis`)
  - 高性能缓存
  - 会话存储
  - 消息队列

- **MinIO** (namespace: `minio`, `minio-operator`)
  - S3 兼容对象存储
  - 文件上传下载
  - 备份归档

- **Rook-Ceph** (namespace: `rook-ceph`)
  - 分布式存储系统
  - 块存储/文件存储/对象存储
  - 高可用存储后端

### 🔍 搜索与分析
- **OpenSearch** (namespace: `opensearch`)
  - 全文搜索引擎
  - 日志分析
  - 数据可视化

### 📊 数据平台
- **NocoDB** (namespace: `nocodb`)
  - 低代码数据库平台
  - API 自动生成
  - 数据协作

### 🛠️ 开发与 CI/CD
- **GitLab** (namespace: `gitlab`)
  - 代码托管
  - 项目管理
  - CI/CD 平台

- **GitLab Runner** (namespace: `gitlab-runner`)
  - CI/CD 任务执行器
  - 自动化构建测试
  - 容器化部署

### 📚 文档平台
- **Platform Docs** (namespace: `platform-docs`)
  - 技术文档中心
  - API 文档
  - 团队知识库

### 📸 多媒体服务
- **PhotoPrism** (namespace: `photoprism`)
  - AI 驱动的照片管理
  - 图片存储与检索
  - 自动分类与标签

### 📝 日志与监控
- **Vector** (namespace: `vector`)
  - 日志收集与转发
  - 数据管道
  - 可观测性基础设施

## 架构图

```
┌──────────────────────────────────────────────────────┐
│                   应用层 (产品)                        │
│   文档平台  │  AI应用  │  数据协作  │  照片管理       │
└──────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────┐
│                  平台服务层                            │
│  Dify  │  GitLab  │  NocoDB  │  PhotoPrism  │  ...  │
└──────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────┐
│                 基础设施层                             │
│  PostgreSQL  │  Redis  │  MinIO  │  OpenSearch       │
│  Rook-Ceph   │  Vector │  GitLab Runner              │
└──────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────┐
│              Kubernetes 集群 (117天)                   │
│  命名空间隔离  │  服务发现  │  自动伸缩  │  健康检查  │
└──────────────────────────────────────────────────────┘
```

## 命名空间清单

基于实际 Kubernetes 集群的命名空间列表：

| 命名空间 | 运行时长 | 用途 |
|---------|---------|------|
| `dify` | 86天 | AI 应用开发平台 |
| `gitlab` | 22天 | 代码托管与 CI/CD |
| `gitlab-runner` | 16天 | CI/CD 任务执行 |
| `minio` | 111天 | 对象存储服务 |
| `minio-operator` | 111天 | MinIO 管理器 |
| `nocodb` | 82天 | 低代码数据平台 |
| `opensearch` | 106天 | 搜索引擎 |
| `photoprism` | 19天 | 照片管理 |
| `platform-docs` | 20天 | 平台文档中心 |
| `postgredb` | 109天 | PostgreSQL 数据库 |
| `redis` | 86天 | 缓存服务 |
| `rook-ceph` | 111天 | 分布式存储 |
| `vector` | 109天 | 日志收集 |

## 使用指南

### 对于开发团队
- 新服务接入平台能力，请查看 [集成指南](./integration-overview.md)
- API 调用方式，请查看 [API 文档](../api/overview.md)
- Kubernetes 部署配置，请查看 [运维手册](../operations/overview.md)

### 对于用户
- 账号相关问题，请查看 [账号文档](./account-auth.md)
- 权限申请流程，请查看 [权限文档](./permission.md)

## 下一步

- 开发者请查看 [API 文档](../api/overview.md)
- 了解系统架构请查看 [开发架构](../development/overview.md)
- 运维操作请查看 [运维手册](../operations/overview.md)
