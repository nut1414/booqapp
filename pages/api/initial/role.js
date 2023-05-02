import { PrismaClient } from '@prisma/client';
import { defaultRole } from '@/config/default';

const prisma = new PrismaClient()

export default async function roleInit(req, res){
  // For initial Role
  if (req.method == "POST") {
    const Role = await prisma.role.createMany({
            data: [
                ...defaultRole
            ],skipDuplicates: true
    })
  }
  // Address
  res.status(200).json({message: "Role Created"})
  await prisma.$disconnect()
}