import { useEffect, useState } from "react";
import { getTokenFromUrl, loginUrl } from "../spotify";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyInstance = new SpotifyWebApi();

export default function Login(){
    const [token, setToken] = useState(null)    

    useEffect(()=>{
        const _token = getTokenFromUrl()
        window.location.hash=''
        if(_token){
            setToken(_token)
            console.log(_token)
            spotifyInstance.setAccessToken(_token)
            spotifyInstance.getMe().then(_user =>{
                console.log(_user)                          
            })            
        }         
    }, []);

    return(
        <div className="text-center">
            <h1 className="text-bold text-3xl mb-4">Sección especial para uso de los Atletas</h1>
            {
                !token ? (
                    <div className="">
                        <h2 className="pb-4">Iniciar sesión con Spotify</h2>                                                
                        <a href={loginUrl} className="p-4 rounded-full bg-green-500 font-extrabold text-white">INICIAR SESIÓN</a>
                        <p className="pt-4 font-light">Leer todas las polisitcas de privacidad antes de aceptar los permisos correspondientes.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="">
                            <h2 className="">Cerrar sesión de Spotify</h2>
                            <button onClick={() => { setToken(null) }} className="p-4 rounded-full bg-red-600 font-extrabold text-white">CERRAR SESIÓN</button>
                        </div>
                        <div className="">
                            <h2 className="pb-4">Registrar avance con Google Forms</h2>
                            <a href='' className="p-4 rounded-full bg-blue-500 font-extrabold text-white">REGISTRAR</a>
                        </div>
                    </div>                    
                )
            }            
        </div>
    );
}
