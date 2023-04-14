import {verify} from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function register(req, res){
    if (req.method == "POST"){
        console.log(req.body)
        const Role = await prisma.Role.create({
                data: {
                    RoleID: Number(req.body.RoleID),
                    RoleName: req.body.RoleName,
                }
        })
    }
    // Address
    await prisma.$disconnect()
}