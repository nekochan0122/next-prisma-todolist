import React from 'react'
import Todo from './Todo'
import { useTodoContext } from '@/context'
import type { ITodo } from '@/types/todo'

function TodoList({ _todoList }: { _todoList: ITodo[] }) {
  const { todoList } = useTodoContext()

  return (
    <ul className='overflow-overlay max-h-[65%] overflow-auto rounded-md bg-[#f5f5f5] p-2'>
      {(todoList ?? _todoList).map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

export default TodoList
