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
  tags: ['架构设计', '技术推进', '爱好开源', '疯狂提示词', "重度AI用户", '区块链爱好者', '云原生', '没有猫撸'],

  // 当前状态
  currentStatus: '正在推进团队组建与技术方向规划 📌，building the team',

  // 主题色（可选，支持 hex 颜色）
  themeColor: '#10b981',

  skills: [
    // —— 语言（Languages） ——
    { name: 'Go', level: 60, color: 'linear-gradient(90deg, #00ADD8 0%, #007A96 100%)' },
    { name: 'Java', level: 50, color: 'linear-gradient(90deg, #f89820 0%, #b07219 100%)' },
    { name: 'Python', level: 70, color: 'linear-gradient(90deg, #3776AB 0%, #244D75 100%)' },

    // —— 语言框架（Language Frameworks） ——
    { name: 'Flask（Python）', level: 80, color: 'linear-gradient(90deg, #000000 0%, #333333 100%)' },
    { name: 'Django（Python）', level: 70, color: 'linear-gradient(90deg, #092E20 0%, #0D3E28 100%)' },
    { name: 'Gin（Go）', level: 60, color: 'linear-gradient(90deg, #00C2D1 0%, #0091A2 100%)' },
    { name: 'Spring（Java）', level: 50, color: 'linear-gradient(90deg, #ffb74d 0%, #e65100 100%)' },
    { name: 'React（TypeScrict）', level: 40, color: 'linear-gradient(90deg, #61dafb 0%, #21a1c4 100%)' },

    // —— AI Framework（深度学习框架） ——
    { name: 'PyTorch（深度学习）', level: 30, color: 'linear-gradient(90deg, #ee4c2c 0%, #b3261a 100%)' },

    // —— AI Infra / 硬件生态（AI Infra） ——
    { name: 'PPU 推理 / 调优', level: 80, color: 'linear-gradient(90deg, #8A2BE2 0%, #5D1FA3 100%)' },
    { name: '昇腾 910B 生态', level: 50, color: 'linear-gradient(90deg, #ff7a45 0%, #d4380d 100%)' },

    // —— 云原生（Cloud Native） ——
    { name: 'K8s / K3s', level: 70, color: 'linear-gradient(90deg, #326CE5 0%, #1749B3 100%)' },

    // —— AI 技术链路（AI Tech Abilities） ——
    { name: '知识库 / RAG', level: 70, color: 'linear-gradient(90deg, #13c2c2 0%, #08979c 100%)' },
    { name: '模型部署（Serving）', level: 70, color: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' },
    { name: '智能体 / Agent', level: 60, color: 'linear-gradient(90deg, #faad14 0%, #d48806 100%)' },
    { name: 'LoRA 微调', level: 10, color: 'linear-gradient(90deg, #595959 0%, #262626 100%)' },

    // —— 模型生态使用（LLM Ecosystem Mastery） ——
    {
      name: 'LLM 熟练度（Qwen / DeepSeek / ChatGPT / Claude / Gemini）',
      level: 90,
      color: 'linear-gradient(90deg, #722ed1 0%, #eb2f96 100%)',
    },

    // —— 代码模型 / AI 编程工具（Code Models / AI Coding） ——
    { name: 'Claude-Code', level: 95, color: 'linear-gradient(90deg, #6f4ef6 0%, #3b28c7 100%)' },
    { name: 'Codex（OpenAI）', level: 95, color: 'linear-gradient(90deg, #2bb4e9 0%, #1378a0 100%)' },

    // —— 轻度体验工具（试用型） ——
    {
      name: 'Antigravity / Cursor / VSCode + Copilot',
      level: 10,
      color: 'linear-gradient(90deg, #8c8c8c 0%, #595959 100%)',
    },

    // —— 社区工具 / 生态（Community / Tools） ——
    { name: 'HuggingFace Ecosystem', level: 30, color: 'linear-gradient(90deg, #ffb940 0%, #fa8c16 100%)' },
  ],

  // 高光时刻
  achievements: [
    {
      icon: '🤖',
      title: '完成知识库 + 智能体融合应用搭建',
      description: '构建企业级 RAG + Agent 系统，实现知识提取自动化与流程智能化',
      date: '2025.11',
    },
    {
      icon: '⚡',
      title: '率先在团队内部落地 DeepSeek 推理服务',
      description: '在 AI 大爆发初期抢先完成 DeepSeek 部署与业务接入，奠定团队大模型技术栈基础',
      date: '2025.03',
    },
    {
      icon: '🌾',
      title: '主导区块链农业溯源系统上线',
      description: '从架构到开发全流程推进，构建可信透明的农产品溯源链路',
      date: '2022.10',
    },
  ],

  // 兴趣爱好
  hobbies: [
    {
      icon: '☕',
      name: '可乐改茶',
      description: '试图从续命饮料过渡到健康饮料',
    },
    {
      icon: '🎮',
      name: '游戏',
      description: '通关《塞尔达：旷野之息》，沉迷海拉鲁',
    },
    {
      icon: '🏃',
      name: '走路',
      description: '坚持步行，NFT Walker 要回本',
    },
    {
      icon: '📝',
      name: '写博客',
      description: '还没真正放弃（应该吧）',
    },
    {
      icon: '✈️',
      name: '旅游',
      description: '边走边拍边发呆',
    },
    {
      icon: '🤖',
      name: 'AI 构建人生',
      description: 'AI 辅助学习、记录、决策，把人生当成一个长期可迭代项目',
    },
  ],

  // 金句墙
  favoriteQuotes: [
    {
      text: '工具变强了，工程师就能偷更多懒。',
      author: 'benhz',
    },
    {
      text: '一流工程师写周报，二流工程师写文档，三流工程师写代码。edoc',
      author: '技术圈真理',
    },
    {
      text: 'Ctrl + C，Ctrl + V。',
      author: 'Donald Knuth（大概不会承认）',
    },
  ],

  // 随笔
  moments: [
    {
      emoji: '🎉',
      content: '终于搞定自动化部署脚本，以后可以少熬点夜了！',
      date: '2025.6.02',
    },
    {
      emoji: '🤔',
      content: '把 pipeline 从能跑变成能看懂，再从能看懂变成不想看。',
      date: '2025.12.3',
    },
  ],

  // 自定义卡片
  customCards: [
    {
      title: '最近在学',
      emoji: '📖',
      content: 'k3s部署与运维、Deepseek/Qwen大模型调优、Prompt Engineering、AI Agent设计、知识库构建、pipeline自动化运维、技术团队协作、技术文档写作、项目推进',
      color: 'linear-gradient(135deg, rgba(255, 159, 64, 0.1), rgba(255, 99, 132, 0.05))',
    },
  ],
};
