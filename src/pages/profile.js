import { useRouter } from 'next/router'

export default function Profile({user}) {
    const router = useRouter()

    async function handleLogout() {
        await fetch('/api/session', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        await fetch('/api/users/'+user.id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        router.push('/').then(() => router.reload())        
    }

    return (
        <div>
            <h1 className='text-3xl text-white'>Profile</h1>
            <button onClick={handleLogout} className='bg-red-500 hover:bg-red-600 text-white py-4 px-8 rounded-full font-bold text-xl mx-auto block'>
                Cerrar Sesión
            </button>
        </div>
    )
}