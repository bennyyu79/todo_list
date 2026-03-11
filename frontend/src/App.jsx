import { useState, useEffect } from 'react'
import axios from 'axios'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import './index.css'

const API_URL = '/api/todos'

const columns = {
  todo: { title: 'To Do', color: '#ff6b6b' },
  inprogress: { title: 'In Progress', color: '#4ecdc4' },
  done: { title: 'Done', color: '#95e1d3' }
}

function SortableTodo({ todo }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todo.id })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="todo-card draggable">
      <div className="todo-content">
        <strong>{todo.title}</strong>
        {todo.description && <p>{todo.description}</p>}
        <span className={`priority-${todo.priority}`}>{todo.priority}</span>
      </div>
      <div className="drag-handle" title="Drag to move">🤳</div>
    </div>
  )
}

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [columnsData, setColumnsData] = useState({
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
    setColumnsData(cols)
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

  const handleDragEnd = async (event) => {
    const { active, over } = event
    if (!over) return

    const activeCol = Object.keys(columnsData).find(key => 
      columnsData[key].some(todo => todo.id === active.id)
    )
    const overCol = Object.keys(columnsData).find(key => 
      columnsData[key].some(todo => todo.id === over.id)
    )

    if (activeCol === overCol) {
      const oldIndex = columnsData[activeCol].findIndex(t => t.id === active.id)
      const newIndex = columnsData[overCol].findIndex(t => t.id === over.id)
      
      if (oldIndex !== newIndex) {
        const newColumns = { ...columnsData }
        newColumns[activeCol] = arrayMove(newColumns[activeCol], oldIndex, newIndex)
        setColumnsData(newColumns)
      }
    } else {
      const todo = columnsData[activeCol].find(t => t.id === active.id)
      await updateTodo(todo.id, { status: overCol })
    }
  }

  const Column = ({ status, todos }) => (
    <div className="column" style={{ borderLeft: `4px solid ${columns[status].color}` }}>
      <h3>{columns[status].title} ({todos.length})</h3>
      <div className="todo-list">
        <SortableContext items={todos.map(t => t.id)}>
          {todos.map(todo => (
            <div key={todo.id} className="sortable-item">
              <SortableTodo todo={todo} />
              <div className="todo-actions">
                <button onClick={() => deleteTodo(todo.id)}>×</button>
              </div>
            </div>
          ))}
        </SortableContext>
      </div>
    </div>
  )

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="app">
        <header>
          <h1>📋 Todo List Kanban</h1>
          <p className="subtitle">Drag tasks between columns to update status</p>
          <form onSubmit={addTodo}>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
            />
            <button type="submit">Add Task</button>
          </form>
        </header>
        <div className="board">
          <Column status="todo" todos={columnsData.todo} />
          <Column status="inprogress" todos={columnsData.inprogress} />
          <Column status="done" todos={columnsData.done} />
        </div>
      </div>
    </DndContext>
  )
}

export default App
