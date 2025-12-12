---
sidebar_position: 4
---

# 常见问题

## 账户与权限

### 如何重置密码？

1. 访问登录页面
2. 点击「忘记密码」
3. 输入注册邮箱
4. 查收重置密码邮件
5. 点击链接设置新密码

### SSH 连接失败怎么办？

**检查 SSH 密钥是否正确添加：**

```bash
ssh -T git@your-platform.com
```

**常见原因：**
- SSH 公钥未添加到平台
- 私钥权限不正确（应为 600）
- SSH Agent 未运行

**解决方案：**

```bash
# 检查私钥权限
chmod 600 ~/.ssh/id_ed25519

# 启动 SSH Agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 如何管理多个 SSH 密钥？

创建 SSH 配置文件 `~/.ssh/config`：

```
# 个人账户
Host personal.git.com
    HostName git.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal

# 工作账户
Host work.git.com
    HostName git.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
```

### 双因素认证（2FA）丢失怎么办？

联系管理员通过以下方式恢复：
1. 使用恢复代码（注册 2FA 时保存）
2. 管理员重置 2FA 设置
3. 通过备用邮箱验证

## 仓库操作

### 克隆大型仓库很慢怎么办？

**使用浅克隆：**

```bash
# 只克隆最近的提交
git clone --depth 1 https://your-platform.com/username/repo.git

# 需要时再获取完整历史
git fetch --unshallow
```

**使用部分克隆（Git 2.19+）：**

```bash
git clone --filter=blob:none https://your-platform.com/username/repo.git
```

### 如何删除敏感信息？

**从历史中完全删除文件：**

```bash
# 使用 git filter-branch（传统方法）
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch PATH-TO-YOUR-FILE" \
  --prune-empty --tag-name-filter cat -- --all

# 使用 BFG Repo-Cleaner（推荐）
bfg --delete-files YOUR-FILE repo.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 强制推送
git push origin --force --all
git push origin --force --tags
```

⚠️ **警告**：此操作会改变 Git 历史，需谨慎使用。

### 如何处理大文件？

**使用 Git LFS：**

```bash
# 安装 Git LFS
git lfs install

# 跟踪大文件类型
git lfs track "*.psd"
git lfs track "*.zip"

# 提交 .gitattributes
git add .gitattributes
git commit -m "Configure Git LFS"

# 正常添加大文件
git add large-file.psd
git commit -m "Add large file"
git push
```

### 仓库大小超限怎么办？

1. **清理不必要的文件**
2. **使用 Git LFS 管理大文件**
3. **清理历史中的大文件**
4. **联系管理员增加配额**

```bash
# 查找大文件
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  sed -n 's/^blob //p' | \
  sort --numeric-sort --key=2 | \
  tail -20
```

## 分支与合并

### 如何解决合并冲突？

**本地解决冲突：**

```bash
# 拉取最新代码
git pull origin main

# Git 会标记冲突文件
# 编辑冲突文件，查找 <<<<<<< HEAD

# 解决冲突后
git add .
git commit -m "解决合并冲突"
git push
```

**Web 界面解决冲突：**

1. 打开有冲突的 PR
2. 点击「解决冲突」
3. 在线编辑器中解决冲突
4. 标记为已解决
5. 提交更改

### 如何撤销已合并的 PR？

**使用 Revert：**

```bash
# 创建反向提交
git revert -m 1 <merge-commit-hash>
git push origin main
```

**通过 Web 界面：**

1. 打开已合并的 PR
2. 点击「撤销」按钮
3. 创建新的反向 PR
4. 合并反向 PR

### 分支保护规则限制了我的操作怎么办？

**常见限制：**
- 不能直接推送到 main 分支
- 需要代码评审才能合并
- CI 检查未通过不能合并

**解决方案：**
- 创建功能分支开发
- 提交 PR 请求评审
- 修复 CI 失败的问题
- 联系仓库管理员临时解除限制（紧急情况）

## Pull Request

### PR 检查一直显示"进行中"？

**可能原因：**
1. CI 任务挂起或超时
2. Webhook 配置错误
3. 外部服务故障

**解决方案：**
```bash
# 重新触发 CI
git commit --allow-empty -m "Trigger CI"
git push
```

或联系管理员检查 CI 配置。

### 如何更新 PR？

**添加新的提交：**

```bash
# 在同一分支上继续开发
git add .
git commit -m "根据评审意见修改"
git push origin feature-branch
```

PR 会自动更新。

**修改已提交的内容：**

```bash
# 修改最后一次提交
git add .
git commit --amend
git push --force origin feature-branch
```

⚠️ 谨慎使用 `--force`。

### PR 合并后如何清理分支？

**本地清理：**

```bash
# 切换到 main 分支
git checkout main
git pull

# 删除本地分支
git branch -d feature-branch

# 删除远程跟踪分支
git fetch --prune
```

**自动清理：**

在仓库设置中启用「合并后自动删除分支」。

## 性能与限制

### 单次推送有大小限制吗？

是的，通常有以下限制：
- 单个文件：100 MB（推荐使用 Git LFS）
- 单次推送：500 MB
- 仓库总大小：10 GB

具体限制请咨询管理员。

### API 调用有频率限制吗？

**认证用户：**
- 5000 次/小时

**未认证请求：**
- 60 次/小时

**检查剩余配额：**

```bash
curl -I https://api.your-platform.com/user
# 查看响应头
# X-RateLimit-Limit: 5000
# X-RateLimit-Remaining: 4999
```

### 如何提高克隆/推送速度？

1. **使用 SSH 而非 HTTPS**
2. **启用 Git 压缩：**

```bash
git config --global core.compression 9
```

3. **调整缓冲区大小：**

```bash
git config --global http.postBuffer 524288000
```

4. **使用浅克隆：**

```bash
git clone --depth 1 <repo-url>
```

## 安全与隐私

### 如何撤销已泄露的访问令牌？

1. 立即登录平台
2. 进入「个人设置」→「访问令牌」
3. 找到泄露的令牌
4. 点击「撤销」
5. 生成新令牌
6. 更新使用该令牌的服务

### 私有仓库会被搜索引擎索引吗？

不会。私有仓库：
- ✅ 仅授权用户可访问
- ✅ 不会出现在搜索结果
- ✅ 不会被搜索引擎爬取
- ✅ URL 猜测无法访问

### 如何启用 2FA？

1. 进入「个人设置」→「安全」
2. 点击「启用双因素认证」
3. 扫描二维码（使用 Google Authenticator 等）
4. 输入验证码确认
5. **保存恢复代码**（重要！）

## 协作与工作流

### 如何处理团队成员离职？

**管理员操作：**

1. **移除成员访问权限：**
   - 从组织/团队中移除
   - 撤销访问令牌
   - 移除 SSH 密钥

2. **代码权限转移：**
   - 将其仓库转移给其他成员
   - 重新指派 PR 和 Issue

3. **审计检查：**
   - 检查最近的操作日志
   - 确认没有异常提交

### 代码评审最佳实践是什么？

**评审者：**
- ⏰ 及时响应（24 小时内）
- 💬 提供建设性反馈
- ✅ 检查代码质量、安全性、性能
- 📝 使用清晰的评论

**提交者：**
- 📏 保持 PR 小而专注
- 📋 提供清晰的描述
- ✅ 确保测试通过
- 💡 回应评审意见

### 如何组织大型项目？

**仓库组织：**
- 使用 Monorepo 或 Multirepo
- 合理划分仓库边界
- 使用 Git Submodules 或 Git Subtree

**分支策略：**
- 采用 Git Flow 或 Trunk-Based
- 保护重要分支
- 定期清理旧分支

**代码所有者（CODEOWNERS）：**

创建 `.github/CODEOWNERS` 文件：

```
# 全局所有者
* @team-leads

# 前端代码
/frontend/ @frontend-team

# 后端代码
/backend/ @backend-team

# 文档
/docs/ @tech-writers

# 配置文件需要管理员审批
*.yml @admins
```

## 故障排查

### Git 操作报错"Permission denied"

**检查项：**
1. SSH 密钥是否正确
2. 是否有仓库访问权限
3. 仓库 URL 是否正确

```bash
# 测试 SSH 连接
ssh -T git@your-platform.com

# 检查远程 URL
git remote -v

# 更正 URL（如需要）
git remote set-url origin git@your-platform.com:username/repo.git
```

### 提交后发现提交到错误的分支

```bash
# 撤销提交但保留更改
git reset --soft HEAD~1

# 切换到正确的分支
git checkout correct-branch

# 重新提交
git commit -m "Your message"
```

### 如何恢复误删的分支？

```bash
# 查找分支最后的 commit hash
git reflog

# 恢复分支
git checkout -b recovered-branch <commit-hash>
```

## 获取帮助

### 如何联系支持团队？

- 📧 邮件：support@your-platform.com
- 💬 在线客服：平台右下角聊天窗口
- 📖 文档中心：docs.your-platform.com
- 💡 社区论坛：community.your-platform.com

### 如何报告 Bug？

1. 搜索已有 Issue 避免重复
2. 访问平台的 Issues 页面
3. 使用 Bug 报告模板
4. 提供详细的重现步骤
5. 附上错误日志和截图

### 如何请求新功能？

1. 访问功能请求页面
2. 描述功能需求和使用场景
3. 说明对现有功能的影响
4. 社区投票支持

---

还有其他问题？查看我们的[完整文档](../overview.md)或[联系支持团队](#获取帮助)。
