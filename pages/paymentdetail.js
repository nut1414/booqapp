import { Template } from "@/components/common/Template";
import { Button } from "@/components/input/Button";
import { useRouter } from "next/router"
import { PaymentDetail1 } from "@/components/paymentDetail/PaymentDetail1";
import { PaymentDetail2 } from "@/components/paymentDetail/PaymentDetail2";
export default function paymentconfirm(orderid) {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
 const router= useRouter()
  return (
    <Template>
      <div className="inline-flex">
      <PaymentDetail1></PaymentDetail1>
      <div className=" ml-20"><PaymentDetail2 ordernumber={"BK0000001"}></PaymentDetail2></div>
      </div>
    </Template>
  )
}