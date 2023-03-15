import React from 'react'
import { useState, useEffect } from 'react';
import useKiosco from '../hooks/useKiosco'
import { formatearDinero } from '../helpers';

export default function ModalProducto() {

  const { producto, handleClickModal, handleAgregarPedido, pedido } = useKiosco();
  // console.log(producto);

  const [ cantidad, setCantidad ] = useState(1);
  const [ edicion, setEdicion ] = useState(false);

  useEffect(() => {
    // console.log('Agregaste algo al pedido');
    if (pedido.some( pedidoState => pedidoState.id === producto.id)) {
        // console.log('Si esta en el pedido');
        const productoEdicion = pedido.filter( pedidoState => pedidoState.id === producto.id)[0];
        setCantidad(productoEdicion.cantidad)
        setEdicion(true)
    }
  }, [pedido])

  return (
    <div className='md:flex gap-10'>
        <div className='md:w-1/3'>
            <img 
                src={`/img/${producto.imagen}.jpg`} 
                alt={`Imagen producto ${producto.nombre}`} />
        </div>
        <div className='md:w-2/3'>
            <div className='flex justify-end'>
                <button onClick={handleClickModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-500 hover:text-amber-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </button>
            </div>
            <h1 className='text-2xl font-bold mt-5'>
                { producto.nombre }
            </h1>
            <p className='mt-5 font-black text-4xl text-amber-500'>
                { formatearDinero(producto.precio) }
            </p>
            <div className='flex gap-4 mt-5 items-center'>
                <button 
                    type='button'
                    onClick={() => {
                        if (cantidad <=1) { return }
                        setCantidad( cantidad - 1 )
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${ cantidad <=1 ? 'text-gray-200 hover:text-gray-300' : 'text-amber-500 hover:text-amber-700' }`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <p className='text-3xl'>{ cantidad }</p>
                <button 
                    type='button'
                    onClick={() => {
                        if (cantidad >=5) { return }
                        setCantidad( cantidad + 1 )
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${ cantidad >=5 ? 'text-gray-200 hover:text-gray-300' : 'text-amber-500 hover:text-amber-700' }`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
            <button 
                type='button'
                className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded'
                onClick={() => {
                    handleAgregarPedido({...producto, cantidad}),
                    handleClickModal()
                }}
            >
                {edicion ? 'Guardar cambios' : 'Añadir al pedido'}
                {/* Añadir al pedido */}
            </button>
        </div>
    </div>
  )
}
