# 部署流程

## 发布流程

1. 创建 release 分支
2. 测试通过
3. 提交发布申请
4. 审批通过
5. 部署到生产
6. 验证功能
7. 通知相关方

## 部署方式

### 蓝绿部署
- 零停机时间
- 快速回滚

### 滚动更新
- Kubernetes 默认方式
- 逐步替换实例

## 回滚

```bash
# 快速回滚到上一版本
kubectl rollout undo deployment/app-name

# 回滚到指定版本
kubectl rollout undo deployment/app-name --to-revision=3
```

## 发布窗口

- 工作日 10:00 - 16:00
- 紧急修复不受限制
- 节假日前禁止发布
