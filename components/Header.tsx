import React from 'react'
import { FaGithub } from 'react-icons/fa'

function Header() {
  return (
    <header className='mb-2 flex items-end justify-between'>
      <h1 className='inline-block font-logo text-6xl text-black'>Todo List</h1>
      <span className='flex flex-col items-end'>
        <a
          className='flex items-center hover:text-[#f43f5d98]'
          href='https://github.com/NekoChanTaiwan/next-prisma-todolist'
          target='_blank'
          rel='noreferrer'
        >
          <FaGithub className='mr-1 inline-block text-lg' />
          <span>GitHub - By NekoChan</span>
        </a>
        <p>Built on Next.js, Tailwind CSS, Prisma, MySQL and TypeScript</p>
      </span>
    </header>
  )
}

export default Header
