import authRoute from "@/utils/middlewares/authRoute";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import calculateOrderTotalDiscountShip from "@/utils/order/calculateOrderTotalDiscountShip";
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
        BookID: req.query?.BookID ? parseInt(req.query.BookID) : undefined,
        Available: req.query.Available == "true" ? true : req.query.Available == "false" ? false : undefined,
        BookName: req.query?.BookName ? {
          contains: req.query?.BookName ? req.query.BookName : undefined,
        } : undefined,
        ReleaseDate: {
          gte: req.query?.StartDate ? new Date(req.query.StartDate) : undefined,
          lte: req.query?.EndDate ? new Date(req.query.EndDate) : undefined,
        }
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
    for (const book of getbook) {
      book.BookCover = undefined
    }
    if (req.query?.BookID) {
      const orders = await prisma.order.findMany({
        where: {
          orderbook: {
            some: {
              BookID: parseInt(req.query.BookID),
            },
          },
        },
        include: {
          orderbook: {
            include: {
              book: true,
            },
          },
        },
      });
      console.log("orders", orders)
      const calculatedResult = calculateOrderTotalDiscountShip(orders.map((order) => {
        order.orderbook = order.orderbook.map((bookinfo) => {
          const book = getbook.find((x) => x.BookID == bookinfo.BookID)          
            if (book) {
              console.log('book =',book)
              console.log({BookID: bookinfo.BookID, PromotionID: bookinfo.PromotionID, promotion: bookinfo.promotion})
              return {
                ...bookinfo,
                book: {
                  ...bookinfo.book,
                  promotionbook: bookinfo.promotion ? [{BookID: bookinfo.BookID, PromotionID: bookinfo.PromotionID, promotion: bookinfo.promotion}] : [],
                  BookCover: bookinfo?.book?.BookCover?.toString('utf-8')
                },
                promotion: undefined
              }
            }
            console.log('bookinfo', bookinfo)
            return bookinfo
          })
        order.TrackingNo ? order.shippingstatus = true : order.shippingstatus = false
        order.Received ? order.receivedstatus = true : order.receivedstatus = false
        return order
      }), 'orderbook')
    }
    prisma.$disconnect();
    res.status(200).json(getbook);
  }
  prisma.$disconnect();
}

export default authRoute(getpublisherbook, prisma);
