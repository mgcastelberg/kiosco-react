import clienteAxios from "../config/axios";
import useSWR from 'swr';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = ({middleware, url}) => {

    const token = localStorage.getItem('AUTH_TOKEN');
    const navigate = useNavigate();

    const { data: user, error, mutate} = useSWR('/api/user', () => 
        clienteAxios('/api/user',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then( res => res.data )
        .catch( error => { 
            throw Error(error?.response?.data?.error)
         })
    );

    // console.log(user);
    // console.log(error);

    useEffect(() => {
        if(middleware === 'guest' && url && user){
            navigate(url)
        }
        console.log(middleware);
        if(middleware === 'auth' && !user){
            navigate('/auth/login')
        }
    }, [user, error])

    const login = async(datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/login', datos)
            localStorage.setItem('AUTH_TOKEN',data.token);
            setErrores([]);
            await mutate()
        } catch (error) {
            // console.log(error.response.data.errors);
            // console.log(Object.values(error.response.data.errors));
            setErrores(Object.values(error.response.data.errors));
        }
    }

    const registro = async(datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/registro', datos)
            // console.log(data.token);
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]); //limpia el state
            await mutate() //revalida el usuario
        } catch (error) {
            // console.log(error.response.data.errors);
            // console.log(Object.values(error.response.data.errors));
            setErrores(Object.values(error.response.data.errors));
        }
    }

    const logout = async() => {
        try {
            await clienteAxios.post('/api/logout', null, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('AUTH_TOKEN');
            await mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.error)
        }
    }

    return {
        login,
        registro,
        logout,
        user,
        error
    }

}