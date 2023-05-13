import { useState } from "react"
import { Order } from "../order/Order"
import { Button } from "../input/Button"

export default function OrderPage() {
  const filter = ['all', 'pay', 'waitship', 'ship', 'complete']
  const [filterOrder, setFilterOrder] = useState('all')
  
  return (
    <div>
      <div className="grid grid-cols-5 mb-10 ">
        <button className=" border-b p-3 border-b-slate-950 hover:border-spooky-orange hover:text-spooky-orange font-bold" type="button">All</button>
        <button className=" border-b p-3 border-b-slate-950 hover:border-spooky-orange hover:text-spooky-orange font-bold" type="button">To Pay</button>
        <button className=" border-b p-3 border-b-slate-950 hover:border-spooky-orange hover:text-spooky-orange font-bold" type="button">To Ship</button>
        <button className=" border-b p-3 border-b-slate-950 hover:border-spooky-orange hover:text-spooky-orange font-bold" type="button">To Receive</button>
        <button className=" border-b p-3 border-b-slate-950 hover:border-spooky-orange hover:text-spooky-orange font-bold" type="button">Complete</button>
      </div>
     <div>
     <Order className="hidden" status={"shipping"}></Order>
      <Order status={"unpaid"}></Order>
      </div>
    </div>
  )
}