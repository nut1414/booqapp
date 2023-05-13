import { useState } from "react"
import { Order } from "../order/Order"
import { Button } from "../input/Button"

export default function OrderPage() {
  const filter = ['all', 'pay', 'waitship', 'ship', 'complete']
  const [filterOrder, setFilterOrder] = useState('all')

  return (
    <div>
      <div className="grid grid-cols-5 mb-10 ">
        <button className=" border-b p-3 border-b-slate-950 hover:border-spooky-orange hover:text-spooky-orange font-bold" type="button" name="All">All</button>
        <button className=" border-b p-3 border-b-slate-950 hover:border-spooky-orange hover:text-spooky-orange font-bold" type="button" name="ToPay">To Pay</button>
        <button className=" border-b p-3 border-b-slate-950 hover:border-spooky-orange hover:text-spooky-orange font-bold" type="button" name="ToShip">To Ship</button>
        <button className=" border-b p-3 border-b-slate-950 hover:border-spooky-orange hover:text-spooky-orange font-bold" type="button" name="ToReceive">To Receive</button>
        <button className=" border-b p-3 border-b-slate-950 hover:border-spooky-orange hover:text-spooky-orange font-bold" type="button" name="Complete">Complete</button>
      </div>
     <div>
     <Order Class={""} filter={"waitship"} status={"shipping"}></Order>
     <Order filter={"pay"} status={"unpaid"}></Order>
     <Order filter={"ship"} status={"shipped"}></Order>
     <Order filter={"complete"} status={"recieved"}></Order>
     <Order filter={"complete"} status={"rated"}></Order>
      </div>
    </div>
  )
}