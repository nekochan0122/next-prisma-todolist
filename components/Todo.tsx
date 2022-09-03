import React from 'react'
import { useTodoContext } from '@/context/todoContext'
import { ITodo } from '@/types/todo'

function Todo({ todo }: { todo: ITodo }) {
  const { updateTodo, deleteTodo } = useTodoContext()

  const statusOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTodo({
      ...todo,
      status: e.target.checked,
    })
  }

  return (
    <li className='my-2 flex bg-pink-200 text-gray-600'>
      <input type='checkbox' checked={todo.status} onChange={statusOnChangeHandler} />
      <span>
        <span>id : {todo.id}</span>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </span>
      <button type='button' className='bg-white p-1' onClick={deleteTodo(todo.id)}>
        X
      </button>
    </li>
  )
}

export default Todo
