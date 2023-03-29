import React from 'react'
import clienteAxios from '../config/axios';
import useSWR from 'swr';
import { formatearDinero  } from "../helpers";
import useKiosco from '../hooks/useKiosco';

export default function Ordenes() {


    
    const token = localStorage.getItem('AUTH_TOKEN');
    const fetcher = () => clienteAxios('/api/pedidos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const { data, error, isLoading} = useSWR('/api/pedidos',fetcher);
    // const { data, error, isLoading} = useSWR('/api/pedidos',fetcher, {refreshInterval: 1000});

    // console.log(data?.data);
    // console.log(error);
    // console.log(isLoading);
    const { handleClickCompletarPedido } = useKiosco();


    if(isLoading){
        return 'Cargando...';
    }

  return (
    <>
        <div className='w-full flex items-center mt-3bg-slate-50 mt-3'>
            <h1 className=' flex-1 text-3xl font-black'>
                Ordenes
            </h1>
        </div>

        <p className='text-xl my-4'>
            Administra las ordenes desde aquí.
        </p>

        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
            {data?.data.data.map(pedido => (
                <div key={pedido.id} className='p-5 bg-white shadow space-y-2 border-b'>
                    <p className='text-xl font-bold text-slate-600'>
                        Contenido del Pedido: { pedido.id }
                    </p>
                    { pedido.productos.map( producto => (
                        <div
                            key={ producto.id }
                            className='border-b border-b-slate-200 last-of-type:border-none py-4'    
                        >
                            <p className='text-sm'>Id: {producto.id}</p>
                            <p className='text-sm'>{producto.nombre}</p>
                            <p>
                                Cantidad: {''}
                                <span className='font-bold'>{producto.pivot.cantidad}</span>
                            </p>
                        </div>
                    ))}
                    <p className='text-lg font-bold text-slate-600'>
                        Cliente: {''}
                        <span className='font-normal'>{pedido.user.name}</span>
                    </p>
                    <p className='text-lg font-bold text-amber-600'>
                        Total a pagar: {''}
                        <span className='font-normal text-slate-600'>{formatearDinero(pedido.total)}</span>
                    </p>
                    <button 
                        type="button"
                        className='bg-indigo-600 hover:bg-indigo-800  px-5 py-2 rounded uppercase font-bold text-white text-ceter w-full'
                        onClick={() => handleClickCompletarPedido( pedido.id )}
                    >Completar</button>

                </div>
            ))}
        </div>
    </>
  )
}
