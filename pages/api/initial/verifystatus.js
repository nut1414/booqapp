import { PrismaClient } from '@prisma/client';
import { defaultVerifyStatus } from '@/config/default';

const prisma = new PrismaClient()

export default async function roleInit(req, res){
  // For initial Role
  if (req.method == "POST") {
    const VerifyStatus = await prisma.verificationstatus.createMany({
            data: [
                ...defaultVerifyStatus
            ],skipDuplicates: true
    })
  }
  // Address
  res.status(200).json({message: "Verify Status Created"})
  await prisma.$disconnect()
}