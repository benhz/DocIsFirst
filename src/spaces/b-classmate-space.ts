/**
 * B同学 的个人空间
 * 在这里记录你的每周日常、想法、灵感和吐槽
 */

export const bClassmateSpace = {
  id: 'b-classmate',
  name: 'B同学',
  emoji: '🛠️',
  weeks: [
    {
      weekNumber: 1,
      weekLabel: '第 1 周',
      dateRange: '12.02 - 12.08',
      summary: '又是救火的一周，但好在没出大事故',
      mood: '😰',
      achievements: [
        '成功完成三次线上部署，全部零事故',
        '优化了 CI/CD 流程，部署时间缩短 40%',
        '搭建了新的监控系统，提前发现了两个潜在问题',
      ],
      weeklyBugs: [
        '凌晨三点被叫起来回滚，困死了',
        'Nginx 配置错误，网站挂了半小时才发现',
        'Docker 容器莫名其妙挂了，重启大法好',
      ],
      learnings: [
        '学会了 Kubernetes 的自动扩缩容',
        '掌握了 Prometheus 的告警配置',
        '了解了灰度发布的最佳实践',
      ],
      inspiration: '是时候写个自动化部署脚本了，不能再手动操作了',
      frustration: '为什么每次上线都是我值班？能不能换个人啊！',
      customSections: [
        {
          title: '本周心愿',
          emoji: '🙏',
          content: '希望下周不要再有线上事故，让我睡个安稳觉',
        },
      ],
    },
  ],
};
