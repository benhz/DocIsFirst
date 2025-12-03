---
sidebar_position: 2
---

# 文档站维护指南

本指南帮助你快速上手文档站的维护和开发工作。

## 🗂️ 目录结构说明

```
DocIsFirst/
├── docs/                      # 所有文档内容
│   ├── intro.md              # 文档首页
│   ├── contributing.md       # 维护指南（本页面）
│   ├── product/              # 🟦 产品中心
│   │   ├── index.md          # 产品总览
│   │   ├── product-a/        # 产品 A 的文档
│   │   └── product-b/        # 产品 B 的文档
│   ├── platform/             # 🟧 平台与通用能力
│   ├── development/          # 🟥 开发与架构
│   ├── operations/           # 🟩 运维与 SRE
│   ├── api/                  # 🟨 API 与集成
│   ├── org/                  # 🟪 组织与流程
│   └── projects/             # 🟫 项目手册
├── sidebars.ts               # 侧边栏配置（重要！）
├── docusaurus.config.ts      # 网站配置（重要！）
├── src/
│   ├── components/           # React 组件
│   └── pages/                # 自定义页面
└── static/                   # 静态资源
```

---

## 📝 如何添加新文档

### 1. 在现有模块下添加文档

例如，在"平台能力"下添加一个"日志系统"文档：

**步骤 1：创建文档文件**
```bash
# 创建文件
touch docs/platform/logging.md
```

**步骤 2：编写文档内容**
```markdown
# 日志系统

## 日志收集
...

## 日志查询
...
```

**步骤 3：更新侧边栏配置**

编辑 `sidebars.ts`，在 `platformSidebar` 中添加：

```typescript
platformSidebar: [
  'platform/overview',
  'platform/account-auth',
  'platform/permission',
  'platform/notification',
  'platform/billing',
  'platform/integration-overview',
  'platform/logging',  // ← 新增
],
```

**步骤 4：预览**
```bash
npm start
```

访问 `http://localhost:3000`，点击"平台能力"Tab，就能看到新增的"日志系统"文档。

---

### 2. 添加新产品

例如，添加"产品 C"：

**步骤 1：创建产品目录和文档**
```bash
mkdir -p docs/product/product-c
touch docs/product/product-c/overview.md
touch docs/product/product-c/features.md
touch docs/product/product-c/user-guide.md
```

**步骤 2：编写文档内容**

参考 `product-a` 或 `product-b` 的结构。

**步骤 3：更新侧边栏**

编辑 `sidebars.ts`，在 `productSidebar` 中添加：

```typescript
productSidebar: [
  'product/index',
  {
    type: 'category',
    label: '产品 A',
    items: [...],
  },
  {
    type: 'category',
    label: '产品 B',
    items: [...],
  },
  {
    type: 'category',
    label: '产品 C',  // ← 新增
    items: [
      'product/product-c/overview',
      'product/product-c/features',
      'product/product-c/user-guide',
    ],
  },
],
```

**步骤 4：更新产品总览**

编辑 `docs/product/index.md`，添加产品 C 的介绍。

---

## 🎨 如何添加新的 Tab（领域模块）

例如，添加一个"数据中心"Tab：

**步骤 1：创建文档目录**
```bash
mkdir -p docs/data-center
touch docs/data-center/overview.md
touch docs/data-center/data-warehouse.md
touch docs/data-center/bi-tools.md
```

**步骤 2：创建侧边栏**

编辑 `sidebars.ts`，添加新的 sidebar：

```typescript
const sidebars: SidebarsConfig = {
  // ... 其他 sidebars

  // 新增数据中心的侧边栏
  dataCenterSidebar: [
    'data-center/overview',
    'data-center/data-warehouse',
    'data-center/bi-tools',
  ],
};
```

**步骤 3：添加顶部导航**

编辑 `docusaurus.config.ts`，在 `navbar.items` 中添加：

```typescript
navbar: {
  items: [
    // ... 其他 tabs
    {
      type: 'docSidebar',
      sidebarId: 'dataCenterSidebar',  // ← 对应步骤2的 sidebar ID
      position: 'left',
      label: '数据中心',
    },
  ],
},
```

**步骤 4：更新首页卡片（可选）**

编辑 `src/components/HomepageFeatures/index.tsx`，在 `ModuleList` 中添加：

```typescript
{
  title: '数据中心',
  icon: '🟪',
  color: '#9c27b0',
  description: (
    <>
      数据仓库、BI 工具、数据分析和数据治理。
    </>
  ),
  link: '/docs/data-center/overview',
},
```

---

## 💻 本地开发

**安装依赖**
```bash
npm install
```

**启动开发服务器**
```bash
npm start
```

访问 `http://localhost:3000`，支持热更新。

**构建生产版本**
```bash
npm run build
```

生成的静态文件在 `build/` 目录。

**本地预览生产版本**
```bash
npm run serve
```

---

## 🚀 部署

本文档站使用 GitLab CI/CD 自动部署。

**部署流程**：
1. 提交代码到 Git 仓库
2. GitLab CI 自动执行构建（见 `.gitlab-ci.yml`）
3. 构建产物部署到 Kubernetes
4. 通过域名访问

**手动部署**：
```bash
# 构建
npm run build

# 部署到服务器（根据实际情况）
kubectl apply -f k8s/
```

---

## 📋 常见问题

### Q1：侧边栏没有显示新文档？

**A**：检查 `sidebars.ts` 配置，确保：
1. 文件路径正确（不要加 `.md` 后缀）
2. 使用正确的 sidebar ID
3. 重启开发服务器

### Q2：如何调整文档顺序？

**A**：在 `sidebars.ts` 中调整数组顺序即可。

### Q3：如何添加多级目录？

**A**：使用嵌套的 `category`：

```typescript
{
  type: 'category',
  label: '一级目录',
  items: [
    'doc1',
    {
      type: 'category',
      label: '二级目录',
      items: ['doc2', 'doc3'],
    },
  ],
}
```

### Q4：如何隐藏某个文档？

**A**：在文档的 frontmatter 中添加：

```markdown
---
unlisted: true
---
```

### Q5：如何添加图片？

**A**：
1. 将图片放到 `static/img/` 目录
2. 在文档中引用：`![描述](/img/example.png)`

### Q6：如何添加内部链接？

**A**：
- 相对路径：`[链接文字](./other-doc.md)`
- 绝对路径：`[链接文字](/docs/category/doc)`

### Q7：如何高亮代码？

**A**：指定语言类型：

````markdown
```javascript
const hello = 'world';
```
````

---

## 📖 更多资源

- [Docusaurus 官方文档](https://docusaurus.io/docs)
- [Markdown 语法指南](https://www.markdownguide.org/)
- [React 官方文档](https://react.dev/)（用于自定义组件）

---

## 🤝 贡献指南

欢迎所有同学贡献文档！

### 贡献流程

1. **Fork 项目或创建新分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **添加/修改文档**
   - 遵循文档规范
   - 确保格式正确

3. **本地预览确认无误**
   ```bash
   npm start
   ```

4. **提交代码**
   ```bash
   git add .
   git commit -m "docs: 添加 XXX 文档"
   git push origin feature/your-feature-name
   ```

5. **提交 Pull Request**
   - 在 Git 平台创建 PR
   - 等待 Review

### 文档规范

#### Markdown 格式
- 使用标准 Markdown 语法
- 标题层级清晰（h1 → h2 → h3）
- 段落之间空一行

#### 代码块
- 指定语言：```bash、```javascript、```typescript
- 添加注释说明关键代码

#### 示例和图片
- 添加适当的示例代码
- 图片使用有意义的文件名
- 图片添加 alt 描述文字

#### 语言风格
- 保持语言简洁、易懂
- 使用主动语态
- 避免行话和缩写（或加以解释）
- 面向目标读者（开发者、运维、产品等）

#### 文件命名
- 使用小写字母
- 单词间用短横线连接：`user-guide.md`
- 避免中文文件名

---

## 🔧 高级功能

### 自定义组件

可以在文档中使用 React 组件：

```jsx
import MyComponent from '@site/src/components/MyComponent';

<MyComponent prop="value" />
```

### 添加告警框

```markdown
:::note
这是一个提示信息
:::

:::tip
这是一个技巧
:::

:::warning
这是一个警告
:::

:::danger
这是一个危险提示
:::
```

### 代码块功能

````markdown
```javascript title="example.js" {1,3-5}
// 第1行会高亮
const a = 1;
// 第3-5行会高亮
const b = 2;
const c = 3;
```
````

---

## 📧 联系我们

如有任何问题：
- 📧 发送邮件至文档维护团队
- 💬 在技术群提问
- 🐛 提交 Issue 到 Git 仓库

---

> 💡 **提示**：文档是团队的共同资产，让我们一起维护好它！
