import { Template } from "@/components/common/Template";
import { PaymentC } from "@/components/manage/PaymentC";
import { AddressAndTotal } from "@/components/addressUser/AddressAndTotal";
import { Button } from "@/components/input/Button";
import { useRouter } from "next/router"
export default function paymentconfirm(orderid) {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
   
  return (
    <Template noBack={true}>
        <div>
        <div className=" text-2xl font-bold mt-10 ml-32">Payment Confirmation</div>
        </div>
        <div className="grid grid-cols-5 ml-44 mt-14 ">
       <p className=" font-light text-base">Publisher ID</p>
        <p className=" font-light text-base">Publisher Name</p>
        <p className=" font-light text-base">Order</p>
        <p className=" font-light text-base">Sales</p>
        <p className=" font-light text-base">Verify Status</p>
      </div>
       <div> <div className="border-b border-black border-opacity-30 mt-3 ml-44 mr-32"></div></div>
       <div className="ml-44 mt-4 font-light">{"Order ID : "+orderid}</div>
       <PaymentC bookcover={"/bookone.png"} booktitle={"Meow1"} bookprice={"200"} amount={"2"} subtotal={"320"}></PaymentC>
       <PaymentC bookcover={"/booktwo.png"} booktitle={"Meow2"} bookprice={"200"} amount={"2"} subtotal={"320"}></PaymentC>
       <div> <div className="border-b border-black border-opacity-30 mt-5 ml-44 mr-32"></div></div>
      <AddressAndTotal address={"King Mongkut's University of Technology Thonburi (KMUTT) 126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140, 66 2470 9850"} total={"1000"} verifypic={"/addverify.svg"} amountmoney={"00000"} datetime={"00 XXXXX 0000, 00:00:00"}></AddressAndTotal>
      <div>
        <div className="float-right mb-16 mr-32">
        <Button type={"secondary"} onClick={""} text={"Back"}></Button>
        <Button text={"Confirm"} onClick={""}></Button>
        </div>
      </div>
    </Template>
  )
}