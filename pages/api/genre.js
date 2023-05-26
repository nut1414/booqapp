import authRoute from "@/utils/middlewares/authRoute"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function Genre(req, res) {
  // This required name(GenreName) id(GenreID)(Optional)
  // if(req.user.role.RoleID != 0){
  //   await prisma.$disconnect();
  //   return res.status(400).json({ message: "Only Admin can create genre."});
  // }
  if (req.method == "POST") {
    const iscreated = await prisma.genre.findUnique({
      where: {
        GenreName: req.body.name,
      },
    });
    if (!iscreated) {
      const creategenre = await prisma.genre.create({
        data: {
          GenreName: req.body.name,
          GenreID: req.body?.id ? parseInt(req.body?.id, 10) : undefined,
        },
      });
      res.status(200).json({ message: "Genre Created" });
    } else {
      res.status(400).json({ message: "Genre Already Created" });
    }
  } else if (req.method == "GET") {
    let getgenre = [];
    getgenre = await prisma.genre.findMany({
      where: {
      },
      orderBy: {
        bookgenre: {
          _count: "desc",
        }
      },
      include: {
        bookgenre: {
          select: {
            bookdetails: {
              
            }
          }
        }
      },
      skip: req.query?.skip ? parseInt(req.query?.skip, 10) : undefined,
    });
    res.status(200).json({ genre: getgenre });
  } else if (req.method == "DELETE") {
    // Query not body
    console.log(req.query);
    if (req.query?.id || req.query?.name) {
      const deletegenre = await prisma.genre
        .delete({
          where: {
            GenreID: req.query?.id ? parseInt(req.query?.id, 10) : undefined,
            GenreName: req.query?.name ? req.query?.name : undefined,
          },
        })
        .then(() => {
          res.status(200).json({ message: "Genre Deleted" });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ message: "Genre Doesn't Exist" });
        });
    } else {
      res.status(400).json({ message: "No Input" });
    }
  }
  await prisma.$disconnect();
  return res;
}

export default authRoute(Genre,prisma);