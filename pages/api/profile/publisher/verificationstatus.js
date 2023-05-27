import authRoute from "@/utils/middlewares/authRoute"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function Verification(req, res) {
  try {
    if (req.user.role.RoleID != "2") {
      await prisma.$disconnect()
      return res.status(400).json({ message: "User not allowed." })
    }
    if (req.method == "GET") {
     const publisher = await prisma.publisher.findUnique({
        where: {
          PublisherID: req.user.UserID,
        },
        select: {
          verificationstatus: true,
        }
      })
      console.log(publisher)
      prisma.$disconnect()
      res.status(200).json({ message: "Publisher Verification Status info fetched successfully", verificationstatus: publisher.verificationstatus ? publisher.verificationstatus : null})
    }
    else if (req.method == "PUT"){
      let DocumentBuffer;
      if (req.body?.Document)
        DocumentBuffer = Buffer.from(req.body.Document, "utf-8");
      else{
        await prisma.$disconnect()
        res.status(400).json({ message: "Document is required" })
      }
      console.log("Document", DocumentBuffer);
      const updatedocumentpublisher = await prisma.publisher.update({
        where: {
          PublisherID: req.user.UserID,
        },
        data: {
          VerificationDocument: DocumentBuffer,
          VerifyStatusID: 1,
        }
      })
      const publisher = await prisma.publisher.findUnique({
        where: {
          PublisherID: req.user.UserID,
        },
        select: {
          verificationstatus: true,
        }
      })
      await prisma.$disconnect()
      res.status(200).json({ message: "Publisher Verification Status updated successfully",VerificationStatus: publisher.verificationstatus ? publisher.verificationstatus : null})
    }
  }catch (e) {
    res.status(500).json({message: "Internal Server Error", error: e.message})
  }  
  await prisma.$disconnect()
}

export default authRoute(Verification, prisma)