import { useState, useEffect, useRef } from 'react'
import './App.css'

// ─── Lucide-style inline SVG icons ───────────────────────────────────────────
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="11" cy="11" r="8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
  </svg>
)

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
)

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 0110 16.414H8v-2a2 2 0 01.586-1.414z" />
  </svg>
)

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a1 1 0 00-1-1h-4a1 1 0 00-1 1H5" />
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
)

// ─── Priority config ──────────────────────────────────────────────────────────
const PRIORITIES = {
  high:   { label: 'High',   color: 'bg-red-500/15 text-red-400 ring-red-500/30' },
  medium: { label: 'Medium', color: 'bg-amber-500/15 text-amber-400 ring-amber-500/30' },
  low:    { label: 'Low',    color: 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/30' },
}

const FILTERS = ['All', 'Active', 'Completed']

// ─── LocalStorage helpers ─────────────────────────────────────────────────────
const STORAGE_KEY = 'ag-todos-v1'
const loadTodos = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] }
  catch { return [] }
}
const saveTodos = (todos) => localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))

let idCounter = Date.now()
const newId = () => ++idCounter

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [todos, setTodos]       = useState(loadTodos)
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('All')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [editPriority, setEditPriority] = useState('medium')

  // new-todo form state
  const [newText, setNewText]         = useState('')
  const [newPriority, setNewPriority] = useState('medium')

  const inputRef = useRef(null)

  useEffect(() => { saveTodos(todos) }, [todos])

  // ── CRUD ──────────────────────────────────────────────────────────────────
  const addTodo = (e) => {
    e.preventDefault()
    const text = newText.trim()
    if (!text) return
    setTodos(prev => [
      { id: newId(), text, priority: newPriority, completed: false, createdAt: Date.now() },
      ...prev,
    ])
    setNewText('')
    inputRef.current?.focus()
  }

  const toggleTodo = (id) =>
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))

  const deleteTodo = (id) =>
    setTodos(prev => prev.filter(t => t.id !== id))

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
    setEditPriority(todo.priority)
  }

  const saveEdit = (id) => {
    const text = editText.trim()
    if (!text) return
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text, priority: editPriority } : t))
    setEditingId(null)
  }

  const cancelEdit = () => setEditingId(null)

  const clearCompleted = () => setTodos(prev => prev.filter(t => !t.completed))

  // ── Derived ───────────────────────────────────────────────────────────────
  const filtered = todos
    .filter(t => {
      if (filter === 'Active')    return !t.completed
      if (filter === 'Completed') return t.completed
      return true
    })
    .filter(t => t.text.toLowerCase().includes(search.toLowerCase()))

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex flex-col items-center py-12 px-4">

      {/* ── Header ── */}
      <div className="w-full max-w-2xl mb-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg mb-1">
          My Todos
        </h1>
        <p className="text-slate-400 text-sm">Stay organized, get things done ✨</p>
      </div>

      {/* ── Stats bar ── */}
      <div className="w-full max-w-2xl flex gap-3 mb-6">
        {[
          { label: 'Total', value: todos.length, color: 'from-violet-500 to-indigo-500' },
          { label: 'Active', value: activeCount, color: 'from-sky-500 to-cyan-500' },
          { label: 'Done', value: completedCount, color: 'from-emerald-500 to-teal-500' },
        ].map(s => (
          <div key={s.label} className="flex-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-4 text-center">
            <div className={`text-2xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Add todo form ── */}
      <form onSubmit={addTodo} className="w-full max-w-2xl mb-5">
        <div className="flex flex-col sm:flex-row gap-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-2">
          <input
            ref={inputRef}
            id="new-todo-input"
            type="text"
            placeholder="What needs to be done?"
            value={newText}
            onChange={e => setNewText(e.target.value)}
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 px-3 py-2 outline-none text-sm"
          />
          <select
            id="new-todo-priority"
            value={newPriority}
            onChange={e => setNewPriority(e.target.value)}
            className="bg-white/10 text-slate-300 rounded-xl px-3 py-2 text-xs outline-none cursor-pointer border border-white/10 hover:bg-white/15 transition-colors"
          >
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
          <button
            type="submit"
            id="add-todo-btn"
            className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl px-4 py-2 text-sm transition-all duration-200 shadow-lg shadow-violet-900/40 active:scale-95"
          >
            <PlusIcon /> Add
          </button>
        </div>
      </form>

      {/* ── Search + Filter bar ── */}
      <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-2 mb-5">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 pointer-events-none">
            <SearchIcon />
          </span>
          <input
            id="search-input"
            type="text"
            placeholder="Search todos…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 pl-9 pr-3 py-2.5 rounded-xl outline-none text-sm focus:ring-2 focus:ring-violet-500/50 transition-all backdrop-blur-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
            >
              <XIcon />
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
          {FILTERS.map(f => (
            <button
              key={f}
              id={`filter-${f.toLowerCase()}`}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                filter === f
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Todo list ── */}
      <div className="w-full max-w-2xl flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-600 gap-3">
            <ClipboardIcon />
            <p className="text-sm">
              {search ? `No results for "${search}"` : 'Nothing here yet — add your first task!'}
            </p>
          </div>
        ) : (
          filtered.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={editingId === todo.id}
              editText={editText}
              editPriority={editPriority}
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
              onEdit={() => startEdit(todo)}
              onSaveEdit={() => saveEdit(todo.id)}
              onCancelEdit={cancelEdit}
              onEditTextChange={setEditText}
              onEditPriorityChange={setEditPriority}
            />
          ))
        )}
      </div>

      {/* ── Footer actions ── */}
      {completedCount > 0 && (
        <div className="w-full max-w-2xl mt-4 flex justify-end">
          <button
            id="clear-completed-btn"
            onClick={clearCompleted}
            className="text-xs text-slate-500 hover:text-rose-400 transition-colors duration-200 underline underline-offset-2"
          >
            Clear {completedCount} completed
          </button>
        </div>
      )}
    </div>
  )
}

// ─── TodoItem Component ────────────────────────────────────────────────────────
function TodoItem({
  todo, isEditing, editText, editPriority,
  onToggle, onDelete, onEdit, onSaveEdit, onCancelEdit,
  onEditTextChange, onEditPriorityChange,
}) {
  const editInputRef = useRef(null)

  useEffect(() => {
    if (isEditing) editInputRef.current?.focus()
  }, [isEditing])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSaveEdit()
    if (e.key === 'Escape') onCancelEdit()
  }

  const { color } = PRIORITIES[todo.priority] || PRIORITIES.medium

  return (
    <div
      className={`group flex items-start gap-3 rounded-2xl border backdrop-blur-sm p-4 transition-all duration-300 ${
        todo.completed
          ? 'bg-white/2 border-white/5 opacity-60'
          : 'bg-white/5 border-white/10 hover:border-violet-500/30 hover:bg-white/8 shadow-sm'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        id={`toggle-${todo.id}`}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          todo.completed
            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 border-emerald-500 shadow-md shadow-emerald-900/30'
            : 'border-slate-600 hover:border-violet-500'
        }`}
      >
        {todo.completed && <CheckIcon />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              ref={editInputRef}
              id={`edit-input-${todo.id}`}
              type="text"
              value={editText}
              onChange={e => onEditTextChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-white/10 border border-violet-500/50 text-slate-100 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-violet-500/50"
            />
            <select
              value={editPriority}
              onChange={e => onEditPriorityChange(e.target.value)}
              className="bg-white/10 text-slate-300 rounded-lg px-2 py-1.5 text-xs outline-none border border-white/10"
            >
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>
        ) : (
          <p className={`text-sm font-medium break-words ${todo.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
            {todo.text}
          </p>
        )}

        <div className="flex items-center gap-2 mt-1.5">
          <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ring-1 ${color}`}>
            {PRIORITIES[todo.priority]?.label}
          </span>
          <span className="text-slate-600 text-[10px]">
            {new Date(todo.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className={`flex items-center gap-1 transition-opacity duration-200 ${isEditing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        {isEditing ? (
          <>
            <button
              id={`save-edit-${todo.id}`}
              onClick={onSaveEdit}
              className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
              title="Save"
            >
              <CheckIcon />
            </button>
            <button
              id={`cancel-edit-${todo.id}`}
              onClick={onCancelEdit}
              className="p-1.5 rounded-lg bg-slate-500/20 text-slate-400 hover:bg-slate-500/30 transition-colors"
              title="Cancel"
            >
              <XIcon />
            </button>
          </>
        ) : (
          <>
            <button
              id={`edit-${todo.id}`}
              onClick={onEdit}
              className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25 transition-colors"
              title="Edit"
            >
              <EditIcon />
            </button>
            <button
              id={`delete-${todo.id}`}
              onClick={onDelete}
              className="p-1.5 rounded-lg bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 transition-colors"
              title="Delete"
            >
              <TrashIcon />
            </button>
          </>
        )}
      </div>
    </div>
  )
}