import { createContext, useState, useEffect } from "react"
import { toast } from 'react-toastify'
// import { categorias as categoriasDB } from '../data/categorias'
import clienteAxios from "../config/axios";


const KioscoContext = createContext();

const KioscoProvider = ({children}) => {
    // podemos retornar variables o funciones
    // const hola = "Hola Mundo";

    // tres partes 2 ocurren del signo de igual a la izq y la 3ra dentro del parentesis de useState(valor inicial)
    // const [ <NombreDelState>, set<NombreDelState> ] = useState(categoriasDB);
    // const [ categorias, setCategorias ] = useState(categoriasDB);
    const [ categorias, setCategorias ] = useState([]);
    // const [ categoriaActual, setCategoriaActual ] = useState(categorias[0]);
    const [ categoriaActual, setCategoriaActual ] = useState({});
    // console.log(categorias[0]);

    const [ modal, setModal ] = useState(false)
    const [ producto, setProducto ] = useState({})

    const [ pedido, setPedido ] = useState([])
    const [ total, setTotal ] = useState(0)

    useEffect(() => {
        const nuevoTotal = pedido.reduce( (total, producto) => ( producto.precio * producto.cantidad ) + total, 0 )
        setTotal(nuevoTotal)
    }, [pedido])

    const obtenerCategorias = async () => {
        try {
            const token = localStorage.getItem('AUTH_TOKEN');
            const { data } = await clienteAxios('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(data.data);
            setCategorias(data.data);
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtenerCategorias();
    }, [])

    const handleSetProducto = producto => {
        setProducto(producto)
        // console.log(producto);
    }

    const handleClickCategoria = id => {
        // console.log(id);
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        // console.log(categoria);
        setCategoriaActual(categoria)
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    // Eliminando campos que no ocupamos {categoria_id, imagen, ...producto}
    const handleAgregarPedido = ({categoria_id, ...producto}) => {
        // console.log(producto);
        
        if (pedido.some( pedidoState => pedidoState.id === producto.id)) {
            // console.log('Si esta en el pedido');
            const pedidoActualizado = pedido.map( pedidoState => pedidoState.id === producto.id ?
            producto : pedidoState )
            setPedido(pedidoActualizado)
            toast.success('Guardado correctamente');
            // setEdicion(true)
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido');
        }
    }

    const handleEditarCantidad = id => {
        // console.log(id);
        const productoAtualizar = pedido.filter( producto => producto.id === id)[0];
        setProducto(productoAtualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Eliminado del pedio')
    }

    const handleSubmitNuevaOrden = async (logout) => {
        try {
            const token = localStorage.getItem('AUTH_TOKEN');
            const { data } = await clienteAxios.post('/api/pedidos', 
            {
                total,
                productos: pedido.map( producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                 }),
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message);
            setTimeout(() => {
                setPedido([])
            }, 1000);

            // Cerrar la sesion del usuario
            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN');
                logout();
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }

    const handleClickCompletarPedido = async id => {
        // console.log(id);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickProductoAgotado = async id => {
        // console.log(id);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            await clienteAxios.put(`/api/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <KioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }}
        >{children}</KioscoContext.Provider>
    )
}

export {
    KioscoProvider
}
export default KioscoContext