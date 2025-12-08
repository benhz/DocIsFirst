/**
 * A同学 的个人空间
 * 在这里记录你的每周日常、想法、灵感和吐槽
 */

export const aClassmateSpace = {
  id: 'a-classmate',
  name: 'A同学',
  emoji: '🔥',
  weeks: [
    {
      weekNumber: 1,
      weekLabel: '第 1 周',
      dateRange: '12.02 - 12.08',
      summary: '战斗力爆表的一周，虽然累但很充实',
      mood: '😤',
      achievements: [
        '通宵优化了性能，响应时间从 2s 降到 200ms',
        '独立完成了整个订单系统的重构',
        '帮队友解决了 5 个棘手的技术问题',
      ],
      weeklyBugs: [
        'Redis 缓存穿透，差点把数据库打爆',
        '以为是代码问题，结果是服务器没重启',
        'SQL 注入漏洞差点被测试发现，好险',
      ],
      learnings: [
        '今天突然想明白了异步编程的精髓',
        '学会了 Redis 的高可用方案',
        '掌握了 Nginx 的负载均衡配置',
      ],
      inspiration: '可以用消息队列来解耦订单和支付模块',
      frustration: '测试说我的代码有问题，明明是他测试用例写错了！',
      customSections: [
        {
          title: '本周最爽的事',
          emoji: '🎉',
          content: '性能优化后，看到监控面板的曲线一路向下，爽翻了',
        },
      ],
    },
  ],
};
