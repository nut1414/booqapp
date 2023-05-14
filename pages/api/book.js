import authRoute from "@/utils/middlewares/authRoute";
import { PrismaClient } from "@prisma/client";
import { verifyUserJWT } from "@/utils/auth";

const prisma = new PrismaClient();

async function createbook(req, res) {
  if (req.method == "POST") {
    // This required BookName AuthorID GenreID FormatID(FormattypeID) Description ReleaseDate Price Weight
    if (
      !req.body?.BookName ||
      !req.body?.AuthorName ||
      !req.body?.GenreID ||
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
    for(let i = 0; i < req.body.AuthorName.length; i++){
      console.log(req.body.AuthorName[i]);        
      const authorcheck = await prisma.author.findFirst({
        where: {
          AuthorName: req.body.AuthorName[i],
        }
      });
      console.log(authorcheck);
      author[i] = authorcheck;
      if(!authorcheck){
        console.log(req.body.AuthorName[i] +"Is beging created")
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
        Description: req.body.Description,
        ReleaseDate: new Date(req.body.ReleaseDate),
        Price: parseInt(req.body.Price, 10),
        Weight: parseFloat(req.body.Weight),
      },
    });
    const bookgenre = await prisma.bookgenre.create({
      data: {
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
  }else if(req.method == "GET"){
    // Get Logic not Finished Yet
    console.log(req.query);
    let getbook = [];
    getbook = await prisma.bookdetails.findMany({
      include: {
        bookgenre: {
          include: {
            genre: {
              select: {
                GenreName: true,
              },
            }
          },
        },
        bookauthor: {
            author: {
              select: {
                AuthorName: true,
              },
            },
        },
      },
      where: {
        BookName: {
          contains: req.query?.BookName ? req.query?.BookName:undefined,
        },
        bookgenre: {
          include: {
            genre: {
              GenreName: {
                contains: req.query?.GenreName ? req.query?.GenreName:undefined,
              },
            },
          }
        },
        bookauthor: {      
          author: {
            connect: {    
              AuthorName: {
                contains: req.query?.AuthorName ? req.query?.AuthorName:undefined,
              }
            }
          }
        },
      },
    });
    prisma.$disconnect();
    res.status(200).json({ book: getbook });
  }else if (req.method == "DELETE") {
    // Deleting Book Logic not Finished Yet
    console.log(req.query);
    if (req.query?.BookID) {      
      const bookauthor = await prisma.bookauthor.findFirst({
        where: {
          BookID: req.query?.BookID ? parseInt(req.query?.BookID, 10) : undefined,
        },
      });
      const deletebooks = await prisma.bookdetails
        .delete({
          where: {
            BookID: req.query?.BookID ? parseInt(req.query?.BookID, 10) : undefined,
          },
        })
        .then(() => {
          res.status(200).json({ message: "Book Deleted" });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ message: "Book Doesn't Exist" });
        });
      
    } else {
      res.status(400).json({ message: "No Input" });
    }
    console.log(bookauthor);
    
  }
  prisma.$disconnect();
}

export default authRoute(createbook, prisma);
