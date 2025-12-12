---
sidebar_position: 3
---

# 使用手册

本手册将帮助您快速上手代码托管平台，掌握日常开发中的常用操作。

## 账户设置

### 注册账号

1. 访问平台首页
2. 点击「注册」按钮
3. 填写用户名、邮箱、密码
4. 验证邮箱完成注册

### SSH 配置

#### 生成 SSH 密钥

```bash
# 生成 SSH 密钥对
ssh-keygen -t ed25519 -C "your_email@example.com"

# 查看公钥内容
cat ~/.ssh/id_ed25519.pub
```

#### 添加 SSH 密钥

1. 复制公钥内容
2. 进入「个人设置」→「SSH 密钥」
3. 点击「添加 SSH 密钥」
4. 粘贴公钥内容并保存

#### 测试连接

```bash
ssh -T git@your-platform.com
```

### 个人访问令牌

用于 API 访问或 HTTPS 克隆：

1. 进入「个人设置」→「访问令牌」
2. 点击「生成新令牌」
3. 设置令牌名称和权限范围
4. 保存令牌（仅显示一次）

## 仓库操作

### 创建仓库

#### 通过 Web 界面

1. 点击右上角「+」→「新建仓库」
2. 填写仓库名称和描述
3. 选择公开/私有
4. 选择是否初始化 README
5. 点击「创建仓库」

#### 导入现有仓库

1. 点击「+」→「导入仓库」
2. 输入 Git URL
3. 填写仓库信息
4. 开始导入

### 克隆仓库

#### SSH 方式（推荐）

```bash
git clone git@your-platform.com:username/repo.git
```

#### HTTPS 方式

```bash
git clone https://your-platform.com/username/repo.git
```

### 基本 Git 操作

#### 提交代码

```bash
# 查看状态
git status

# 添加文件
git add .

# 提交更改
git commit -m "描述你的更改"

# 推送到远程
git push origin main
```

#### 拉取更新

```bash
# 拉取最新代码
git pull origin main

# 或分步操作
git fetch origin
git merge origin/main
```

## 分支管理

### 创建分支

#### 本地创建

```bash
# 创建并切换到新分支
git checkout -b feature/new-feature

# 推送到远程
git push -u origin feature/new-feature
```

#### Web 界面创建

1. 进入仓库页面
2. 点击分支下拉菜单
3. 输入新分支名称
4. 选择基于哪个分支创建

### 分支保护

1. 进入「仓库设置」→「分支保护」
2. 选择要保护的分支（如 main）
3. 配置保护规则：
   - ✅ 要求合并请求
   - ✅ 要求代码评审通过
   - ✅ 要求 CI 检查通过
   - ✅ 禁止强制推送
4. 保存设置

## 合并请求（Pull Request）

### 创建 PR

#### 从分支创建

1. 推送功能分支到远程
2. 访问仓库页面
3. 点击「创建合并请求」
4. 填写 PR 标题和描述
5. 选择源分支和目标分支
6. 指派评审者
7. 提交 PR

#### 从 Fork 创建

1. Fork 目标仓库
2. 在 Fork 中修改代码
3. 推送到 Fork 仓库
4. 点击「创建合并请求」
5. 选择目标仓库和分支

### PR 描述模板

```markdown
## 更改说明
简要描述这个 PR 做了什么更改

## 更改类型
- [ ] 新功能
- [ ] Bug 修复
- [ ] 文档更新
- [ ] 代码重构
- [ ] 性能优化

## 测试
- [ ] 已通过本地测试
- [ ] 已添加单元测试
- [ ] 已更新相关文档

## 相关 Issue
关闭 #123
```

### 代码评审

#### 作为评审者

1. 打开 PR 页面
2. 切换到「更改」标签
3. 在代码行上添加评论
4. 提出修改建议
5. 提交评审意见：
   - 通过
   - 需要修改
   - 仅评论

#### 作为提交者

1. 查看评审意见
2. 修改代码
3. 提交新的 commit
4. 回复评论
5. 请求重新评审

### 合并 PR

满足条件后合并：
1. ✅ 所有评审通过
2. ✅ CI 检查通过
3. ✅ 无冲突

点击「合并」按钮，选择合并策略。

## 团队协作

### 创建组织

1. 点击右上角「+」→「新建组织」
2. 填写组织名称和描述
3. 邀请成员加入

### 团队管理

#### 创建团队

1. 进入组织页面
2. 点击「团队」标签
3. 点击「新建团队」
4. 设置团队名称和权限

#### 添加成员

1. 进入团队页面
2. 点击「添加成员」
3. 输入用户名或邮箱
4. 设置成员角色
5. 发送邀请

### 权限管理

#### 仓库级别权限

| 角色 | 读取 | 克隆 | 推送 | 管理 PR | 管理设置 |
|------|------|------|------|---------|----------|
| Guest | ✅ | ❌ | ❌ | ❌ | ❌ |
| Reporter | ✅ | ✅ | ❌ | ❌ | ❌ |
| Developer | ✅ | ✅ | ✅ | ✅ | ❌ |
| Maintainer | ✅ | ✅ | ✅ | ✅ | ✅ |
| Owner | ✅ | ✅ | ✅ | ✅ | ✅ |

## Issue 管理

### 创建 Issue

1. 进入仓库的「Issues」页面
2. 点击「新建 Issue」
3. 填写标题和描述
4. 添加标签
5. 指派负责人
6. 设置里程碑
7. 提交 Issue

### Issue 模板

```markdown
## 问题描述
清楚地描述遇到的问题

## 重现步骤
1. 步骤一
2. 步骤二
3. 看到错误

## 期望行为
描述你期望发生什么

## 实际行为
描述实际发生了什么

## 环境信息
- 操作系统：
- 浏览器：
- 版本号：

## 截图
如有必要，添加截图
```

### 关联 PR 和 Issue

在 PR 或提交信息中使用关键词：

```
修复 #123
关闭 #456
解决 #789
```

## CI/CD 集成

### 配置 Webhook

1. 进入「仓库设置」→「Webhooks」
2. 点击「添加 Webhook」
3. 输入 Payload URL
4. 选择触发事件
5. 设置密钥（可选）
6. 保存配置

### 常见 CI 工具集成

#### GitHub Actions 风格配置

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Run tests
      run: npm test
```

## 最佳实践

### 提交信息规范

```
<type>(<scope>): <subject>

<body>

<footer>
```

类型（type）：
- feat: 新功能
- fix: 修复 bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 重构
- test: 测试相关
- chore: 构建过程或辅助工具的变动

示例：
```
feat(auth): 添加用户登录功能

- 实现登录表单
- 添加 JWT 认证
- 更新用户文档

关闭 #123
```

### 分支命名规范

- `feature/` - 新功能分支
- `bugfix/` - Bug 修复分支
- `hotfix/` - 紧急修复分支
- `release/` - 发布分支
- `docs/` - 文档更新分支

### 代码评审建议

**作为评审者：**
- 保持友好和建设性
- 关注代码质量而非个人
- 提供具体的改进建议
- 认可好的代码

**作为提交者：**
- 保持开放态度
- 及时响应评论
- 解释设计决策
- 感谢评审者

## 故障排查

### 常见问题

#### 推送被拒绝

```bash
# 先拉取远程更改
git pull origin main

# 解决冲突后再推送
git push origin main
```

#### 忘记 SSH 密钥密码

```bash
# 重新生成密钥
ssh-keygen -t ed25519 -C "your_email@example.com"
```

#### 撤销提交

```bash
# 撤销最后一次提交（保留更改）
git reset --soft HEAD~1

# 完全撤销最后一次提交
git reset --hard HEAD~1
```

## 下一步

- 查看 [功能详解](./features.md) 了解更多高级功能
- 查看 [常见问题](./faq.md) 获取更多帮助
- 加入我们的社区获取支持
