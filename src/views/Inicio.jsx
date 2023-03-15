import React from 'react'
import { productos as data } from "../data/productos";
import Producto from '../components/Producto';
import useKiosco from '../hooks/useKiosco';

export default function Inicio() {
    // console.log(productos);
    // cuando solo teniamo la variable hola:"hola mundo"
    // const { hola } = useKiosco()
    // console.log(hola);

    const { categoriaActual } = useKiosco()

    // filtrando productos
    const productos = data.filter( producto => producto.categoria_id === categoriaActual.id )


  return (
    <>
        <div className='w-full flex items-center mt-3bg-slate-50 mt-3'>
            <img src={`/img/icono_${categoriaActual.icono}.svg`} alt="Imagen icono"
                className=' w-8 h-8'
            />
            <h1 className=' flex-1 text-3xl font-black ml-3'>
                { categoriaActual.nombre }
            </h1>
        </div>

        <p className=' text-xl my-4'>
            Elije y personaliza tu pedido a continuación.
        </p>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
            { productos.map( producto => (
                <Producto 
                    key={producto.imagen}
                    producto={producto}
                />
            ))}
        </div>
    </>
  )
}
