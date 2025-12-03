---
sidebar_position: 1
---

# API 与集成

欢迎使用 API 文档！这里提供了完整的 API 接入指南。

## API 基础信息

- **Base URL**: `https://api.example.com/v1`
- **协议**: HTTPS
- **数据格式**: JSON
- **字符编码**: UTF-8

## 快速开始

### 1. 获取 API 密钥
登录平台 → 开发者中心 → 创建应用 → 获取 API Key

### 2. 发起请求
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.example.com/v1/users/me
```

### 3. 处理响应
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 123,
    "name": "Alice"
  }
}
```

## 核心文档

- [认证方式](./auth.md) - 如何认证 API 请求
- [错误码](./error-codes.md) - 错误码说明
- [REST API](./rest/index.md) - REST API 详细文档
- [SDK](./sdk/js.md) - 多语言 SDK
- [Webhook](./webhook/overview.md) - 事件推送

## API 限流

- 默认：1000 次/分钟
- 超限：返回 429 Too Many Requests
- 升级配额：联系商务

## 下一步

- 查看 [认证文档](./auth.md)
- 查看 [REST API](./rest/index.md)
- 查看 [SDK 文档](./sdk/js.md)
