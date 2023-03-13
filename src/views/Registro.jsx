import React from 'react'
import { Link } from "react-router-dom";

// <></> se le llama fragment

export default function Registro() {
  return (
    <> 
        <h1 className='text-4xl font-black'>Crea tu Cuenta</h1>
        <p>Crea tu cuenta llenando el formulario</p>

        <div className=' bg-white rounded-md mt-4 px-5 py-7 shadow-md'>
            <form action="">

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
                    />
                </div>

                <div className=' mb-4'>
                    <label 
                        htmlFor="password_confirmation"
                        className=' text-slate-800'
                    >Confirmar Password:
                    </label>
                    <input 
                        type="password_confirmation"
                        id="password_confirmation"
                        name="password_confirmation"
                        className="mt-2 w-full p-3 bg-gray-50 rounded-sm"
                        placeholder="Repetir password"
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
