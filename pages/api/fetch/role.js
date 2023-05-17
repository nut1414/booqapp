import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function roleFetch(req, res) {
  try {
    if (req.method == "GET") {
      const role = await prisma.role.findMany({
        orderBy: {
          RoleID: "asc",
        },
      });
      res.status(200).json({ message: "Role fetched successfully", role: role ? role : [] });
    } else {
      res.status(400).json({ message: "Invalid Method" });
    }
  } catch (e) {
    await prisma.$disconnect();
    res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
  await prisma.$disconnect();
}

export default roleFetch;