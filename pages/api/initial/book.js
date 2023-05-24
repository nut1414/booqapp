import { PrismaClient } from '@prisma/client';
import { examplebook } from '@/config/example';

const prisma = new PrismaClient()

export default async function bankInit(req, res){
  // For initial Format
  if (req.method == "POST") {
    const books = await prisma.bookdetails.createMany({
            data: [
                ...examplebook
            ],skipDuplicates: true
    })
  }
  // Address
  res.status(200).json({message: "Books Created"})
  await prisma.$disconnect()
}