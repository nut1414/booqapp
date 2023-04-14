import {verify} from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function disconn(req,res){
    // Address
    await prisma.$disconnect()
    return res.status(200).json({message:"Successfully Disconnected"});
}