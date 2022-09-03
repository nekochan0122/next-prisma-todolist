import React from 'react'
import cn from 'classnames'
import { useFormContext, useTodoContext } from '@/context'

function Form() {
  const { mode, form, setForm, resetForm } = useFormContext()
  const { createTodo, updateTodo } = useTodoContext()

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // prevent page reload
    mode === 'Create' ? createTodo(form) : updateTodo(form)
    resetForm()
  }

  return (
    <form className='flex flex-col text-black' onSubmit={onSubmitHandler}>
      <input
        type='text'
        className='mb-2 rounded-md bg-[#f5f5f5] py-2 px-4 outline-none'
        placeholder='Title'
        required
        value={form.title}
        onChange={(e) => setForm((form) => ({ ...form, title: e.target.value }))}
      />
      <input
        className='mb-2 rounded-md bg-[#f5f5f5] py-2 px-4 outline-none'
        placeholder='Description'
        required
        value={form.description}
        onChange={(e) => setForm((form) => ({ ...form, description: e.target.value }))}
      />
      <button
        type='submit'
        className={cn(
          'w-full rounded-md p-2 font-bold text-white',
          mode === 'Create' ? 'bg-[#00b7ff9b]' : 'bg-[#f43f5d98]'
        )}
      >
        {mode}
      </button>
    </form>
  )
}

export default Form
