import { Template } from "@/components/common/Template";
import { Button } from "@/components/input/Button";
import { useRouter } from "next/router"
import { CreatePromotion1 } from "@/components/createpromotion/CreatePromotion1";
import { CreatePromotion2 } from "@/components/createpromotion/CreatePromotion2";
export default function paymentconfirm(orderid) {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
 const router= useRouter()
  return (
    <Template>
      <div className="inline-flex">
      <CreatePromotion1></CreatePromotion1>
      <div className=" ml-20"><CreatePromotion2></CreatePromotion2></div>
      </div>
    </Template>
  )
}