import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FC } from 'react'
import { CRUD } from '../../types'

const Crud: FC = () => {
  const { data } = useQuery<CRUD[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await axios.get(
        'https://674053eed0b59228b7ef9746.mockapi.io/crud'
      )
      return response.data
    }
  })

  const crud: JSX.Element[] | undefined = data?.map(
    (item: CRUD): JSX.Element => (
      <div
        className='min-h-96 border-2 border-white rounded-xl p-5 flex flex-col gap-5 justify-between'
        key={item.id}
      >
        <img src={item.url} alt='images' />
        <h2 className='text-4xl text-white text-center'>{item.name}</h2>
        <p className='text-xl text-white text-center'>{item.description}</p>
        <div className='w-full h-auto flex items-center justify-between gap-5'>
          <button className='w-[50%] h-16 bg-blue-900 text-white rounded-xl text-xl hover:opacity-70'>
            Edit
          </button>
          <button className='w-[50%] h-16 bg-blue-900 text-white rounded-xl text-xl hover:opacity-70'>
            Delete
          </button>
        </div>
      </div>
    )
  )

  return (
    <div className='w-full h-screen bg-blue-950 flex items-center justify-center'>
      <div className='w-full h-auto flex flex-col gap-10'>
        <form
          action=''
          className='container mx-auto h-auto flex flex-col gap-5 px-96'
        >
          <input
            type='text'
            className='w-full h-20 border border-white rounded-xl bg-transparent px-5 py-1 outline-none text-white text-xl '
            required
            placeholder='Enter your url'
          />
          <input
            type='text'
            className='w-full h-20 border border-white rounded-xl bg-transparent px-5 py-1 outline-none text-white text-xl '
            required
            placeholder='Enter your name'
          />
          <input
            type='text'
            className='w-full h-20 border border-white rounded-xl bg-transparent px-5 py-1 outline-none text-white text-xl '
            required
            placeholder='Enter your description'
          />
          <button className='w-full h-20 bg-blue-900 rounded-xl text-white text-2xl'>
            Create
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
