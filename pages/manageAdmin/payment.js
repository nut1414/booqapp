import { Template } from "@/components/common/Template";
import { PaymentConfirm } from "@/components/input/PaymentConfirm";
import { PaymentStatus } from "@/components/input/PaymentStatus";
import { RecieveStatus } from "@/components/input/RecieveStatus";
import { Payment } from "@/components/manage/Payment";
export default function ManagePayment() {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <div>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">All Payment verification</div>
      <div className="inline-flex float-right">
       <PaymentStatus></PaymentStatus>
       <PaymentConfirm></PaymentConfirm>
       <RecieveStatus></RecieveStatus>
       <input type="text" className="inline-flex mr-28 pl-3 h-10 rounded-full text-gray-900 mt-[3.65rem] m-3 drop-shadow-sm border border-black w-72" placeholder="Search for Publisher name"></input>
       </div>
       <div className="grid grid-cols-7 ml-44 mt-14 ">
       <p className=" font-light text-base">Order ID</p>
        <p className=" font-light text-base">Price</p>
        <p className=" font-light text-base">Publisher Name</p>
        <p className=" font-light text-base">Payment Status</p>
        <p className=" font-light text-base">Payment Confirm</p>
        <p className=" font-light text-base">Received Status</p>
      </div>
       <div> <div className="border-b border-black border-opacity-30 mt-3 ml-44 mr-28"></div></div>
      </div>
      <div>
     <Payment orderID={"0000000001"} price={"00000"} publishername={"Publisher1"} paymentstatus={"Paid"} paymentconfirm={"Confirmed"} receivestatus={"Received"}></Payment>
     <Payment orderID={"0000000002"} price={"00000"} publishername={"Publisher2"} paymentstatus={"Paid"} paymentconfirm={"Confirmed"} receivestatus={"Received"}></Payment>
     <Payment orderID={"0000000003"} price={"00000"} publishername={"Publisher3"} paymentstatus={"Paid"} paymentconfirm={"Confirmed"} receivestatus={"Received"}></Payment>
     <Payment orderID={"0000000004"} price={"00000"} publishername={"Publisher4"} paymentstatus={"Paid"} paymentconfirm={"Confirmed"} receivestatus={"Received"}></Payment>
     <Payment orderID={"0000000005"} price={"00000"} publishername={"Publisher5"} paymentstatus={"Paid"} paymentconfirm={"Confirmed"} receivestatus={"Received"}></Payment>
     <Payment orderID={"0000000006"} price={"00000"} publishername={"Publisher6"} paymentstatus={"Paid"} paymentconfirm={"Confirmed"} receivestatus={"Received"}></Payment>
     <Payment orderID={"0000000007"} price={"00000"} publishername={"Publisher7"} paymentstatus={"Paid"} paymentconfirm={"Confirmed"} receivestatus={"Received"}></Payment>
     <Payment orderID={"0000000008"} price={"00000"} publishername={"Publisher8"} paymentstatus={"Paid"} paymentconfirm={"Confirmed"} receivestatus={"Received"}></Payment>
     <Payment orderID={"0000000009"} price={"00000"} publishername={"Publisher9"} paymentstatus={"Paid"} paymentconfirm={"Confirmed"} receivestatus={"Received"}></Payment>
     <Payment orderID={"0000000010"} price={"00000"} publishername={"Publisher10"} paymentstatus={"Paid"} paymentconfirm={"Confirmed"} receivestatus={"Received"}></Payment>
      </div>
    </Template>
  )
}