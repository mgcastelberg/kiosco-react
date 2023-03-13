import React from 'react'
// import { categorias } from '../data/categorias'
import useKiosco from '../hooks/useKiosco'
import Categoria from './Categoria'

export default function Sidebar() {

    const { categorias } = useKiosco()

  return (
    <aside className='md:w-72'>
       <div className='p-4'>
            <img 
                src="img/logo.svg" 
                alt="logo"
                className='w-40' 
            />
       </div>

       <div className='mt-10'>
             { categorias.map( categoria => (
                <Categoria 
                    key={ categoria.id }
                    categoria={ categoria }
                />
             ))}
       </div>

       <div className='my-5 px-3'>
        <button
            type='button'
            className='text-center bg-red-500 hover:bg-red-700  w-full p-3 font-bold text-white truncate'
        >
            Cancelar Orden
        </button>
        </div>        

    </aside>
  )
}
