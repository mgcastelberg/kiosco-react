import React from 'react'
import { productos as data } from "../data/productos";
import Producto from '../components/Producto';
import useKiosco from '../hooks/useKiosco';
import useSWR from 'swr'
import clienteAxios from '../config/axios';

export default function Inicio() {
    // console.log(productos);
    // cuando solo teniamo la variable hola:"hola mundo"
    // const { hola } = useKiosco()
    // console.log(hola);

    const { categoriaActual } = useKiosco()

    // Para debugear que trae el servicio
    // const fetcher = () => clienteAxios('/api/productos').then(data => { console.log(data); })
    const token = localStorage.getItem('AUTH_TOKEN');
    // Consulta SWR
    const fetcher = () => clienteAxios('/api/productos',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(data => data.data)
    // const { data, error, isLoading } = useSWR('/api/productos', fetcher)
    const { data, error, isLoading } = useSWR('/api/productos', fetcher,{
        refreshInterval: 3000
    })
    
    // console.log(data);
    // console.log(error);
    // console.log(isLoading);
    // return

    if (isLoading) return 'Cargando...'
    // return


    // filtrando productos
    const productos = data.data.filter( producto => producto.categoria_id === categoriaActual.id )
    // const productos = data.filter( producto => producto.categoria_id === categoriaActual.id )


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
                    btnAgregar={true}
                />
            ))}
        </div>
    </>
  )
}
