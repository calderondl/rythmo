import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany()
    res.json(users)
  } else if (req.method === 'POST') {
    const newUser = req.body
    const savedUser = await prisma.user.create({ data: newUser })
    res.json(savedUser)
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: "Method not allowed" })
  }
}
