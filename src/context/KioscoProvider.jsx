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
            const { data } = await clienteAxios('/api/categorias');
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
                total
            }}
        >{children}</KioscoContext.Provider>
    )
}

export {
    KioscoProvider
}
export default KioscoContext