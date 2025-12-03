# 运维手册

## 常见故障处理

### 服务启动失败

**现象**：Pod 启动后立即 CrashLoopBackOff

**排查步骤**：
1. 查看日志：`kubectl logs pod-name`
2. 查看事件：`kubectl describe pod pod-name`
3. 检查配置：ConfigMap、Secret 是否正确

**常见原因**：
- 配置文件错误
- 数据库连接失败
- 端口被占用

---

### 接口超时

**现象**：接口响应时间 > 3s

**排查步骤**：
1. 查看监控：CPU、内存、网络
2. 查看日志：是否有慢查询
3. 查看链路追踪：哪个环节慢

**常见原因**：
- 数据库慢查询
- 缓存失效
- 下游服务慢

---

### 内存溢出

**现象**：Pod 被 OOMKilled

**排查步骤**：
1. 查看内存使用：`kubectl top pod`
2. 分析堆转储：下载 heap dump 分析

**常见原因**：
- 内存泄漏
- 数据量过大
- 资源限制太小

## 日常操作

### 查看日志
```bash
# 实时日志
kubectl logs -f pod-name

# 最近 100 行
kubectl logs --tail=100 pod-name

# 指定容器
kubectl logs pod-name -c container-name
```

### 扩缩容
```bash
# 手动扩容
kubectl scale deployment app-name --replicas=5

# 查看状态
kubectl get pods -l app=app-name
```

### 查看资源使用
```bash
# 节点资源
kubectl top nodes

# Pod 资源
kubectl top pods
```

## 紧急联系方式

- 值班电话：XXX-XXXX
- 技术群：企业微信「运维值班群」
- DBA：XXX-XXXX
