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
    getpromotion = await prisma.promotion.findMany({
      where: {
        PromotionID: req.query?.PromotionID ? parseInt(req.query.PromotionID) : undefined,
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
    })
    const bookid = getpromotion.map((x) => x.promotionbook.map((y) => 
      y.BookID
    ));

    const reducedbook = bookid.reduce((a, b) => {return a.concat(b)}, []);

    const promotionid = getpromotion.map((x) => 
      x.PromotionID
    );

    console.log(promotionid);
    const agg = await prisma.orderbook.groupBy({
      by: ['BookID'],
      _sum: {
        Quantity: true,
      },
      where: {
        PromotionID: { in : promotionid }
      }
    });
    
    for (const item of agg) {
      const { BookID, _sum: { Quantity } } = item;
      
      for (const promotion of getpromotion) {
        const book = promotion.promotionbook.find(b => b.BookID == BookID);        
        if (book) {
          book.Quantity = Quantity;
          break;
        }
      }
    }

    console.log(getpromotion);

    res.status(200).json(getpromotion);
  } else if (req.method == "DELETE") {
  }
  prisma.$disconnect();
}

export default authRoute(createpromotion, prisma);
