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

### 基础配置

```bash
# 配置用户信息
git config --global user.name "你的名字"
git config --global user.email "your.email@example.com"

# 查看配置
git config --list

# 配置默认编辑器
git config --global core.editor "vim"

# 配置别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
```

### 仓库初始化与克隆

```bash
# 初始化本地仓库
git init

# 克隆远程仓库
git clone https://github.com/user/repo.git

# 克隆指定分支
git clone -b develop https://github.com/user/repo.git

# 克隆并指定目录名
git clone https://github.com/user/repo.git my-project
```

### 关联远程仓库

```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin https://github.com/user/repo.git

# 修改远程仓库地址
git remote set-url origin https://github.com/user/new-repo.git

# 删除远程仓库
git remote remove origin

# 重命名远程仓库
git remote rename origin upstream
```

### 分支操作

```bash
# 查看本地分支
git branch

# 查看所有分支（包括远程）
git branch -a

# 创建新分支
git branch feature/new-feature

# 创建并切换到新分支
git checkout -b feature/new-feature

# 从远程分支创建本地分支
git checkout -b feature/new-feature origin/feature/new-feature

# 切换分支
git checkout develop

# 删除本地分支
git branch -d feature/old-feature

# 强制删除未合并的分支
git branch -D feature/abandoned-feature

# 删除远程分支
git push origin --delete feature/old-feature

# 重命名当前分支
git branch -m new-branch-name

# 查看分支关联关系
git branch -vv
```

### 代码提交

```bash
# 查看工作区状态
git status

# 查看简短状态
git status -s

# 添加指定文件到暂存区
git add file1.js file2.js

# 添加所有文件到暂存区
git add .

# 添加所有已跟踪文件的修改
git add -u

# 交互式添加
git add -p

# 提交暂存区的文件
git commit -m "feat: 添加新功能"

# 提交并添加详细说明
git commit -m "feat: 添加用户登录" -m "实现了基于JWT的用户认证系统"

# 修改上一次提交（未push）
git commit --amend -m "feat: 修正后的提交信息"

# 修改上一次提交（不改commit信息）
git commit --amend --no-edit

# 提交所有已跟踪文件的修改（跳过add）
git commit -am "fix: 快速修复bug"
```

### 拉取与推送

```bash
# 拉取最新代码
git pull origin develop

# 拉取并使用rebase
git pull --rebase origin develop

# 获取远程更新但不合并
git fetch origin

# 获取所有远程分支
git fetch --all

# 推送到远程分支
git push origin feature/new-feature

# 推送并设置上游分支
git push -u origin feature/new-feature

# 强制推送（慎用！）
git push --force origin feature/new-feature

# 更安全的强制推送
git push --force-with-lease origin feature/new-feature

# 推送所有本地分支
git push --all origin

# 推送标签
git push origin v1.0.0

# 推送所有标签
git push --tags
```

### 合并（Merge）

```bash
# 合并指定分支到当前分支
git merge feature/new-feature

# 禁用快进合并（保留分支历史）
git merge --no-ff feature/new-feature

# 合并时添加提交信息
git merge -m "Merge feature/new-feature" feature/new-feature

# 放弃合并
git merge --abort

# 查看已合并的分支
git branch --merged

# 查看未合并的分支
git branch --no-merged
```

### 变基（Rebase）

```bash
# 变基到指定分支
git rebase develop

# 交互式变基（修改历史）
git rebase -i HEAD~3

# 继续变基
git rebase --continue

# 跳过当前冲突
git rebase --skip

# 放弃变基
git rebase --abort

# 变基到指定提交
git rebase abc1234
```

### 重置（Reset）

```bash
# 撤销工作区的修改
git checkout -- file.js

# 取消暂存
git reset HEAD file.js

# 回退到上一个提交（保留修改）
git reset --soft HEAD~1

# 回退到上一个提交（保留工作区修改）
git reset --mixed HEAD~1
# 或
git reset HEAD~1

# 回退到上一个提交（丢弃所有修改）
git reset --hard HEAD~1

# 回退到指定提交
git reset --hard abc1234

# 回退到远程分支状态
git reset --hard origin/develop
```

### 撤销与恢复

```bash
# 查看reflog（记录所有操作）
git reflog

# 恢复到之前的状态
git reset --hard HEAD@{2}

# 撤销某个提交（创建新提交）
git revert abc1234

# 撤销多个提交
git revert abc1234 def5678

# 恢复已删除的文件
git checkout HEAD -- deleted-file.js

# 恢复到指定提交的文件版本
git checkout abc1234 -- file.js
```

### 暂存（Stash）

```bash
# 暂存当前修改
git stash

# 暂存并添加说明
git stash save "工作进行到一半"

# 查看暂存列表
git stash list

# 应用最新的暂存
git stash apply

# 应用指定的暂存
git stash apply stash@{1}

# 应用并删除最新的暂存
git stash pop

# 删除最新的暂存
git stash drop

# 删除指定的暂存
git stash drop stash@{1}

# 清空所有暂存
git stash clear

# 从暂存创建新分支
git stash branch new-branch-name
```

### 查看历史

```bash
# 查看提交历史
git log

# 查看简洁历史
git log --oneline

# 查看图形化历史
git log --oneline --graph

# 查看所有分支的历史
git log --oneline --graph --all

# 查看指定文件的历史
git log file.js

# 查看最近n条提交
git log -n 5

# 查看某人的提交
git log --author="张三"

# 查看指定时间范围的提交
git log --since="2024-01-01" --until="2024-12-31"

# 查看提交详情
git show abc1234

# 查看文件修改历史
git log -p file.js
```

### 差异对比

```bash
# 查看工作区和暂存区的差异
git diff

# 查看暂存区和上次提交的差异
git diff --staged
# 或
git diff --cached

# 查看两个分支的差异
git diff develop feature/new-feature

# 查看两个提交的差异
git diff abc1234 def5678

# 查看指定文件的差异
git diff file.js

# 只显示文件名
git diff --name-only

# 显示统计信息
git diff --stat
```

### 标签（Tag）

```bash
# 查看所有标签
git tag

# 创建轻量标签
git tag v1.0.0

# 创建附注标签
git tag -a v1.0.0 -m "版本 1.0.0"

# 给指定提交打标签
git tag -a v1.0.0 abc1234

# 查看标签信息
git show v1.0.0

# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin --delete v1.0.0

# 检出标签
git checkout v1.0.0
```

### 冲突解决

```bash
# 查看冲突文件
git status

# 使用我们的版本
git checkout --ours file.js

# 使用他们的版本
git checkout --theirs file.js

# 手动编辑冲突后，标记为已解决
git add file.js

# 继续合并/变基
git merge --continue
# 或
git rebase --continue

# 使用图形化工具解决冲突
git mergetool
```

### 清理与维护

```bash
# 查看文件状态
git clean -n

# 删除未跟踪的文件
git clean -f

# 删除未跟踪的文件和目录
git clean -fd

# 删除忽略的文件
git clean -fX

# 删除所有未跟踪的文件
git clean -fx

# 垃圾回收
git gc

# 压缩仓库
git gc --aggressive

# 验证仓库完整性
git fsck
```

### 其他实用命令

```bash
# 显示某行代码的修改历史
git blame file.js

# 搜索代码
git grep "关键字"

# 查找包含特定内容的提交
git log -S "function_name"

# 归档项目
git archive --format=zip HEAD > project.zip

# 统计代码量
git ls-files | xargs wc -l

# 查看贡献者统计
git shortlog -sn

# 创建空提交
git commit --allow-empty -m "Empty commit"
```

### Git工作流快捷方式

```bash
# 快速提交当前所有修改
alias gitquick="git add . && git commit -m 'quick update' && git push"

# 拉取最新代码并清理本地分支
alias gitclean="git fetch --prune && git pull"

# 查看美化的日志
alias gitlog="git log --oneline --graph --decorate --all"

# 撤销最近一次提交
alias gitundo="git reset --soft HEAD~1"
```

## 下一步

- 查看 [Code Review](./review.md) 了解评审流程
- 查看 [发布流程](../../org/release-process.md) 了解如何发布
