/**
 * benhz 的个人风采展示
 * 这是你的专属空间，尽情展示你的个性和才华！
 */

export const benhzSpace = {
  id: 'benhz',
  name: 'benhz',
  avatar: '/img/avatars/benhz.jpg',
  emoji: '🌿',

  // 个性签名
  bio: '代码是写给人看的，顺便让机器执行',

  // 个人标签
  tags: ['全栈开发', '架构师', '技术负责人', '开源爱好者', '咖啡成瘾'],

  // 当前状态
  currentStatus: '正在重构用户模块 💻',

  // 主题色（可选，支持 hex 颜色）
  themeColor: '#10b981',

  // 技能树
  skills: [
    { name: 'TypeScript', level: 95, color: 'linear-gradient(90deg, #3178c6 0%, #235a97 100%)' },
    { name: 'React', level: 90, color: 'linear-gradient(90deg, #61dafb 0%, #21a1c4 100%)' },
    { name: 'Node.js', level: 85, color: 'linear-gradient(90deg, #68a063 0%, #44883e 100%)' },
    { name: 'System Design', level: 80, color: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' },
    { name: 'Docker & K8s', level: 75, color: 'linear-gradient(90deg, #2496ed 0%, #0db7ed 100%)' },
  ],

  // 高光时刻
  achievements: [
    {
      icon: '🚀',
      title: '成功重构核心模块',
      description: '将用户模块代码可读性提升 50%，性能提升 30%',
      date: '2024.11',
    },
    {
      icon: '🏆',
      title: '解决了团队最头疼的 Bug',
      description: '修复了困扰团队一周的 Memory Leak 问题',
      date: '2024.10',
    },
    {
      icon: '💡',
      title: '提出新架构方案',
      description: '设计并实施了微前端架构，让团队开发效率提升 40%',
      date: '2024.09',
    },
  ],

  // 兴趣爱好
  hobbies: [
    { icon: '☕', name: '咖啡', description: '每天至少3杯' },
    { icon: '📚', name: '阅读', description: '技术书籍爱好者' },
    { icon: '🎮', name: '游戏', description: '休息时的乐趣' },
    { icon: '🏃', name: '跑步', description: '保持健康' },
    { icon: '🎸', name: '音乐', description: '偶尔弹琴' },
    { icon: '📝', name: '写博客', description: '分享技术心得' },
  ],

  // 金句墙
  favoriteQuotes: [
    {
      text: '代码如诗，架构如画，Bug 如人生。',
      author: 'benhz',
    },
    {
      text: 'Talk is cheap. Show me the code.',
      author: 'Linus Torvalds',
    },
    {
      text: '过早优化是万恶之源。',
      author: 'Donald Knuth',
    },
  ],

  // 随笔
  moments: [
    {
      emoji: '😰',
      content: '凌晨三点被叫起来回滚，困死了...这个月第5次了',
      date: '2024.12.06',
    },
    {
      emoji: '🎉',
      content: '终于搞定自动化部署脚本，以后可以少熬点夜了！',
      date: '2024.12.02',
    },
  ],

  // 自定义卡片
  customCards: [
    {
      title: '最近在学',
      emoji: '📖',
      content: 'Rust 语言和 WebAssembly，感觉打开了新世界的大门！',
      color: 'linear-gradient(135deg, rgba(255, 159, 64, 0.1), rgba(255, 99, 132, 0.05))',
    },
  ],
};
