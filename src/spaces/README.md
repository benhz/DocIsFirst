# 📁 个人空间文件夹说明

这个文件夹存放每位团队成员的个人空间数据。

## 📝 如何使用

每位同学都有自己的独立文件，只需编辑自己的文件即可：

- `benhz-space.ts` - benhz 的个人空间
- `a-classmate-space.ts` - A同学的个人空间
- `b-classmate-space.ts` - B同学的个人空间
- `c-classmate-space.ts` - C同学的个人空间
- `d-classmate-space.ts` - D同学的个人空间
- `e-classmate-space.ts` - E同学的个人空间

## ✨ 可用的内容模块

每个空间文件支持以下可扩展内容：

### 基础模块

- **dailyQuote** - 今日名言
- **mood** - 心情指数（可以用 emoji 表达）
- **weeklyBugs** - 本周踩坑记录（数组）
- **inspiration** - 灵感瞬间
- **frustration** - 想打谁但没打成 🤣

### 自定义模块

通过 `customSections` 数组添加自定义内容：

```typescript
customSections: [
  {
    title: '本周学到的',
    content: '你学到的新知识',
  },
  {
    title: '下周目标',
    content: '你的计划',
  },
]
```

## 🎯 编辑步骤

1. 打开你的个人空间文件（如 `benhz-space.ts`）
2. 修改 `content` 对象中的任何字段
3. 保存文件即可，修改会自动生效

## 💡 示例

```typescript
export const yourSpace = {
  id: 'your-id',
  name: '你的名字',
  emoji: '🌟', // 你喜欢的 emoji
  content: {
    dailyQuote: '今天的名言',
    mood: '😊 心情不错',
    weeklyBugs: [
      '今天踩的第一个坑',
      '今天踩的第二个坑',
    ],
    inspiration: '突然想到的灵感',
    frustration: '想吐槽的事情',
    customSections: [
      {
        title: '自定义标题',
        content: '自定义内容',
      },
    ],
  },
};
```

## 🚀 不需要的模块可以删除

如果某个模块你不想用，直接删除对应字段即可。例如：

```typescript
export const simpleSpace = {
  id: 'simple',
  name: '极简主义者',
  emoji: '✨',
  content: {
    dailyQuote: '只保留我想要的',
    // 其他模块都不要了
  },
};
```

---

**记住：这是你的个人空间，想怎么玩就怎么玩！** 🎉
