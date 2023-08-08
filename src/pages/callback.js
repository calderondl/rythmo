import { useEffect } from 'react'
import { useRouter } from 'next/router'
import SpotifyWebApi from 'spotify-web-api-js'

export default function Callback() {
    const router = useRouter()

    async function setAccessToken() {
        const urlParams = new URLSearchParams(window.location.hash)
        const _accessToken = urlParams.get('#access_token')
        if (_accessToken) {
            await fetch('/api/session', {
                method: 'POST',
                body: JSON.stringify({
                    accessToken: _accessToken
                }),
                headers: { 'Content-Type': 'application/json' },
            })

            const spotifyApi = new SpotifyWebApi()
            spotifyApi.setAccessToken(_accessToken)
            const _user = await spotifyApi.getMe()

            const _newuser = {
                accessToken: _accessToken,
                createdAt: new Date(),
                data: JSON.stringify(_user)
            }

            await fetch('api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(_newuser),
            })
                .then(response => response.json())
                .catch((error) => {
                    console.error('Error:', error);
                });

            router.push('/?saved=true').then(() => router.reload())
        }
    }

    useEffect(() => {
        // Only run this code in the browser, not during server-side rendering
        if (typeof window !== 'undefined') {
            setAccessToken()
        }
    }, [])

    return null
}