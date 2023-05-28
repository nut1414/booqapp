import authRoute from "@/utils/middlewares/authRoute";
import { PrismaClient } from "@prisma/client";
import { verifyUserJWT } from "@/utils/auth";
import { includeBookAuthor, whereBookSearchQuery, includeBookPublisher, includeBookGenre, includeBookPromotion } from "@/utils/bookquery";

const prisma = new PrismaClient();

async function createbook(req, res) {
  if (req.method == "POST") {
    // This required BookName AuthorID GenreID FormatID(FormattypeID) Description ReleaseDate Price Weight
    if (
      !req.body?.BookName ||
      !req.body?.GenreID ||
      !req.body?.AuthorName ||
      !req.body?.FormatID ||
      !req.body?.Description ||
      !req.body?.ReleaseDate ||
      !req.body?.Price ||
      !req.body?.Weight
    ) {
      await prisma.$disconnect();
      return res.status(400).json({ message: "All field must be filled." });
    }
    if (req.user.role.RoleID != 2) {
      await prisma.$disconnect();
      return res
        .status(400)
        .json({ message: "Only Publisher can create book." });
    }
    let author = [];
    let coverBuffer = null;
    if (req.body?.BookCover)
      coverBuffer = Buffer.from(req.body.BookCover, "utf-8");
    console.log("cover", coverBuffer);
    for (let i = 0; i < req.body.AuthorName.length; i++) {
      console.log(req.body.AuthorName[i]);
      const authorcheck = await prisma.author.findFirst({
        where: {
          AuthorName: req.body.AuthorName[i],
        }
      });
      console.log(authorcheck);
      author[i] = authorcheck;
      if (!authorcheck) {
        console.log(req.body.AuthorName[i] + "Is being created")
        const createauthor = await prisma.author.create({
          data: {
            AuthorName: req.body.AuthorName[i],
            //AuthorID: req.body?.id ? parseInt(req.body?.id, 10) : undefined,
          },
        });
        author[i] = createauthor;
      }
      console.log(typeof author[i].AuthorID)
    }
    const book = await prisma.bookdetails.create({
      data: {
        BookName: req.body.BookName,
        formattype: {
          connect: {
            FormatTypeID: parseInt(req.body.FormatID, 10),
          },
        },
        publisher: {
          connect: {
            PublisherID: req.user.UserID,
          },
        },
        bookgenre: {
          create: [
            ...(req.body.GenreID?.map((x) => (
              {
                genre: {
                  connect: {
                    GenreID: parseInt(x, 10),
                  }
                }
              }
            ))),
          ]
        },
        Available: req.body?.Available ? parseInt(req.body?.Available, 10) == 1 : undefined,
        BookCover: coverBuffer, 
        Description: req.body.Description,
        ReleaseDate: new Date(req.body.ReleaseDate),
        Price: parseInt(req.body.Price, 10),
        Weight: parseFloat(req.body.Weight),
      },
      select: {
        BookID: true,
        Description: true,
        BookName: true,
        formattype: true,
        bookgenre: true,
        Description: true,
        ReleaseDate: true,
        Price: true,
        Weight: true,
        BookCover: false
      }
    });

    const authordata = author.map((x) => ({
      BookID: book.BookID,
      AuthorID: x.AuthorID
    }))
    console.log(authordata);
    const bookauthor = await prisma.bookauthor.createMany({
      data: authordata
    });
    prisma.$disconnect();
    res.status(200).json({ message: "Book created successfully", book: book });
  } else if (req.method == "DELETE") {
    // Query not body
    console.log(req.query);

    //req.query.name = req.query.BookName.toLowerCase();
    if (req.query?.BookID || req.query?.BookName) {
      const [findauthorbybook,  deletebook] = await prisma.$transaction([
        prisma.bookauthor.findMany({
          where: {
            BookID: req.query?.BookID ? parseInt(req.query?.BookID, 10) : undefined,
          },
        }),
        prisma.bookdetails.delete({
          where: {
            BookID: req.query?.BookID ? parseInt(req.query?.BookID, 10) : undefined,
          },
        }),
      ])
      console.log(findauthorbybook);
      const allAuthor = findauthorbybook.map(async (bookauthor) => {
        const otherbookauthor = await prisma.bookauthor.count({
          where: {
            AuthorID: bookauthor.AuthorID,
            BookID: { // Getting Other BookID that have same AuthorID
              not: bookauthor.BookID
            }
          }
        })

        if (otherbookauthor == 0) {
          const author = await prisma.author.delete({
            where: {
              AuthorID: bookauthor.AuthorID
            }
          })
          if (author)
            bookauthor.deleted = true
        } else {
          // other book author exists
          // don't delete
          bookauthor.deleted = false // marked as false
        }
        return bookauthor
      })
        
      if (deletebook) {
        res.status(200).json({ message: "Book Deleted", book: deletebook, authors: allAuthor });
      }else {
        res.status(404).json({ message: "Book Not Found" });
      }
        
    } else {
      res.status(400).json({ message: "No Input" });
    }
  } else if (req.method == "PUT") {
    let author = [];
    for (let i = 0; i < req.body.AuthorName.length; i++) {
    console.log(req.body.AuthorName[i]);
    const authorcheck = await prisma.author.findFirst({
      where: {
        AuthorName: req.body.AuthorName[i],
      }
    });
    console.log(authorcheck);
    author[i] = authorcheck;
    if (!authorcheck) {
      console.log(req.body.AuthorName[i] + "Is being created")
      const createauthor = await prisma.author.create({
        data: {
          AuthorName: req.body.AuthorName[i],
          //AuthorID: req.body?.id ? parseInt(req.body?.id, 10) : undefined,
        },
      });
      author[i] = createauthor;
    }
    console.log(typeof author[i].AuthorID)
  }
    const deleteoldgenre = await prisma.bookgenre.deleteMany({
      where: {
        BookID: req.body?.BookID ? parseInt(req.body?.BookID, 10) : undefined,
      },
    });
    const deleteoldauthor = await prisma.bookauthor.deleteMany({
      where: {
        BookID: req.body?.BookID ? parseInt(req.body?.BookID, 10) : undefined,
      },
    });
    let coverBuffer;
    if (req.body?.BookCover)
      coverBuffer = Buffer.from(req.body.BookCover, "utf-8");
    console.log("cover", coverBuffer);
    const updatebook = await prisma.bookdetails.update({
      where: {
        BookID: req.body?.BookID ? parseInt(req.body?.BookID, 10) : undefined,
      },
      data: {
        BookName: req.body?.BookName,
        formattype: {
          connect: {
            FormatTypeID: parseInt(req.body?.FormatID, 10),
          },
        },
        bookgenre: {
          create: [
            ...(req.body.GenreID?.map((x) => (
              {
                genre: {
                  connect: {
                    GenreID: parseInt(x, 10),
                  }
                }
              }
            ))),
          ]
        },
        Description: req.body?.Description,
        ReleaseDate: new Date(req.body?.ReleaseDate),
        Price: parseInt(req.body?.Price, 10),
        Weight: parseFloat(req.body?.Weight),
        Available: req.body?.Available ? parseInt(req.body?.Available, 10) == 1 : undefined,
        BookCover: coverBuffer,
      },
    });
    const authordata = author.map((x) => ({
      BookID: updatebook.BookID,
      AuthorID: x.AuthorID
    }))
    console.log(authordata);
    const bookauthor = await prisma.bookauthor.createMany({
      data: authordata
    });
    prisma.$disconnect();
    res.status(200).json({ message: "Book Updated", book: updatebook });
  }
  prisma.$disconnect();
}

export default authRoute(createbook, prisma);
