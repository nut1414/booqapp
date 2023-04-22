import { PrismaClient } from "@prisma/client";
import { verifyUserJWT } from "@/utils/auth";

export default async function createbook(req, res){
    const prisma = new PrismaClient();
    const { user } = await verifyUserJWT(req.headers.authorization); // Not sure
    if (req.method == "POST"){
        // Combine these into one if statement
        if ( !req.body?.BookName
          || !req.body?.bookauthor
          || !req.body?.bookgenre
          || !req.body?.bookformat
          || !req.body?.Description
          || !req.body?.ReleaseDate
          || !req.body?.Price
          || !req.body?.Weight) {
          await prisma.$disconnect()
          return res.status(400).json({ message: 'All field must be filled.' })
        }        
        // Check if user exist
        const checkIfBookCreated = await prisma.bookdetails.findUnique({
          where: {
            BookName: req.body.BookName
          }
        })
        if (checkIfBookCreated) {
          await prisma.$disconnect()
          return res.status(400).json({ message: 'Book already exist.' })
        }
        const book = await prisma.bookdetails.create({
            data: {
                BookName: req.body.BookName,
                bookauthor: { 
                    connect: { 
                        AuthorID: parseInt(req.body.AuthorID,10) 
                    } 
                },
                bookgenre: {
                    connect: {
                        GenreID: parseInt(req.body.GenreID,10)
                    }
                },
                bookformat: {
                    connect: {
                        FormatID: parseInt(req.body.FormatID,10)
                    }
                },
                Description: req.body.Description,
                ReleaseDate: req.body.ReleaseDate,
                Price : req.body.Price,
                Weight : req.body.Weight,
            }
        });
        res.json(book);
        $prisma.disconnect();
    }
}