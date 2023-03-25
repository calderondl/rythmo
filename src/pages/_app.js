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
    const response = await fetch('/api/session')
    const accessToken = await response.json()
    if (accessToken) {
      const spotifyApi = new SpotifyWebApi()
      spotifyApi.setAccessToken(accessToken)
      const _user = await spotifyApi.getMe()
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
    fetchSessionData()
  }, [])
  
  return (
    <div className='bg-gray-800 min-h-screen'>
      <Head>
        <title>Rythmo</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='max-w-screen-lg mx-auto px-4'>
        <header className='text-white py-4 rounded-t-lg'>
          <div className='flex justify-between items-center'>
            <div className='text-lg font-extrabold'>
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
                      <Avatar src={user.images[0] ? user.images[0].url : '/images/user.png'} size={32} round className='bg-gray-600'/> {user.display_name}
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
        <Component {...pageProps} user={user} />
      </div>
      <footer className='text-gray-400 py-2 absolute bottom-0 w-full'>
        <div className='max-w-screen-lg mx-auto px-4 flex justify-between items-center'>
          <div className='flex gap-1'>
            <span>&copy;</span>
            <span>{new Date().getFullYear()}</span>
            <span>•</span>
            <span>Rythmo&reg;</span>
            <span>•</span>
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
  )
}