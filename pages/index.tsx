import React from 'react'
import { prisma } from '@/lib/prisma'
import type { InferGetServerSidePropsType } from 'next'

interface Todo {
  id: number
  title: string
  content: string
  isDone: boolean
}

const initTodo: Todo = {
  id: 0,
  title: '',
  content: '',
  isDone: false,
}

export const getServerSideProps = async () => {
  const todos = (await prisma.todo.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      isDone: true,
    },
  })) as Todo[]

  return {
    props: {
      todos,
    },
  }
}

function Home({ todos }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // TODO: todolist state
  const [todo, setTodo] = React.useState<Todo>(initTodo)

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // prevent page reload

    try {
      await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      })
      setTodo(initTodo)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex h-screen flex-col items-center justify-start pt-10'>
      <form className='flex flex-col text-black' onSubmit={onSubmitHandler}>
        <input
          type='text'
          className='mb-2'
          placeholder='Title'
          value={todo.title}
          onChange={(e) => setTodo((state) => ({ ...state, title: e.target.value }))}
        />
        <textarea
          className='mb-2'
          placeholder='Content'
          value={todo.content}
          onChange={(e) => setTodo((state) => ({ ...state, content: e.target.value }))}
        />
        <button type='submit' className='bg-[#fff] p-2'>
          Add todo
        </button>
      </form>
      {/* <div>
        <h3>Preview</h3>
        <h4>{todo.title}</h4>
        <p>{todo.content}</p>
      </div> */}
      <ul>
        {todos &&
          todos.map(({ id, title, content, isDone }) => (
            <li key={id}>
              <h4>{title}</h4>
              <p>{content}</p>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Home
