import authRoute from "@/utils/middlewares/authRoute"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function landing(req, res) {
  


}

export default authRoute(landing, prisma);
