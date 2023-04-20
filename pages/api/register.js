import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import { generateUserJWT } from '@/utils/auth';

const prisma = new PrismaClient()

const saltround = 10

export default async function register(req, res){
    if (req.method == "POST"){
      // Combine these into one if statement
      if (
           !req.body?.UserName
        || !req.body?.PhoneNumber
        || !req.body?.Email
        || !req.body?.Password
        || !(req.body?.RoleID !== '1' || req.body?.RoleID !== '2')
        || !req.body?.FirstName
        || !req.body?.LastName
        || !req.body?.Address
        || !req.body?.ZipCode) {
        await prisma.$disconnect()
        return res.status(400).json({ message: 'All field must be filled.' })
      }        
      // Check if user exist
      const checkIfUserDuplicate = await prisma.user.findUnique({
        where: {
          UserName: req.body.UserName
        }
      })
      if (checkIfUserDuplicate) {
        await prisma.$disconnect()
        return res.status(400).json({ message: 'User already exist.' })
      }
      const hashing = bcrypt.hashSync(req.body.Password, saltround);
      // Hash Password First Before Saving in The Database
      const user = await prisma.user.create({
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
                  Name : req.body.FirstName + " " + req.body.LastName,
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
        let signtok = await generateUserJWT({ user: checkIfUserExist, prisma })
        
        res.status(200).json({token: signtok})
      }
      else
        res.status(400).json({ message: 'Create failed.'})
      // Return JWT Token
    }
    // Address
    await prisma.$disconnect()
}