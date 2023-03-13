import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <> 
        <h1 className='text-4xl font-black'>Iniciar sesión</h1>
        <p>Para crear un pedido debes iniciar sesión</p>

        <div className=' bg-white rounded-md mt-4 px-5 py-7 shadow-md'>
            <form action="">

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
