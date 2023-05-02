import { PrismaClient } from '@prisma/client';
import { defaultBank } from '@/config/default';

const prisma = new PrismaClient()

export default async function bankInit(req, res){
  // For initial Format
  if (req.method == "POST") {
    const Bank = await prisma.bank.createMany({
            data: [
                ...defaultBank
            ],skipDuplicates: true
    })
  }
  // Address
  res.status(200).json({message: "Bank Created"})
  await prisma.$disconnect()
}