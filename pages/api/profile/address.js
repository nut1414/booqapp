import authRoute from "@/utils/middlewares/authRoute";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function address(req, res) {
  try {
    if (req.method == "GET") {
      const address = await prisma.address.findMany({
        where: {
          UserID: req.user.UserID,
        },
      });
      res.status (200).json({ message: "Address fetched successfully", address: address ? address : [] });
    } else if (req.method == "POST") { // create address
      let {
        Address,
        ZipCode,
        PhoneNumber,
      } = req.body
      if (!Address || !ZipCode || !PhoneNumber) {
        await prisma.$disconnect();
        return res.status(400).json({ message: "All field must be filled." });
      }
      const address = await prisma.address.create({
        data: {
          Address,
          ZipCode,
          PhoneNumber,
          UserID: req.user.UserID
        },
      });
      await prisma.$disconnect();
      if (address)
        res.status(200).json({ message: "Address created successfully", address });
      else
        res.status(400).json({ message: "Failed to create address." });
    } else if (req.method == "PUT") { // update address
      let {
        ShippingAddressID,
        Address,
        ZipCode,
        PhoneNumber,
      } = req.body
      if (!ShippingAddressID || !Address || !ZipCode || !PhoneNumber) {
        await prisma.$disconnect();
        return res.status(400).json({ message: "All field must be filled." });
      }
      const address = await prisma.address.update({
        where: {
          ShippingAddressID: ShippingAddressID,
          UserID: req.user.UserID
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
        ShippingAddressID
      } = req.body
      if (!ShippingAddressID) {
        await prisma.$disconnect();
        return res.status(400).json({ message: "All field must be filled." });
      }
      const address = await prisma.address.delete({
        where: {
          ShippingAddressID: ShippingAddressID,
          UserID: req.user.UserID
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
    res.status(500).json({ message: "Internal Server Error", error: e });
  }
  await prisma.$disconnect();
}
export default authRoute(address,prisma)