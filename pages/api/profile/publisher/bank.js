import authRoute from "@/utils/middlewares/authRoute"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function bank(req, res) {
  try {
    if (req.user.role.RoleName != "Publisher") {
      await prisma.$disconnect()
      return res.status(400).json({ message: "User not allowed." })
    }
    if (req.method == "GET") {
      const publisherbank = await prisma.publisherbank.findMany({
        where: {
          UserID: req.user.UserID,
        },
      })
      res.status(200).json({ message: "Publisher bank info fetched successfully", publisherbank: publisherbank ? publisherbank : [] })
    }

  }catch (e) {
    res.status(500).json({message: "Internal Server Error", error: e.message})
  }

  
  await prisma.$disconnect()
}

export default authRoute(bank, prisma)