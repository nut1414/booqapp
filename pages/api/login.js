import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import { generateUserJWT } from '@/utils/auth';

const prisma = new PrismaClient()

export default async function login(req, res){
  const { username, password } = req.body
  // console.log(req.body)
  if (username && password) {
    const user = await prisma.user.findUnique({
      where: { UserName: username }
    })
    if (user) {
      const match = bcrypt.compareSync(password, user?.Password)
      
      if (!match) {
        res.status(400).json({ message: 'Wrong Username or Password' })
      }
      else {
        let signtok = await generateUserJWT({ user, prisma })
        res.status(200).json({ token: signtok, message: 'Login Success' })
      }
    } else {
      res.status(400).json({ message: 'Wrong Username or Password' })
    }
  }else {
      res.status(400).json({ message: 'Wrong Username or Password' })
  }
  await prisma.$disconnect()
}