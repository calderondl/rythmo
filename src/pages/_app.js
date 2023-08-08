import '@/styles/globals.css'

import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Avatar from 'react-avatar'
import SpotifyWebApi from 'spotify-web-api-js'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [user, setUser] = useState(null)

  async function fetchSessionData() {
    if (user) return
    const sessionResponse = await fetch('/api/session')
    const accessToken = await sessionResponse.json()
    if (accessToken) {  
      const userResponse = await fetch('/api/users/' + accessToken)
      const _user = await userResponse.json()
      _user.data = JSON.parse(_user.data)
      console.log(_user)
      setUser(_user)
    }
  }

  const handleLogin = () => {
    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
    const redirect_uri = `${process.env.NEXT_PUBLIC_BASE_URL}/callback`
    const scope = 'user-read-private user-read-email user-read-currently-playing user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state'

    const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=token&show_dialog=true`
    router.push(url)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchSessionData()
    }
  }, [])

  return (
    <div className='bg-gray-800 min-h-screen'>
      <Head>
        <title>Rythmo</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='max-w-screen-lg mx-auto'>
        <header className='text-white py-4 rounded-t-lg w-full'>
          <div className='flex flex-col justify-between items-center md:flex-row'>
            <div className='my-3 text-2xl md:text-lg font-extrabold'>
              <Link href='/' className='hover:text-gray-400'>
                Rythmo
              </Link>
            </div>
            <nav>
              <ul className='flex space-x-4'>
                <li>
                  <Link href='/about' className='hover:text-gray-400 font-semibold'>
                    Acerca de
                  </Link>
                </li>
                <li>
                  <Link href='/contact' className='hover:text-gray-400 font-semibold'>
                    Contacto
                  </Link>
                </li>
                <li>
                  {user ? (
                    <Link href='/profile' className='hover:text-gray-400 font-semibold'>
                      <Avatar src={user.data.images?.[0]?.url || '/images/user.png'} size={32} round className='bg-gray-600' /> {user.data.display_name}
                    </Link>
                  ) : (
                    <button onClick={handleLogin} className='hover:text-gray-400 font-semibold'>
                      <Avatar src='/images/user.png' size={32} round className='bg-green-500' /> Iniciar sesión
                    </button>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <Component {...pageProps} user={user} handleLogin={handleLogin} />
        <footer className='text-gray-400 py-2 absolute bottom-0 w-full'>
          <div className='max-w-screen-lg flex flex-col md:flex-row justify-between items-center'>
            <div className='flex gap-1'>
              <span>&copy; {new Date().getFullYear()} </span>
              <span>Rythmo&reg; </span>
              <span>• </span>
              <a href='https://github.com/calderondl' className='hover:text-blue-400 hover:underline'>github.com/calderondl</a>
            </div>
            <div className='flex gap-1'>
              <Link href='/terms' className='hover:text-blue-400 hover:underline'>Términos de servicio</Link>
              <span>•</span>
              <Link href='/policy' className='hover:text-blue-400 hover:underline'>Política de privacidad</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}