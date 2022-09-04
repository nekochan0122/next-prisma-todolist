import React from 'react'
import cn from 'classnames'
import { FcEditImage, FcFullTrash } from 'react-icons/fc'
import { useTodoContext, useFormContext } from '@/context'
import { ITodo } from '@/types/todo'

function Todo({ todo }: { todo: ITodo }) {
  const { updateTodo, deleteTodo } = useTodoContext()

  const statusOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTodo({
      ...todo,
      status: e.target.checked,
    })
  }

  const { mode, setUpdateForm } = useFormContext()

  return (
    <li className='flex items-center justify-between border-b-2 px-2'>
      <span className={cn('flex', { 'line-through': todo.status })}>
        <input
          className='w-4 cursor-pointer rounded-md p-2 accent-[#f43f5d98]'
          type='checkbox'
          checked={todo.status}
          onChange={statusOnChangeHandler}
          disabled={mode === 'Update'}
        />
        <span className='ml-4'>
          <h3 className='text-xl font-bold text-gray-800'>{todo.title}</h3>
          <p className='text-lg text-gray-700'>{todo.description}</p>
        </span>
      </span>

      <span>
        <button type='button' className='bg-white p-2' onClick={() => setUpdateForm(todo)}>
          <FcEditImage className='inline text-2xl' />
        </button>
        <button type='button' className='ml-2 bg-white p-2' onClick={deleteTodo(todo.id)}>
          <FcFullTrash className='inline text-2xl' />
        </button>
      </span>
    </li>
  )
}

export default Todo
