import calculateWeightToShip from '@/utils/order/calculateShipping'

export default function calculateOrderTotalDiscountShip(orderGroup, items='items', promotionbook='promotionbook') {
  return orderGroup.map((group) => {
    let totalWeight = 0
    let totalPrice = 0
    group[items].forEach((item, index, arr) => {
      let alldiscount = []
      if (Array.isArray(item.book[promotionbook])) {
        alldiscount = item.book[promotionbook]?.map((pro) => pro.promotion.DiscountPercent) || [0]
      } else {
        alldiscount = [item.book[promotionbook]?.promotion?.DiscountPercent ? item.book[promotionbook]?.promotion?.DiscountPercent : 0]
      }
      let maxdiscount = alldiscount.length ? Math.max(...alldiscount) : 0
      console.log("alldiscount",alldiscount )
      console.log("maxdiscount",maxdiscount)
      arr[index].book.FinalPrice = item.book.Price - (item.book.Price * maxdiscount / 100)
      totalWeight += item.book.Weight * item.Quantity
      totalPrice += (item.book.FinalPrice ) * item.Quantity 
    })

    return {
      ...group,
      totalWeight,
      totalPrice,
      totalShipping: calculateWeightToShip(totalWeight)
    } 
    
  })
}