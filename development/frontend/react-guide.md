---
sidebar_position: 1
---

# React 开发指南

现代化的 React 应用开发完整指南。

## 环境准备

### 使用 Vite 创建项目

```bash
# 创建新项目
npm create vite@latest my-react-app -- --template react-ts

cd my-react-app
npm install

# 启动开发服务器
npm run dev
```

### 推荐的项目结构

```
src/
├── assets/              # 静态资源
│   ├── images/
│   └── styles/
├── components/          # 可复用组件
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.module.css
│   └── Input/
├── features/            # 功能模块
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   └── posts/
├── hooks/               # 自定义 Hooks
├── layouts/             # 布局组件
├── pages/               # 页面组件
├── services/            # API 服务
├── store/               # 状态管理
├── types/               # TypeScript 类型
├── utils/               # 工具函数
├── App.tsx
└── main.tsx
```

## 组件开发

### 函数组件基础

```typescript title="src/components/Button/Button.tsx"
import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  children,
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <span className={styles.spinner}>加载中...</span>
      ) : (
        children
      )}
    </button>
  );
};
```

### 使用 Hooks

#### useState - 状态管理

```typescript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
    </div>
  );
}
```

#### useEffect - 副作用处理

```typescript
import { useState, useEffect } from 'react';

function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();

        if (!cancelled) {
          setUser(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    // 清理函数
    return () => {
      cancelled = true;
    };
  }, [userId]); // 依赖项数组

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

#### 自定义 Hooks

```typescript title="src/hooks/useApi.ts"
import { useState, useEffect } from 'react';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchCount, setRefetchCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        if (!cancelled) {
          setData(result.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url, refetchCount]);

  const refetch = () => setRefetchCount(prev => prev + 1);

  return { data, loading, error, refetch };
}

// 使用示例
function UserList() {
  const { data: users, loading, error, refetch } = useApi<User[]>('/api/users');

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  return (
    <div>
      <button onClick={refetch}>刷新</button>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 状态管理

### 使用 Context API

```typescript title="src/contexts/AuthContext.tsx"
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查本地存储的认证信息
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setUser(data.user);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      setUser(data.data.user);
      localStorage.setItem('token', data.data.token);
    } else {
      throw new Error(data.error.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### 使用 Zustand（推荐）

```typescript title="src/store/useUserStore.ts"
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        setUser: (user, token) => set({ user, token }),
        logout: () => set({ user: null, token: null }),
      }),
      {
        name: 'user-storage',
      }
    )
  )
);

// 使用示例
function Profile() {
  const { user, logout } = useUserStore();

  return (
    <div>
      <h1>{user?.name}</h1>
      <button onClick={logout}>退出登录</button>
    </div>
  );
}
```

## 路由管理

### React Router

```typescript title="src/App.tsx"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// 页面组件
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// 受保护路由组件
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>加载中...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* 受保护的路由 */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* 404 页面 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## 表单处理

### 使用 React Hook Form

```typescript title="src/components/LoginForm.tsx"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('请输入有效的邮箱'),
  password: z.string().min(8, '密码至少8个字符'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // 登录成功
        window.location.href = '/dashboard';
      } else {
        alert(result.error.message);
      }
    } catch (error) {
      alert('登录失败');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">邮箱</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <span role="alert">{errors.email.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="password">密码</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
          <span role="alert">{errors.password.message}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '登录中...' : '登录'}
      </button>
    </form>
  );
};
```

## 性能优化

### 1. 使用 React.memo

```typescript
import React from 'react';

interface UserCardProps {
  user: User;
  onDelete: (id: string) => void;
}

export const UserCard = React.memo<UserCardProps>(({ user, onDelete }) => {
  console.log('渲染 UserCard:', user.id);

  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onDelete(user.id)}>删除</button>
    </div>
  );
});
```

### 2. 使用 useMemo 和 useCallback

```typescript
import { useMemo, useCallback } from 'react';

function UserList({ users }: { users: User[] }) {
  // 缓存计算结果
  const activeUsers = useMemo(
    () => users.filter(user => user.status === 'active'),
    [users]
  );

  // 缓存回调函数
  const handleDelete = useCallback(
    (userId: string) => {
      console.log('删除用户:', userId);
      // 删除逻辑...
    },
    [] // 依赖项为空，函数不会改变
  );

  return (
    <div>
      <h2>活跃用户 ({activeUsers.length})</h2>
      {activeUsers.map(user => (
        <UserCard key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
}
```

### 3. 代码分割

```typescript
import { lazy, Suspense } from 'react';

// 懒加载组件
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
```

## 测试

### 使用 Vitest 和 React Testing Library

```typescript title="src/components/Button/Button.test.tsx"
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('应该渲染按钮文本', () => {
    render(<Button>点击我</Button>);
    expect(screen.getByText('点击我')).toBeInTheDocument();
  });

  it('应该调用 onClick 处理函数', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>点击我</Button>);

    fireEvent.click(screen.getByText('点击我'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('禁用时不应该触发点击', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        点击我
      </Button>
    );

    fireEvent.click(screen.getByText('点击我'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('加载时应该显示加载文本', () => {
    render(<Button loading>点击我</Button>);
    expect(screen.getByText('加载中...')).toBeInTheDocument();
  });
});
```

## 最佳实践

:::tip React 开发建议
1. **组件设计**：保持组件小而专注，遵循单一职责原则
2. **TypeScript**：使用 TypeScript 增强类型安全
3. **Hooks 规则**：遵循 Hooks 使用规则，不在循环或条件中调用
4. **性能优化**：使用 memo、useMemo、useCallback 避免不必要的渲染
5. **错误边界**：使用 Error Boundary 捕获组件错误
6. **可访问性**：添加适当的 ARIA 属性，支持键盘导航
7. **测试**：编写单元测试和集成测试
8. **代码分割**：使用动态导入优化首屏加载
:::

## 相关资源

- [React 官方文档](https://react.dev/)
- [React TypeScript 备忘单](https://react-typescript-cheatsheet.netlify.app/)
- [React Testing Library](https://testing-library.com/react)

---

继续学习 [样式开发](./styling) 指南。
