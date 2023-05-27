import authRoute from "@/utils/middlewares/authRoute";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//Not finished
async function getpublisherbook(req, res) {
  if (req.user.role.RoleID != 2) {
    await prisma.$disconnect();
    return res
      .status(400)
      .json({ message: "Only Publisher can will this section." });
  }
  if (req.method == "GET") {
    let getbook = [];
    console.log(req.query.BookName);
    getbook = await prisma.bookdetails.findMany({
      where: { 
        PublisherID: parseInt(req.user.UserID),
        Available: req.query.Available == "true" ? true : req.query.Available == "false" ? false : undefined,
        BookName: req.query?.BookName ? {
          contains: req.query?.BookName ? req.query.BookName : undefined,
        } : undefined,
      },
      orderBy: {
        BookID: "asc",
      },
      include: {
        bookauthor: {
          select: {
            author: {
              select: {
                AuthorName: true,
              },
            },
          },
        },
        BookCover: false,
      },
    });
    const bookid = getbook.map((x) =>
      x.BookID
    );

    const agg = await prisma.orderbook.groupBy({
      by: ["BookID"],
      _sum: {
        Quantity: true,
      },
      where: {
        BookID: { in : bookid },
      },
    });
    for (const item of agg) {
      const {
        _sum: { Quantity },
      } = item;
      for (const book of getbook) {
        if (book.BookID == item.BookID) {
          book.Quantity = Quantity;
          break;
        }
      }
    }
    res.status(200).json(getbook);
  }
  prisma.$disconnect();
}

export default authRoute(getpublisherbook, prisma);
