import { includeBookAuthor, includeBookGenre, includeBookPromotion, includeBookPublisher } from "@/utils/bookquery";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function bookdetail(req, res) {
  try {
    if (req.method == "GET") {
      console.log(req.query);
      let { BookID } = req.query;

      const bookdetail = await prisma.bookdetails.findUnique({
        where: {
          BookID: parseInt(BookID, 10),
        },
        include: {
          ...includeBookPublisher(),
          ...includeBookAuthor(),
          ...includeBookGenre(),
          ...includeBookPromotion(new Date()),
        },
      })
      if (bookdetail)
        res.status(200).json({ bookdetail: bookdetail });
      else
        res.status(404).json({ message: "Not Found" });
    } else {
      res.status(400).json({ message: "No Input" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
  

  await prisma.$disconnect();
  return
}


export default bookdetail;