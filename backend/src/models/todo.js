const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../todos.json');

// Initialize data file
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

const Todo = {
  getAll: () => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },
  
  getById: (id) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return data.find(todo => todo.id === id);
  },
  
  create: (data) => {
    const todos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const newTodo = {
      id: Date.now(),
      title: data.title,
      description: data.description || '',
      status: data.status || 'todo',
      priority: data.priority || 'medium',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    todos.push(newTodo);
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
    return newTodo;
  },
  
  update: (id, data) => {
    const todos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;
    
    todos[index] = {
      ...todos[index],
      title: data.title !== undefined ? data.title : todos[index].title,
      description: data.description !== undefined ? data.description : todos[index].description,
      status: data.status !== undefined ? data.status : todos[index].status,
      priority: data.priority !== undefined ? data.priority : todos[index].priority,
      updated_at: new Date().toISOString()
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
    return todos[index];
  },
  
  delete: (id) => {
    const todos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const filtered = todos.filter(todo => todo.id !== id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2));
    return true;
  },
  
  getByStatus: (status) => {
    const todos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return todos.filter(todo => todo.status === status);
  }
};

module.exports = Todo;
