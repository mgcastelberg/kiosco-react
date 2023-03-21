import React from 'react'
import {createRef, useState} from 'react'
import { Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';


export default function Login() {

    const emailRef = createRef();
    const passwordRef = createRef();

    const [errores, setErrores] = useState([]);
    const { login } = useAuth({
        middleware: 'guest',
        url: '/'
    });

    const handleSubmit = async e => {
        e.preventDefault();
        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        login(datos, setErrores);
    }

  return (
    <> 
        <h1 className='text-4xl font-black'>Iniciar sesión</h1>
        <p>Para crear un pedido debes iniciar sesión</p>

        <div className=' bg-white rounded-md mt-4 px-5 py-7 shadow-md'>
            <form
                onSubmit={handleSubmit}
                noValidate
            >

                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null }

                <div className=' mb-4'>
                    <label 
                        htmlFor="email"
                        className=' text-slate-800'
                    >Email:
                    </label>
                    <input 
                        type="text"
                        id="email"
                        name="email"
                        className="mt-2 w-full p-3 bg-gray-50 rounded-sm"
                        placeholder="Tu email"
                        ref={emailRef}
                    />
                </div>

                <div className=' mb-4'>
                    <label 
                        htmlFor="password"
                        className=' text-slate-800'
                    >Password:
                    </label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        className="mt-2 w-full p-3 bg-gray-50 rounded-sm"
                        placeholder="Tu password"
                        ref={passwordRef}
                    />
                </div>

                <div className="mb-2">
                    <input 
                        type="submit"
                        value="Iniciar Sesión"
                        className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer'
                    />
                </div>

            </form>
        </div>

        <nav className='mt-5'>
            <Link to="/auth/registro">
                ¿Notienes cuenta? Crea una
            </Link>
        </nav>

    </>
  )
}
