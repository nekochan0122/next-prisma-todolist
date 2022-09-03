import React from 'react'
import type { TodoContextType, ITodo, ITodoDB } from '@/types/todo'

const TodoContext = React.createContext<TodoContextType | null>(null)

export const useTodoContext = () => React.useContext(TodoContext) as TodoContextType

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [_todoList, _setTodoList] = React.useState<ITodo[]>([])
  const isChanged = React.useRef<boolean>(false)
  const todoList = React.useMemo<ITodo[] | null>(
    () => (isChanged.current ? _todoList : null),
    [isChanged.current, _todoList]
  )

  // const changeTodoList = React.useCallback(
  //   (todoList: ITodo[]) => {
  //     if (!isChanged.current) isChanged.current = true
  //     _setTodoList(todoList)
  //   },
  //   [isChanged.current]
  // )

  const initialTodoList = React.useCallback((todoList: ITodo[]) => {
    _setTodoList(todoList)
  }, [])

  const setTodoList = React.useCallback(
    (todoList: ITodo[]) => {
      if (!isChanged.current) isChanged.current = true
      _setTodoList(todoList)
      // TODO : Prisma update
    },
    [isChanged.current]
  )

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

  // const updateTodo = async (id: number, key: keyof ITodo, value: any) => {
  //   if (!isChanged.current) isChanged.current = true
  //   _setTodoList((state) =>
  //     state.map((todo) => (todo.id === id ? { ...todo, [key]: value } : todo))
  //   )
  // }

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

  // Debug
  React.useEffect(() => {
    console.table(todoList)
  }, [todoList])

  return (
    <TodoContext.Provider
      value={{
        todoList,
        initialTodoList,
        setTodoList,
        createTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
