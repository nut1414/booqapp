import authRoute from "@/utils/middlewares/authRoute";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const saltround = 10

async function profileinfo(req, res) {
  try {
    if (req.method == "GET") {
      const user = await prisma.user.findUnique({
        where: {
          UserID: req.user.UserID,
        },
        select: {
          UserID: true,
          Email: true,
          PhoneNumber: true,
          Name: true,
          UserName: true
        }
      });
      if (!user) {
        await prisma.$disconnect();
        return res.status(400).json({ message: "User not found." });
      }
      await prisma.$disconnect();
      res.status(200).json({ message: "User info fetched successfully", user });
    } else if (req.method == "POST") {
      let {
        Email,
        PhoneNumber,
        Name,
        Password
      } = req.body
      if (!Password || !Email || !PhoneNumber || !Name) {
        await prisma.$disconnect();
        return res.status(400).json({ message: "All field must be filled." });
      }
      const user = await prisma.user.findUnique({
        where: {
          UserID: req.user.UserID,
        },
      });
      console.log(user)
      if (!user) {
        await prisma.$disconnect();
        return res.status(400).json({ message: "User not found." });
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
          Name: Name ? Name : undefined,
        },
      });
      await prisma.$disconnect();
      if(!userupdate) res.status(400).json({ message: "Failed to change user info." })
      res.status(200).json({ message: "User info changed successfully" });
    } else {
      res.status(400).json({ message: "Invalid Method" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error", error: e });
  }

  await prisma.$disconnect();
}

export default authRoute(profileinfo,prisma)