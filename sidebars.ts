import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // 文档首页的侧边栏
  introSidebar: [
    'intro',
    'contributing',
  ],

  // 产品中心的侧边栏（只显示产品相关内容）
  productSidebar: [
    'product/index',
    {
      type: 'category',
      label: '代码托管平台',
      items: [
        'product/code-hosting/overview',
        'product/code-hosting/features',
        'product/code-hosting/user-guide',
        'product/code-hosting/faq',
      ],
    },
    {
      type: 'category',
      label: '智慧问数平台',
      items: [
        'product/smart-data/overview',
        'product/smart-data/features',
        'product/smart-data/user-guide',
        'product/smart-data/faq',
      ],
    },
    {
      type: 'category',
      label: '智联知识库智能体开发平台',
      items: [
        'product/knowledge-agent/overview',
        'product/knowledge-agent/features',
        'product/knowledge-agent/user-guide',
        'product/knowledge-agent/faq',
      ],
    },
    {
      type: 'category',
      label: '文档管理平台',
      items: [
        'product/doc-management/overview',
        'product/doc-management/features',
        'product/doc-management/user-guide',
        'product/doc-management/faq',
      ],
    },
  ],

  // 平台与通用能力的侧边栏（只显示平台相关内容）
  platformSidebar: [
    'platform/overview',
    'platform/account-auth',
    'platform/permission',
    'platform/notification',
    'platform/billing',
    'platform/integration-overview',
  ],

  // 开发与架构的侧边栏（只显示开发相关内容）
  developmentSidebar: [
    'development/overview',
    {
      type: 'category',
      label: '整体架构',
      items: [
        'development/architecture/system-architecture',
        'development/architecture/services',
        'development/architecture/data-flow',
      ],
    },
    {
      type: 'category',
      label: '开发规范',
      items: [
        'development/standards/code-style',
        'development/standards/git-workflow',
        'development/standards/review',
      ],
    },
    {
      type: 'category',
      label: '开发指南',
      items: [
        'development/guides/local-setup',
        'development/guides/testing',
      ],
    },
  ],

  // 运维与 SRE 的侧边栏（只显示运维相关内容）
  operationsSidebar: [
    'operations/overview',
    'operations/environments',
    'operations/deployment',
    'operations/ci-cd',
    'operations/monitoring',
    'operations/incident-response',
    'operations/runbook',
    'operations/sla',
  ],

  // API 与集成的侧边栏（只显示 API 相关内容）
  apiSidebar: [
    'api/overview',
    'api/auth',
    'api/error-codes',
    {
      type: 'category',
      label: 'REST API',
      items: [
        'api/rest/index',
        'api/rest/users',
        'api/rest/products',
        'api/rest/orders',
      ],
    },
    {
      type: 'category',
      label: 'SDK',
      items: [
        'api/sdk/js',
        'api/sdk/python',
        'api/sdk/java',
      ],
    },
    {
      type: 'category',
      label: 'Webhook',
      items: [
        'api/webhook/overview',
        'api/webhook/events',
        'api/webhook/examples',
      ],
    },
  ],

  // 组织与流程的侧边栏（只显示组织相关内容）
  orgSidebar: [
    'org/overview',
    'org/roles',
    'org/dev-lifecycle',
    'org/release-process',
    'org/incident-process',
    'org/meetings',
    'org/onboarding',
    'org/metrics',
  ],

  // 项目手册的侧边栏（只显示项目相关内容）
  projectsSidebar: [
    'projects/index',
    {
      type: 'category',
      label: 'Project X',
      items: [
        'projects/project-x/overview',
        'projects/project-x/architecture',
        'projects/project-x/dependencies',
        'projects/project-x/deployment',
        'projects/project-x/runbook',
      ],
    },
    {
      type: 'category',
      label: 'Project Y',
      items: [
        'projects/project-y/overview',
      ],
    },
  ],
};

export default sidebars;
