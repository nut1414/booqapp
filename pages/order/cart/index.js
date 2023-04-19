import { CartBookTable } from "@/components/book/CartBookTable"
import { Template } from "@/components/common/Template"
import { Button } from "@/components/input/Button"

export default function OrderCart() {
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