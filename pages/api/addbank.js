import authRoute from "@/utils/middlewares/authRoute"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// Not so sure if it's correct
// Not finished
async function addBank(req, res){
    if (req.method == "POST"){
      // Combine these into one if statement
      if (
         !req.body?.BankName
        || !req.body?.AccountNumber
        || !req.body?.BankID
           ) {
        await prisma.$disconnect()
        return res.status(400).json({ message: 'All field must be filled.' })
      }
      // Check if the user is really a publisher
      if(req.user.role.RoleID != 2){
        await prisma.$disconnect()
        return res.status(400).json({ message: 'Only Publisher can add bank.' })
      }
      const bankcheck = await prisma.bank.findUnique({
        where: {
          BankID: parseInt(req.body.BankID)
        }
      })
      if(!bankcheck){
        await prisma.$disconnect()
        return res.status(400).json({ message: 'Bank not found.' })
      }
      const bank = await prisma.publisherbank.create({
        data: {
          publisher: {
            connect: {
              PublisherID: req.user.UserID
            }
          },
          BankName: req.body.BankName,
          AccountNumber: req.body.AccountNumber,
          bank:{
            connect: {
              BankID: parseInt(req.body.BankID)
            }
          },
        }
      })
    await prisma.$disconnect()
    res.status(200).json({message: "Bank added successfully"})
  }
  if(req.method = "GET"){
  }
}

export default authRoute(addBank,prisma);