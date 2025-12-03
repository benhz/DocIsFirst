import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  mainSidebar: [
    'intro',

    // 产品中心
    {
      type: 'category',
      label: '🟦 产品中心',
      items: [
        'product/index',
        {
          type: 'category',
          label: '产品 A',
          items: [
            'product/product-a/overview',
            'product/product-a/features',
            'product/product-a/scenarios',
            'product/product-a/architecture',
            'product/product-a/user-guide',
            'product/product-a/faq',
          ],
        },
        {
          type: 'category',
          label: '产品 B',
          items: [
            'product/product-b/overview',
            'product/product-b/features',
            'product/product-b/scenarios',
            'product/product-b/architecture',
            'product/product-b/user-guide',
            'product/product-b/faq',
          ],
        },
      ],
    },

    // 平台与通用能力
    {
      type: 'category',
      label: '🟧 平台与通用能力',
      items: [
        'platform/overview',
        'platform/account-auth',
        'platform/permission',
        'platform/notification',
        'platform/billing',
        'platform/integration-overview',
      ],
    },

    // 开发与架构
    {
      type: 'category',
      label: '🟥 开发与架构',
      items: [
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
    },

    // 运维与 SRE
    {
      type: 'category',
      label: '🟩 运维与 SRE',
      items: [
        'operations/overview',
        'operations/environments',
        'operations/deployment',
        'operations/ci-cd',
        'operations/monitoring',
        'operations/incident-response',
        'operations/runbook',
        'operations/sla',
      ],
    },

    // API 与集成
    {
      type: 'category',
      label: '🟨 API 与集成',
      items: [
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
    },

    // 组织与流程
    {
      type: 'category',
      label: '🟪 组织与流程',
      items: [
        'org/overview',
        'org/roles',
        'org/dev-lifecycle',
        'org/release-process',
        'org/incident-process',
        'org/meetings',
        'org/onboarding',
        'org/metrics',
      ],
    },

    // 项目手册
    {
      type: 'category',
      label: '🟫 项目手册',
      items: [
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
    },
  ],
};

export default sidebars;
