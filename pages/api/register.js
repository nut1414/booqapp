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
        bcrypt.genSalt(saltround, function(err, salt) {
            bcrypt.hash(req.body.Password, salt, function(err, hash) {
                req.body.Password = hash
            });
        }, function(err) {
            console.log(err)
        });
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
                    Password: req.body.Password,
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    JoinDate: new Date(),
                }
        }) // can we sent role as well?
        console.log("User Created")
        const checkIfUserExist = await prisma.user.findUnique({
            where: {
                UserName: req.body.UserName
            }
        })
        console.log(checkIfUserExist)
        // Find user First => If ture => Create Address
        if(checkIfUserExist){
            if(!req.body?.Address || !req.body?.PhoneNumber || !req.body?.ZipCode) {
                return res.status(400).json({ message: 'All field must be filled.' })
            }
            const Address = await prisma.Address.create({
                data: {                    
                    UserId: checkIfUserExist.id,
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
    
    // Address
    await prisma.$disconnect()
}