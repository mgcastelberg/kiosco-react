import React from 'react'
import useSWR from 'swr'
import clienteAxios from '../config/axios'
import Producto from '../components/Producto';

export default function Productos() {

  const token = localStorage.getItem('AUTH_TOKEN');
  const fetcher = () => clienteAxios('/api/productos', {
    headers: { 
      Authorization: `Bearer ${token}`
    }
  }).then( datos => datos.data );

  const { data, error, isLoading } = useSWR('/api/productos', fetcher, { refreshInterval: 3000 });

  if (isLoading) return 'cargando...';

  console.log(data.data);

  return (
    <>
        <div className='w-full flex items-center mt-3bg-slate-50 mt-3'>
            <h1 className=' flex-1 text-3xl font-black'>
                Productos
            </h1>
        </div>

        <p className='text-xl my-4'>
            Maneja la disponibilidad desde aquí.
        </p>

        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
            { data.data.map( producto => (
                <Producto
                    key={producto.imagen}
                    producto={producto}
                    btnDisponible={true}
                />
            ))}
        </div>
    </>
  )
}
