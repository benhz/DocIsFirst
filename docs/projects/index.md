---
sidebar_position: 1
---

# 项目手册

这里按照系统/服务维度，提供详细的项目文档。

## 项目列表

### [Project X](./project-x/overview.md)
**描述**：核心业务系统  
**技术栈**：Java Spring Boot + MySQL  
**负责人**：张三  
**状态**：运行中

**快速链接**：
- [项目架构](./project-x/architecture.md)
- [依赖关系](./project-x/dependencies.md)
- [部署文档](./project-x/deployment.md)
- [故障手册](./project-x/runbook.md)

---

### [Project Y](./project-y/overview.md)
**描述**：数据分析系统  
**技术栈**：Python Flask + ClickHouse  
**负责人**：李四  
**状态**：运行中

---

## 项目总览

| 项目 | 技术栈 | 负责人 | 关联产品 |
|-----|--------|--------|---------|
| Project X | Java | 张三 | 产品 A |
| Project Y | Python | 李四 | 产品 B |

## 如何添加新项目

1. 在 `docs/projects/` 下创建项目目录
2. 按照模板创建文档
3. 更新项目列表
