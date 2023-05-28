import { PrismaClient } from "@prisma/client";
import authRoute from "@/utils/middlewares/authRoute";
import itemCartGroupByPublisher from "@/utils/order/itemCartGroupByPublisher";
import calculateOrderTotalDiscountShip from "@/utils/order/calculateOrderTotalDiscountShip";
import { includeBookPromotion, includeBookPublisher } from "@/utils/bookquery";
import { verifyUserJWT } from '@/utils/auth'

const prisma = new PrismaClient();

async function summarizeOrder(req, res) {
  // if (req.user.role.RoleID != 1) {
  //   prisma.$disconnect();
  //   return res.status(401).json({ message: "Unauthorized" }); // if not user
  // }
  try {
    if (req.method == "POST") {
      ///
      let token = req.headers['authorization']
    //console.log(token)
    let decoded = null
    try {
      token = token?.split(' ')[1]
      decoded = verifyUserJWT(token)
      console.log(decoded)
      
      if (decoded?.id) {
        req.user = await prisma.user.findUnique({
          where: { UserID: decoded.id }
        })
        if (!req.user) {
          throw new Error('User not found')
        }
        let role = await prisma.role.findUnique({ where: { RoleID: req.user.RoleID } })
        
        if (!role) {
          throw new Error('Role not found')
        }
        req.user.role = role
      }
        
    } catch (err) {
      console.log(err)
      await prisma.$disconnect()
      return res.status(401).json({ message: 'Unauthorized' })
    }

      ////
      const { BookID, Review, Rating, OrderID } = req.body;
      console.log("BookID", BookID, "Review", Review, "Rating", Rating, "OrderID", OrderID);
      if(!BookID || !Review || !Rating || !OrderID){
        prisma.$disconnect();
        return res.status(400).json({ message: "All field must be filled" });
      }
      console.log("req.user.UserID", req.user.UserID);
      console.log("HERE")
      const checkorder = await prisma.order.findUnique({
        where: {
          OrderID: parseInt(OrderID,10),
        },
      });
      console.log("checkorder", checkorder);
      if(!checkorder){
        prisma.$disconnect();
        return res.status(400).json({ message: "Order not found" });
      }
      const checkreview = await prisma.review.findMany({
        where: {
          OrderID: parseInt(OrderID,10),
          BookID: parseInt(BookID,10),
        },
      });
      console.log ("checkreview", checkreview);
      if(checkreview.length>0){
        prisma.$disconnect();
        return res.status(400).json({ message: "Review already exist" });
      }
      const createbookreview = await prisma.review.create({
        data: {
          order: {
            connect: {
              OrderID: parseInt(OrderID,10),
            },
          },
          user : {
            connect: {
              UserID: req.user.UserID,
            },
          },
          Comment: Review,
          Rate: parseInt(Rating,10),
          ReviewDate: new Date(),
          bookdetails: {
            connect: {
              BookID: parseInt(BookID,10),
            }
          },
        },
      });
      console.log("createbookreview", createbookreview);
      res.status(200).json({ message: "Review created" , createbookreview});
    }
    else if(req.method == "GET"){
      const { BookID, Rating } = req.query;
      console.log("BookID", BookID);
      if(!BookID){
        prisma.$disconnect();
        return res.status(400).json({ message: "All field must be filled" });
      }
      const checkbook = await prisma.bookdetails.findUnique({
        where: {
          BookID: parseInt(BookID,10),
        },
      });
      if(!checkbook){
        prisma.$disconnect();
        return res.status(400).json({ message: "Book not found" });
      }
      const getbookreview = await prisma.review.findMany({
        where: {
          BookID: parseInt(BookID,10),
          Rate: Rating? parseInt(Rating,10): undefined,
        },
        include: {
          user: {
            select: {
              UserName: true,
            },
          },
        },
      });
      res.status(200).json({ message: "Review found" , getbookreview});
    }
    else {
      res.status(400).json({ message: "Method not allowed" });
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

export default summarizeOrder
