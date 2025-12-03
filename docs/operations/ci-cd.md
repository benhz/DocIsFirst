# CI/CD 流水线

## CI 流程

```
代码提交 → 编译 → 单元测试 → 代码检查 → 构建镜像 → 推送仓库
```

## CD 流程

```
部署到 dev → 自动化测试 → 部署到 test → 手动测试 → 部署到 stage → 审批 → 部署到 prod
```

## 工具链

- CI: GitLab CI / Jenkins
- CD: Argo CD
- 镜像仓库: Harbor
- 制品库: Nexus

## Pipeline 配置示例

```yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - mvn clean package

test:
  stage: test
  script:
    - mvn test

deploy:
  stage: deploy
  script:
    - kubectl apply -f k8s/
  only:
    - master
```
