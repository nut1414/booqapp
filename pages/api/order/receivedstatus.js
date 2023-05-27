import { PrismaClient } from "@prisma/client";
import authRoute from "@/utils/middlewares/authRoute";
import calculateOrderTotalDiscountShip from "@/utils/order/calculateOrderTotalDiscountShip";

const prisma = new PrismaClient();

async function paymentverify(req, res) {
  if (req.user.role.RoleID != 1) {
    prisma.$disconnect();
    res.status(401).json({ message: "Unauthorized" }); 
  }
  try {
    if(req.method == "PUT"){
      const { OrderID, Received } = req.body;
      const checkiforderexist = await prisma.order.findUnique({
        where: {
          OrderID: parseInt(OrderID,10)
        }
      })
      if(!checkiforderexist){
        prisma.$disconnect();
        return res.status(400).json({ message: "Order not found" });
      }
      if(checkiforderexist.Received){
        prisma.$disconnect();
        return res.status(400).json({ message: "Order already received" });
      }
      if(checkiforderexist.TrackingNo == null){
        prisma.$disconnect();
        return res.status(400).json({ message: "Order not yet shipped" });
      }
      const orders = await prisma.order.update({
        where: {
          OrderID: parseInt(OrderID,10)
        },
        data: {
          Received: Received == "true" ? true : Received == "false" ? false : undefined,
        }
      })
      res.status(200).json({ message: "Success" , order: orders});
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error", error: e.message })
    prisma.$disconnect();
  }
  await prisma.$disconnect();
  
}

export default authRoute(paymentverify, prisma);