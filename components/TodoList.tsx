import React from 'react'
import Todo from './Todo'
import { useTodoContext } from '@/context'

function TodoList() {
  const { todoList } = useTodoContext()

  return (
    <ul className='overflow-overlay max-h-[65%] overflow-auto rounded-md bg-[#f5f5f5] p-2'>
      {todoList.length > 0 ? (
        todoList.map((todo) => <Todo key={todo.id} todo={todo} />)
      ) : (
        <li>Nothing Here.</li>
      )}
    </ul>
  )
}

export default TodoList
