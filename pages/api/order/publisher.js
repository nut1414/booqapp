import { PrismaClient } from "@prisma/client";
import authRoute from "@/utils/middlewares/authRoute";
import itemCartGroupByPublisher from "@/utils/order/itemCartGroupByPublisher";
import calculateOrderTotalDiscountShip from "@/utils/order/calculateOrderTotalDiscountShip";
import { includeBookPromotion, includeBookPublisher } from "@/utils/bookquery";
import { Order } from "@/components/order/Order";

const prisma = new PrismaClient();

//getting all orders that the current publisher has
async function orderpublisher(req, res) {
  if (req.user.role.RoleID != 2) {
    prisma.$disconnect();
    res.status(401).json({ message: "Unauthorized" }); // if not user
  }
  try {
    if (req.method == "GET") {
      let orders = await prisma.order.findMany({
        where: {
          PublisherID: req.user.UserID,
          OrderID: req.query.OrderID ? parseInt(req.query.OrderID) : undefined,
          TransactionApprove: true
        },
        include: {
          shippingaddress: true,
          orderbook: {
            include: {
              promotion: true,
              book: req.query.OrderID ? true : { select: { Price: true , Weight: true} },
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
        if(order.shippingaddress){
          order?.shippingstatus ? order.shippingstatus = true : order.shippingstatus = false
        }
        if(order.Received){
          order.receivedstatus ? order.receivedstatus = true : order.receivedstatus = false
        }
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

export default authRoute(orderpublisher, prisma);