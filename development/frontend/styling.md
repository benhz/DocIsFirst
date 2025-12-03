---
sidebar_position: 2
---

# 样式开发指南

现代化的 React 应用样式解决方案和最佳实践。

## CSS 方案选择

### 1. CSS Modules（推荐）

适合中小型项目，原生支持，零配置。

```typescript title="components/Card/Card.tsx"
import styles from './Card.module.css';

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};
```

```css title="components/Card/Card.module.css"
.card {
  padding: 1rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### 2. Tailwind CSS

适合快速开发，实用优先的方案。

```typescript title="components/Button/Button.tsx"
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
};
```

### 3. Styled Components

适合需要动态样式和主题的项目。

```typescript title="components/Button/Button.tsx"
import styled from 'styled-components';

interface ButtonProps {
  $variant?: 'primary' | 'secondary';
  $size?: 'small' | 'medium' | 'large';
}

const StyledButton = styled.button<ButtonProps>`
  padding: ${props => {
    switch (props.$size) {
      case 'small': return '0.5rem 1rem';
      case 'large': return '1rem 2rem';
      default: return '0.75rem 1.5rem';
    }
  }};

  background-color: ${props =>
    props.$variant === 'secondary' ? '#6b7280' : '#3b82f6'
  };

  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props =>
      props.$variant === 'secondary' ? '#4b5563' : '#2563eb'
    };
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps & { children: React.ReactNode }> = ({
  children,
  ...props
}) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
```

## Tailwind CSS 配置

### 安装和配置

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```javascript title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          500: '#6b7280',
          600: '#4b5563',
        }
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
```

```css title="src/index.css"
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply antialiased;
  }

  body {
    @apply text-gray-900 bg-gray-50;
  }
}

@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-colors;
  }

  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-600 text-white;
  }

  .card {
    @apply p-6 bg-white rounded-lg shadow-soft;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

## 响应式设计

### Tailwind 响应式

```typescript
export const ResponsiveCard: React.FC = () => {
  return (
    <div className="
      w-full           /* 移动端全宽 */
      sm:w-1/2         /* 小屏幕 50% */
      md:w-1/3         /* 中等屏幕 33.33% */
      lg:w-1/4         /* 大屏幕 25% */
      p-4              /* 基础内边距 */
      md:p-6           /* 中等屏幕更大内边距 */
    ">
      <div className="
        flex flex-col    /* 移动端垂直布局 */
        md:flex-row      /* 桌面端水平布局 */
        gap-4
      ">
        <img
          src="/avatar.jpg"
          className="
            w-full         /* 移动端全宽 */
            md:w-24        /* 桌面端固定宽度 */
            h-48           /* 移动端较高 */
            md:h-24        /* 桌面端正方形 */
            object-cover
            rounded-lg
          "
        />
        <div>
          <h3 className="text-lg md:text-xl font-bold">标题</h3>
          <p className="text-sm md:text-base text-gray-600">描述文本</p>
        </div>
      </div>
    </div>
  );
};
```

### CSS Modules 响应式

```css title="Card.module.css"
.card {
  width: 100%;
  padding: 1rem;
}

/* 小屏幕 (≥640px) */
@media (min-width: 640px) {
  .card {
    width: 50%;
  }
}

/* 中等屏幕 (≥768px) */
@media (min-width: 768px) {
  .card {
    width: 33.333333%;
    padding: 1.5rem;
  }
}

/* 大屏幕 (≥1024px) */
@media (min-width: 1024px) {
  .card {
    width: 25%;
  }
}
```

## 主题系统

### CSS 变量主题

```css title="src/styles/theme.css"
:root {
  /* 颜色 */
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-secondary: #6b7280;
  --color-background: #ffffff;
  --color-surface: #f9fafb;
  --color-text: #111827;
  --color-text-secondary: #6b7280;

  /* 间距 */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* 圆角 */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;

  /* 阴影 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --color-background: #111827;
  --color-surface: #1f2937;
  --color-text: #f9fafb;
  --color-text-secondary: #9ca3af;
}
```

```typescript title="src/hooks/useTheme.ts"
import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};

// 使用
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

### Styled Components 主题

```typescript title="src/theme/theme.ts"
export const lightTheme = {
  colors: {
    primary: '#3b82f6',
    primaryDark: '#2563eb',
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    textSecondary: '#6b7280',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#111827',
    surface: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#9ca3af',
  },
};

export type Theme = typeof lightTheme;
```

```typescript title="src/App.tsx"
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme/theme';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <button onClick={() => setIsDark(!isDark)}>
        切换主题
      </button>
      {/* 其他组件 */}
    </ThemeProvider>
  );
}
```

## 动画和过渡

### CSS 过渡

```css title="Button.module.css"
.button {
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;

  /* 过渡效果 */
  transition: all 0.2s ease-in-out;
}

.button:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.button:active {
  transform: translateY(0);
}
```

### Framer Motion 动画

```bash
npm install framer-motion
```

```typescript title="components/Modal/Modal.tsx"
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* 模态框 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
```

### 列表动画

```typescript
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const UserList: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {users.map(user => (
        <motion.li
          key={user.id}
          variants={item}
          className="p-4 bg-white rounded-lg"
        >
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
};
```

## 布局技巧

### Flexbox 布局

```typescript
// 居中布局
<div className="flex items-center justify-center min-h-screen">
  <div>内容居中</div>
</div>

// 两端对齐
<div className="flex items-center justify-between">
  <div>左侧</div>
  <div>右侧</div>
</div>

// 垂直居中的卡片
<div className="flex flex-col items-center gap-4">
  <Card />
  <Card />
  <Card />
</div>
```

### Grid 布局

```typescript
// 响应式网格
<div className="
  grid
  grid-cols-1         /* 移动端 1列 */
  sm:grid-cols-2      /* 小屏幕 2列 */
  lg:grid-cols-3      /* 大屏幕 3列 */
  xl:grid-cols-4      /* 超大屏幕 4列 */
  gap-6
">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</div>

// 复杂网格布局
<div className="grid grid-cols-12 gap-4">
  {/* 侧边栏：4列 */}
  <aside className="col-span-12 md:col-span-3">
    <Sidebar />
  </aside>

  {/* 主内容：8列 */}
  <main className="col-span-12 md:col-span-9">
    <Content />
  </main>
</div>
```

## 性能优化

### 1. 懒加载图片

```typescript
import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder = 'data:image/svg+xml,...',
  className,
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity`}
      onLoad={() => setIsLoaded(true)}
    />
  );
};
```

### 2. CSS 优化

```css
/* 使用 will-change 提示浏览器优化 */
.animated-element {
  will-change: transform;
}

/* 使用 transform 而非 top/left */
.move {
  transform: translateX(100px); /* ✅ 好 */
  /* left: 100px; ❌ 差 */
}

/* 避免昂贵的属性 */
.optimized {
  /* ✅ 使用 opacity */
  opacity: 0.5;

  /* ❌ 避免 box-shadow 动画 */
  /* transition: box-shadow 0.3s; */

  /* ✅ 改用 transform */
  transition: transform 0.3s;
}
```

## 可访问性

### 颜色对比度

```css
/* 确保足够的对比度（WCAG AA: 4.5:1） */
.text-primary {
  color: #2563eb; /* 在白色背景上 */
}

.text-on-dark {
  color: #e5e7eb; /* 在深色背景上 */
}
```

### Focus 样式

```css
/* 自定义 focus 样式 */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Tailwind */
<button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
  按钮
</button>
```

## 最佳实践

:::tip 样式开发建议
1. **一致性**：使用设计系统或样式指南保持一致性
2. **响应式**：移动优先，渐进增强
3. **性能**：避免过度嵌套，使用 CSS 变量
4. **可维护性**：使用有意义的类名，保持样式模块化
5. **可访问性**：确保足够的对比度，支持键盘导航
6. **动画**：适度使用，尊重用户的减少动画偏好设置
7. **工具类**：合理使用工具类，避免重复代码
:::

## 调试工具

### 边框调试

```css
/* 快速查看布局 */
* {
  outline: 1px solid red;
}

/* Tailwind */
<div className="debug-screens">
  {/* 显示当前断点 */}
</div>
```

### Chrome DevTools

- 使用 Elements 面板检查样式
- 使用 Computed 查看最终样式
- 使用 Coverage 查找未使用的 CSS

## 相关资源

- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Styled Components 文档](https://styled-components.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [CSS-Tricks](https://css-tricks.com/)

---

恭喜！你已经完成了开发文档的学习。
