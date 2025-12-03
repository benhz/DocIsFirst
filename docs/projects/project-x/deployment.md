# Project X 部署文档

## 部署架构

```
┌───────────┐     ┌───────────┐
│  Pod 1    │     │  Pod 2    │
│ (v1.2.0)  │     │ (v1.2.0)  │
└───────────┘     └───────────┘
       ↓               ↓
┌──────────────────────────────┐
│      Service (LoadBalance)    │
└──────────────────────────────┘
```

## 部署环境

| 环境 | 域名 | 副本数 | 资源配置 |
|-----|------|--------|---------|
| dev | dev.example.com | 1 | 1C2G |
| test | test.example.com | 1 | 2C4G |
| stage | stage.example.com | 2 | 2C4G |
| prod | api.example.com | 3 | 4C8G |

## 部署流程

### 1. 构建镜像
```bash
docker build -t project-x:v1.2.0 .
docker push registry.example.com/project-x:v1.2.0
```

### 2. 更新 K8s 配置
```yaml
# k8s/deployment.yaml
spec:
  containers:
  - name: project-x
    image: registry.example.com/project-x:v1.2.0
```

### 3. 部署
```bash
kubectl apply -f k8s/deployment.yaml
kubectl rollout status deployment/project-x
```

### 4. 验证
```bash
curl https://api.example.com/health
```

## 配置管理

### ConfigMap
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: project-x-config
data:
  database.url: jdbc:mysql://db.example.com/projectx
```

### Secret
```bash
kubectl create secret generic project-x-secret \
  --from-literal=db-password=xxx \
  --from-literal=api-key=xxx
```

## 健康检查

```yaml
livenessProbe:
  httpGet:
    path: /actuator/health
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /actuator/health
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 5
```

## 回滚

```bash
# 回滚到上一版本
kubectl rollout undo deployment/project-x

# 回滚到指定版本
kubectl rollout undo deployment/project-x --to-revision=3
```
