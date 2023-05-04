import authRoute from "@/utils/middlewares/authRoute"
import { PrismaClient } from "@prisma/client";
import { verifyUserJWT } from "@/utils/auth";

const prisma = new PrismaClient();

async function createbook(req, res){
    if (req.method == "POST"){
        // This required BookName AuthorID GenreID FormatID(FormattypeID) Description ReleaseDate Price Weight 
        if ( !req.body?.BookName
          || !req.body?.AuthorID
          || !req.body?.GenreID
          || !req.body?.FormatID
          || !req.body?.Description
          || !req.body?.ReleaseDate
          || !req.body?.Price
          || !req.body?.Weight
          ) {
          await prisma.$disconnect()
          return res.status(400).json({ message: 'All field must be filled.' })
        }
        console.log(req.user.role.RoleID)
        if(req.user.role.RoleID != 2){
            await prisma.$disconnect()
            return res.status(400).json({ message: 'Only Publisher can create book.' })
        }
        const book = await prisma.bookdetails.create({
            data: {
                BookName: req.body.BookName,
                formattype: {
                    connect: {
                        FormatTypeID: parseInt(req.body.FormatID,10)
                    }
                },
                publisher: {
                    connect: {
                        PublisherID: req.user.role.RoleID
                    }
                },
                Description: req.body.Description,
                ReleaseDate: new Date(req.body.ReleaseDate),
                Price : parseInt(req.body.Price,10),
                Weight : parseFloat(req.body.Weight),
            }
        });
        const bookgenre = await prisma.bookgenre.create({
            data: {
                bookdetails: {
                    connect: {
                        BookID: book.BookID
                    }
                },
                genre: {
                    connect: {
                        GenreID: parseInt(req.body.GenreID,10)
                    }
                }
            }
        });
        const bookauthor = await prisma.bookauthor.create({
            data: {
                bookdetails: {
                    connect: {
                        BookID: book.BookID
                    }
                },
                author: {
                    connect: {
                        AuthorID: parseInt(req.body.AuthorID,10)
                    }
                }
            }
        });
        res.status(200).json({message: "Book created successfully", book: book})
        prisma.$disconnect()
    }
}

export default authRoute(createbook,prisma)