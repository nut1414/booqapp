import authRoute from "@/utils/middlewares/authRoute";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//Not finished
async function createpromotion(req, res) {
  if (req.user.role.RoleID != 2) {
    await prisma.$disconnect();
    return res
      .status(400)
      .json({ message: "Only Publisher can create promotion." });
  }
  if (req.method == "POST") {
    // Combine these into one if statement
    if (
      !req.body?.DiscountPercentage ||
      !req.body?.StartDate ||
      !req.body?.EndDate ||
      !req.body?.PromotionDetails ||
      !req.body?.BookID
    ) {
      await prisma.$disconnect();
      return res.status(400).json({ message: "All field must be filled." });
    }
    // Can't Check Due to Can't Create Book right now
    if (req.user.role.RoleID != 2) {
      await prisma.$disconnect();
      return res
        .status(400)
        .json({ message: "Only Publisher can create promotion." });
    }
    const promotion = await prisma.promotion.create({
      data: {
        publisher: {
          connect: {
            PublisherID: req.user.UserID,
          },
        },
        DiscountPercent: parseFloat(req.body.DiscountPercentage),
        StartDate: new Date(req.body.StartDate),
        EndDate: new Date(req.body.EndDate),
        PromotionDetail: req.body.PromotionDetails,
      },
    });
    const promotiondata = req.body.BookID.map((x) => ({
      PromotionID: promotion.PromotionID,
      BookID: x,
    }));
    console.log(promotiondata);
    const promotionbook = await prisma.promotionbook.createMany({
      data: promotiondata,
    });
    res.status(200).json({ message: "Promotion created successfully" });
  } else if (req.method == "GET") {
    let getpromotion = [];

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    console.log(currentDate);
    getpromotion = await prisma.promotion.findMany({
      where: {
        PublisherID: req.user.UserID,
        StartDate:
          req.query?.Filter == "active"
            ? {
                lte: currentDate,
              }
            : req.query?.Filter == "inactive"
            ? {
                gt: currentDate,
              }
            : undefined,
        EndDate:
          req.query?.Filter == "active"
            ? {
                gte: currentDate,
              }
            : req.query?.Filter == "inactive"
            ? {
                lt: currentDate,
              }
            : undefined,
        PromotionDetail: req.query?.PromotionDetail
          ? {
              contains: req.query?.PromotionDetail,
            }
          : undefined,
        PromotionID: req.query?.PromotionID
          ? parseInt(req.query.PromotionID)
          : undefined,
      },
      orderBy: {
        PromotionID: "asc",
      },
      include: {
        promotionbook: {
          include: {
            bookdetails: {
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
            },
          },
        },
      },
    });

    const promotionid = getpromotion.map((x) => x.PromotionID);

    const agg = await prisma.orderbook.groupBy({
      by: ["BookID"],
      _sum: {
        Quantity: true,
      },
      where: {
        PromotionID: { in: promotionid },
      },
    });
    console.log("getpromotion",getpromotion)

    
    for (const promotion of getpromotion) {
      let promotionsum = 0;
      console.log("promotion",promotion)
      for (const pb of promotion.promotionbook) {
        pb.BookCover = pb?.bookdetails?.BookCover?.toString("utf8")
      }

      for (const item of agg) {
        const {
          BookID,
          _sum: { Quantity },
        } = item;      
        const book = promotion.promotionbook.find((b) => b.BookID == BookID);
        console.log('book = ', book);
        if (book) {
          // book.BookCover = book?.bookdetails?.BookCover?.toString("utf8")
          book.Quantity = Quantity;
          break;
        }
      }

      for(const book of promotion.promotionbook){
        promotionsum += book?.Quantity ? book.Quantity : 0;
      }
      promotion.Quantity = promotionsum;      
    }


    console.log(getpromotion);

    res.status(200).json(getpromotion);
  } else if (req.method == "DELETE") {
    
  }
  prisma.$disconnect();
}

export default authRoute(createpromotion, prisma);
