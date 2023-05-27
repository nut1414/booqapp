import { CartBookTable } from "@/components/book/CartBookTable"
import { Template } from "@/components/common/Template"
import { Button } from "@/components/input/Button"
import { useEffect, useState } from "react"
import fetch from "@/utils/fetch"

export default function OrderCart() {
  const [ordergroup, setOrdergroup] = useState([])
  const [cartItem, setCartItem] = useState([])
  const [selectCartItem, setSelectCartItem] = useState([])

  const getCartItem = async () => {
    try {
      const res = await fetch("/api/order/cart")
      const data = await res.json()
      if (res.ok) {
        setCartItem(data.cart)
      }
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
    getCartItem()
    
      
  }, [])


  return (
    <Template>
      <div className="text-2xl font-bold p-8 pl-16">
        <h1>Your Shopping Cart</h1>
      </div>
      <div className=" min-w-[75vw] mx-auto">
        <CartBookTable />
        <div className="p-8 flex justify-end">
          <Button text={"Order"}/>
        </div>
      </div>
    </Template>
  )
}