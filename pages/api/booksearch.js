import { includeBookAuthor, includeBookGenre, includeBookPromotion, includeBookPublisher, whereBookSearchQuery } from "@/utils/bookquery";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function bookdetail(req, res) {
  try {
    if (req.method == "GET") {
      console.log(req.query);
      let getbook = [];

      let { includeAuthor , includeGenre, includePublisher } = req.query
      if (includeAuthor == "true") includeAuthor = true
      if (includeGenre == "true") includeGenre = true
      if (includePublisher == "true") includePublisher = true

      getbook = await prisma.bookdetails.findMany({
        include: (includeAuthor == true || includeGenre == true || includePublisher == true) ? {
          ...(includeAuthor == true ? includeBookAuthor() : {}),
          ...(includeGenre == true ? includeBookGenre() : {}),
          ...(includePublisher == true ? includeBookPublisher() : {}),
          ...includeBookPromotion(new Date())
        } : undefined,
        where: {
          ...whereBookSearchQuery(req.query)
        },
      });

      prisma.$disconnect();
      res.status(200).json({ book: getbook });
    } else {
      res.status(400).json({ message: "Invalid Method" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
  

  await prisma.$disconnect();
  return
}


export default bookdetail;