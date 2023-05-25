import { PrismaClient } from "@prisma/client";
import { examplebook } from "@/config/example";
import authRoute from "@/utils/middlewares/authRoute";

const prisma = new PrismaClient();

async function bookinit (req, res) {
  // Include Publisher Token in Header to use this file
  try {
    if (req.method == "POST") {
      console.log(req.user.UserID);
      const data = examplebook.map((book) => {
        return {
          ...book,
          format: { connect: { FormatID: book.FormatID } },
          publisher: { connect: { PublisherID: req.user.UserID } },
          bookauthor: {
            connectOrCreateMany : {
              author: [
                {
                  AuthorName: book.AuthorName,
                }
              ],
              },
            },
          bookgenre: {
            createMany: {
              data: [
                {
                  bookdetails: {
                    connect: {
                      BookID: book.BookID,
                    },
                  },
                  genre: {
                    connect: {
                      GenreID: parseInt(req.body.GenreID, 10),
                    },
                  },
                },
              ],
            },
          },
        };
      });
      const books = await prisma.bookdetails.createMany({
        data: [...data],
        skipDuplicates: true,
      });
    }
    // Address
    res.status(200).json({ message: "Books Created" });
    await prisma.$disconnect();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}


export default authRoute(bookinit,prisma);