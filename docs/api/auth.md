# API 认证

## 认证方式

### Bearer Token
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.example.com/v1/users
```

### API Key
```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  https://api.example.com/v1/users
```

## 获取 Token

### 方式 1：OAuth 2.0
```bash
# 获取授权码
https://api.example.com/oauth/authorize?client_id=xxx&response_type=code

# 换取 Token
POST /oauth/token
{
  "grant_type": "authorization_code",
  "code": "授权码",
  "client_id": "xxx",
  "client_secret": "xxx"
}
```

### 方式 2：账号密码
```bash
POST /api/v1/auth/login
{
  "username": "alice@example.com",
  "password": "password"
}

# 返回
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "expires_in": 3600
}
```

## Token 刷新

```bash
POST /oauth/token
{
  "grant_type": "refresh_token",
  "refresh_token": "xxx"
}
```

## 安全建议

- ✓ 使用 HTTPS
- ✓ 定期轮换密钥
- ✓ 不要在前端暴露 Secret
- ✓ 限制 Token 有效期
