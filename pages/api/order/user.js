import { PrismaClient } from "@prisma/client";
import authRoute from "@/utils/middlewares/authRoute";
import itemCartGroupByPublisher from "@/utils/order/itemCartGroupByPublisher";
import calculateOrderTotalDiscountShip from "@/utils/order/calculateOrderTotalDiscountShip";
import { includeBookPromotion, includeBookPublisher } from "@/utils/bookquery";

const prisma = new PrismaClient();

async function orderuser(req, res) {
  if (req.user.role.RoleID != 1) {
    prisma.$disconnect();
    res.status(401).json({ message: "Unauthorized" }); // if not user
  }


  try {
    if (req.method == "GET") {
      const orders = await prisma.order.findMany({
        where: {
          UserID: req.user.UserID,
        },
        include: {
          publisher: true,
          shippingaddress: true,
          orderbook: {
            include: {
              promotion: true,
              book:  {
                include: {
                  review: true,
                }
              }
            }
          }
        }
      })

      const calculatedResult = calculateOrderTotalDiscountShip(orders.map((order) => {
        console.log(order)
        order.orderbook = order.orderbook.map((bookinfo) => {
          return {
            ...bookinfo,
            book: {
              ...bookinfo.book,
              promotionbook: bookinfo.promotion ? [{BookID: bookinfo.BookID,PromotionID: bookinfo.PromotionID, promotion: bookinfo.promotion}] : [],
              BookCover: bookinfo?.book?.BookCover?.toString('utf-8')
            },
            promotion: undefined
          }
        }) 
        return order
      }), 'orderbook')


      res.status(200).json({ message: "Success", orders: calculatedResult });
    }

    
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Internal Server Error", error: e.message })
    prisma.$disconnect();
  }
  await prisma.$disconnect();
  
}

export default authRoute(orderuser, prisma);