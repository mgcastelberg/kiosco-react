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
        <h1 className=' text-4xl font-bold'>{ categoriaActual.nombre }</h1>
        <p className=' text-2xl my-10'>
            Elije y perzonaliza tu pedido a continuación.
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
