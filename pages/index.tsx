import React from 'react'
import Form from '@/components/Form'
import TodoList from '@/components/TodoList'
import ToolBar from '@/components/ToolBar'
import { useTodoContext } from '@/context'
import { prisma } from '@/lib/prisma'
import type { InferGetServerSidePropsType } from 'next'
import type { ITodo } from '@/types/todo'

export const getServerSideProps = async () => {
  const todoList = (await prisma.todo.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
    },
  })) as ITodo[]

  return {
    props: {
      todoList,
    },
  }
}

function Home({ todoList }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { initialTodoList } = useTodoContext()

  React.useEffect(() => {
    initialTodoList(todoList)
  }, [initialTodoList, todoList])

  return (
    <div className='flex flex-col px-80 pt-20'>
      <Form />
      <ToolBar _todoList={todoList} />
      <TodoList _todoList={todoList} />
    </div>
  )
}

export default Home
