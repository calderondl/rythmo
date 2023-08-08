import Link from 'next/link'
import { useRouter } from 'next/router'
import SpotifyWebApi from 'spotify-web-api-js'

export default function Home({ user, handleLogin, playlist }) {
  const router = useRouter()

  const now = new Date()
  const timeIn24Format = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM'
  const hour12Format = now.getHours() % 12 || 12
  const timeIn12Format = `${hour12Format.toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} ${ampm}`

  // console.log(playlist)


  return (
    <main className='py-10'>
      <h1 className='text-5xl font-bold text-gray-100 mb-8 text-center lg:text-center'>
        {user ? 'Bienvenido ' : 'Bienvenido a '}
        <span className='text-7xl font-extrabold text-transparent bg-gradient-to-r from-green-700 to-green-400 bg-clip-text'>
          {user ? user.display_name : 'RYTHMO'}
        </span>
      </h1>
      {user ? (
        <>
          <p className='text-gray-300 text-2xl mb-8 px-1 text-center'>
            ¡Disfruta de la lista de reproducción!. Para más detalles sobre tu progreso ingresa a tu { }
            <Link href='/profile' className='text-green-400 hover:text-green-600'>
              perfil
            </Link>
            .
          </p>
          <div className="flex flex-col md:flex-row justify-center mt-8">
          <div className="md:w-1/2 bg-gray-600 rounded-lg m-2 md:mr-1 h-16 md:h-60 flex items-center justify-center">
              <div className="my-2 w-10 h-10 rounded-full bg-red-400 flex items-center justify-center text-white font-bold text-lg">
                !
              </div>
              <p className="text-gray-300 font-semibold text-lg ml-2">Lista de reproducción</p>
            </div>
            <div className="md:w-1/2 bg-gray-600 rounded-lg m-2 md:ml-1 h-16 md:h-60">
              <table class="min-w-full table-auto">
                <thead class="text-white">
                  <tr className='text-left '>
                    <th class="py-2 px-4"></th>
                    <th class="py-2 px-4  font-bold ">Atletas conectados</th>
                    <th class="py-2 px-4 font-bold ">Hora ingreso</th>
                  </tr>
                </thead>
                <tbody className='text-white'>
                  <tr className='hover:bg-gray-400'>
                    <td class="w-1/6 py-2 px-4">1</td>
                    <td class="w-1/3 py-2 px-4">{user.display_name}</td>
                    <td class="w-1/3 py-2 px-4">{timeIn24Format}</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </>
      ) : (
        <>
          <p className='text-gray-300 text-2xl mb-4 px-1 text-center'>
            ¡Imagínate poder conectarte con otros atletas, compartir tus gustos musicales y disfrutar de una experiencia musical única que te motivará y te inspirará a lograr tus objetivos de entrenamiento!
          </p>
          <button onClick={handleLogin} className='bg-green-500 hover:bg-green-600 text-white py-4 px-8 rounded-full font-bold text-xl mx-auto block'>
            Inicia sesión con Spotify
          </button>
          <div className="flex flex-col md:flex-row justify-center mt-8">
            <div className="md:w-1/2 bg-gray-600 rounded-lg m-2 md:mr-1 h-16 md:h-60 flex items-center justify-center">
              <div className="my-2 w-10 h-10 rounded-full bg-red-400 flex items-center justify-center text-white font-bold text-lg">
                !
              </div>
              <p className="text-gray-300 font-semibold text-lg ml-2">Lista de reproducción</p>
            </div>
            <div className="md:w-1/2 bg-gray-600 rounded-lg m-2 md:ml-1 h-16 md:h-60 flex items-center justify-center">
              <div className="my-2 w-10 h-10 rounded-full bg-red-400 flex items-center justify-center text-white font-bold text-lg">
                !
              </div>
              <p className="text-gray-300 font-semibold text-lg ml-2">Atletas conectados</p>
            </div>
          </div>
        </>
      )}
    </main >
  )
}