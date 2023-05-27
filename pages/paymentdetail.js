import { Template } from "@/components/common/Template";
import { Button } from "@/components/input/Button";
import { useRouter } from "next/router"
export default function paymentconfirm(orderid) {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
 const router= useRouter()
  return (
    <Template>
      <div className="bg-black h-80 w-24"></div>
    </Template>
  )
}