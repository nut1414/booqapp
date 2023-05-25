import { Template } from "@/components/common/Template";
import { Publisher } from "@/components/manage/Publisher";
import { TextBox } from "@/components/input/TextBox";
import { PaymentConfirm } from "@/components/input/PaymentConfirm";
import { PaymentStatus } from "@/components/input/PaymentStatus";
import { RecieveStatus } from "@/components/input/RecieveStatus";
export default function ManagePayment() {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <div>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">All Payment verification</div>
      <div className="inline-flex  float-right">
       <PaymentStatus></PaymentStatus>
       <PaymentConfirm></PaymentConfirm>
       <RecieveStatus></RecieveStatus>
       <input type="text" className="inline-flex mr-28 pl-3 h-10 rounded-full text-gray-900 mt-[3.65rem] m-3 drop-shadow-sm border border-black w-72" placeholder="Search for Publisher name"></input>
       </div>
       <div className="grid grid-cols-6 ml-32 mt-14 ">
       <p className=" font-light text-base">Publisher ID</p>
        <p className=" font-light text-base">Publisher Name</p>
        <p className=" font-light text-base">Order</p>
        <p className=" font-light text-base">Sales</p>
        <p className=" font-light text-base">Verify Status</p>
      </div>
       <div> <div className="border-b border-black border-opacity-30 mt-3 ml-32 mr-32"></div></div>
      </div>
      <div>
     
      </div>
    </Template>
  )
}