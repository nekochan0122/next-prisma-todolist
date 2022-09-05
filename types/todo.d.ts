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
  todoList: ITodo[]
  createTodo: (todo: ITodo) => Promise<void>
  updateTodo: (todo: ITodo) => Promise<void>
  deleteTodo: (id: number) => () => Promise<void>
  deleteAllTodo: () => Promise<void>
}
