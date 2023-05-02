import authRoute from "@/utils/middlewares/authRoute"
import { PrismaClient } from "@prisma/client";
import { verifyUserJWT } from "@/utils/auth";

const prisma = new PrismaClient();

export default async function createpromotion(req, res){
    if (req.method == "POST"){
      // Combine these into one if statement
      if ( !req.body?.DiscountPercentage
        || !req.body?.StartDate
        || !req.body?.EndDate
        || !req.body?.PromotionDetails
        || !req.body?.BookID) {
        await prisma.$disconnect()
        return res.status(400).json({ message: 'All field must be filled.' })
      }
      // Can't Check Due to Can't Create Book right now
      if(req.user.role.RoleID != 2){
        await prisma.$disconnect()
        return res.status(400).json({ message: 'Only Publisher can create book.' })
      }
      const promotion = await prisma.promotion.create({
        data: {
          publisher: {
            connect: {
              PublisherID: user.ID
            }
          },
          DiscountPercentage: req.body.DiscountPercentage,
          StartDate: req.body.StartDate,
          EndDate: req.body.EndDate,
          PromotionDetails: req.body.PromotionDetails,
          [BookID]: {
            connect: {
              BookID: parseInt(req.body.BookID,10)
            }
          }
        }
      });
      res.status(200).json({message: "Promotion created successfully"})
      prisma.$disconnect()
    }
}

//export default authRoute(createpromotion,prisma)