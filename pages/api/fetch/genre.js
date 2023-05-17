import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function genreFetch(req, res) {
  try {
    if (req.method == "GET") {
      const genre = await prisma.genre.findMany({
        orderBy: {
          GenreID: "asc",
        },
      });
      res.status(200).json({ message: "Genre fetched successfully", genre: genre ? genre : [] });
    } else {
      res.status(400).json({ message: "Invalid Method" });
    }
  } catch (e) {
    await prisma.$disconnect();
    res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
  await prisma.$disconnect();
}

export default genreFetch;