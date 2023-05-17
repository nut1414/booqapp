import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function formatFetch(req, res) {
  try {
    if (req.method == "GET") {
      const formattype = await prisma.formattype.findMany({
        orderBy: {
          FormatTypeID: "asc",
        },
      });
      res.status(200).json({ message: "Format fetched successfully", formattype: formattype ? formattype : [] });
    } else {
      res.status(400).json({ message: "Invalid Method" });
    }
  } catch (e) {
    await prisma.$disconnect();
    res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
  await prisma.$disconnect();
}

export default formatFetch;