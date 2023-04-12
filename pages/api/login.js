import {verify} from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function register(req, res){
    if (req.method == "POST"){
        // Combine these into one if statement
        if(!req.body?.UserName || !req.body?.PhoneNumber || !req.body?.Email || !req.body?.Password || !req.body?.FirstName || !req.body?.LastName) {
            return res.status(400).json({ message: 'All field must be filled.' })
        }
        // Hash Password First Before Saving in The Database
        const User = await prisma.User.create({
                data: {
                    User: req.body.UserName,
                },
                skipDuplicates: true
        }) // can we sent role as well?
        // Find user First => If ture => Create Address
        const Address = await prisma.Address.create({

        })
        // Return JWT Token
    }
    
    // Address
    await prisma.$disconnect()
}