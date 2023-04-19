import {sign , verify} from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import Jwttoken from '@/utils/่Jwttoken';

const bcrypt = require('bcrypt')
const saltround = 10
const prisma = new PrismaClient()
const cookie = require('cookie-parser')
const cookies = new cookie()

export default async function login(req, res){
    const {Uname, Password} = req.body
    console.log(req.body)
    const user = await prisma.user.findUnique({ 
        where: { UserName: Uname }
    })
    if (!user) {
        return res.status(400).json({ message: 'Wrong Username or Password' })
    }
    bcrypt.compare(Password, user.Password).then(async(match) => {
        if(!match) {
            return res.status(400).json({ message: 'Wrong Username or Password' })
        }
        else{         
            const Userrole = await prisma.role.findUnique({
                where: {
                    RoleID: parseInt(user.RoleID,10)
                }
            })   
            let signtok = sign({ id : user.UserID, name : user.Name, email : user.Email , role : Userrole},  process.env.JWT_SECRET, { expiresIn: "7d" });
            return res.status(200).json({ token : signtok, message: 'Login Success'})
        }
    })
}