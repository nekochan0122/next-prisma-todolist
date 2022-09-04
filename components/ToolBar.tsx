import React from 'react'
import { useTodoContext } from '@/context'
import type { ITodo } from '@/types/todo'

function ToolBar({ todoListDB }: { todoListDB: ITodo[] }) {
  const { todoList, deleteAllTodo } = useTodoContext()

  const todosAmount = (todoList ?? todoListDB).length
  const completedAmount = (todoList ?? todoListDB).reduce((sum, { status }) => sum + +status, 0)

  return (
    <div className='my-2 flex items-center justify-between px-2'>
      <span className='text-lg'>
        {completedAmount} / {todosAmount} completed
      </span>
      <button
        type='button'
        className='rounded-md bg-red-500 p-2 font-semibold text-white'
        onClick={deleteAllTodo}
      >
        Clear All
      </button>
    </div>
  )
}

export default ToolBar
