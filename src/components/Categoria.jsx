import React from 'react'
import useKiosco from '../hooks/useKiosco';

export default function Categoria({categoria}) {
    // console.log(categoria);

    const { handleClickCategoria, categoriaActual } = useKiosco();
    const {icono, id, nombre} = categoria

    const resaltaCatAct = () => categoriaActual.id === id ? "bg-amber-400": "bg-white"

{/* <div className={`${resaltaCatAct()} flex items-center gap-4 border w-full p-3 hover:bg-amber-500 cursor-pointer`}>
        <img src={`/img/icono_${icono}.svg`} alt="Imagen icono"
            className='w-11'
        />
        <button 
            className='text-lg font-bold cursor-pointer truncate'
            type='button'
            onClick={() => handleClickCategoria(id)}
        >
            { nombre }
        </button>
    </div> */}

    return (
    <div
        className={`${resaltaCatAct()} flex items-center gap-4 border w-full p-3 hover:bg-amber-500 cursor-pointer`}
        onClick={() => handleClickCategoria(id)}
    >
        <img src={`/img/icono_${icono}.svg`} alt="Imagen icono"
            className='w-11 h-11'
        />
        <p className='text-lg font-bold truncate'>
            { nombre }
        </p>
    </div>
    )
}
