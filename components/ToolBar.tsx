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
    <div className='flex justify-between'>
      <span>
        {completedAmount} / {todosAmount} completed.
      </span>
      <button type='button' className='bg-white text-black' onClick={deleteAllTodo}>
        clear all
      </button>
    </div>
  )
}

export default ToolBar
