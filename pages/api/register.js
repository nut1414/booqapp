import {verify} from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const saltround = 10

export default async function register(req, res){
    if (req.method == "POST"){
        // Combine these into one if statement
        if(!req.body?.UserName || !req.body?.PhoneNumber || !req.body?.Email || !req.body?.Password || !req.body?.FirstName || !req.body?.LastName) {
            return res.status(400).json({ message: 'All field must be filled.' })
        }        
        if(!req.body?.Address || !req.body?.PhoneNumber || !req.body?.ZipCode) {
            return res.status(400).json({ message: 'All Address field must be filled.' })
        }
        const hashing = bcrypt.hashSync(req.body.Password, saltround);
        // Hash Password First Before Saving in The Database
        const User = await prisma.user.create({
                data: {
                    role: {
                        connect: {
                            RoleID: parseInt(req.body.RoleID,10)
                        }
                    },
                    UserName: req.body.UserName,
                    PhoneNumber: req.body.PhoneNumber,
                    Email: req.body.Email,
                    Password: hashing,
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    JoinDate: new Date(),
                }
        })
        console.log("User Created")
        const checkIfUserExist = await prisma.user.findUnique({
            where: {
                UserName: req.body.UserName
            }
        })
        console.log(checkIfUserExist)
        // Find user First => If ture => Create Address
        if(checkIfUserExist){
            const Address = await prisma.shippingaddress.create({
                data: {                    
                    user: {
                        connect: {
                            UserID: checkIfUserExist.UserID
                        }
                    },
                    Address: req.body.Address,
                    ZipCode: req.body.ZipCode,
                    PhoneNumber: req.body.PhoneNumber,
                }
            })
        }
        else
            return res.status(400).json({ message: 'Create failed.'})
        // Return JWT Token
    }
    return res.status(200).json({ message: 'Create success.'})
    // Address
    await prisma.$disconnect()
}