import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === 'GET'){
    const _accessToken = req.query.id
    const User = await prisma.user.findFirst({ where: { accessToken: _accessToken }})
    res.json(User)
  }
  else if (req.method === 'DELETE') {
    const id = parseInt(req.query.id, 10)
    const deletedUser = await prisma.user.delete({ where: { id } })
    res.json(deletedUser)
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: "Method not allowed" })
  }
}
