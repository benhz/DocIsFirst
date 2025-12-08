# 团队成员头像说明

## 📁 目录用途

这个文件夹用于存放所有团队成员的头像图片，统一管理团队墙和 My Space 模块中使用的头像资源。

## 📸 如何添加你的头像

### 1. 准备头像图片

- **文件格式**：建议使用 `.jpg` 或 `.png` 格式
- **文件大小**：建议不超过 500KB（为了网站加载速度）
- **图片尺寸**：建议至少 200x200 像素（正方形最佳）
- **图片内容**：清晰的个人照片或个性化头像

### 2. 文件命名规范

请使用你在 `src/config/teamMembers.ts` 配置文件中的 `id` 作为文件名：

- **A同学（benhz）**：`benhz.jpg` 或 `benhz.png`
- **B同学**：`memberB.jpg` 或 `memberB.png`
- **C同学**：`memberC.jpg` 或 `memberC.png`
- **D同学**：`memberD.jpg` 或 `memberD.png`
- **E同学**：`memberE.jpg` 或 `memberE.png`

### 3. 上传头像

将准备好的头像文件放到这个文件夹中：
```
/static/img/avatars/你的头像文件名.jpg
```

### 4. 更新配置文件

打开 `src/config/teamMembers.ts` 文件，找到你的成员信息，更新 `avatar` 字段：

```typescript
{
  id: 'benhz',
  name: 'A同学',
  avatar: '/img/avatars/benhz.jpg', // 从 /img/logo.svg 更新为你的头像路径
  role: '全栈猛男',
  // ... 其他信息
}
```

### 5. 验证效果

- 本地运行 `npm start` 或 `yarn start`
- 访问文档首页，检查团队墙和 My Space 部分是否正确显示你的头像
- 如果显示正常，提交代码并推送到仓库

## 🎨 头像优化建议

1. **使用正方形图片**：圆形头像显示效果最佳
2. **背景简洁**：纯色背景或简单背景效果更好
3. **人脸居中**：确保头像主体在图片中心位置
4. **压缩图片**：使用在线工具（如 TinyPNG）压缩图片以提升加载速度

## 📝 注意事项

- 所有头像都会以圆形方式显示
- 团队墙中的头像尺寸为 40x40 像素
- ProfileCard 中的头像尺寸为 60x60 像素
- My Space 中的头像尺寸为 32x32 像素
- 图片会自动按比例缩放并裁剪

## 🔧 技术说明

头像在以下位置使用：
- **团队墙（TeamWall）**：docs/intro.mdx 中的团队墙组件
- **个人档案区（ProfileCard）**：展示团队成员的详细信息
- **My Space**：每个人的私人空间

所有头像统一在 `src/config/teamMembers.ts` 中配置，修改配置后会自动同步到所有使用的地方。

## 💡 默认头像

如果你还没有准备好自己的头像，系统会暂时使用 `/img/logo.svg` 作为默认头像。
