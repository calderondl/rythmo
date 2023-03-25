import { withIronSession } from 'next-iron-session'

async function handler(req, res) {
    if (req.method === 'POST') {

        const { accessToken } = req.body
        req.session.set('accessToken', accessToken)
        await req.session.save()
        res.status(200).send('Variable de sesión guardada con éxito');

    } else if (req.method === 'GET') {

        const sessionData = req.session.get('accessToken')
        console.log(`que obtiene cuando no hay accesstoke: ${sessionData}`)
        if (sessionData) {
            res.json(sessionData)
        }
        else {
            res.json(null)
        }

    } else if (req.method == 'DELETE') {

        req.session.unset('accessToken')
        await req.session.save()
        res.status(200).send('Variable de sesión eliminada con éxito');
        
    } else {
        res.status(405).end()
    }
}

export default withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'myapp_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
})
