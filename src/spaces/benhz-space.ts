/**
 * benhz 的个人空间
 * 在这里记录你的每周日常、想法、灵感和吐槽
 */

export const benhzSpace = {
  id: 'benhz',
  name: 'benhz',
  emoji: '🌿',
  weeks: [
    {
      weekNumber: 1,
      weekLabel: '第 1 周',
      dateRange: '12.02 - 12.08',
      summary: '开局不错，代码质量有提升，但还是免不了踩坑',
      mood: '😊',
      achievements: [
        '重构了用户模块，代码可读性提升 50%',
        '修复了困扰团队一周的 Memory Leak 问题',
        '成功说服产品经理砍掉两个不合理需求',
      ],
      weeklyBugs: [
        '以为修好了一个 Bug，结果引入了三个新 Bug',
        '花了两小时调试，发现是缓存没清',
        'Promise 又忘了 catch，控制台一片红',
      ],
      learnings: [
        'TypeScript 的类型体操原来可以这么玩',
        '学会了用装饰器模式重构屎山代码',
        'React 18 的并发模式真香',
      ],
      inspiration: '突然想到可以用装饰器模式重构那坨屎山代码，周末试试',
      frustration: '产品经理，又改需求的那个你！下次别再说「这是最后一次改了」',
      customSections: [
        {
          title: '下周目标',
          emoji: '🎯',
          content: '完成支付模块的单元测试覆盖率达到 80%，争取让代码审查一次通过',
        },
      ],
    },
    // 你可以继续添加更多周的数据
    // {
    //   weekNumber: 2,
    //   weekLabel: '第 2 周',
    //   dateRange: '12.09 - 12.15',
    //   ...
    // },
  ],
};
