import { Template } from "@/components/common/Template";
import { TextBox } from "@/components/input/TextBox";
import { Button } from "@/components/input/Button";
export default function addgenre() {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <div className=" mt-36 ml-48">
      <div className=" text-2xl font-bold mt-10 ml-32 ">Add New Genre</div>
      
      <div className="inline-flex">
        <div className=" text-xl font-bold mt-10 ml-52">Genre Name</div>
        <div><input type="text" className=" p-4 rounded-full text-gray-900 mt-10 ml-10 drop-shadow-sm border border-black w-[35rem] h-3"></input></div>
      </div>
      <div className="mt-5 ml-[52rem]"><Button text={"Sent"}></Button></div>
      </div>
    </Template>
  )
}