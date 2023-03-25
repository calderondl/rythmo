import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home({ user }) {
  const router = useRouter()

  const handleLogin = () => {
    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
    const redirect_uri = `${process.env.NEXT_PUBLIC_BASE_URL}/callback`
    const scope = 'user-read-private user-read-email user-read-currently-playing user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state'

    const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=token&show_dialog=true`
    router.push(url)
  }  

  return (
    <main className='py-16'>
      <h1 className='text-5xl font-bold text-gray-100 mb-8 text-center lg:text-center'>
        {user ? 'Bienvenido ' : 'Bienvenido a '}
        <span className='text-7xl font-extrabold text-transparent bg-gradient-to-r from-green-700 to-green-400 bg-clip-text'>
          {user ? user.display_name : 'RYTHMO'}
        </span>
      </h1>
      <p className='text-gray-300 text-xl mb-8 text-center lg:text-left'>
        Somos una plataforma de música moderna y juvenil, que ofrece las últimas noticias, tendencias y listas de reproducción de música.
      </p>
      <p className='text-gray-300 text-xl mb-8 text-center lg:text-left'>
        Manténgase atento a nuestras últimas actualizaciones y asegúrese de seguirnos en las redes sociales.
      </p>
      <button onClick={handleLogin} className='bg-green-500 hover:bg-green-600 text-white py-4 px-8 rounded-full font-bold text-xl mx-auto block'>
        Inicia sesión con Spotify
      </button>
      
    </main >
  )
}