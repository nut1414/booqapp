import {verify} from 'jsonwebtoken';
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
    bcrypt.compare(Password, user.Password).then((match) => {
        if(!match) {
            return res.status(400).json({ message: 'Wrong Username or Password' })
        }
        else{
            return res.status(200).json({ message: 'Correct Credential'})
            token = Jwttoken.createToken(user)
            if(token)
                console.log("User token Create => Token: " + token)
        }
    })
}