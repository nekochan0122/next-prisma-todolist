import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import Header from '@/components/Header'
import LoggedInView from '@/components/views/LoggedIn'
import UnLoggedInView from '@/components/views/UnLoggedIn'

function Home() {
  const { data: session } = useSession()
  const View = session?.user ? LoggedInView : UnLoggedInView

  React.useEffect(() => {
    console.log('session', session)
  }, [session])

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
