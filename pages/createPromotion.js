import { Template } from "@/components/common/Template";
import { Button } from "@/components/input/Button";
import { useRouter } from "next/router"
export default function paymentconfirm(orderid) {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
 const router= useRouter()
  return (
    <Template>
      <div className="inline-flex">
      <div className="bg-[#171719] h-screen text-white w-[35rem]">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        <div className=" text-2xl font-bold ml-[9rem]">Create Your Promotion</div>
        <div className="mt-10 ml-28"><img src="/createpromotionpic.svg"></img></div>
        </div>
      <div className=" ml-20"> <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
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
       </div></div>
      </div>
    </Template>
  )
}