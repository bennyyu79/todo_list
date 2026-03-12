const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../todo.json');

// Initialize database file if it doesn't exist
function initDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
  }
}

// Load all todos
function getAll() {
  initDB();
  const data = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(data);
}

// Get todo by ID
function getById(id) {
  const todos = getAll();
  return todos.find(t => t.id === id);
}

// Create a new todo
function create(data) {
  initDB();
  const todos = getAll();
  const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  const newTodo = {
    id: newId,
    title: data.title,
    description: data.description || '',
    status: data.status || 'todo',
    priority: data.priority || 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  todos.push(newTodo);
  fs.writeFileSync(DB_PATH, JSON.stringify(todos, null, 2));
  return getById(newId);
}

// Update a todo
function update(id, data) {
  initDB();
  const todos = getAll();
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return null;
  
  todos[index] = {
    ...todos[index],
    title: data.title !== undefined ? data.title : todos[index].title,
    description: data.description !== undefined ? data.description : todos[index].description,
    status: data.status !== undefined ? data.status : todos[index].status,
    priority: data.priority !== undefined ? data.priority : todos[index].priority,
    updated_at: new Date().toISOString()
  };
  
  fs.writeFileSync(DB_PATH, JSON.stringify(todos, null, 2));
  return getById(id);
}

// Delete a todo
function remove(id) {
  initDB();
  const todos = getAll();
  const filtered = todos.filter(t => t.id !== id);
  fs.writeFileSync(DB_PATH, JSON.stringify(filtered, null, 2));
  return filtered.length < todos.length;
}

// Get todos by status
function getByStatus(status) {
  initDB();
  const todos = getAll();
  return todos.filter(t => t.status === status);
}

const Todo = {
  getAll,
  getById,
  create,
  update,
  remove,
  getByStatus
};

module.exports = Todo;
