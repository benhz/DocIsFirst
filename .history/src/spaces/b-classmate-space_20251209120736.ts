/**
 * B同学 的个人风采展示
 * 这是你的专属空间，尽情展示你的个性和才华！
 */

export const muqiaoSpace = {
  id: 'muqiao',
  name: 'muqiao',
  avatar: '/img/avatars/b-classmate.jpg',
  emoji: '🛠️',

  bio: '上线就像赌博，赢了皆大欢喜，输了怪我一个人',
  tags: ['运维专家', '救火队员', '背锅侠', 'DevOps', '半夜被叫醒专业户'],
  currentStatus: '监控告警，随时待命 📟',
  themeColor: '#f59e0b',

  skills: [
    { name: 'Linux', level: 90, color: 'linear-gradient(90deg, #FCC624 0%, #FFA000 100%)' },
    { name: 'Docker', level: 85, color: 'linear-gradient(90deg, #2496ed 0%, #0db7ed 100%)' },
    { name: 'Kubernetes', level: 80, color: 'linear-gradient(90deg, #326ce5 0%, #0052d4 100%)' },
    { name: 'CI/CD', level: 88, color: 'linear-gradient(90deg, #FC6D26 0%, #FCA326 100%)' },
    { name: 'Monitoring', level: 92, color: 'linear-gradient(90deg, #EB532D 0%, #F79F1F 100%)' },
  ],

  achievements: [
    {
      icon: '🎯',
      title: '零事故部署专家',
      description: '连续完成 50+ 次线上部署，全部零事故',
      date: '2024.11',
    },
    {
      icon: '⚙️',
      title: 'CI/CD 优化大师',
      description: '优化部署流程，时间缩短 60%',
      date: '2024.10',
    },
    {
      icon: '🔍',
      title: '搭建监控系统',
      description: '提前发现了 10+ 个潜在问题',
      date: '2024.09',
    },
  ],

  hobbies: [
    { icon: '📱', name: '看监控', description: '强迫症患者' },
    { icon: '🎮', name: '玩游戏', description: '放松一下' },
    { icon: '😴', name: '睡觉', description: '最爱但最少' },
    { icon: '🍕', name: '外卖', description: '半夜的伙伴' },
  ],

  favoriteQuotes: [
    { text: '上线有风险，点击需谨慎。', author: 'B同学' },
    { text: '没有什么问题是重启解决不了的，如果有，那就重启两次！', author: 'B同学' },
  ],

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

  customCards: [
    {
      title: '心愿清单',
      emoji: '🙏',
      content: '希望能有一周不被半夜叫醒，让我睡个安稳觉！',
      color: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(160, 82, 45, 0.05))',
    },
  ],
};
