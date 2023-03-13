import { createContext, useState } from "react"
import { categorias as categoriasDB } from '../data/categorias'

const KioscoContext = createContext();

const KioscoProvider = ({children}) => {
    // podemos retornar variables o funciones
    // const hola = "Hola Mundo";

    // tres partes 2 ocurren del signo de igual a la izq y la 3ra dentro del parentesis de useState(valor inicial)
    // const [ <NombreDelState>, set<NombreDelState> ] = useState(categoriasDB);
    const [ categorias, setCategorias ] = useState(categoriasDB);
    const [ categoriaActual, setCategoriaActual ] = useState(categorias[0]);
    // console.log(categorias[0]);

    const [ modal, setModal ] = useState(false)
    const [ producto, setProducto ] = useState({})

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

    return (
        <KioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto
            }}
        >{children}</KioscoContext.Provider>
    )
}

export {
    KioscoProvider
}
export default KioscoContext