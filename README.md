# 📋 Todo List Kanban Board

A modern todo list application with a kanban-style board interface.

## 🚀 Features

- **Kanban Board**: Three columns (To Do, In Progress, Done)
- **Task Management**: Create, update, delete tasks
- **Priority Levels**: Low, Medium, High priority badges
- **Status Transitions**: Easy drag-and-drop style status changes
- **Responsive Design**: Works on desktop and mobile
- **Real-time Updates**: Instant UI updates

## 🛠️ Tech Stack

- **Backend**: Node.js + Express + SQLite
- **Frontend**: React + Vite
- **Styling**: Custom CSS with gradient design
- **API**: RESTful endpoints

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone https://github.com/bennyyu79/todo_list.git
cd todo_list

# Backend
cd backend
npm install
npm run dev
# Server runs on http://localhost:3001

# Frontend (new terminal)
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```

### Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Access the app at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/todos | Get all todos |
| GET | /api/todos/:id | Get single todo |
| POST | /api/todos | Create new todo |
| PUT | /api/todos/:id | Update todo |
| DELETE | /api/todos/:id | Delete todo |
| GET | /health | Health check |

## 📝 Todo Object

```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "status": "todo",  // "todo" | "inprogress" | "done"
  "priority": "medium",  // "low" | "medium" | "high"
  "created_at": "2024-03-11T12:00:00Z",
  "updated_at": "2024-03-11T12:00:00Z"
}
```

## 👥 Team

- **Backend API**: qwen3
- **Frontend UI**: minmax-m2  
- **Database & Tests**: glm4.7

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test
```

## 📄 License

MIT
