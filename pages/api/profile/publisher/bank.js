import authRoute from "@/utils/middlewares/authRoute"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function bank(req, res) {
  try {
    if (req.user.role.RoleID != "2") {
      await prisma.$disconnect()
      return res.status(400).json({ message: "User not allowed." })
    }
    if (req.method == "GET") {
      const publisherbank = await prisma.publisherbank.findMany({
        where: {
          UserID: req.user.UserID,
        },
      })
      await prisma.$disconnect()
      res.status(200).json({ message: "Publisher bank info fetched successfully", publisherbank: publisherbank ? publisherbank : [] })
    }
    else if (req.method == "DELETE"){
      const findbank = await prisma.publisherbank.findUnique({
        where: {
          PBankID: parseInt(req.query.PBankID),
        },
      })
      if(!findbank){
        await prisma.$disconnect()
        return res.status(400).json({ message: 'Bank not found.' })
      }
      const checkifmainbank = await prisma.publisher.findUnique({
        where: {
          PublisherID: req.user.UserID,
        },
        select: {
          Mainbank: true,
        }
      })
      if(checkifmainbank.Mainbank == parseInt(req.query.PBankID)){
        const publisherbank = await prisma.publisher.update({
          where: {
            PublisherID: req.user.UserID,
          },
          data: {
            Mainbank: null,
          }
        })
      }
      const deletebank = await prisma.publisherbank.delete({
        where: {
          PBankID: parseInt(req.query.PBankID),
        },
      })
      await prisma.$disconnect()
      res.status(200).json({ message: "Publisher bank info deleted successfully"})
    }
    else if (req.method == "POST"){
      // Combine these into one if statement
      if (
         !req.body?.BankName
        || !req.body?.AccountNumber
        || !req.body?.BankID
           ) {
        await prisma.$disconnect()
        return res.status(400).json({ message: 'All field must be filled.' })
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
    if(req.method=="PUT"){
      const checkifbankexist = await prisma.publisherbank.findUnique({
        where: {
          PBankID: parseInt(req.query.PBankID),
        },
      })
      if(!checkifbankexist){
        await prisma.$disconnect()
        return res.status(400).json({ message: 'Bank not found.' })
      }
      const publisherbank = await prisma.publisher.update({
        where: {
          PublisherID: req.user.UserID,
        },
        data: {
          Mainbank: parseInt(req.query.PBankID),
        }
      })
      await prisma.$disconnect()
      return res.status(400).json({ message: 'MainBank Changed' })
    }

  }catch (e) {
    res.status(500).json({message: "Internal Server Error", error: e.message})
  }

  
  await prisma.$disconnect()
}

export default authRoute(bank, prisma)