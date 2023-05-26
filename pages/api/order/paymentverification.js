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
      const { OrderID, Date, Proof } = req.body;
      const orders = await prisma.order.update({
        where: {
          OrderID: parseInt(OrderID,10)
        },
        data: {
          TransactionTime: Date,
          Proofoftransfer: Proof,
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