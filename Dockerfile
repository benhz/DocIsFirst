# 第一步：用 Node 构建 Docusaurus
FROM tool-1:5000/library/node:24.11.1 AS builder

WORKDIR /app

# 先拷 package.json/yarn.lock 加快缓存
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 再把剩下代码拷进去
COPY . .

# 构建静态文件
RUN yarn build

# 第二步：用 nginx 提供静态资源服务
FROM tool-1:5000/library/nginx:alpine

# 把 build 出来的静态站点拷到 nginx 目录
COPY --from=builder /app/build /usr/share/nginx/html

# 默认暴露 80 端口
EXPOSE 80
