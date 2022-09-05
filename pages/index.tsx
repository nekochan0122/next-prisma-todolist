import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Header from '@/components/Header'
import LoggedInView from '@/components/views/LoggedIn'
import UnLoggedInView from '@/components/views/UnLoggedIn'
import { useTodoContext } from '@/context'
import { prisma } from '@/lib/prisma'
import type { InferGetServerSidePropsType } from 'next'
import type { ITodo } from '@/types/todo'

export const getServerSideProps = async () => {
  const todoListDB = (await prisma.todo.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
    },
  })) as ITodo[]

  return {
    props: {
      todoListDB,
    },
  }
}

function Home({ todoListDB }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession()
  const View = session?.user ? LoggedInView : UnLoggedInView
  // const { initialTodoList } = useTodoContext()

  React.useEffect(() => {
    console.log('session', session)
  }, [session])

  // React.useEffect(() => {
  //   initialTodoList(todoListDB)
  // }, [initialTodoList, todoListDB])

  return (
    <div className='flex justify-center'>
      <div className='max-h-[90vh] w-full overflow-hidden rounded-md bg-[#f5f5f5] bg-opacity-60 p-4 shadow-xl sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]'>
        <Header />
        <div className='mb-2'>
          {session?.user && (
            <div>
              Signed in as {session.user.name}
              <button className='rounded bg-white p-2 text-black' onClick={() => signOut()}>
                Sign out
              </button>
            </div>
          )}
        </div>
        <main>
          <View />
        </main>
      </div>
    </div>
  )
}

export default Home
