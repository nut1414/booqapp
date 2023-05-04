import authRoute from "@/utils/middlewares/authRoute"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function publisher(req, res){
    if (req.method == "POST"){
      // Combine these into one if statement
      if (
           !req.body?.PublisherName
        || !req.body?.Description
        || !req.body?.PhoneNumber
        || !req.body?.Address
        || !req.body?.Zipcode
        || !req.body?.PBankID
        || !req.body?.BankName
        || !req.body?.AccountNumber
        || !req.body?.BankID
           ) {
        await prisma.$disconnect()
        return res.status(400).json({ message: 'All field must be filled.' })
      }
      // Check if the user is really a publisher
      if(req.user.role.RoleID != 2){
        await prisma.$disconnect()
        return res.status(400).json({ message: 'Only Publisher can create promotion.' })
      }
      const publisher = await prisma.publisher.create({
        data: {
          user: {
            connect: {
              PublisherID: req.user.role.RoleID
            }
          },
          PublisherName: req.body.PublisherName,
          Description: req.body.Description,
          PhoneNumber: req.body.PhoneNumber,
        }
      })
      const address = await prisma.publisheraddress.create({
        data: {
          publisher: {
            connect: {
              PublisherID: publisher.PublisherID
            }
          },
          Address: req.body.Address,
          Zipcode: req.body.Zipcode,
          PhoneNumber: req.body.PhoneNumber,
        }
      })
      const bank = await prisma.publisherbank.create({
        data: {
          publisher: {
            connect: {
              PublisherID: publisher.PublisherID
            }
          },
          BankName: req.body.BankName,
          AccountNumber: req.body.AccountNumber,
          bank:{
            connect: {
              BankID: req.body.BankID
            }
          },
        }
      })
    await prisma.$disconnect()
  }
} 

export default authRoute(publisher,prisma);