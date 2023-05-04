  import { PrismaClient } from '@prisma/client'
  import authRoute from '@/utils/middlewares/authRoute'

  const prisma = new PrismaClient()

  // untested

  async function cart(req, res) {
    if (req.user.role.RoleID != 1) {
      res.status(401).json({ message: 'Unauthorized' })  // if not user
      prisma.$disconnect()
    }


    try {
      if (req.method == "POST") { // adding to user cart
        /**
         * expect input { bookID, quantity }
        */
      
      const { bookID, quantity } = req.body
      
      if (!bookID || !quantity) {
        res.status(400).json({ message: 'All field must be filled' })
        prisma.$disconnect()
        }
        
        const book = await prisma.book.findUnique({ where: { BookID: bookID } })
        
        if (!book) {
          res.status(404).json({ message: 'Book not found' })
          prisma.$disconnect()
        }
        
        const item = await prisma.iteminbasket.create({
          data: {
            BookID: bookID,
            Quantity: quantity,
            UserID: req.user.UserID
          }
        })
        
        if (item) {
          res.status(200).json({ message: 'Book added to cart', item })
        }
        
      } else if (req.method == "GET") { // getting what is in user cart
        const cart = await prisma.iteminbasket.findMany({ where: { UserID: req.user.UserID }, include: { book: true } })
        
        res.status(200).json({ cart })
        
      } else if (req.method == "PUT") { // updating user cart
        /**
         * expect input { itemID, quantity }
         * 
        */
      
      const { ItemID, quantity } = req.body
      
      if (!ItemID || !quantity) {
        res.status(400).json({ message: 'All field must be filled' })
        prisma.$disconnect()
        }
        
        const item = await prisma.book.findUnique({ where: { ItemID, UserID: req.user.UserID } })
        
        if (!item) {
          res.status(404).json({ message: 'Item not found' })
          prisma.$disconnect()
        }
        
        const itemUpdated = await prisma.iteminbasket.update({ where: { ItemID, UserID: req.user.UserID }, data: { Quantity: quantity } })
        
        if (itemUpdated) {
          res.status(200).json({ message: 'Item updated', itemUpdated })
        }
        
      } else if (req.method == "DELETE") {
        /**
         * expect input { itemID }
         * 
        */
      
      const { ItemID } = req.body
      
      if (!ItemID) {
        res.status(400).json({ message: 'All field must be filled' })
        prisma.$disconnect()
        }
        
        const item = await prisma.book.findUnique({ where: { ItemID, UserID: req.user.UserID } })
        
        if (!item) {
          res.status(404).json({ message: 'Item not found' })
          prisma.$disconnect()
        }
        
        const itemDeleted = await prisma.iteminbasket.delete({ where: { ItemID, UserID: req.user.UserID } })
        
        if (itemDeleted) {
          res.status(200).json({ message: 'Item deleted', itemDeleted })
        } else {
          res.status(500).json({ message: 'Something went wrong' })
        }
        
      }
    } catch (e) {
      res.status(500).json({ message: e.message })
      prisma.$disconnect()
    }
      
  }
    
  export default authRoute(cart, prisma)