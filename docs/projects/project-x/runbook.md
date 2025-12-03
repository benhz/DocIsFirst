# Project X 故障手册

## 常见故障

### 1. 服务不可用

**现象**：
- 健康检查失败
- 502 错误

**排查步骤**：
```bash
# 1. 查看 Pod 状态
kubectl get pods -l app=project-x

# 2. 查看日志
kubectl logs -f <pod-name>

# 3. 查看事件
kubectl describe pod <pod-name>
```

**常见原因**：
- 数据库连接失败
- 配置错误
- 资源不足

**解决方案**：
```bash
# 重启服务
kubectl rollout restart deployment/project-x

# 扩容
kubectl scale deployment project-x --replicas=5
```

---

### 2. 接口超时

**现象**：
- 接口响应时间 > 3s
- 大量超时日志

**排查步骤**：
1. 查看监控：Grafana 看 QPS、响应时间
2. 查看日志：是否有慢查询
3. 查看链路：Jaeger 找慢的环节

**常见原因**：
- 数据库慢查询
- 缓存失效
- 下游服务慢

**解决方案**：
- 优化 SQL
- 增加缓存
- 降级非核心功能

---

### 3. 内存溢出

**现象**：
- Pod 被 OOMKilled
- 频繁重启

**排查步骤**：
```bash
# 查看资源使用
kubectl top pod <pod-name>

# 下载 heap dump
kubectl cp <pod-name>:/tmp/heapdump.hprof ./heapdump.hprof
```

**解决方案**：
- 增加内存限制
- 修复内存泄漏

## 紧急联系

- **值班电话**: XXX-XXXX
- **技术群**: 企业微信「Project X」
- **DBA**: XXX-XXXX
