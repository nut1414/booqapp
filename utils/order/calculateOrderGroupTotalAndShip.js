import calculateWeightToShip from '@/utils/order/calculateShipping'

export default function calculateOrderGroupTotalAndShip(orderGroup) {

  return orderGroup.map((group) => {
      let totalWeight = 0
      let totalPrice = 0
      group.items.forEach((item) => {
        totalWeight += item.book.Weight * item.Quantity
        totalPrice += item.book.Price * item.Quantity // need to be find promo and calculate price
      })

      return {
        ...group,
        totalWeight,
        totalPrice,
        totalShipping: calculateWeightToShip(totalWeight)
      } 
      
    })
}