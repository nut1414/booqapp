import { PrismaClient } from '@prisma/client';
import { defaultFormat } from '@/config/default';

const prisma = new PrismaClient()

export default async function formatInit(req, res){
  // For initial Format
  if (req.method == "POST") {
    const Format = await prisma.formattype.createMany({
            data: [
                ...defaultFormat
            ],skipDuplicates: true
    })
  }
  // Address
  res.status(200).json({message: "Format Created"})
  await prisma.$disconnect()
}