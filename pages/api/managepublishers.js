import { PrismaClient } from "@prisma/client";
import authRoute from "@/utils/middlewares/authRoute";

const prisma = new PrismaClient();

//getting all orders that the current publisher has
async function orderpublisher(req, res) {
  if (req.user.role.RoleID != 0) {
    prisma.$disconnect();
    res.status(401).json({ message: "Unauthorized" }); // if not user
  }
  try {
    if (req.method == "GET") {
      let getpublisher = [];
      const { PublisherID, } = req.query
      getpublisher = await prisma.publisher.findMany({
        where: {
          PublisherID: PublisherID ? parseInt(PublisherID) : undefined,
        },
        select: {           
          PublisherID: true, 
          PublisherName: true,
          verificationstatus: true,
          VerificationDocument: PublisherID ? true : false,          
          order: PublisherID ? {
            include: {
              orderbook: true,
            }
          } : false,
        },
      })
      console.log('getpublisher', getpublisher)
      if(PublisherID)
        getpublisher.map((x) => { ( x.VerificationDocument ) ? x.VerificationDocument = x.VerificationDocument.toString('utf-8') : [] })
      
      
      const agg = await prisma.orderbook.groupBy({
        by: ['BookID'],
        _sum: {
          Quantity: true,
        },
      });
      for (const publisher of getpublisher) {
        let publishersalecount = 0;        
        const {PublisherID} = publisher;
        const findbook = await prisma.bookdetails.findMany({
          where: {
            PublisherID : PublisherID ? parseInt(PublisherID) : undefined,
          }
        })
        const ordercount = await prisma.order.count({
          where: {
            PublisherID: PublisherID ? parseInt(PublisherID) : undefined,
          }
        })
        for (const item of agg) {
          const { BookID, _sum: { Quantity } } = item;
          const book = findbook.find((x) => x.BookID == BookID)
          if (book) {
            book.Quantity = Quantity ;
          }
        }
  
        for(const book of findbook){
          publishersalecount += book?.Quantity ? book.Quantity : 0;
        }
        publisher.BookCount = findbook.length;
        publisher.SalesCount = publishersalecount;
      }
      console.log(getpublisher)
      prisma.$disconnect();
      res.status(200).json({ message: "Success", publisher: getpublisher });

    } else if( req.method == "PUT"){
      const { verify, PublisherID } = req.body;
      if (verify == undefined) {
        prisma.$disconnect();
        res.status(400).json({ message: "Bad Request" });
      }
      const publisher = await prisma.publisher.update({
        where: {
          PublisherID: PublisherID ? parseInt(PublisherID) : undefined,
        },
        data: {
          VerifyStatusID: verify == "true" ? 2 : verify == "false" ? 1 : undefined,
        }
      })
      prisma.$disconnect();
      res.status(200).json({ message: "Success", publisher: publisher });
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Internal Server Error", error: e.message })
    prisma.$disconnect();
  }
  await prisma.$disconnect();
  
}

export default authRoute(orderpublisher, prisma);