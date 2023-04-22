import { PrismaClient } from "@prisma/client";
import { verifyUserJWT } from "@/utils/auth";

export default async function createpromotion(req, res){
  const prisma = new PrismaClient();
    const { user } = await verifyUserJWT(req.headers.authorization); // Not sure
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
      // Check if user exist
      // const checkIfPromotionCreated = await prisma.promotion.findUnique({
      //   where: {          
      //   }
      // })
      // if (checkIfPromotionCreated) {
      //   await prisma.$disconnect()
      //   return res.status(400).json({ message: 'Promotion already exist.' })
      // }
      const book = await prisma.promotion.create({
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
          BookID: {
            connect: {
              BookID: parseInt(req.body.BookID,10)
            }
          }
        }
      });
    }
}