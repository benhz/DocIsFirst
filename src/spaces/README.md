# 📁 个人空间文件夹说明

这个文件夹存放每位团队成员的个人空间数据，以**周为单位**记录。

## 📝 如何使用

每位同学都有自己的独立文件，只需编辑自己的文件即可：

- `benhz-space.ts` - benhz 的个人空间
- `a-classmate-space.ts` - A同学的个人空间
- `b-classmate-space.ts` - B同学的个人空间
- `c-classmate-space.ts` - C同学的个人空间
- `d-classmate-space.ts` - D同学的个人空间
- `e-classmate-space.ts` - E同学的个人空间

## 📅 周报结构

每个空间支持多周数据，以周为单位记录你的日常：

```typescript
export const yourSpace = {
  id: 'your-id',
  name: '你的名字',
  emoji: '🌟',
  weeks: [
    {
      weekNumber: 1,              // 周次编号
      weekLabel: '第 1 周',        // 周次标签
      dateRange: '12.02 - 12.08', // 日期范围（可选）
      summary: '本周总结',         // 本周一句话总结（可选）
      mood: '😊',                 // 本周心情（可选）

      // 以下是可选的内容模块
      achievements: [              // 本周成就
        '完成了XX功能',
        '解决了XX问题',
      ],
      weeklyBugs: [                // 踩坑记录
        '遇到了XX问题',
        '被XX坑了',
      ],
      learnings: [                 // 本周学习
        '学会了XX',
        '掌握了XX',
      ],
      inspiration: '灵感内容',     // 灵感瞬间
      frustration: '吐槽内容',     // 想打谁但没打成

      customSections: [            // 自定义内容模块
        {
          title: '自定义标题',
          emoji: '✨',
          content: '自定义内容',
        },
      ],
    },
    // 可以继续添加第 2 周、第 3 周...
  ],
};
```

## ✨ 可用的内容模块

### 基础信息
- **weekNumber** - 周次编号（必填）
- **weekLabel** - 周次标签，如"第 1 周"（必填）
- **dateRange** - 日期范围，如"12.02 - 12.08"（可选）
- **summary** - 本周一句话总结（可选）
- **mood** - 心情 emoji（可选）

### 内容模块
- 🏆 **achievements** - 本周成就（数组）
- 🕳️ **weeklyBugs** - 踩坑记录（数组）
- 📚 **learnings** - 本周学习（数组）
- 💡 **inspiration** - 灵感瞬间（字符串）
- 🤣 **frustration** - 想打谁但没打成（字符串）
- ✨ **customSections** - 自定义模块（数组）

### 自定义模块格式

```typescript
customSections: [
  {
    title: '模块标题',
    emoji: '🎯',      // 可选
    content: '模块内容',
  },
]
```

## 🎯 编辑步骤

### 1. 添加新的一周

在 `weeks` 数组中添加新的周数据：

```typescript
weeks: [
  {
    weekNumber: 1,
    weekLabel: '第 1 周',
    dateRange: '12.02 - 12.08',
    // ... 其他内容
  },
  {
    weekNumber: 2,
    weekLabel: '第 2 周',
    dateRange: '12.09 - 12.15',
    summary: '第二周的总结',
    mood: '🚀',
    achievements: ['完成了新功能'],
    // ... 其他内容
  },
]
```

### 2. 更新本周内容

直接修改对应周次的数据：

```typescript
{
  weekNumber: 1,
  weekLabel: '第 1 周',
  achievements: [
    '完成了用户模块',
    '修复了 3 个 Bug',  // 新增成就
  ],
}
```

### 3. 不需要的模块可以删除

如果某个模块不想用，直接删除对应字段即可：

```typescript
{
  weekNumber: 1,
  weekLabel: '第 1 周',
  summary: '只保留总结',
  // 不需要其他模块，不写就行
}
```

## 🎨 视觉效果

新的 MySpace 组件提供了以下视觉优化：

- **周选择器** - 点击按钮切换不同周次
- **渐变卡片** - 每种类型的内容都有独特的渐变背景色
  - 🏆 成就：金色渐变
  - 🕳️ 踩坑：红色渐变
  - 📚 学习：蓝色渐变
  - 💡 灵感：紫色渐变
  - 🤣 吐槽：粉色渐变
  - ✨ 自定义：绿色渐变
- **悬停效果** - 卡片悬停时会有轻微抬起效果
- **响应式布局** - 自适应网格布局，移动端友好

## 💡 使用技巧

### 1. 快速复制模板

```typescript
{
  weekNumber: X,
  weekLabel: '第 X 周',
  dateRange: 'MM.DD - MM.DD',
  summary: '本周总结',
  mood: '😊',
  achievements: ['成就1', '成就2'],
  weeklyBugs: ['坑1', '坑2'],
  learnings: ['学习1', '学习2'],
  inspiration: '灵感',
  frustration: '吐槽',
}
```

### 2. 只记录重要内容

不是每个模块都要填满，只记录你觉得重要的：

```typescript
{
  weekNumber: 1,
  weekLabel: '第 1 周',
  summary: '平平无奇的一周',
  mood: '😐',
  // 这周没啥特别的，就这样
}
```

### 3. 使用 Emoji 增加趣味性

```typescript
summary: '🎉 这周超棒！完成了重大突破！',
achievements: ['🚀 性能优化提升 10 倍'],
frustration: '🤬 又是那个该死的 Bug！',
```

## 🚀 开始使用

1. 打开你的空间文件（如 `benhz-space.ts`）
2. 在 `weeks` 数组中添加或修改周数据
3. 保存文件
4. 刷新页面查看效果

---

**记住：这是你的个人空间，想怎么玩就怎么玩！** 🎉
