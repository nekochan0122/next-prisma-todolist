import React from 'react'
import { TodoProvider, useTodoContext } from './todoContext'
import { FormProvider, useFormContext } from './formContext'

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TodoProvider>
      <FormProvider>{children}</FormProvider>
    </TodoProvider>
  )
}

export { useTodoContext, useFormContext }
