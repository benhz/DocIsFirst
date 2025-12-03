# 本地环境搭建

## 环境要求

### 必需软件
- **Git**: 版本控制
- **Docker**: 容器化
- **IDE**: IntelliJ IDEA / VS Code

### 语言环境
- **Java**: JDK 17+
- **Node.js**: v18+
- **Python**: 3.10+

## 快速开始

### 1. 克隆代码
```bash
git clone https://github.com/your-org/your-project.git
cd your-project
```

### 2. 启动依赖服务
使用 Docker Compose 启动数据库、Redis 等：
```bash
docker-compose up -d
```

### 3. 配置环境变量
复制配置文件：
```bash
cp .env.example .env
# 编辑 .env 填写配置
```

### 4. 安装依赖
```bash
# Java
mvn install

# Node.js
npm install

# Python
pip install -r requirements.txt
```

### 5. 初始化数据库
```bash
# 运行数据库迁移
mvn flyway:migrate
```

### 6. 启动服务
```bash
# 后端
mvn spring-boot:run

# 前端
npm run dev
```

### 7. 访问应用
- 前端：http://localhost:3000
- 后端 API：http://localhost:8080
- API 文档：http://localhost:8080/swagger-ui.html

## 常见问题

### 端口被占用
```bash
# 查看端口占用
lsof -i :8080

# 杀死进程
kill -9 <PID>
```

### 数据库连接失败
检查：
1. Docker 容器是否启动：`docker ps`
2. 配置文件中数据库地址是否正确
3. 数据库用户名密码是否正确

## 下一步
- 查看 [测试策略](./testing.md)
- 查看 [代码规范](../standards/code-style.md)
