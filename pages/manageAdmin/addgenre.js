import { Template } from "@/components/common/Template";
import { ActionTemplate } from "@/components/common/ActionTemplate";
import { Button } from "@/components/input/Button";
export default function addgenre() {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <ActionTemplate heading={"Add New Genre"} 
      sideChildren={<div className="mt-10"><img src="/psychology.svg"></img></div>}
      children={<div><div className="text-xl font-bold mt-5 ml-28">Genre Name</div>
      <div className="ml-28 mt-3 "><input type="text" className=" p-4 rounded-full text-gray-900 h-12 drop-shadow-sm border border-black w-[30rem] "></input></div>
      <div className="inline-flex float-right mt-32 mr-[19rem]">
      <div className="mb-10 "><Button type={"secondary"} onClick={() => router.back()} text={"Cancle"}></Button></div>
      <Button text={"Done"} onClick={""}></Button>
      </div></div>}></ActionTemplate>
    </Template>
  )
}