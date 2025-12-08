/**
 * 团队成员配置文件
 * 统一管理所有团队成员的信息，包括头像、角色、标语等
 */

export type TeamMember = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  slogan: string;
  quote: string;
  spaceEmoji?: string;
  spaceContent?: string;
};

/**
 * 团队成员列表
 * 注意：头像文件需要放置在 /static/img/avatars/ 目录下
 * 例如：benhz.jpg 对应同学A
 * 目前暂时使用 /img/logo.svg 作为默认头像
 */
export const teamMembers: TeamMember[] = [
  {
    id: 'benhz',
    name: 'A同学',
    avatar: '/img/logo.svg', // 暂时使用logo.svg，后续替换为 /img/avatars/benhz.jpg
    role: '全栈猛男',
    slogan: '写前端像后端，写后端像前端，写 Bug 像不要命',
    quote: 'Bug 越多，我越强。',
    spaceEmoji: '🌿',
    spaceContent: '我写代码不是因为我喜欢，而是因为它不允许我讨厌。',
  },
  {
    id: 'memberB',
    name: 'B同学',
    avatar: '/img/logo.svg', // 暂时使用logo.svg，后续替换为 /img/avatars/memberB.jpg
    role: '全栈工具人',
    slogan: '别人靠语法，我靠运气',
    quote: '上线？又上线？',
    spaceEmoji: '🔥',
    spaceContent: '上线就像赌博，赢了皆大欢喜，输了怪我一个人。',
  },
  {
    id: 'memberC',
    name: 'C同学',
    avatar: '/img/logo.svg', // 暂时使用logo.svg，后续替换为 /img/avatars/memberC.jpg
    role: '全栈老实人',
    slogan: '我没意见，你说啥就是啥',
    quote: '你们开心就好。',
    spaceEmoji: '🌙',
    spaceContent: '有没有我都一样，但最好当我没来。',
  },
  {
    id: 'memberD',
    name: 'D同学',
    avatar: '/img/logo.svg', // 暂时使用logo.svg，后续替换为 /img/avatars/memberD.jpg
    role: 'UI 仙女 / 配色大师',
    slogan: '我已经尽力了，可你们为什么还要乱写样式？',
    quote: '我已经尽力救你们的页面了……',
    spaceEmoji: '🎨',
    spaceContent: '设计一稿过？这比产品写清楚需求还难。',
  },
  {
    id: 'memberE',
    name: 'E同学',
    avatar: '/img/logo.svg', // 暂时使用logo.svg，后续替换为 /img/avatars/memberE.jpg
    role: '前端小王子',
    slogan: '我的代码没问题，是浏览器不行',
    quote: 'CSS 不是我写写的，它自己歪的。',
    spaceEmoji: '🌈',
    spaceContent: '我讨厌写样式，但样式更讨厌我。',
  },
];

/**
 * 根据ID获取团队成员信息
 */
export const getMemberById = (id: string): TeamMember | undefined => {
  return teamMembers.find((member) => member.id === id);
};

/**
 * 获取全栈团队成员（前3人）
 */
export const getFullStackMembers = (): TeamMember[] => {
  return teamMembers.slice(0, 3);
};

/**
 * 获取UI设计师
 */
export const getUIMembers = (): TeamMember[] => {
  return teamMembers.slice(3, 4);
};

/**
 * 获取前端开发成员
 */
export const getFrontendMembers = (): TeamMember[] => {
  return teamMembers.slice(4, 5);
};
