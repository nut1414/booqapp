import authRoute from "@/utils/middlewares/authRoute"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function publisher(req, res){
  try {
    if(req.user.role.RoleID != 2){
      await prisma.$disconnect();
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.method == "GET") {
      const address = await prisma.publisheraddress.findMany({
        where: {
          PublisherID: req.user.UserID,
        },
      });
      res.status(200).json({ message: "Address fetched successfully", address: address ? address : [] });
    } else if (req.method == "POST") { // create address
      let {
        Address,
        ZipCode,
        PhoneNumber,
        Name
      } = req.body
      if (!Address || !ZipCode || !PhoneNumber) {
        await prisma.$disconnect();
        return res.status(400).json({ message: "All field must be filled." });
      }
      const address = await prisma.publisheraddress.create({
        data: {
          Address,
          ZipCode,
          PhoneNumber,
          Name,
          publisher: {
            connect: {
              PublisherID: req.user.UserID
            }
          }
        },
      });
      await prisma.$disconnect();
      if (address)
        res.status(200).json({ message: "Address created successfully", address });
      else
        res.status(400).json({ message: "Failed to create address." });
    } else if (req.method == "PUT") { // update address
      let {
        PaddressID,
        Address,
        ZipCode,
        PhoneNumber,
      } = req.body
      if (!PaddressID || !Address || !ZipCode || !PhoneNumber) {
        await prisma.$disconnect();
        return res.status(400).json({ message: "All field must be filled." });
      }
      const address = await prisma.publisheraddress.update({
        where: {
          PaddressID: parseInt(PaddressID),
        },
        data: {
          Address,
          ZipCode,
          PhoneNumber,
        },
      });
      if (address)
        res.status(200).json({ message: "Address updated successfully", address });
      else
        res.status(400).json({ message: "Failed to update address." });
    } else if (req.method == "DELETE") { // delete address
      let {
        PaddressID
      } = req.query
      if (!parseInt(PaddressID)) {
        await prisma.$disconnect();
        return res.status(400).json({ message: "All field must be filled." });
      }
      const alladdress = await prisma.publisheraddress.findMany({
        where: {
          PublisherID: req.user.UserID,
        },
      });
      if (alladdress.length <= 1) {
        await prisma.$disconnect();
        return res.status(400).json({ message: "You must have at least one address." });
      }
      const address = await prisma.publisheraddress.delete({
        where: {
          PaddressID: parseInt(PaddressID),
          publisher: {
            PublisherID: req.user.UserID
          }
        },
      });
      if (address)
        res.status(200).json({ message: "Address deleted successfully", address });
      else
        res.status(400).json({ message: "Failed to delete address." });
    } else {
      res.status(400).json({ message: "Method not allowed." });
    }

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
  await prisma.$disconnect();
} 

export default authRoute(publisher,prisma);