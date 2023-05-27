import { Template } from "@/components/common/Template";
import { Button } from "@/components/input/Button";
import { useRouter } from "next/router"
import { ActionTemplate } from "@/components/common/ActionTemplate";
export default function paymentconfirm() {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
 
 const router= useRouter()
  return (
      <Template>
        <ActionTemplate heading={"Payment Confirmation"} 
        sideChildren={<div className="text-white"> <div className=" text-xl font-base ml-20">Transfer to</div>
        <div className="inline-flex">
        <div className="ml-32 mt-5"><img src="/kasikorn.svg"></img></div>
        <div>
        <div className=" text-2xl font-base mt-7 ml-10 ">Kasikorn bank</div>
        <div className="inline-flex mt-2">
        <div className=" text-base font-base ml-10">booqShop</div>
        <div className=" text-base font-base ml-5">000-0-00000-0</div>
        </div>
        </div>   
        </div></div>}
        children={<div>
          <div className=" text-2xl font-bold">Payment confirmation Detail</div>
          <div className=" text-xl font-bold mt-10 ml-28">Order number</div>
          <div className=" text-xl font-bold mt-3 ml-32"></div>
          <div className="text-xl font-bold mt-5 ml-28">Date and Time</div>
          <div className="ml-28 mt-3 "><input type="text" className=" p-4 rounded-full text-gray-900 h-12 drop-shadow-sm border border-black w-[30rem] "></input></div>
          <div className="text-xl font-bold mt-5 ml-28">Proof of transaction</div>
          <div className="inline-flex">
          <div className="ml-28 mt-3 "><input type="text" className=" p-4 rounded-full text-gray-900 h-12 drop-shadow-sm border border-black w-[24rem] "></input></div>
          <div className="mt-[0.5rem] ml-3"><Button text={"Upload"} type={"secondary"}></Button></div>
          </div>
          <div className="ml-[7.5rem] mt-2 opacity-40 font-bold">jpg, jpeg, png (max file size 5MB)</div>
          <div className="inline-flex float-right mt-20">
          <div className="mb-10 "><Button type={"secondary"} onClick={() => router.back()} text={"Back"}></Button></div>
          <Button text={"Confirm"} onClick={""}></Button>
          </div>
         </div>}>
        </ActionTemplate>
      </Template>
  )
}