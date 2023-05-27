import { PrismaClient } from "@prisma/client";
import authRoute from "@/utils/middlewares/authRoute";

const prisma = new PrismaClient();

//getting all orders that the current publisher has
async function orderpublisher(req, res) {
  if (req.user.role.RoleID != 0) {
    prisma.$disconnect();
    res.status(401).json({ message: "Unauthorized" }); // if not user
  }
  try {
    if (req.method == "GET") {
      let orders = await prisma.publisher.findMany({
        where: {
          PublisherID: req.query.PublisherID ? parseInt(req.query.PublisherID) : undefined,          
        },
        include: {
          orderbook: {
            include: {
              promotion: true,
              book: true,
            }
          }
        }
      })
      const calculatedResult = calculateOrderTotalDiscountShip(orders.map((order) => {
        order.orderbook = order.orderbook.map((bookinfo) => {
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
        }) 
        return order
      }), 'orderbook')
      prisma.$disconnect();
      res.status(200).json({ message: "Success", orders: calculatedResult });
    } else if( req.method == "PUT"){
      const { verify } = req.body;
      if (verify == undefined) {
        prisma.$disconnect();
        res.status(400).json({ message: "Bad Request" });
      }
      const order = await prisma.order.update({
        where: {
          OrderID: req.body.OrderID ? parseInt(req.body.OrderID) : undefined,
        },
        data: {
          TransactionApprove: verify == "true" ? true : verify == "false" ? false : undefined,
          VerificationDate: new Date()
        }
      })
      prisma.$disconnect();
      res.status(200).json({ message: "Success", order: order });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error", error: e.message })
    prisma.$disconnect();
  }
  await prisma.$disconnect();
  
}

export default authRoute(orderpublisher, prisma);