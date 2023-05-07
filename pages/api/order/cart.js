import { PrismaClient } from "@prisma/client";
import authRoute from "@/utils/middlewares/authRoute";
import { includePromotion, includePublisher } from "@/utils/bookquery";
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
       * expect input { bookID, quantity }
       */

      const { bookID, quantity } = req.body;

      if (!bookID) {
        res.status(400).json({ message: "All field must be filled" });
        prisma.$disconnect();
      }

      const book = await prisma.bookdetails.findUnique({
        where: { BookID: parseInt(bookID) },
      });

      if (!book) {
        res.status(404).json({ message: "Book not found" });
        prisma.$disconnect();
      }

      const itembasket = await prisma.iteminbasket.findFirst({
        where: { BookID: parseInt(bookID), UserID: req.user.UserID },
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
            BookID: parseInt(bookID),
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
      const cart = await prisma.iteminbasket.findMany({
        where: { UserID: req.user.UserID },
        include: {
          book: {
            include: { ...includePublisher(), ...includePromotion(new Date()) },
          },
        },
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

      const { itemID, quantity } = req.body;

      if (!itemID || !quantity) {
        res.status(400).json({ message: "All field must be filled" });
        prisma.$disconnect();
      }

      const item = await prisma.book.findUnique({
        where: { ItemID: parseInt(itemID), UserID: req.user.UserID },
      });

      if (!item) {
        res.status(404).json({ message: "Item not found" });
        prisma.$disconnect();
      }

      const itemUpdated = await prisma.iteminbasket.update({
        where: { ItemID: parseInt(itemID), UserID: req.user.UserID },
        data: { Quantity: quantity },
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

      const { itemID } = req.query;

      if (!itemID) {
        res.status(400).json({ message: "All field must be filled" });
        prisma.$disconnect();
      }

      const item = await prisma.book.findUnique({
        where: { ItemID: parseInt(itemID), UserID: req.user.UserID },
      });

      if (!item) {
        res.status(204).json({ message: "Item not found" });
        prisma.$disconnect();
      }

      const itemDeleted = await prisma.iteminbasket.delete({
        where: { ItemID: parseInt(itemID), UserID: req.user.UserID },
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
    es.status(500).json({ message: "Internal Server Error", error: e.message });
    prisma.$disconnect();
  }
  await prisma.$disconnect();
}

export default authRoute(cart, prisma);
