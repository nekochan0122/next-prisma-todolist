import React from 'react'
import { useTodoContext } from '@/context'
import type { ITodo } from '@/types/todo'

function ToolBar({ _todoList }: { _todoList: ITodo[] }) {
  const { todoList, deleteAllTodo } = useTodoContext()

  const todosAmount = React.useMemo<number>(
    () => (todoList ?? _todoList).length,
    [todoList, _todoList]
  )

  const completedAmount = React.useMemo<number>(
    () => (todoList ?? _todoList).reduce((sum, { status }) => sum + +status, 0),
    [todoList, _todoList]
  )

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
