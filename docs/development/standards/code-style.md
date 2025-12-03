# 代码规范

## 通用原则

### 可读性优先
- 代码是写给人看的，其次才是给机器执行的
- 变量名要有意义，避免 `a`, `b`, `temp` 这种
- 函数名要清晰表达意图

### 简洁性
- 一个函数只做一件事
- 避免过深的嵌套（不超过 3 层）
- 及时抽取重复代码

## Java 规范

基于阿里巴巴 Java 规范：

### 命名规范
```java
// ✓ 类名：大驼峰
public class UserService {}

// ✓ 方法名：小驼峰
public void getUserById(Long id) {}

// ✓ 常量：全大写下划线分隔
public static final int MAX_COUNT = 100;

// ✓ 变量名：小驼峰，有意义
String userName = "Alice";

// ✗ 避免
String a = "Alice";  // 无意义
```

### 代码格式
- 缩进：4 个空格
- 行宽：不超过 120 字符
- 括号：K&R 风格

```java
// ✓ 推荐
if (condition) {
    doSomething();
} else {
    doOther();
}

// ✗ 不推荐
if(condition){
doSomething();}
```

### 注释规范
```java
/**
 * 获取用户信息
 *
 * @param userId 用户ID
 * @return 用户信息
 * @throws UserNotFoundException 用户不存在时抛出
 */
public User getUserById(Long userId) {
    // 实现
}
```

## JavaScript/TypeScript 规范

### 使用 TypeScript
```typescript
// ✓ 使用 TypeScript，明确类型
function getUser(id: number): User {
    // ...
}

// ✗ 避免 any
function getUser(id: any): any {
    // ...
}
```

### 命名规范
```typescript
// 类/接口：大驼峰
class UserService {}
interface User {}

// 函数/变量：小驼峰
const getUserById = (id: number) => {}

// 常量：全大写
const MAX_RETRY = 3;

// 组件：大驼峰
function UserProfile() {}
```

### ESLint 配置
使用统一的 ESLint 配置：
```json
{
  "extends": ["airbnb", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"]
  }
}
```

## Python 规范

遵循 PEP 8：

### 命名规范
```python
# 类名：大驼峰
class UserService:
    pass

# 函数/变量：小写下划线
def get_user_by_id(user_id):
    pass

# 常量：全大写
MAX_RETRY = 3
```

### 代码格式
- 缩进：4 个空格
- 行宽：79 字符（文档字符串 72）

```python
# ✓ 推荐
def calculate_total(
    price: float,
    quantity: int,
    discount: float = 0
) -> float:
    """计算总价"""
    return price * quantity * (1 - discount)
```

### 类型提示
```python
# ✓ 使用类型提示
def get_user(user_id: int) -> User:
    pass

# 使用 mypy 检查
```

## SQL 规范

### 大小写
- 关键字：大写
- 表名/字段名：小写下划线

```sql
-- ✓ 推荐
SELECT user_id, user_name
FROM users
WHERE status = 'active'
ORDER BY created_at DESC;

-- ✗ 不推荐
select userid, username from Users where Status='active';
```

### 格式化
```sql
SELECT
    u.user_id,
    u.user_name,
    o.order_count
FROM users u
LEFT JOIN (
    SELECT user_id, COUNT(*) AS order_count
    FROM orders
    GROUP BY user_id
) o ON u.user_id = o.user_id
WHERE u.status = 'active';
```

## Git Commit 规范

见 [Git 工作流](./git-workflow.md)

## 工具配置

### IDE 配置
统一使用 EditorConfig：
```ini
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

### 代码检查
- Java: CheckStyle + SpotBugs
- JavaScript/TypeScript: ESLint + Prettier
- Python: flake8 + black

## 下一步

- 查看 [Git 工作流](./git-workflow.md) 了解分支管理
- 查看 [Code Review](./review.md) 了解评审要求
