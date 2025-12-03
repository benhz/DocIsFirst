# Git 工作流

## 分支模型

采用 Git Flow 模型：

```
master (生产)
    ↑
release/* (预发布)
    ↑
develop (开发主分支)
    ↑
feature/* (功能分支)
hotfix/* (紧急修复)
```

### 分支说明

| 分支 | 说明 | 生命周期 |
|-----|------|---------|
| master | 生产环境代码 | 永久 |
| develop | 开发环境代码 | 永久 |
| feature/* | 功能开发 | 临时 |
| release/* | 发布准备 | 临时 |
| hotfix/* | 紧急修复 | 临时 |

## 开发流程

### 1. 创建功能分支
```bash
# 从 develop 创建功能分支
git checkout develop
git pull origin develop
git checkout -b feature/user-login
```

### 2. 开发和提交
```bash
# 开发...
git add .
git commit -m "feat: 实现用户登录功能"
```

### 3. 推送和创建 PR
```bash
git push origin feature/user-login
# 在 GitHub/GitLab 创建 Pull Request
```

### 4. Code Review 和合并
- 至少 1 人 Review
- CI 通过
- 合并到 develop

### 5. 发布流程
```bash
# 创建 release 分支
git checkout -b release/v1.2.0 develop

# 测试、修 bug...
git commit -m "fix: 修复登录问题"

# 合并到 master 和 develop
git checkout master
git merge release/v1.2.0
git tag v1.2.0

git checkout develop
git merge release/v1.2.0
```

## Commit 规范

### 格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具变更

### 示例
```bash
# 简单的 commit
git commit -m "feat: 添加用户登录功能"

# 详细的 commit
git commit -m "fix: 修复订单计算错误

订单金额计算时未考虑折扣，导致金额错误。
修复逻辑：在计算总价时乘以折扣系数。

Closes #123"
```

## 分支命名规范

```bash
# 功能分支
feature/user-login
feature/order-refund

# Bug 修复
fix/order-calculation
fix/login-error

# 紧急修复
hotfix/security-patch

# 发布分支
release/v1.2.0
```

## 最佳实践

### ✓ 推荐
- 频繁提交，小步快跑
- Commit 信息清晰有意义
- 提交前先 pull，避免冲突
- 使用 rebase 保持历史整洁

### ✗ 避免
- 一次提交大量文件
- Commit 信息写 "update"、"fix"
- 直接在 master/develop 上提交
- 提交不相关的文件（如 node_modules）

## Git 命令速查

```bash
# 拉取最新代码
git pull origin develop

# 查看状态
git status

# 暂存所有更改
git add .

# 提交
git commit -m "feat: xxx"

# 推送
git push origin feature/xxx

# 查看日志
git log --oneline --graph

# 撤销上次 commit（保留更改）
git reset --soft HEAD~1

# 切换分支
git checkout develop
```

## 下一步

- 查看 [Code Review](./review.md) 了解评审流程
- 查看 [发布流程](../../org/release-process.md) 了解如何发布
