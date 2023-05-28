import { Prisma, PrismaClient } from "@prisma/client";
import authRoute from "@/utils/middlewares/authRoute";
import itemCartGroupByPublisher from "@/utils/order/itemCartGroupByPublisher";
import calculateOrderTotalDiscountShip from "@/utils/order/calculateOrderTotalDiscountShip";
import { includeBookPromotion, includeBookPublisher } from "@/utils/bookquery";
import { Order } from "@/components/order/Order";

const prisma = new PrismaClient();

//getting all orders that the current publisher has
async function orderpublisher(req, res) {
  if (req.user.role.RoleID != 0) {
    prisma.$disconnect();
    res.status(401).json({ message: "Unauthorized" }); // if not user
  }
  try {
    if (req.method == "GET") {
      const { OrderID , PaymentStatus, TransactionApprove, Receivestatus, PublisherName  } = req.query
      let orders = await prisma.order.findMany({
        where: {
          publisher: PublisherName?.length > 0 ? {
            PublisherName: {
              contains: PublisherName
            }
          } : undefined,
          OrderID: OrderID ? parseInt(OrderID) : undefined,
          Proofoftransfer: PaymentStatus == "true" ? { not: null } : PaymentStatus == "false" ? null : undefined,
          TransactionApprove: TransactionApprove == "true" ? true : TransactionApprove == "false" ? false : undefined,
          Received: Receivestatus == "true" ? true : Receivestatus == "false" ? false : undefined,
        },
        include: {
          publisher: {
            select:{
              PublisherID: true,
              PublisherName: true,
              VerificationDocument: OrderID ? true : false
            }
          },
          shippingaddress: true,
          orderbook: OrderID ?{
            include: {
              promotion: true,
              book: true,
            }
          } : false
        }
      })
      const Proof = orders[0]?.Proofoftransfer ? orders[0].Proofoftransfer.toString('utf-8') : undefined
      if( OrderID ){
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
          order.Proofoftransfer = Proof
          return order
        }), 'orderbook')       
        prisma.$disconnect(); 
        res.status(200).json({ message: "Success", orders: calculatedResult });
      }
      else{
        prisma.$disconnect();
        res.status(200).json({ message: "Success", orders: orders });
      }        
    }
    else if( req.method == "PUT"){
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
    console.log(e)
    res.status(500).json({ message: "Internal Server Error", error: e.message })
    prisma.$disconnect();
  }
  await prisma.$disconnect();
  
}

export default authRoute(orderpublisher, prisma);