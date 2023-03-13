import React from 'react'
import { formatearDinero  } from "../helpers";
import useKiosco from '../hooks/useKiosco';

export default function Producto({producto}) {
    // console.log(producto);
    const {nombre,imagen, precio} = producto

    // creamos para llamar la funcion que modifique el state
    const { handleClickModal, handleSetProducto } = useKiosco();

    return (
        <div className='border p-3 shadow bg-white'>
            <img 
                className='w-full'
                src={`/img/${imagen}.jpg`} 
                alt={`imagen ${nombre}`} />

            <div>
                <h3 className='text-xl font-bold'>{nombre}</h3>
                <p className='mt-5 font-black text-3xl text-amber-500'>
                    { formatearDinero(precio) }
                </p>
                <button 
                    type='button'
                    className=' bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold'
                    onClick={ () => {
                        handleClickModal();
                        handleSetProducto(producto);
                    }}
                >
                        Agregar
                </button>
            </div>   
        </div>
    )
}
