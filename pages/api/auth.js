import authRoute from "@/utils/middlewares/authRoute";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function authTokenChecker(req, res) {
  res.status(200).json({ message: "Valid User Token", user: req.user });
  await prisma.$disconnect();
}

export default authRoute(authTokenChecker, prisma)