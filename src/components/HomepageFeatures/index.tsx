import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type ModuleItem = {
  title: string;
  icon: string;
  color: string;
  description: ReactNode;
  link: string;
};

const ModuleList: ModuleItem[] = [
  {
    title: '产品中心',
    icon: '🟦',
    color: '#4285f4',
    description: (
      <>
        了解我们的产品线、功能特性、使用场景和常见问题，快速上手产品使用。
      </>
    ),
    link: '/docs/product/',
  },
  {
    title: '平台与通用能力',
    icon: '🟧',
    color: '#ea4335',
    description: (
      <>
        跨产品的统一能力：账号认证、权限管理、消息通知、计费支付和集成方案。
      </>
    ),
    link: '/docs/platform/overview',
  },
  {
    title: '开发与架构',
    icon: '🟥',
    color: '#fbbc04',
    description: (
      <>
        系统架构设计、服务划分、开发规范、代码评审和本地环境搭建指南。
      </>
    ),
    link: '/docs/development/overview',
  },
  {
    title: '运维与 SRE',
    icon: '🟩',
    color: '#34a853',
    description: (
      <>
        环境说明、部署流程、CI/CD、监控告警、故障处理和 SLA 制度。
      </>
    ),
    link: '/docs/operations/overview',
  },
  {
    title: 'API 与集成',
    icon: '🟨',
    color: '#9c27b0',
    description: (
      <>
        REST API 文档、多语言 SDK、Webhook 事件推送和第三方集成指南。
      </>
    ),
    link: '/docs/api/overview',
  },
  {
    title: '组织与流程',
    icon: '🟪',
    color: '#ff6d00',
    description: (
      <>
        研发组织架构、开发生命周期、发布流程、故障复盘和新人入职指南。
      </>
    ),
    link: '/docs/org/overview',
  },
];

function Module({title, icon, color, description, link}: ModuleItem) {
  return (
    <div className={clsx('col col--4')} style={{marginBottom: '2rem'}}>
      <Link to={link} className={styles.moduleCard}>
        <div className={styles.moduleHeader} style={{borderLeftColor: color}}>
          <span className={styles.moduleIcon}>{icon}</span>
          <Heading as="h3" className={styles.moduleTitle}>{title}</Heading>
        </div>
        <div className={styles.moduleDescription}>
          <p>{description}</p>
        </div>
        <div className={styles.moduleFooter}>
          <span className={styles.moduleLink}>查看详情 →</span>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center" style={{marginBottom: '3rem'}}>
          <Heading as="h2">探索文档体系</Heading>
          <p style={{fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-700)'}}>
            选择你感兴趣的领域，快速找到需要的内容
          </p>
        </div>
        <div className="row">
          {ModuleList.map((props, idx) => (
            <Module key={idx} {...props} />
          ))}
        </div>

        <div className="text--center" style={{marginTop: '3rem'}}>
          <div style={{
            background: 'var(--ifm-color-emphasis-100)',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <Heading as="h3">🎯 快速导航</Heading>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginTop: '1.5rem',
              textAlign: 'left'
            }}>
              <div>
                <strong>新人入职？</strong><br />
                <Link to="/docs/org/onboarding">→ 入职指南</Link>
              </div>
              <div>
                <strong>要调用 API？</strong><br />
                <Link to="/docs/api/overview">→ API 文档</Link>
              </div>
              <div>
                <strong>遇到故障？</strong><br />
                <Link to="/docs/operations/runbook">→ 故障手册</Link>
              </div>
              <div>
                <strong>要发布上线？</strong><br />
                <Link to="/docs/org/release-process">→ 发布流程</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
