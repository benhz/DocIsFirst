# 平台集成能力

## 集成方式

### 1. REST API
标准的 HTTP API，适合大部分场景。
- 详见 [API 文档](../api/overview.md)

### 2. SDK
提供多语言 SDK，简化开发：
- [JavaScript SDK](../api/sdk/js.md)
- [Python SDK](../api/sdk/python.md)
- [Java SDK](../api/sdk/java.md)

### 3. Webhook
事件驱动，实时推送：
- 详见 [Webhook 文档](../api/webhook/overview.md)

## 与外部系统集成

### 与 CRM 系统集成
支持与主流 CRM（Salesforce、HubSpot 等）集成：
- 数据同步
- 双向推送

### 与 ERP 系统集成
支持与 SAP、Oracle 等 ERP 系统对接：
- 订单同步
- 库存同步

### 与 BI 工具集成
支持与 Tableau、Power BI 等对接：
- 数据导出
- 实时查询

## 数据同步

### 同步方式
- **实时同步**：事件触发
- **定时同步**：每小时/每天
- **手动同步**：按需触发

### 同步策略
- **全量同步**：首次或恢复时
- **增量同步**：日常使用（更高效）

## 接入指南

### 第一步：申请 API 密钥
1. 登录平台
2. 进入「开发者中心」
3. 创建应用
4. 获取 API Key 和 Secret

### 第二步：调用 API
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.example.com/v1/data
```

### 第三步：配置 Webhook
在「开发者中心」配置 Webhook URL，接收事件通知。

## 安全建议

- ✓ 妥善保管 API 密钥
- ✓ 使用 HTTPS
- ✓ 验证 Webhook 签名
- ✓ 限制 API 调用频率
- ✗ 不要在前端暴露密钥

## 下一步

- 查看 [API 文档](../api/overview.md)
- 查看 [SDK 文档](../api/sdk/js.md)
- 查看 [Webhook 文档](../api/webhook/overview.md)
