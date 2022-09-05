import React from 'react'
import { signIn } from 'next-auth/react'

function UnLoggedIn() {
  return (
    <>
      <div className='flex h-[50vh] flex-col items-center justify-center'>
        <h3>Not signed in</h3>
        <button className='mt-2 w-max rounded bg-white p-2 text-black' onClick={() => signIn()}>
          Sign in
        </button>
      </div>
    </>
  )
}

export default UnLoggedIn
