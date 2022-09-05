import React from 'react'
import { useSession } from 'next-auth/react'
import type { TodoContextType, ITodo, ITodoDB } from '@/types/todo'

const TodoContext = React.createContext<TodoContextType | null>(null)

export const useTodoContext = () => React.useContext(TodoContext) as TodoContextType

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todoList, _setTodoList] = React.useState<ITodo[]>([])
  const isChanged = React.useRef<boolean>(false)
  // const { data: session } = useSession()

  // React.useEffect(() => {
  //   if (session) {
  //   }
  // }, [session])

  const createTodo = React.useCallback(
    async (todo: ITodo) => {
      if (!isChanged.current) isChanged.current = true

      try {
        const res = await fetch('/api/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        })

        if (!res.ok) throw new Error('Failed to create todo')

        const data = (await res.json()) as ITodoDB

        _setTodoList((_todoList) => [..._todoList, { ...todo, id: data.id }])
      } catch (error) {
        console.log(error)
      }
    },
    [isChanged.current]
  )

  const updateTodo = React.useCallback(
    async (todo: ITodo) => {
      if (!isChanged.current) isChanged.current = true

      _setTodoList((_todoList) => _todoList.map((_todo) => (_todo.id === todo.id ? todo : _todo)))

      try {
        await fetch('/api/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        })
      } catch (error) {
        console.log(error)
      }
    },
    [isChanged.current]
  )

  const deleteTodo = React.useCallback(
    (id: number) => async () => {
      if (!isChanged.current) isChanged.current = true

      _setTodoList((_todoList) => _todoList.filter((todo) => todo.id !== id))

      try {
        await fetch(`/api/delete/${id}`, {
          method: 'DELETE',
        })
      } catch (error) {
        console.log(error)
      }
    },
    [isChanged.current]
  )

  const deleteAllTodo = React.useCallback(async () => {
    if (!isChanged.current) isChanged.current = true

    _setTodoList([])

    try {
      await fetch('/api/delete/all', {
        method: 'DELETE',
      })
    } catch (error) {
      console.log(error)
    }
  }, [isChanged.current])

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
