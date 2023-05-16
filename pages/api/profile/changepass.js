import authRoute from "@/utils/middlewares/authRoute";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const saltround = 10

async function changepass(req, res) {
  try {
    if (req.method == "POST") {
      if (!req.body?.oldpass || !req.body?.newpass) {
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
      const match = bcrypt.compareSync(req.body.oldpass, user?.Password)

      if (!match) {
        await prisma.$disconnect();
        return res.status(400).json({ message: "Old password is incorrect." });
      }

      const hashing = bcrypt.hashSync(req.body.newpass, saltround); 
      const userupdate = await prisma.user.update({
        where: {
          UserID: req.user.UserID,
        },
        data: {
          Password: hashing,
        },
      });
      await prisma.$disconnect();
      if(!userupdate) res.status(400).json({ message: "Failed to change password." })
      res.status(200).json({ message: "Password changed successfully" });
    } else {
      res.status(400).json({ message: "Invalid Method" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error", error: e });
  }

  await prisma.$disconnect();
}

export default authRoute(changepass,prisma)