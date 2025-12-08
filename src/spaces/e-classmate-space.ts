/**
 * E同学 的个人风采展示
 * 这是你的专属空间，尽情展示你的个性和才华！
 */

export const eClassmateSpace = {
  id: 'e-classmate',
  name: 'E同学',
  avatar: '/img/avatars/e-classmate.jpg',
  emoji: '🌈',

  bio: 'CSS 不是我写的，它自己歪的',
  tags: ['前端小王子', 'CSS 魔法师', '调试狂人', 'Chrome DevTools 专家'],
  currentStatus: '又在调 CSS，脑壳疼 🤯',
  themeColor: '#3b82f6',

  skills: [
    { name: 'HTML/CSS', level: 90, color: 'linear-gradient(90deg, #e34c26 0%, #1572B6 100%)' },
    { name: 'JavaScript', level: 88, color: 'linear-gradient(90deg, #f7df1e 0%, #e5c700 100%)' },
    { name: 'Vue.js', level: 85, color: 'linear-gradient(90deg, #42b883 0%, #35495e 100%)' },
    { name: 'CSS Animation', level: 92, color: 'linear-gradient(90deg, #ff6b9d 0%, #c94b7c 100%)' },
    { name: '浏览器调试', level: 95, color: 'linear-gradient(90deg, #4285f4 0%, #34a853 100%)' },
  ],

  achievements: [
    {
      icon: '🐛',
      title: '解决 Safari 兼容性问题',
      description: '终于搞定了困扰已久的 Safari 浏览器兼容性问题',
      date: '2024.11',
    },
    {
      icon: '⚡',
      title: '性能优化',
      description: '优化首屏加载速度，提升了 40%',
      date: '2024.10',
    },
    {
      icon: '✨',
      title: '炫酷动画效果',
      description: '实现了一个超酷的页面切换动画，产品很满意',
      date: '2024.09',
    },
  ],

  hobbies: [
    { icon: '💻', name: '写前端', description: '热爱前端' },
    { icon: '🎨', name: 'CSS 艺术', description: '用 CSS 画画' },
    { icon: '📱', name: '逛技术社区', description: 'CSS-Tricks 常客' },
    { icon: '🎮', name: '玩游戏', description: '放松必备' },
    { icon: '🎵', name: '听音乐', description: '编码BGM' },
  ],

  favoriteQuotes: [
    { text: 'CSS 是艺术，不是科学。', author: 'E同学' },
    { text: '能用 CSS 解决的问题，就不要用 JS。', author: 'E同学' },
    { text: '浏览器兼容性是前端永远的痛。', author: 'E同学' },
  ],

  moments: [
    {
      emoji: '😤',
      content: '后端说接口改了，但文档还是旧的，你让我怎么对？能不能先更新文档再改接口？',
      date: '2024.12.06',
    },
    {
      emoji: '🎉',
      content: '发现了一个新的 CSS 技巧，可以少写 50 行代码，开心！',
      date: '2024.12.03',
    },
    {
      emoji: '💡',
      content: '可以用 CSS 变量来实现主题切换，下周就试试！',
      date: '2024.12.01',
    },
  ],

  customCards: [
    {
      title: '最近发现的宝藏',
      emoji: '💎',
      content: 'CSS-Tricks 上发现了好多实用的技巧，终于不用再瞎折腾了。推荐所有前端都去看看！',
      color: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05))',
    },
  ],
};
