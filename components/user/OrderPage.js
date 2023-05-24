import { useState } from "react"
import { Order } from "../order/Order"
import { Fourbutton } from "../input/Fourbutton"

export default function OrderPage() {
  const filter = ['all', 'pay', 'waitship', 'ship', 'complete']
  const [filterOrder, setFilterOrder] = useState('all')

  function onFilterValueSelect(filter){
    console.log(filter);
  }

  const allorder = [
    { OrderID: 0, status: "wait" },
    { OrderID: 1, status: "pay" },
    { OrderID: 2, status: "unpaid"},
    { OrderID: 3, status: "unpaid"},
  ]

  return (
     <div>
      <Fourbutton filterValueSelect={onFilterValueSelect}></Fourbutton>
      <div>
        
        {allorder.map((order) => (<div>{order.OrderID}</div>))}
     {/* <Order filter={"waitship"} status={"shipping"}></Order>
     <Order filter={"pay"} status={"unpaid"}></Order>
     <Order filter={"pay"} status={"unpaid"}></Order>
     <Order filter={"ship"} status={"shipped"}></Order>
     <Order filter={"complete"} status={"recieved"}></Order>
     <Order filter={"complete"} status={"rated"}></Order> */}
      </div>
    </div>
  )
}