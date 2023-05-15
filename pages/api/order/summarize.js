import { PrismaClient } from "@prisma/client";
import authRoute from "@/utils/middlewares/authRoute";
import itemCartGroupByPublisher from "@/utils/order/itemCartGroupByPublisher";
import calculateOrderTotalDiscountShip from "@/utils/order/calculateOrderTotalDiscountShip";
import { includeBookPromotion, includeBookPublisher } from "@/utils/bookquery";

const prisma = new PrismaClient();

async function summarizeOrder(req, res) {
  if (req.user.role.RoleID != 1) {
    prisma.$disconnect();
    return res.status(401).json({ message: "Unauthorized" }); // if not user
  }

  try {
    if (req.method == "POST") {
      /**
       * expect input { [ItemID] }
       *
       */
      const { selectedItems } = req.body;
      const currentDate = new Date();
      console.log("currentDate", currentDate);

      if (
        !selectedItems ||
        !Array.isArray(selectedItems) ||
        selectedItems?.length == 0
      ) {
        res.status(400).json({ message: "All field must be filled" });
        prisma.$disconnect();
      }
      const result = await prisma.iteminbasket.findMany({
        where: {
          ItemID: {
            in: selectedItems,
          },
          UserID: req.user.UserID,
        },
        include: {
          book: {
            include: {
              ...includeBookPublisher(),
              ...includeBookPromotion(currentDate),
            },
          },
        },
      });

      const groupedResult = itemCartGroupByPublisher(result);

      const calculatedResult = calculateOrderTotalDiscountShip(groupedResult);

      const allOrderPrice = calculatedResult.reduce((acc, curr) => {
        return acc + curr.totalPrice;
      }, 0);

      const allOrderShipping = calculatedResult.reduce((acc, curr) => {
        return acc + curr.totalShipping;
      }, 0);

      res.status(200).json({
        message: "Order summarized",
        order: calculatedResult,
        allOrderPrice,
        allOrderShipping,
      });
    } else {
      res.status(400).json({ message: "Method not allowed" });
    }
  } catch (e) {
    es.status(500).json({ message: "Internal Server Error", error: e.message });
    prisma.$disconnect();
  }

  await prisma.$disconnect();
}

export default authRoute(summarizeOrder, prisma);
