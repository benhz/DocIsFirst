/**
 * A同学 的个人风采展示
 * 这是你的专属空间，尽情展示你的个性和才华！
 */

export const aClassmateSpace = {
  id: 'a-classmate',
  name: 'A同学',
  avatar: '/img/avatars/a-classmate.jpg',
  emoji: '🔥',

  bio: 'Bug 越多，我越强！',
  tags: ['全栈猛男', '性能优化狂人', '加班王', '技术极客'],
  currentStatus: '正在通宵优化性能 🌙',
  themeColor: '#ef4444',

  skills: [
    { name: 'JavaScript', level: 92, color: 'linear-gradient(90deg, #f7df1e 0%, #e5c700 100%)' },
    { name: 'Python', level: 88, color: 'linear-gradient(90deg, #3776ab 0%, #ffd343 100%)' },
    { name: 'Database', level: 85, color: 'linear-gradient(90deg, #336791 0%, #00758f 100%)' },
    { name: 'Performance', level: 95, color: 'linear-gradient(90deg, #ff6b6b 0%, #ee5a6f 100%)' },
    { name: 'Problem Solving', level: 90, color: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)' },
  ],

  achievements: [
    {
      icon: '⚡',
      title: '性能优化大师',
      description: '将系统响应时间从 2s 降到 200ms',
      date: '2024.11',
    },
    {
      icon: '🦸',
      title: '团队救星',
      description: '帮队友解决了 20+ 个棘手的技术问题',
      date: '2024.10',
    },
    {
      icon: '💪',
      title: '独立完成订单系统重构',
      description: '一个人搞定整个订单系统的架构升级',
      date: '2024.09',
    },
  ],

  hobbies: [
    { icon: '💻', name: '写代码', description: '这是爱好也是工作' },
    { icon: '📊', name: '性能分析', description: '看监控图表很爽' },
    { icon: '🎯', name: '解Bug', description: '越难越兴奋' },
    { icon: '🌃', name: '熬夜', description: '夜猫子体质' },
  ],

  favoriteQuotes: [
    { text: '没有什么 Bug 是通宵解决不了的，如果有，那就两个通宵！', author: 'A同学' },
    { text: '代码可以写烂，但性能必须快！', author: 'A同学' },
  ],

  moments: [
    {
      emoji: '🎉',
      content: '性能优化后，看到监控面板的曲线一路向下，爽翻了！',
      date: '2024.12.06',
    },
    {
      emoji: '😤',
      content: '测试说我的代码有问题，明明是他测试用例写错了！',
      date: '2024.12.04',
    },
  ],
};
