import React from 'react'
// import { categorias } from '../data/categorias'
import useKiosco from '../hooks/useKiosco'
import Categoria from './Categoria'
import { useAuth } from '../hooks/useAuth'

export default function Sidebar() {

    const { categorias } = useKiosco()
    const { logout, user } = useAuth({middleware: 'auth'});

  return (
    <aside className='md:w-72'>
       <div className='p-4'>
            <img 
                src="img/logo.svg" 
                alt="logo"
                className='w-40' 
            />
       </div>

       <p className='my-3 text-xl text-center'>Hola: { user?.name }</p>

       <div className=' mt-5'>
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
            onClick={logout}
        >
            Cancelar Orden
        </button>
        </div>        

    </aside>
  )
}
