# 环境说明

## 环境列表

| 环境 | 用途 | 域名 | 数据 |
|-----|------|------|------|
| dev | 开发环境 | dev.example.com | 测试数据 |
| test | 测试环境 | test.example.com | 测试数据 |
| stage | 预发布环境 | stage.example.com | 生产数据副本 |
| prod | 生产环境 | www.example.com | 真实数据 |

## 环境隔离

- 网络隔离
- 数据隔离
- 配置隔离

## 访问权限

- dev/test：所有开发者
- stage：开发+测试+运维
- prod：仅运维（需审批）
