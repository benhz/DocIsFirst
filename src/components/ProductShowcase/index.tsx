import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type ProductItem = {
  title: string;
  icon: string;
  description: ReactNode;
  features: string[];
  link: string;
  badge?: string;
};

const ProductList: ProductItem[] = [
  {
    title: '代码托管平台',
    icon: '☁️',
    description: (
      <>
        基于 Kubernetes 的企业级云原生应用平台，提供容器编排、微服务治理和自动化运维能力。
      </>
    ),
    features: ['容器编排', '服务网格', '自动扩缩容', 'CI/CD'],
    link: '/docs/product/product-a/overview',
    badge: '热门',
  },
  {
    title: '智慧问数平台',
    icon: '📊',
    description: (
      <>
        强大的大数据处理和分析平台，支持实时数据处理、数据仓库和可视化分析。
      </>
    ),
    features: ['实时计算', '数据仓库', 'BI看板', '机器学习' ],
    link: '/docs/product/',
  },
  {
    title: '智联知识库智能体开发平台',
    icon: '🚪',
    description: (
      <>
        高性能、可扩展的 API 网关，提供流量控制、安全认证和服务路由等核心功能。
      </>
    ),
    features: ['流量控制', '安全认证', '服务路由', '监控告警'],
    link: '/docs/product/',
    badge: '新品',
  },
  {
    title: '文档管理平台',
    icon: '📈',
    description: (
      <>
        全方位的系统监控和智能告警平台，帮助团队快速发现和定位问题。
      </>
    ),
    features: ['指标监控', '日志分析', '链路追踪', '智能告警'],
    link: '/docs/product/',
  },
];

function Product({title, icon, description, features, link, badge}: ProductItem) {
  return (
    <div className={clsx('col col--6')} style={{marginBottom: '2rem'}}>
      <div className={styles.productCard}>
        <div className={styles.productHeader}>
          <span className={styles.productIcon}>{icon}</span>
          <div className={styles.productTitleWrapper}>
            <Heading as="h3" className={styles.productTitle}>{title}</Heading>
            {badge && <span className={styles.productBadge}>{badge}</span>}
          </div>
        </div>
        <div className={styles.productDescription}>
          <p>{description}</p>
        </div>
        <div className={styles.productFeatures}>
          {features.map((feature, idx) => (
            <span key={idx} className={styles.featureTag}>
              {feature}
            </span>
          ))}
        </div>
        <div className={styles.productFooter}>
          <Link to={link} className={styles.productLink}>
            了解更多 →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProductShowcase(): ReactNode {
  return (
    <section className={styles.showcase}>
      <div className="container">
        <div className="text--center" style={{marginBottom: '3rem'}}>
          <Heading as="h2">核心产品</Heading>
          <p style={{fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-700)'}}>
            强大的技术产品，助力业务快速发展
          </p>
        </div>
        <div className="row">
          {ProductList.map((props, idx) => (
            <Product key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
