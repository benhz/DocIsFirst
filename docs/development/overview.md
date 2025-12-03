---
sidebar_position: 1
---

# 开发与架构

这里是研发团队的技术文档入口，涵盖架构设计、开发规范、开发指南。

## 📐 整体架构

- [系统架构](./architecture/system-architecture.md) - 系统总体架构设计
- [服务划分](./architecture/services.md) - 各服务职责和边界
- [数据流](./architecture/data-flow.md) - 数据流转和事件机制

## 📏 开发规范

- [代码规范](./standards/code-style.md) - 编码风格和最佳实践
- [Git 工作流](./standards/git-workflow.md) - 分支管理和提交规范
- [Code Review](./standards/review.md) - 代码评审流程和要求

## 📘 开发指南

- [本地环境搭建](./guides/local-setup.md) - 如何搭建开发环境
- [测试策略](./guides/testing.md) - 单测、集成测试、E2E 测试

## 技术栈

| 层次 | 技术选型 |
|-----|---------|
| 前端 | React / Vue.js / TypeScript |
| 后端 | Java Spring Boot / Python Flask |
| 数据库 | MySQL / PostgreSQL |
| 缓存 | Redis |
| 消息队列 | Kafka / RabbitMQ |
| 容器化 | Docker / Kubernetes |

## 快速开始

**新人入职？** 按照这个顺序阅读：
1. 先看 [系统架构](./architecture/system-architecture.md) 了解全局
2. 再看 [本地环境搭建](./guides/local-setup.md) 准备开发环境
3. 然后看 [代码规范](./standards/code-style.md) 了解编码要求
4. 最后看 [Git 工作流](./standards/git-workflow.md) 开始开发

**要做架构设计？** 先看：
- [系统架构](./architecture/system-architecture.md)
- [服务划分](./architecture/services.md)
- [数据流](./architecture/data-flow.md)

## 下一步

- 部署和运维请查看 [运维文档](../operations/overview.md)
- API 开发请查看 [API 文档](../api/overview.md)
- 了解组织流程请查看 [组织文档](../org/overview.md)
