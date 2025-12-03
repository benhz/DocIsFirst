# 测试策略

## 测试金字塔

```
        /\
       /E2E\       (少量端到端测试)
      /------\
     /集成测试\    (适量集成测试)
    /----------\
   /  单元测试  \   (大量单元测试)
  /--------------\
```

## 单元测试

### 覆盖率要求
- 核心业务逻辑：80%+
- 工具类：90%+
- DAO 层：60%+

### Java 示例
```java
@Test
public void testGetUserById() {
    User user = userService.getUserById(1L);
    assertNotNull(user);
    assertEquals("Alice", user.getName());
}
```

### JavaScript 示例
```javascript
test('getUserById should return user', async () => {
  const user = await getUserById(1);
  expect(user).toBeDefined();
  expect(user.name).toBe('Alice');
});
```

## 集成测试

测试多个模块协作：
```java
@SpringBootTest
public class OrderIntegrationTest {
    @Test
    public void testCreateOrder() {
        // 测试订单创建流程
    }
}
```

## E2E 测试

使用 Cypress / Playwright：
```javascript
describe('登录流程', () => {
  it('用户可以登录', () => {
    cy.visit('/login');
    cy.get('#username').type('alice');
    cy.get('#password').type('password');
    cy.get('#submit').click();
    cy.url().should('include', '/dashboard');
  });
});
```

## 运行测试

```bash
# 运行所有测试
mvn test

# 运行单个测试
mvn test -Dtest=UserServiceTest

# 查看覆盖率
mvn jacoco:report
```

## 下一步
- 查看 [本地环境搭建](./local-setup.md)
