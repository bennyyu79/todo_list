const { Database } = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../../todo.db'));

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'todo',
    priority TEXT DEFAULT 'medium',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const Todo = {
  getAll: () => db.prepare('SELECT * FROM todos ORDER BY created_at DESC').all(),
  
  getById: (id) => db.prepare('SELECT * FROM todos WHERE id = ?').get(id),
  
  create: (data) => {
    const { title, description, status, priority } = data;
    const stmt = db.prepare(
      'INSERT INTO todos (title, description, status, priority) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(title, description || '', status || 'todo', priority || 'medium');
    return Todo.getById(result.lastInsertRowid);
  },
  
  update: (id, data) => {
    const { title, description, status, priority } = data;
    const stmt = db.prepare(`
      UPDATE todos 
      SET title = COALESCE(?, title),
          description = COALESCE(?, description),
          status = COALESCE(?, status),
          priority = COALESCE(?, priority),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(title, description, status, priority, id);
    return Todo.getById(id);
  },
  
  delete: (id) => {
    const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
    return stmt.run(id);
  },
  
  getByStatus: (status) => db.prepare('SELECT * FROM todos WHERE status = ? ORDER BY created_at DESC').all(status)
};

module.exports = Todo;
