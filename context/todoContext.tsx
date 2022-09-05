import React from 'react'
import { useSession } from 'next-auth/react'
import type { TodoContextType, ITodo } from '@/types/todo'

const TodoContext = React.createContext<TodoContextType | null>(null)

export const useTodoContext = () => React.useContext(TodoContext) as TodoContextType

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todoList, _setTodoList] = React.useState<ITodo[]>([])
  const { data: session } = useSession()

  // read todolist from db when user logged in
  React.useEffect(() => {
    if (session) {
      ;(async () => {
        const res = await fetch('/api/read')
        const todolist = (await res.json()) as ITodo[]
        _setTodoList(todolist)
      })()
    }
  }, [session])

  const createTodo = async (todo: ITodo) => {
    try {
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      })

      if (!res.ok) throw new Error('Failed to create todo')

      const data = (await res.json()) as ITodo

      _setTodoList((_todoList) => [..._todoList, { ...todo, id: data.id }])
    } catch (error) {
      console.log(error)
    }
  }

  const updateTodo = async (todo: ITodo) => {
    try {
      await fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      })

      _setTodoList((_todoList) => _todoList.map((_todo) => (_todo.id === todo.id ? todo : _todo)))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo = (id: number) => async () => {
    try {
      await fetch('/api/delete/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      _setTodoList((_todoList) => _todoList.filter((todo) => todo.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAllTodo = async () => {
    try {
      await fetch('/api/deleteAll', {
        method: 'DELETE',
      })

      _setTodoList([])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TodoContext.Provider
      value={{
        todoList,
        // initialTodoList,
        createTodo,
        updateTodo,
        deleteTodo,
        deleteAllTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
