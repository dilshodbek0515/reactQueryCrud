export interface CRUD {
  id: string
  url: string
  name: string
  description: string
}

export interface LoginForm {
  id: string
  url: string
  name: string
  description: string
}

export const initialState: LoginForm = {
  id: '',
  url: '',
  name: '',
  description: ''
}
