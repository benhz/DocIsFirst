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
    icon: '💻',
    description: (
      <>
        企业级代码托管与协作平台，提供安全可靠的代码版本管理、团队协作和DevOps工具链集成能力。
      </>
    ),
    features: ['Git仓库管理', '代码评审', '分支保护', 'CI/CD集成'],
    link: '/docs/product/code-hosting/overview',
    badge: '热门',
  },
  {
    title: '智慧问数平台',
    icon: '📊',
    description: (
      <>
        智能数据分析与BI平台，通过AI技术让数据分析更简单，支持自然语言查询和智能可视化分析。
      </>
    ),
    features: ['智能问答', '数据可视化', '实时分析', '智能报表'],
    link: '/docs/product/smart-data/overview',
  },
  {
    title: '智联知识库智能体开发平台',
    icon: '🤖',
    description: (
      <>
        一站式知识库管理与AI智能体开发平台，帮助企业构建智能知识体系，快速开发定制化AI助手。
      </>
    ),
    features: ['知识库构建', '智能体开发', '向量检索', 'RAG应用'],
    link: '/docs/product/knowledge-agent/overview',
    badge: '新品',
  },
  {
    title: '文档管理平台',
    icon: '📚',
    description: (
      <>
        企业级文档管理与协作平台，支持多格式文档存储、版本控制和团队协作编辑，让知识沉淀更高效。
      </>
    ),
    features: ['文档协作', '版本管理', '权限控制', '全文检索'],
    link: '/docs/product/doc-management/overview',
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
