# Java SDK

## 安装

Maven:
```xml
<dependency>
  <groupId>com.example</groupId>
  <artifactId>example-sdk</artifactId>
  <version>1.0.0</version>
</dependency>
```

## 快速开始

```java
import com.example.sdk.Client;

Client client = new Client("YOUR_API_KEY", "YOUR_API_SECRET");

// 获取用户
User user = client.users().get(123L);

// 创建订单
Order order = client.orders().create(
    new CreateOrderRequest()
        .userId(123L)
        .addItem(456L, 2)
);
```
