import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function register(req, res){
    if (req.method == "POST"){
        const Role = await prisma.role.createMany({
                data: [
                    {RoleID: 0,RoleName: "Admin"},
                    {RoleID: 1,RoleName: "Customer"},
                    {RoleID: 2,RoleName: "Publisher"}
                ],skipDuplicates: true
        })
    }
    // Address
    res.status(200).json({message: "Role Created"})
    await prisma.$disconnect()
}