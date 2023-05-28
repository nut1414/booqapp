import { PrismaClient } from "@prisma/client";
import authRoute from "@/utils/middlewares/authRoute";
import { includeBookPromotion, includeBookPublisher } from "@/utils/bookquery";
import itemCartGroupByPublisher from "@/utils/order/itemCartGroupByPublisher";
import calculateOrderTotalDiscountShip from "@/utils/order/calculateOrderTotalDiscountShip";

const prisma = new PrismaClient();


async function getreview(req, res) {
  if (req.user.role.RoleID != 1) {
    prisma.$disconnect();
    return res.status(401).json({ message: "Unauthorized" }); // if not user
  }

  try { 
    if (req.method == "GET") {
      const { OrderID } = req.query;
      const review = await prisma.review.findMany({
        where: {
          OrderID: OrderID ? parseInt(OrderID) : undefined,
          UserID: req.user.UserID
        },
        include: {
          order: {
            include: {
              orderbook: {
                include: {
                  book: true,
                },
              },
            },
          },
        },
      });
      console.log(review);
      res.status(200).json({ message : "Success", review });                    
    } else {
      res.status(405).json({ message: "Method not allowed" });
      prisma.$disconnect();
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Internal Server Error", error: e.message });
    prisma.$disconnect();
  }
  await prisma.$disconnect();
}

export default authRoute(getreview, prisma);
