import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = '/api/todos'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [columns, setColumns] = useState({
    todo: [],
    inprogress: [],
    done: []
  })

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL)
      setTodos(res.data)
      organizeColumns(res.data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const organizeColumns = (todos) => {
    const cols = { todo: [], inprogress: [], done: [] }
    todos.forEach(todo => {
      const col = cols[todo.status] || cols.todo
      col.push(todo)
    })
    setColumns(cols)
  }

  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    
    try {
      const res = await axios.post(API_URL, { title: newTodo })
      setTodos([res.data, ...todos])
      setNewTodo('')
      organizeColumns([...todos, res.data])
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const updateTodo = async (id, updates) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updates)
      setTodos(todos.map(t => t.id === id ? res.data : t))
      organizeColumns([...todos].map(t => t.id === id ? res.data : t))
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setTodos(todos.filter(t => t.id !== id))
      organizeColumns(todos.filter(t => t.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const moveTodo = (todo, newStatus) => {
    updateTodo(todo.id, { status: newStatus })
  }

  const Column = ({ title, todos, status, color }) => (
    <div className="column" style={{ borderLeft: `4px solid ${color}` }}>
      <h3>{title} ({todos.length})</h3>
      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className="todo-card">
            <div className="todo-content">
              <strong>{todo.title}</strong>
              {todo.description && <p>{todo.description}</p>}
              <span className={`priority-${todo.priority}`}>
                {todo.priority}
              </span>
            </div>
            <div className="todo-actions">
              <select 
                value={todo.status} 
                onChange={(e) => moveTodo(todo, e.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <button onClick={() => deleteTodo(todo.id)}>×</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="app">
      <header>
        <h1>📋 Todo List Kanban</h1>
        <form onSubmit={addTodo}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit">Add</button>
        </form>
      </header>
      <div className="board">
        <Column title="To Do" todos={columns.todo} status="todo" color="#ff6b6b" />
        <Column title="In Progress" todos={columns.inprogress} status="inprogress" color="#4ecdc4" />
        <Column title="Done" todos={columns.done} status="done" color="#95e1d3" />
      </div>
    </div>
  )
}

export default App
