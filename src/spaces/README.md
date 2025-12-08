# 🌟 My Space - 个人风采展示

这个文件夹存放每位团队成员的个人风采展示数据。这不是工作周报，而是展示真实的你！

## 📝 如何使用

每位同学都有自己的独立文件，只需编辑自己的文件即可：

- `benhz-space.ts` - benhz 的个人空间
- `a-classmate-space.ts` - A同学的个人空间
- `b-classmate-space.ts` - B同学的个人空间
- `c-classmate-space.ts` - C同学的个人空间
- `d-classmate-space.ts` - D同学的个人空间
- `e-classmate-space.ts` - E同学的个人空间

## ✨ 数据结构

```typescript
export const yourSpace = {
  id: 'your-id',
  name: '你的名字',
  avatar: '/img/avatars/your-avatar.jpg',  // 头像路径
  emoji: '🌟',                              // 你的专属emoji

  // === 顶部个人信息 ===
  bio: '你的个性签名',                      // 一句话介绍自己
  tags: ['标签1', '标签2', '标签3'],        // 个人标签云
  currentStatus: '当前在做什么',             // 当前状态
  themeColor: '#10b981',                   // 主题色(可选)

  // === 技能树 ===
  skills: [
    {
      name: 'TypeScript',
      level: 95,  // 0-100
      color: 'linear-gradient(90deg, #3178c6 0%, #235a97 100%)',  // 可选
    },
  ],

  // === 高光时刻 ===
  achievements: [
    {
      icon: '🚀',
      title: '成就标题',
      description: '成就描述',
      date: '2024.11',  // 可选
    },
  ],

  // === 兴趣爱好 ===
  hobbies: [
    {
      icon: '☕',
      name: '咖啡',
      description: '每天至少3杯',  // 可选
    },
  ],

  // === 金句墙 ===
  favoriteQuotes: [
    {
      text: '你喜欢的名言',
      author: '作者名字',  // 可选
    },
  ],

  // === 随笔动态 ===
  moments: [
    {
      emoji: '💭',
      content: '想说的话',
      date: '2024.12.07',  // 可选
    },
  ],

  // === 自定义卡片 ===
  customCards: [
    {
      title: '卡片标题',
      emoji: '📖',
      content: '卡片内容',
      color: 'linear-gradient(135deg, rgba(255, 159, 64, 0.1), rgba(255, 99, 132, 0.05))',  // 可选
    },
  ],
};
```

## 🎨 可用模块

### 1. 顶部个人信息（必填）
```typescript
{
  id: 'your-id',           // 唯一标识符
  name: '你的名字',
  avatar: '/img/avatars/your-avatar.jpg',  // 头像
  emoji: '🌟',            // emoji
  bio: '个性签名',         // 推荐填写
  tags: ['标签1', '标签2'], // 推荐填写
  currentStatus: '当前状态',  // 可选
  themeColor: '#10b981',   // 可选，hex颜色
}
```

### 2. 💪 技能树
展示你的技能水平，支持彩色进度条：
```typescript
skills: [
  {
    name: 'TypeScript',
    level: 95,  // 0-100
    color: 'linear-gradient(90deg, #3178c6 0%, #235a97 100%)',
  },
]
```

### 3. 🏆 高光时刻
展示你的成就和里程碑：
```typescript
achievements: [
  {
    icon: '🚀',
    title: '成就标题',
    description: '详细描述',
    date: '2024.11',
  },
]
```

### 4. 🎨 兴趣爱好
展示你的兴趣爱好：
```typescript
hobbies: [
  {
    icon: '☕',
    name: '咖啡',
    description: '每天至少3杯',
  },
]
```

### 5. 💬 金句墙
收藏你喜欢的名言：
```typescript
favoriteQuotes: [
  {
    text: '你喜欢的名言',
    author: '作者',
  },
]
```

### 6. ✍️ 随笔动态
记录你的想法和吐槽：
```typescript
moments: [
  {
    emoji: '💭',
    content: '想说的话',
    date: '2024.12.07',
  },
]
```

### 7. ✨ 自定义卡片
添加任何你想要的内容：
```typescript
customCards: [
  {
    title: '卡片标题',
    emoji: '📖',
    content: '卡片内容',
    color: 'linear-gradient(...)',  // 自定义背景色
  },
]
```

## 🎯 使用指南

### 快速开始

1. 打开你的空间文件（如 `benhz-space.ts`）
2. 修改基本信息（姓名、头像、签名、标签）
3. 添加你想展示的模块
4. 保存文件，刷新页面查看效果

### 推荐配置

**最小配置**（必填项）：
```typescript
{
  id: 'your-id',
  name: '你的名字',
  emoji: '🌟',
  bio: '个性签名',
  tags: ['标签1', '标签2'],
}
```

**完整配置**（展示所有风采）：
- 基本信息 + 技能树 + 高光时刻 + 兴趣爱好 + 金句墙 + 随笔

**自由配置**：
- 只保留你喜欢的模块，删除不需要的模块

## 💡 使用技巧

### 1. 选择合适的主题色
```typescript
themeColor: '#10b981',  // 绿色
themeColor: '#ef4444',  // 红色
themeColor: '#3b82f6',  // 蓝色
themeColor: '#8b5cf6',  // 紫色
themeColor: '#ec4899',  // 粉色
```

### 2. 技能条的渐变色
可以在 [uiGradients](https://uigradients.com/) 找到好看的渐变色

### 3. Emoji 的使用
- 可以在 [Emojipedia](https://emojipedia.org/) 查找合适的 emoji
- 合理使用 emoji 能让内容更生动

### 4. 保持真实和有趣
- 不需要正式，轻松一点
- 展示真实的自己
- 可以加点幽默和吐槽
- 这是你的个人空间，想怎么玩就怎么玩

## 🎨 视觉效果

### 顶部区域
- 大头像展示
- 个性签名
- 标签云（漂亮的小标签）
- 当前状态
- 支持自定义主题色

### 卡片效果
- 每种模块都有独特的渐变配色
- 悬停时会有抬起动画
- 响应式布局，自适应不同屏幕

### 特殊效果
- **技能树**：彩色进度条动画
- **兴趣爱好**：网格布局展示
- **金句墙**：优雅的引用样式
- **随笔动态**：类似朋友圈的卡片流

## 📖 示例参考

可以参考其他同学的空间文件作为灵感：

- `benhz-space.ts` - 技术大佬风格
- `a-classmate-space.ts` - 技术极客风格
- `b-classmate-space.ts` - 运维专家风格
- `c-classmate-space.ts` - 佛系摸鱼风格
- `d-classmate-space.ts` - 设计师风格
- `e-classmate-space.ts` - 前端工程师风格

## 🚀 开始展示你的风采

1. 选择一个示例文件作为模板
2. 修改成你自己的内容
3. 保存并刷新页面
4. 看到效果后继续调整

记住：**这是你的个人空间，想怎么展示就怎么展示！** ✨

---

**需要帮助？** 查看其他同学的文件获取灵感，或者在团队群里讨论！
