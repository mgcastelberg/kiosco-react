import React from 'react'
import useKiosco from '../hooks/useKiosco'
import ResumenProducto from './ResumenProducto';
import { formatearDinero } from '../helpers';

export default function Resumen() {

  const {pedido, total} = useKiosco();
  const comprobarPedido = () => pedido.length === 0; //return true/false

  return (
    <aside className='w-72 h-screen overflow-y-scroll p-3'>
      <h1 className='text-3xl font-black'>
        Mi pedido
      </h1>
      <p className='my-5'>
        Aqui podras ver el resumen y totales de tu pedido
      </p>

      <div className='py-3'>
        {pedido.length === 0 ? (
          <p className='text-center text-2xl text-gray-700'>
            No hay elementos en tu pedido aun.
          </p>
        ) : (
          pedido.map(producto => (
            <ResumenProducto
              key={producto.id}
              producto={producto}
            />
          ))
        )}
      </div>

      {/* <div className=' absolute bottom-0 pb-3 bg-slate-200 w-64'> */}
        <p className='text-xl mt-3'>
            Total: {''}
            { formatearDinero(total) }
        </p>

        <form 
          className='w-full pb-5'
        >
          <div className='pt-3'>
            <input 
              type="submit"
              className={`${comprobarPedido() ? 'bg-indigo-200' : 'bg-indigo-600 hover:bg-indigo-800'}  px-5 py-2 rounded 
                        uppercase font-bold text-white text-ceter w-full`}
              value={'confirmar pedido'}
              disabled={comprobarPedido()}
            />
          </div>
        </form>
      {/* </div> */}

    </aside>
  )
}
