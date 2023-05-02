import { PrismaClient } from '@prisma/client';
import { defaultGenre } from '@/config/default';

const prisma = new PrismaClient()

export default async function genreInit(req, res){
  // For initial Format
  if (req.method == "POST") {
    const Genre = await prisma.genre.createMany({
            data: [
                ...defaultGenre
            ],skipDuplicates: true
    })
  }
  // Address
  res.status(200).json({message: "Genre Created"})
  await prisma.$disconnect()
}