# Git 常用命令速查手册

本文档提供了 Git 版本控制系统的常用命令速查，涵盖日常开发中最常用的操作场景。

---

## 📦 仓库初始化与克隆

### 初始化本地仓库

```bash
# 在当前目录初始化 Git 仓库
git init

# 在指定目录初始化 Git 仓库
git init my-project
```

### 克隆远程仓库

```bash
# 克隆远程仓库
git clone https://github.com/user/repo.git

# 克隆到指定目录
git clone https://github.com/user/repo.git my-folder

# 克隆指定分支
git clone -b develop https://github.com/user/repo.git

# 浅克隆（只克隆最近的历史）
git clone --depth 1 https://github.com/user/repo.git
```

---

## 🔗 关联远程仓库

### 查看远程仓库

```bash
# 查看远程仓库
git remote -v

# 查看远程仓库详细信息
git remote show origin
```

### 添加远程仓库

```bash
# 添加远程仓库
git remote add origin https://github.com/user/repo.git

# 添加多个远程仓库
git remote add upstream https://github.com/original/repo.git
```

### 修改远程仓库

```bash
# 修改远程仓库 URL
git remote set-url origin https://github.com/user/new-repo.git

# 重命名远程仓库
git remote rename origin upstream

# 删除远程仓库
git remote remove origin
```

---

## 🌿 分支操作

### 查看分支

```bash
# 查看本地分支
git branch

# 查看所有分支（包括远程）
git branch -a

# 查看远程分支
git branch -r

# 查看分支及其最后一次提交
git branch -v

# 查看分支关联关系
git branch -vv
```

### 创建分支

```bash
# 创建新分支
git branch feature/new-feature

# 创建并切换到新分支
git checkout -b feature/new-feature

# 从指定提交创建分支
git branch bugfix/fix-error abc1234

# 从远程分支创建本地分支
git checkout -b feature/new-feature origin/feature/new-feature
```

### 切换分支

```bash
# 切换到已存在的分支
git checkout develop

# 使用新命令切换分支（Git 2.23+）
git switch develop

# 切换到上一个分支
git checkout -
```

### 删除分支

```bash
# 删除本地分支
git branch -d feature/old-feature

# 强制删除未合并的分支
git branch -D feature/abandoned-feature

# 删除远程分支
git push origin --delete feature/old-feature

# 或使用简写
git push origin :feature/old-feature
```

### 重命名分支

```bash
# 重命名当前分支
git branch -m new-branch-name

# 重命名指定分支
git branch -m old-name new-name
```

---

## 📝 代码提交

### 查看状态

```bash
# 查看工作区状态
git status

# 查看简短状态
git status -s

# 查看被忽略的文件
git status --ignored
```

### 添加文件到暂存区

```bash
# 添加指定文件
git add file1.js file2.js

# 添加所有修改的文件
git add .

# 添加所有已跟踪文件的修改
git add -u

# 交互式添加（分块添加）
git add -p

# 添加指定目录下的所有文件
git add src/
```

### 提交更改

```bash
# 提交暂存区的文件
git commit -m "feat: 添加用户登录功能"

# 提交并添加详细描述
git commit -m "feat: 添加用户登录" -m "实现了基于 JWT 的用户认证系统"

# 提交所有已跟踪文件的修改（跳过 git add）
git commit -am "fix: 修复登录bug"

# 修改上一次提交信息（未 push）
git commit --amend -m "feat: 修正后的提交信息"

# 修改上一次提交（不改 commit 信息）
git commit --amend --no-edit

# 创建空提交
git commit --allow-empty -m "触发 CI"
```

---

## 🔄 同步代码

### 拉取代码

```bash
# 拉取并合并远程分支
git pull origin develop

# 拉取并使用 rebase
git pull --rebase origin develop

# 获取远程更新但不合并
git fetch origin

# 获取所有远程分支
git fetch --all

# 获取并清理已删除的远程分支
git fetch --prune
```

### 推送代码

```bash
# 推送到远程分支
git push origin feature/new-feature

# 推送并设置上游分支
git push -u origin feature/new-feature

# 推送所有本地分支
git push --all origin

# 强制推送（慎用！会覆盖远程历史）
git push --force origin feature/new-feature

# 更安全的强制推送
git push --force-with-lease origin feature/new-feature

# 推送标签
git push origin v1.0.0

# 推送所有标签
git push --tags
```

---

## 🔀 合并与变基

### 合并（Merge）

```bash
# 合并指定分支到当前分支
git merge feature/new-feature

# 禁用快进合并（保留分支历史）
git merge --no-ff feature/new-feature

# 合并时创建提交信息
git merge -m "Merge feature branch" feature/new-feature

# 查看已合并的分支
git branch --merged

# 查看未合并的分支
git branch --no-merged

# 放弃合并
git merge --abort
```

### 变基（Rebase）

```bash
# 将当前分支变基到指定分支
git rebase develop

# 交互式变基（可以修改/合并/删除提交）
git rebase -i HEAD~3

# 变基到指定提交
git rebase abc1234

# 继续变基（解决冲突后）
git rebase --continue

# 跳过当前冲突的提交
git rebase --skip

# 放弃变基
git rebase --abort
```

---

## ↩️ 撤销与重置

### 撤销工作区修改

```bash
# 撤销指定文件的修改
git checkout -- file.js

# 撤销所有工作区修改
git checkout -- .

# 使用新命令撤销修改（Git 2.23+）
git restore file.js

# 撤销所有工作区修改
git restore .
```

### 取消暂存

```bash
# 取消暂存指定文件
git reset HEAD file.js

# 取消所有暂存的文件
git reset HEAD

# 使用新命令取消暂存（Git 2.23+）
git restore --staged file.js
```

### 重置提交

```bash
# 回退到上一个提交（保留所有修改和暂存状态）
git reset --soft HEAD~1

# 回退到上一个提交（保留修改，取消暂存）
git reset HEAD~1
# 或
git reset --mixed HEAD~1

# 回退到上一个提交（丢弃所有修改）
git reset --hard HEAD~1

# 回退到指定提交
git reset --hard abc1234

# 回退到远程分支状态
git reset --hard origin/develop
```

### 撤销提交

```bash
# 撤销指定提交（创建新的反向提交）
git revert abc1234

# 撤销多个提交
git revert abc1234 def5678

# 撤销合并提交
git revert -m 1 merge-commit-hash
```

### 恢复操作

```bash
# 查看操作历史
git reflog

# 恢复到之前的状态
git reset --hard HEAD@{2}

# 恢复已删除的文件
git checkout HEAD -- deleted-file.js

# 恢复到指定提交的文件版本
git checkout abc1234 -- file.js
```

---

## 📦 暂存（Stash）

```bash
# 暂存当前修改
git stash

# 暂存并添加说明
git stash save "工作进行到一半"

# 暂存包括未跟踪的文件
git stash -u

# 查看暂存列表
git stash list

# 应用最新的暂存
git stash apply

# 应用指定的暂存
git stash apply stash@{1}

# 应用并删除最新的暂存
git stash pop

# 应用指定的暂存并删除
git stash pop stash@{1}

# 删除最新的暂存
git stash drop

# 删除指定的暂存
git stash drop stash@{1}

# 清空所有暂存
git stash clear

# 从暂存创建新分支
git stash branch new-branch-name

# 查看暂存内容
git stash show

# 查看暂存详细差异
git stash show -p
```

---

## 📜 查看历史

### 查看提交历史

```bash
# 查看提交历史
git log

# 查看简洁历史
git log --oneline

# 查看图形化历史
git log --oneline --graph

# 查看所有分支的历史
git log --oneline --graph --all

# 查看最近 n 条提交
git log -n 5

# 查看指定作者的提交
git log --author="张三"

# 查看指定时间范围的提交
git log --since="2024-01-01" --until="2024-12-31"

# 按日期范围查看
git log --after="2 weeks ago"

# 查看指定文件的历史
git log file.js

# 查看文件的详细修改历史
git log -p file.js
```

### 查看提交详情

```bash
# 查看指定提交的详细信息
git show abc1234

# 查看指定提交的文件列表
git show --name-only abc1234

# 查看指定提交的统计信息
git show --stat abc1234

# 查看最新提交
git show HEAD

# 查看上一次提交
git show HEAD^
```

### 查看文件修改历史

```bash
# 查看文件的每一行是谁修改的
git blame file.js

# 查看指定行范围的修改历史
git blame -L 10,20 file.js

# 查看文件的修改统计
git log --stat file.js
```

---

## 🔍 差异对比

```bash
# 查看工作区和暂存区的差异
git diff

# 查看暂存区和上次提交的差异
git diff --staged
# 或
git diff --cached

# 查看工作区和上次提交的差异
git diff HEAD

# 查看两个分支的差异
git diff develop feature/new-feature

# 查看两个提交的差异
git diff abc1234 def5678

# 查看指定文件的差异
git diff file.js

# 只显示有差异的文件名
git diff --name-only

# 显示差异统计
git diff --stat

# 显示单词级别的差异
git diff --word-diff
```

---

## 🏷️ 标签管理

### 创建标签

```bash
# 创建轻量标签
git tag v1.0.0

# 创建附注标签（推荐）
git tag -a v1.0.0 -m "版本 1.0.0 发布"

# 给指定提交打标签
git tag -a v1.0.0 abc1234 -m "版本 1.0.0"
```

### 查看标签

```bash
# 查看所有标签
git tag

# 查看符合模式的标签
git tag -l "v1.*"

# 查看标签详细信息
git show v1.0.0
```

### 推送和删除标签

```bash
# 推送指定标签到远程
git push origin v1.0.0

# 推送所有标签
git push --tags

# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin --delete v1.0.0
# 或
git push origin :refs/tags/v1.0.0
```

### 检出标签

```bash
# 检出标签（处于分离 HEAD 状态）
git checkout v1.0.0

# 基于标签创建新分支
git checkout -b hotfix/v1.0.1 v1.0.0
```

---

## ⚔️ 冲突解决

### 查看冲突

```bash
# 查看冲突文件
git status

# 查看冲突内容
git diff

# 查看与基础版本的差异
git diff --base file.js

# 查看与我们的版本的差异
git diff --ours file.js

# 查看与他们的版本的差异
git diff --theirs file.js
```

### 解决冲突

```bash
# 使用我们的版本
git checkout --ours file.js

# 使用他们的版本
git checkout --theirs file.js

# 手动编辑冲突后，标记为已解决
git add file.js

# 继续合并或变基
git merge --continue
# 或
git rebase --continue

# 使用图形化工具解决冲突
git mergetool
```

---

## 🧹 清理与维护

### 清理未跟踪的文件

```bash
# 预览会删除的文件（不实际删除）
git clean -n

# 删除未跟踪的文件
git clean -f

# 删除未跟踪的文件和目录
git clean -fd

# 删除被忽略的文件
git clean -fX

# 删除所有未跟踪的文件（包括忽略的）
git clean -fx
```

### 仓库维护

```bash
# 压缩仓库（垃圾回收）
git gc

# 积极压缩仓库
git gc --aggressive

# 验证仓库完整性
git fsck

# 统计仓库信息
git count-objects -v

# 清理过期的 reflog
git reflog expire --expire=now --all

# 清理不可达的对象
git prune
```

---

## 🔍 搜索与查找

```bash
# 在代码中搜索关键字
git grep "关键字"

# 搜索并显示行号
git grep -n "关键字"

# 搜索并显示匹配次数
git grep -c "关键字"

# 在指定分支中搜索
git grep "关键字" develop

# 查找包含特定内容的提交
git log -S "function_name"

# 查找包含特定内容的提交（正则表达式）
git log -G "regex_pattern"

# 查找包含特定提交信息的提交
git log --grep="关键字"
```

---

## 📊 统计与分析

```bash
# 查看贡献者统计
git shortlog -sn

# 查看指定作者的贡献统计
git shortlog -sn --author="张三"

# 统计代码行数
git ls-files | xargs wc -l

# 查看文件修改频率
git log --pretty=format: --name-only | sort | uniq -c | sort -rg | head -10

# 查看每个文件的提交次数
git log --all --pretty=format: --name-only | sort | uniq -c | sort -rg

# 查看提交活跃度
git log --since="1 month ago" --pretty=format:"%ad" --date=short | sort | uniq -c
```

---

## 🔧 配置管理

### 用户配置

```bash
# 配置用户名
git config --global user.name "你的名字"

# 配置邮箱
git config --global user.email "your.email@example.com"

# 查看配置
git config --list

# 查看指定配置
git config user.name

# 编辑全局配置文件
git config --global --edit
```

### 别名配置

```bash
# 配置别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.lg "log --graph --oneline --decorate --all"
```

### 其他配置

```bash
# 配置默认编辑器
git config --global core.editor "vim"

# 配置差异工具
git config --global diff.tool vimdiff

# 配置合并工具
git config --global merge.tool vimdiff

# 配置自动换行
git config --global core.autocrlf input  # Mac/Linux
git config --global core.autocrlf true   # Windows

# 配置忽略文件权限变化
git config --global core.filemode false

# 配置默认分支名
git config --global init.defaultBranch main
```

---

## 🎯 实用技巧

### 常用组合命令

```bash
# 快速提交所有修改
git add . && git commit -m "quick update" && git push

# 拉取最新代码并清理本地分支
git fetch --prune && git pull

# 查看美化的日志
git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit

# 撤销最近一次提交
git reset --soft HEAD~1

# 修改最近一次提交的作者信息
git commit --amend --author="Name <email@example.com>" --no-edit

# 创建并切换到新分支，同时推送到远程
git checkout -b feature/new && git push -u origin feature/new
```

### Bash 别名（添加到 ~/.bashrc 或 ~/.zshrc）

```bash
# Git 常用别名
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git pull'
alias gd='git diff'
alias gb='git branch'
alias gco='git checkout'
alias glog='git log --oneline --graph --decorate --all'
alias gundo='git reset --soft HEAD~1'
alias gclean='git fetch --prune && git pull'
```

---

## 📚 常见场景示例

### 场景 1: 开发新功能

```bash
# 1. 切换到主分支并拉取最新代码
git checkout develop
git pull origin develop

# 2. 创建功能分支
git checkout -b feature/user-login

# 3. 开发并提交
git add .
git commit -m "feat: 实现用户登录功能"

# 4. 推送到远程
git push -u origin feature/user-login

# 5. 创建 Pull Request（在 GitHub/GitLab 上操作）
```

### 场景 2: 修复紧急 Bug

```bash
# 1. 从 master 创建热修复分支
git checkout master
git pull origin master
git checkout -b hotfix/critical-bug

# 2. 修复并提交
git add .
git commit -m "fix: 修复严重bug"

# 3. 推送并合并到 master
git push -u origin hotfix/critical-bug

# 4. 合并到 develop
git checkout develop
git merge hotfix/critical-bug
git push origin develop

# 5. 删除热修复分支
git branch -d hotfix/critical-bug
git push origin --delete hotfix/critical-bug
```

### 场景 3: 同步上游仓库（Fork 项目）

```bash
# 1. 添加上游仓库
git remote add upstream https://github.com/original/repo.git

# 2. 获取上游更新
git fetch upstream

# 3. 合并到本地分支
git checkout main
git merge upstream/main

# 4. 推送到自己的仓库
git push origin main
```

### 场景 4: 整理提交历史

```bash
# 合并最近 3 次提交
git rebase -i HEAD~3

# 在编辑器中：
# pick abc1234 第一次提交
# squash def5678 第二次提交  # 将 pick 改为 squash
# squash ghi9012 第三次提交  # 将 pick 改为 squash

# 保存后编辑合并后的提交信息
```

---

## ⚠️ 注意事项

1. **慎用强制推送** - `git push --force` 会覆盖远程历史，只在确保不会影响他人时使用
2. **提交前先拉取** - 推送前先 `git pull` 避免冲突
3. **有意义的提交信息** - 遵循团队的 commit 规范
4. **不要提交敏感信息** - 检查 `.env`、密钥等文件
5. **定期推送** - 不要在本地积累太多提交
6. **分支命名规范** - 遵循 `feature/`、`fix/`、`hotfix/` 等前缀

---

## 🔗 相关文档

- [Git 工作流规范](../../development/standards/git-workflow.md)
- [代码评审规范](../../development/standards/review.md)
- [发布流程](../../org/release-process.md)

---

## 💡 提示

本文档持续更新中，如有遗漏或建议，欢迎反馈！
