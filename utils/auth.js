import { sign, verify } from "jsonwebtoken"
import { env } from "@/config/env"

export async function generateUserJWT({
  user,
  prisma,
  role,  // optional
  userId // optional
}) {
  if (userId && !user) {
    user = await prisma.user.findUnique({ where: { UserID: userId } })
    role = await prisma.role.findUnique({ where: { RoleID: user.RoleID } })
  }

  if (user && !role) {
    role = await prisma.role.findUnique({ where: { RoleID: user.RoleID } })
    console.log(role)
  }

  if (!user || !role) {
    throw new Error("User not found")
  }

  const { UserID, Name, Email } = user

  const JWT_SECRET = env.JWT_SECRET

  const token = sign({ id: UserID, name: Name, email: Email, role }, JWT_SECRET, { expiresIn: "7d" })
  
  return token
}

export function verifyUserJWT(token) {
  const JWT_SECRET = env.JWT_SECRET

  const decoded = verify(token, JWT_SECRET)

  return decoded
}