import type { ITodo } from './todo'

export interface IForm {
  mode: 'Create' | 'Update'
  form: ITodo
  setForm: React.Dispatch<React.SetStateAction<ITodo>>
  resetForm: () => void
}

export interface FormContextType extends IForm {
  setUpdateForm: React.Dispatch<React.SetStateAction<ITodo | null>>
}
