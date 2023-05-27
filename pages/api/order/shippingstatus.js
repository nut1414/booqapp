import { PrismaClient } from "@prisma/client";
import authRoute from "@/utils/middlewares/authRoute";
import calculateOrderTotalDiscountShip from "@/utils/order/calculateOrderTotalDiscountShip";

const prisma = new PrismaClient();

async function paymentverify(req, res) {
  if (req.user.role.RoleID != 2) {
    prisma.$disconnect();
    res.status(401).json({ message: "Unauthorized" }); 
  }
  try {
    if(req.method == "PUT"){
      const checkiforderexist = await prisma.order.findUnique({
        where: {
          OrderID: parseInt(req.body.OrderID,10)
        }
      })
      if(!checkiforderexist.TransactionApprove){
        prisma.$disconnect();
        res.status(400).json({ message: "Order not yet approved" });
      }
      const { OrderID, TrackingNo } = req.body;
      const orders = await prisma.order.update({
        where: {
          OrderID: parseInt(OrderID,10)
        },
        data: {
          TrackingNo: TrackingNo,
        }
      })
      prisma.$disconnect();
      res.status(200).json({ message: "Success" , order: orders});
    }
  } catch (e) {    
    prisma.$disconnect();
    res.status(500).json({ message: "Internal Server Error", error: e.message })
  }
  await prisma.$disconnect();
  
}

export default authRoute(paymentverify, prisma);