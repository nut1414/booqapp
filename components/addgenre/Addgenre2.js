
import { useRouter } from "next/router";
import { Button } from "../input/Button"
export function Addgenre2({}) {
    const router = useRouter();
    return (
        <div className>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="text-xl font-bold mt-5 ml-28">Genre Name</div>
        <div className="ml-28 mt-3 "><input type="text" className=" p-4 rounded-full text-gray-900 h-12 drop-shadow-sm border border-black w-[30rem] "></input></div>
        <div className="inline-flex float-right mt-32">
        <div className="mb-10 "><Button type={"secondary"} onClick={() => router.back()} text={"Cancle"}></Button></div>
        <Button text={"Done"} onClick={""}></Button>
        </div>
       </div>
    )
  }
