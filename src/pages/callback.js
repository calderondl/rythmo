import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Callback() {
    const router = useRouter()

    async function setAccessToken() {
        const urlParams = new URLSearchParams(window.location.hash)
        const accessToken = urlParams.get('#access_token')
        if (accessToken) {
            await fetch('/api/session', {
                method: 'POST',
                body: JSON.stringify({
                    accessToken: accessToken
                }),
                headers: { 'Content-Type': 'application/json' },
            })
            router.push('/?saved=true').then(() => router.reload())
        }
    }

    useEffect(() => {
        setAccessToken()
    }, [])

    return null
}