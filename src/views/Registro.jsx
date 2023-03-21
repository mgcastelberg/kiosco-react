import React from 'react'
import {createRef, useState} from 'react'
import { Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

// <></> se le llama fragment

export default function Registro() {

    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([]);
    const { registro } = useAuth({middleware: 'guest', url: '/'});

    const handleSubmit = async e => {
        e.preventDefault();
        // console.log(nameRef.current.value);
        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        // console.log(datos);
        
        // usar el reguistro de useAuth
        registro(datos, setErrores);

    }

  return (
    <> 
        <h1 className='text-4xl font-black'>Crea tu Cuenta</h1>
        <p>Crea tu cuenta llenando el formulario</p>

        <div className=' bg-white rounded-md mt-4 px-5 py-7 shadow-md'>
            <form 
                onSubmit={handleSubmit}
                action=""
                noValidate
            >

                {/* {errores ? errores.map(error => <Alerta key={error}>{error}</Alerta>) : null } */}
                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null }

                <div className=' mb-4'>
                    <label 
                        htmlFor="name"
                        className=' text-slate-800'
                    >Nombre:
                    </label>
                    <input 
                        type="text"
                        id="name"
                        name="name"
                        className="mt-2 w-full p-3 bg-gray-50 rounded-sm"
                        placeholder="Tu nombre"
                        ref={nameRef}
                    />
                </div>

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

                <div className=' mb-4'>
                    <label 
                        htmlFor="password_confirmation"
                        className=' text-slate-800'
                    >Confirmar Password:
                    </label>
                    <input 
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        className="mt-2 w-full p-3 bg-gray-50 rounded-sm"
                        placeholder="Repetir password"
                        ref={passwordConfirmationRef}
                    />
                </div>

                <div className="mb-2">
                    <input 
                        type="submit"
                        value="Crear cuenta"
                        className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer'
                    />
                </div>

            </form>
        </div>

        <nav className='mt-5'>
            <Link to="/auth/login">
                ¿Ya tienes cuenta? Inicia Sesión
            </Link>
        </nav>

    </>
  )
}
