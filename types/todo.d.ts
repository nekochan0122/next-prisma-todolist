export interface ITodo {
  id: number
  title: string
  description: string
  status: boolean
}

export interface ITodoDB {
  id: number
  title: string
  description: string
  status: boolean
  createAt: string
  updatedAt: string
}

export interface TodoContextType {
  todoList: ITodo[] | null
  initialTodoList: (todoList: ITodo[]) => void
  setTodoList: (todoList: ITodo[]) => void
  createTodo: (todo: ITodo) => void
  // updateTodo: (id: number, key: keyof ITodo, value: any) => void
  updateTodo: (todo: ITodo) => void
  deleteTodo: (id: number) => () => void
}
