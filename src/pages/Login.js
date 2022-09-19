import { useEffect, useState } from 'react';
import { getTokenFromUrl, loginUrl } from '../services/spotify';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyInstance = new SpotifyWebApi();

export default function Login() {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const _token = getTokenFromUrl()
        window.location.hash = ''
        if (_token) {
            setToken(_token)
            console.log(_token)
            spotifyInstance.setAccessToken(_token)
            spotifyInstance.getMe().then(_user => {
                setUser(_user)
                console.log(_user)
            })
        }
    }, []);

    return (
        <div className='text-center'>
            <h1 className='text-bold text-3xl'>Sección especial para uso de los Atletas</h1>
            <div className='flex justify-center'>
                <p className='max-w-4xl text-justify p-2'>En está sección podrá conectarse al módulo de reproducción de El Gimnasio por medio del servicio de música de streaming Spotify. De manera que, disrutará de su música favorita dentro de las instalaciones y podrá compartir sus gustos musicales con sus compañeros. Asimismo, tendrá la opción de registrar sus avances como su retroalimentación sobre el servicio de música inteligente de fondo por medio de los servicios de Google Forms, de manera que la administración pueda brindarle un mejor servicio.</p>
            </div>
            {
                !token ? (
                    <div className='mt-10'>
                        <a href={loginUrl} className='bg-green-500 rounded-full text-white font-bold p-4 hover:bg-green-600'>INICIAR SESIÓN CON SPOTIFY</a>
                        <p className='mt-5'>Leer todas las polisitcas de privacidad antes de aceptar los permisos correspondientes.</p>
                    </div>
                ) : (
                    <div className='flex justify-center'>
                        <div className='mt-6 p-2'>
                            <div className='flex rounded overflow-hidden shadow-lg'>
                                <img className='w-44 h-44' src={user ? user.images[0].url : null} alt='User path' />
                                <div className='w-80'>
                                    <h1 className='font-bold text-2xl'>{user ? user.display_name : null}</h1>
                                    <p className='text-left pl-3'>correo:</p>
                                    <p className='text-left pl-3'>telefono:</p>
                                    <div className='mt-4'>
                                        <span className='bg-green-400 rounded-full font-bold text-white text-sm p-2'>Atleta activo</span>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-6'>
                                <a href='' target='_blank' className='bg-blue-500 rounded-full font-bold text-white p-4 mr-4 hover:bg-blue-600'>REGISTRAR AVANCE</a>
                                <button onClick={() => { setToken(null) }} className='bg-red-500 rounded-full font-bold text-white p-4 hover:bg-red-600'>CERRAR SESIÓN</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
