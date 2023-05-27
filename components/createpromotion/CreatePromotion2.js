
import { useRouter } from "next/router";
import { Button } from "../input/Button"
export function CreatePromotion2({}) {
    const router = useRouter();
    return (
        <div className>
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
       </div>
    )
  }
