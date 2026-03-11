# 📊 Todo List 看板 - 项目报告

**生成时间：** 2026-03-11  
**团队：** qwen3, glm4.7, minmax-m2  
**仓库：** https://github.com/bennyyu79/todo_list

---

## 🎯 项目概述

一个现代化的 Todo List 看板应用，采用前后端分离架构，支持拖拽操作、实时同步和容器化部署。

### 核心特性
- ✅ **三栏看板**：To Do / In Progress / Done
- ✅ **拖拽操作**：通过拖拽卡片改变任务状态
- ✅ **完整 CRUD**：创建、读取、更新、删除任务
- ✅ **优先级标记**：低/中/高优先级视觉区分
- ✅ **响应式设计**：支持桌面和移动端
- ✅ **Docker 部署**：一键启动全部服务
- ✅ **CI/CD 流水线**：自动化测试和构建

---

## 🏗️ 技术架构

### 后端 (Backend)
```
Node.js 18 + Express + SQLite
├── controllers/    # 业务逻辑层
├── models/         # 数据模型层
├── routes/         # 路由定义层
├── middleware/     # 中间件层
└── utils/          # 工具函数层
```

**关键技术：**
- Express.js - Web 框架
- better-sqlite3 - SQLite 数据库
- CORS - 跨域支持
- Jest - 测试框架

### 前端 (Frontend)
```
React 18 + Vite + dnd-kit
├── components/     # 可复用组件
├── pages/          # 页面组件
└── styles/         # 样式文件
```

**关键技术：**
- React - UI 库
- Vite - 构建工具
- @dnd-kit - 拖拽库
- Axios - HTTP 客户端

---

## 📁 项目结构

```
todo_list/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── todoController.js    # Todo 业务逻辑
│   │   ├── models/
│   │   │   └── todo.js              # Todo 数据模型
│   │   ├── routes/
│   │   │   └── todoRoutes.js        # Todo API 路由
│   │   ├── middleware/
│   │   │   └── errorHandler.js      # 错误处理中间件
│   │   └── server.js                # 服务器入口
│   ├── tests/
│   │   └── server.test.js           # API 测试
│   ├── Dockerfile                   # Docker 配置
│   ├── package.json                 # 依赖管理
│   └── .env.example                 # 环境变量示例
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                  # 主应用组件
│   │   ├── main.jsx                 # 入口文件
│   │   └── index.css                # 全局样式
│   ├── public/                      # 静态资源
│   ├── index.html                   # HTML 模板
│   ├── vite.config.js               # Vite 配置
│   ├── Dockerfile                   # Docker 配置
│   └── package.json                 # 依赖管理
│
├── .github/
│   └── workflows/
│       └── ci.yml                   # CI/CD 流水线
│
├── docker-compose.yml               # Docker Compose 配置
├── .gitignore                       # Git 忽略规则
└── README.md                        # 项目文档
```

---

## 🔌 API 文档

### 基础信息
- **Base URL:** `http://localhost:3001/api`
- **Content-Type:** `application/json`

### 端点列表

| 方法 | 路径 | 描述 | 参数 |
|------|------|------|------|
| GET | `/todos` | 获取所有任务 | - |
| GET | `/todos/:id` | 获取单个任务 | id: 任务 ID |
| GET | `/todos/status/:status` | 按状态筛选 | status: todo\|inprogress\|done |
| POST | `/todos` | 创建任务 | title, description, status, priority |
| PUT | `/todos/:id` | 更新任务 | title, description, status, priority |
| DELETE | `/todos/:id` | 删除任务 | - |
| GET | `/health` | 健康检查 | - |

### 请求示例

**创建任务：**
```bash
curl -X POST http://localhost:3001/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "完成项目报告",
    "description": "编写详细的项目文档",
    "priority": "high"
  }'
```

**更新任务状态：**
```bash
curl -X PUT http://localhost:3001/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "inprogress"
  }'
```

### Todo 数据模型

```json
{
  "id": 1,
  "title": "任务标题",
  "description": "任务描述（可选）",
  "status": "todo",          // todo | inprogress | done
  "priority": "medium",      // low | medium | high
  "created_at": "2026-03-11T12:00:00Z",
  "updated_at": "2026-03-11T12:00:00Z"
}
```

---

## 🚀 部署指南

### 方法一：Docker Compose (推荐)

```bash
# 克隆仓库
git clone https://github.com/bennyyu79/todo_list.git
cd todo_list

# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

**访问地址：**
- 前端：http://localhost:3000
- 后端 API：http://localhost:3001
- 健康检查：http://localhost:3001/health

### 方法二：本地开发

**后端：**
```bash
cd backend
npm install
npm run dev
# 运行在 http://localhost:3001
```

**前端：**
```bash
cd frontend
npm install
npm run dev
# 运行在 http://localhost:3000
```

### 方法三：生产部署

```bash
# 构建前端
cd frontend
npm install
npm run build

# 启动后端（会服务前端静态文件）
cd ../backend
npm install
npm start
```

---

## 🧪 测试

### 运行测试

```bash
# 后端测试
cd backend
npm test

# 查看测试覆盖率
npm test -- --coverage
```

### 测试覆盖

- ✅ GET /api/todos - 获取所有任务
- ✅ GET /api/todos/:id - 获取单个任务
- ✅ POST /api/todos - 创建任务
- ✅ PUT /api/todos/:id - 更新任务
- ✅ DELETE /api/todos/:id - 删除任务
- ✅ GET /health - 健康检查

---

## 👥 团队分工

| 成员 | 角色 | 负责模块 |
|------|------|----------|
| **qwen3** | 架构师 | 整体架构、后端 API、数据库设计 |
| **glm4.7** | 开发者 | 测试套件、CI/CD、数据库迁移 |
| **minmax-m2** | 前端工程师 | UI 组件、拖拽功能、样式优化 |

### 贡献统计

**qwen3:**
- 后端模块化重构
- 拖拽功能实现
- Docker 配置
- 项目初始化

**glm4.7:**
- Jest 测试套件
- GitHub Actions CI/CD
- API 文档完善

**minmax-m2:**
- React 组件优化
- CSS 动画效果
- 响应式设计

---

## 📈 后续规划

### 短期目标 (v1.1)
- [ ] 用户认证系统 (JWT)
- [ ] 任务评论功能
- [ ] 文件附件支持
- [ ] 更多测试用例

### 中期目标 (v1.2)
- [ ] 多看板支持
- [ ] 任务标签/分类
- [ ] 搜索和过滤
- [ ] 导出/导入功能

### 长期目标 (v2.0)
- [ ] 实时协作 (WebSocket)
- [ ] 移动端 App
- [ ] 第三方集成 (GitHub, Slack)
- [ ] 数据分析面板

---

## 🐛 已知问题

1. **拖拽动画**：在某些浏览器上拖拽动画不够流畅
2. **数据库**：SQLite 不适合高并发生产环境，建议迁移到 PostgreSQL
3. **认证**：当前无用户认证，生产环境需添加

---

## 📝 许可证

MIT License

---

## 🙏 致谢

- Express.js 团队
- React 社区
- dnd-kit 开源项目
- GitHub Actions

---

**最后更新：** 2026-03-11 22:30  
**版本：** v1.0.0
