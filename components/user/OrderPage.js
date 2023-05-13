import { useState } from "react"
import { Order } from "../order/Order"

export default function OrderPage() {
  const filter = ['all', 'pay', 'waitship', 'ship', 'complete']
  const [filterOrder, setFilterOrder] = useState('all')
  
  return (
    <div>
     <Order status={"shipping"}></Order>
      <Order status={"unpaid"}></Order>
    </div>
  )
}