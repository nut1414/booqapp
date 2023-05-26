import { includeBookAuthor, includeBookGenre, includeBookPromotion, includeBookPublisher } from "@/utils/bookquery";
import calculateBookDetailPricePromo from "@/utils/order/calculateBookDetailPricePromo";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function bookdetail(req, res) {
  try {
    if (req.method == "GET") {
      console.log(req.query);
      let { BookID, PublisherID } = req.query;
      if (!PublisherID) PublisherID = 0;

      let bookdetail = await prisma.bookdetails.findFirst({
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
      if (bookdetail) {
        bookdetail = calculateBookDetailPricePromo(bookdetail)
        
        if (bookdetail?.BookCover) {
          bookdetail.BookCover = bookdetail.BookCover.toString('utf-8');
        }
        res.status(200).json({ bookdetail: (bookdetail?.publisher.PublisherID == PublisherID || bookdetail?.Available) ? bookdetail : null });
      }else
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