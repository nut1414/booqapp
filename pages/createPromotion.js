import { ActionTemplate } from "@/components/common/ActionTemplate";
import { Template } from "@/components/common/Template";
import { Button } from "@/components/input/Button";
import { useRouter } from "next/router"
export default function paymentconfirm(orderid) {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
 const router= useRouter()
  return (
    <Template>
      <ActionTemplate heading={"Create Your Promotin"} 
      sideChildren={<div className="mt-10"><img src="/createpromotionpic.svg"></img></div>}
      children={<div className=" mt-28">
        <div className="text-xl font-bold mt-5 ml-28">Date and Time</div>
        <div className="ml-28 mt-3 "><input type="text" className=" p-4 rounded-full text-gray-900 h-12 drop-shadow-sm border border-black w-[30rem] "></input></div>
        <div className="text-xl font-bold mt-5 ml-28">Date start</div>
        <div className="ml-28 mt-3 "><input type="text" className=" p-4 rounded-full text-gray-900 h-12 drop-shadow-sm border border-black w-[30rem] "></input></div>
        <div className="text-xl font-bold mt-5 ml-28">Date end</div>
        <div className="ml-28 mt-3 "><input type="text" className=" p-4 rounded-full text-gray-900 h-12 drop-shadow-sm border border-black w-[30rem] "></input></div>
        <div className="text-xl font-bold mt-5 ml-28">Promotion details</div>
        <div className="ml-28 mt-3 "><input type="text" className=" p-4 rounded-full text-gray-900 h-12 drop-shadow-sm border border-black w-[30rem] "></input></div>
        <div className="text-xl font-bold mt-5 ml-28">Select book</div>
        <div className="ml-28 mt-3 "><select className=" p-4 rounded-full text-gray-900 h-12 drop-shadow-sm border border-black w-[30rem] "></select></div>
        <div className="inline-flex float-right mt-10">
        <div className="mb-10 "><Button type={"secondary"} onClick={() => router.back()} text={"Back"}></Button></div>
        <Button text={"Confirm"} onClick={""}></Button>
        </div>
       </div>}>
      </ActionTemplate>
    </Template>
  )
}