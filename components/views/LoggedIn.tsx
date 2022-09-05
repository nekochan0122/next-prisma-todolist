import React from 'react'
import Form from '@/components/Form'
import TodoList from '@/components/TodoList'
import ToolBar from '@/components/ToolBar'

function LoggedIn() {
  return (
    <>
      <Form />
      <ToolBar />
      <TodoList />
    </>
  )
}

export default LoggedIn
