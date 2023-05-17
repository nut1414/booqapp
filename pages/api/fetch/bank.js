import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function bankFetch(req, res) {
  try {
    if (req.method == "GET") {
      const bank = await prisma.bank.findMany({
        orderBy: {
          BankID: "asc",
        },
      });
      res.status(200).json({ message: "Bank fetched successfully", bank: bank ? bank : [] });
    } else {
      res.status(400).json({ message: "Invalid Method" });
    }
  } catch (e) {
    await prisma.$disconnect();
    res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
  await prisma.$disconnect();
}

export default bankFetch;