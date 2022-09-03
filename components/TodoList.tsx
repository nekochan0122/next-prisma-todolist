import React from 'react'
import Todo from './Todo'
import { useTodoContext } from '@/context/todoContext'
import type { ITodo } from '@/types/todo'

function TodoList({ _todoList }: { _todoList: ITodo[] }) {
  const { todoList } = useTodoContext()

  return (
    <ul className='mt-4 bg-blue-300'>
      {(todoList ?? _todoList).map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

export default TodoList
