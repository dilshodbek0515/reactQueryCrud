import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { FC, useState } from 'react'
import { CRUD, initialState, LoginForm } from '../../types'

const Crud: FC = () => {
  const [posts, setForm] = useState<LoginForm>(initialState)
  const [edit, setEdit] = useState(false)
  const queryClient = useQueryClient()

  const { data: product } = useQuery({
    queryKey: ['products'],
    queryFn: () => {
      return axios
        .get('https://674053eed0b59228b7ef9746.mockapi.io/crud')
        .then(res => res.data)
    }
  })

  const createProduct = useMutation({
    mutationFn: (product: LoginForm) => {
      return axios.post(
        'https://674053eed0b59228b7ef9746.mockapi.io/crud',
        product
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  const updateProduct = useMutation({
    mutationFn: (update: LoginForm) => {
      return axios.put(
        `https://674053eed0b59228b7ef9746.mockapi.io/crud/${update.id}`,
        update
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  const deleteProduct = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(
        `https://674053eed0b59228b7ef9746.mockapi.io/crud/${id}`
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  const crud: JSX.Element[] | undefined = product?.map(
    (item: CRUD): JSX.Element => (
      <div
        className='min-h-96 border-2 border-blue-950 rounded-xl p-5 flex flex-col gap-5 justify-between'
        key={item.id}
      >
        <img src={item.url} alt='images' />
        <h2 className='text-4xl text-white text-center'>{item.name}</h2>
        <p className='text-xl text-white text-center'>{item.description}</p>
        <div className='w-full h-auto flex items-center justify-between gap-5'>
          <button
            onClick={() => handleEdit(item)}
            className='w-[50%] h-16 bg-blue-900 text-white rounded-xl text-xl hover:opacity-70'
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className='w-[50%] h-16 bg-blue-900 text-white rounded-xl text-xl hover:opacity-70'
          >
            Delete
          </button>
        </div>
      </div>
    )
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (edit) {
      updateProduct.mutate(posts)
      setEdit(false)
    } else {
      createProduct.mutate(posts)
    }
    setForm(initialState)
  }

  const handleEdit = (product: LoginForm) => {
    setForm(product)
    setEdit(true)
  }

  const handleDelete = (id: string) => {
    deleteProduct.mutate(id)
  }

  return (
    <div className='w-full h-auto bg-[rgb(6, 6, 66)] flex items-center justify-center py-20'>
      <div className='w-full h-auto flex flex-col gap-10'>
        <form
          onSubmit={handleSubmit}
          action=''
          className='container mx-auto h-auto flex flex-col gap-5 px-96'
        >
          <input
            name='url'
            value={posts.url}
            onChange={handleChange}
            type='text'
            className='w-full h-20 border border-white rounded-xl bg-transparent px-5 py-1 outline-none text-white text-xl '
            required
            placeholder='Enter your url'
          />
          <input
            name='name'
            value={posts.name}
            onChange={handleChange}
            type='text'
            className='w-full h-20 border border-white rounded-xl bg-transparent px-5 py-1 outline-none text-white text-xl '
            required
            placeholder='Enter your name'
          />
          <input
            name='description'
            value={posts.description}
            onChange={handleChange}
            type='text'
            className='w-full h-20 border border-white rounded-xl bg-transparent px-5 py-1 outline-none text-white text-xl '
            required
            placeholder='Enter your description'
          />
          <button className='w-full h-20 bg-blue-900 rounded-xl text-white text-2xl'>
            {edit ? 'Update' : 'Create'}
          </button>
        </form>
        <div className='container mx-auto h-auto grid grid-cols-4 gap-5'>
          {crud}
        </div>
      </div>
    </div>
  )
}

export default Crud
