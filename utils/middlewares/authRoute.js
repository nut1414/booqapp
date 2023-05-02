import { verifyUserJWT } from '@/utils/auth'

export default function authRoute(handler, prisma) {
  return async (req, res) => {
    // Check if the user is logged in
    let token = req.headers['authorization']
    token = token.split(' ')[1]
    //console.log(token)
    let decoded = null
    try {
      decoded = verifyUserJWT(token)
      //console.log(decoded)
      
      if (decoded?.id) {
        req.user = await prisma.user.findUnique({
          where: { UserID: decoded.id }
        })

        if (!req.user) {
          throw new Error('User not found')
        }
        let role = await prisma.role.findUnique({ where: { RoleID: req.user.RoleID } })
        
        if (!role) {
          throw new Error('Role not found')
        }
        req.user.role = role
        return handler(req, res)
      }
        
    } catch (err) {
      prisma.$disconnect()
      return res.status(401).json({ message: 'Unauthorized' })
    }

  }
}
