export interface CRUD {
  id: number
  url: string
  name: string
  description: string
}

export interface LoginForm {
  id: number
  url: string
  name: string
  description: string
}

export const initialState: LoginForm = {
  id: 0,
  url: '',
  name: '',
  description: ''
}
