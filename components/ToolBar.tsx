import React from 'react'
import { useTodoContext } from '@/context'

function ToolBar() {
  const { todoList, deleteAllTodo } = useTodoContext()

  const todosAmount = todoList.length
  const completedAmount = todoList.reduce((sum, { status }) => sum + +status, 0)

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
