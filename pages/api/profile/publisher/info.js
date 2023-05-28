import authRoute from "@/utils/middlewares/authRoute";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import publisher from "../../order/publisher";

const prisma = new PrismaClient();

const saltround = 10

async function profileinfo(req, res) {
  try {
    if (req.method == "GET") {
      const publisher = await prisma.publisher.findUnique({
        where: {
          PublisherID: req.user.UserID,
        },         
        include: {
          user: {
            select: {
              Name: true,
              UserName: true,
              PhoneNumber: true,
              Email: true,
            }
          },
        },
      });
      if (!publisher) {
        await prisma.$disconnect();
        return res.status(400).json({ message: "Publisher not found." });
      }
      await prisma.$disconnect();
      res.status(200).json({ message: "Publisher info fetched successfully", publisher });
    } else if (req.method == "PUT") {
      let {
        Email,
        Name, 
        PublisherName,
        Phone,
        PhoneNumber,
        Description,        
        Password
      } = req.body
      if (!Password || !Email || !PhoneNumber || !Name || !PublisherName || !Phone || !Description) {
        await prisma.$disconnect();
        return res.status(400).json({ message: "All field must be filled." });
      }
      const publisher = await prisma.publisher.findUnique({
        where: {
          PublisherID: req.user.UserID,
        },
      });
      const user = await prisma.user.findUnique({
        where: {
          UserID: req.user.UserID,
        },
      });
      console.log('publisher',publisher,'user', user)
      if (!publisher) {
        await prisma.$disconnect();
        return res.status(400).json({ message: "Publisher not found." });
      }
      const match = bcrypt.compareSync(Password, user?.Password)

      if (!match) {
        await prisma.$disconnect();
        return res.status(400).json({ message: "Password is incorrect." });
      }

      const userupdate = await prisma.user.update({
        where: {
          UserID: req.user.UserID,
        },
        data: {       
          Email: Email ? Email : undefined,
          PhoneNumber: PhoneNumber ? PhoneNumber : undefined,  
          publisher: {
            update: {                
                PhoneNumber: Phone ? Phone : undefined,
                PublisherName: Name ? Name : undefined,
                Description: Description ? Description : undefined,
            }
          }
        },
      });
      await prisma.$disconnect();
      if(!userupdate) res.status(400).json({ message: "Failed to change user info." })
      res.status(200).json({ message: "User info changed successfully" });
    } else {
      prisma.$disconnect();
      res.status(400).json({ message: "Invalid Method" });
    }
  } catch (e) {
    console.log(e);
    prisma.$disconnect();
    res.status(500).json({ message: "Internal Server Error", error: e });
  }

  await prisma.$disconnect();
}

export default authRoute(profileinfo,prisma)