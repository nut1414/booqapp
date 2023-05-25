import { Order } from "@/components/order/Order";
import { includeBookAuthor, includeBookGenre, includeBookPromotion, includeBookPublisher, whereBookSearchQuery } from "@/utils/bookquery";
import { PrismaClient } from "@prisma/client";
import promotion from "./promotion";


const prisma = new PrismaClient();

async function bookdetail(req, res) {
  try {
    if (req.method == "GET") {
      console.log(req.query);
      let getbook = [];

      let { includeAuthor , includeGenre, includePublisher, booklimit, releaseDate, bestsalered, promotioned} = req.query
      if (includeAuthor == "true") includeAuthor = true
      if (includeGenre == "true") includeGenre = true
      if (includePublisher == "true") includePublisher = true

      getbook = await prisma.bookdetails.findMany({
        include: {
          ...(includeAuthor == true ? includeBookAuthor() : {}),
          ...(includeGenre == true ? includeBookGenre() : {}),
          ...(includePublisher == true ? includeBookPublisher() : {}),
          ...includeBookPromotion(new Date()),
        },
        where: {
          ...whereBookSearchQuery(req.query),
          promotionbook: promotioned == 'true' ? {
            some: {
              promotion: {
                StartDate: {
                  lte: new Date(),
                },
                EndDate:{
                  gte: new Date(),
                },
              },
            },
          } : undefined,
        },
        take: parseInt(booklimit) ? parseInt(booklimit) : undefined,
        orderBy: (releaseDate == 'asc' || releaseDate == 'desc' || bestsalered == 'true') ? {
          ReleaseDate: releaseDate ? releaseDate : undefined,
          orderbook : (bestsalered == 'true') ? {
            _count: "desc"
          } : undefined,
        } : undefined,
        skip: parseInt(req.query.skip) ? parseInt(req.query.skip) : undefined,
      });

      if (getbook.length > 0) {
        getbook = getbook.map((book) => ({
          ...book,
          BookCover: book?.BookCover?.toString('utf-8'),
        }))
      }
      console.log(getbook)

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