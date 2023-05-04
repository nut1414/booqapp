import authRoute from "@/utils/middlewares/authRoute"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//Not finished
async function createpromotion(req, res){
    if (req.method == "POST"){
      console.log(req.body.BookID)
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
        return res.status(400).json({ message: 'Only Publisher can create promotion.' })
      }
      const promotion = await prisma.promotion.create({
        data: {
          publisher: {
            connect: {
              PublisherID: req.user.role.RoleID
            }
          },
          DiscountPercent: parseFloat(req.body.DiscountPercentage),
          StartDate: new Date(req.body.StartDate),
          EndDate: new Date(req.body.EndDate),
          PromotionDetail: req.body.PromotionDetails,
        }
      });
      const promotionbook = await prisma.promotionbook.create({
        data: {
          promotion: {
            connect: {
              PromotionID: promotion.PromotionID
            }
          },
          bookdetails: {
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

export default authRoute(createpromotion,prisma)