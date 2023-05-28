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
      const order = await prisma.order.findMany({
        where: {
          OrderID: OrderID ? parseInt(OrderID) : undefined,
        },
        include: {
          orderbook: {
            include: {
              book: true,
            },
          },
          review: true,
        },
      });
      console.log(order);

      const orders = order.map((x) => {
        x.orderbook = x.orderbook.map( (orderbook) => {
          orderbook.book = {
          ...orderbook.book,
          BookCover: orderbook?.book?.BookCover ? orderbook.book.BookCover.toString("utf-8") : null
        }
        return orderbook
      })
        return x;
      });
      console.log(orders);

      res.status(200).json({ message: "Success", orders });
    } else {
      res.status(405).json({ message: "Method not allowed" });
      prisma.$disconnect();
    }
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
    prisma.$disconnect();
  }
  await prisma.$disconnect();
}

export default authRoute(getreview, prisma);
