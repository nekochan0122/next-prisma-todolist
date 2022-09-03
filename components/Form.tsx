import React from 'react'
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
        className='mb-2'
        placeholder='Title'
        required
        value={form.title}
        onChange={(e) => setForm((form) => ({ ...form, title: e.target.value }))}
      />
      <textarea
        className='mb-2'
        placeholder='Description'
        required
        value={form.description}
        onChange={(e) => setForm((form) => ({ ...form, description: e.target.value }))}
      />
      <button type='submit' className='bg-[#fff] p-2'>
        {mode}
      </button>
    </form>
  )
}

export default Form
