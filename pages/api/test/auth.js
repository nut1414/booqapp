import authRoute from "@/utils/middlewares/authRoute"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function handler(req, res) {
  res.status(200).json({ user: req.user })
}

export default authRoute(handler,prisma)