import { PrismaClient } from "@prisma/client";
import authRoute from "@/utils/middlewares/authRoute";
import { includeBookPromotion, includeBookPublisher } from "@/utils/bookquery";
import itemCartGroupByPublisher from "@/utils/order/itemCartGroupByPublisher";
import calculateOrderTotalDiscountShip from "@/utils/order/calculateOrderTotalDiscountShip";

const prisma = new PrismaClient();


async function cart(req, res) {
  if (req.user.role.RoleID != 1) {
    prisma.$disconnect();
    return res.status(401).json({ message: "Unauthorized" }); // if not user
  }

  try {
    if (req.method == "POST") {
      // adding to user cart
      /**
       * expect input { BookID, quantity }
       */

      const { BookID, quantity } = req.body;

      if (!BookID) {
        res.status(400).json({ message: "All field must be filled" });
        prisma.$disconnect();
      }

      const book = await prisma.bookdetails.findUnique({
        where: { BookID: parseInt(BookID) },
      });

      if (!book) {
        res.status(404).json({ message: "Book not found" });
        prisma.$disconnect();
      }

      const itembasket = await prisma.iteminbasket.findFirst({
        where: { BookID: parseInt(BookID), UserID: req.user.UserID },
      });

      console.log(itembasket);
      if (itembasket) {
        const item = await prisma.iteminbasket.update({
          where: { ItemID: itembasket.ItemID },
          data: {
            Quantity: quantity
              ? parseInt(quantity ? quantity : 1)
              : itembasket.Quantity + 1,
          },
        });

        if (item) {
          res.status(200).json({ message: "Book in cart updated", item });
        }
      } else {
        const item = await prisma.iteminbasket.create({
          data: {
            BookID: parseInt(BookID),
            Quantity: quantity ? parseInt(quantity) : 1,
            UserID: req.user.UserID,
          },
        });

        if (item) {
          res.status(200).json({ message: "Book added to cart", item });
        }
      }
    } else if (req.method == "GET") {
      // getting what is in user cart
      let cart = await prisma.iteminbasket.findMany({
        where: { UserID: req.user.UserID },
        include: {
          book: {
            include: {
              ...includeBookPublisher(),
              ...includeBookPromotion(new Date()),
            },
          },
        },
      });
      cart = cart.map((item) => {
        return {
          ...item,
          book: {
            ...item.book,
            BookCover: item.book?.BookCover?.toString("utf-8"),
          },
        };
      });
      prisma.$disconnect();
      res
        .status(200)
        .json({
          cart: calculateOrderTotalDiscountShip(itemCartGroupByPublisher(cart)),
        });
    } else if (req.method == "PUT") {
      // updating user cart
      /**
       * expect input { itemID, quantity }
       *
       */

      const { ItemID, Quantity } = req.body;

      if (!ItemID || !Quantity) {
        res.status(400).json({ message: "All field must be filled" });
        prisma.$disconnect();
      }

      const item = await prisma.iteminbasket.findFirst({
        where: { ItemID: parseInt(ItemID), UserID: req.user.UserID },
      });

      if (!item) {
        res.status(404).json({ message: "Item not found" });
        prisma.$disconnect();
      }

      const itemUpdated = await prisma.iteminbasket.update({
        where: { ItemID: parseInt(ItemID) },
        data: { Quantity: Quantity },
      });

      prisma.$disconnect();
      if (itemUpdated) {
        res.status(200).json({ message: "Item in cart updated", itemUpdated });
      }
    } else if (req.method == "DELETE") {
      /**
       * expect input { itemID }
       *
       */

      const { ItemID } = req.query;

      if (!ItemID) {
        res.status(400).json({ message: "All field must be filled" });
        prisma.$disconnect();
      }

      const item = await prisma.iteminbasket.findFirst({
        where: { ItemID: parseInt(ItemID), UserID: req.user.UserID },
      });

      if (!item) {
        res.status(204).json({ message: "Item not found" });
        prisma.$disconnect();
      }

      const itemDeleted = await prisma.iteminbasket.delete({
        where: { ItemID: parseInt(ItemID) },
      });

      prisma.$disconnect();
      if (itemDeleted) {
        res.status(202).json({ message: "Item deleted", itemDeleted });
      } else {
        res.status(500).json({ message: "Something went wrong" });
      }
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

export default authRoute(cart, prisma);
