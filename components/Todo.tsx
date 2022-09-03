import React from 'react'
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
    <li className='my-2 flex bg-pink-200 text-gray-600'>
      <input
        type='checkbox'
        checked={todo.status}
        onChange={statusOnChangeHandler}
        disabled={mode === 'Update'}
      />
      <span>
        <span>id : {todo.id}</span>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </span>
      <button type='button' className='bg-white p-1' onClick={deleteTodo(todo.id)}>
        X
      </button>
      <button type='button' className='ml-2 bg-white p-1' onClick={() => setUpdateForm(todo)}>
        edit
      </button>
    </li>
  )
}

export default Todo
