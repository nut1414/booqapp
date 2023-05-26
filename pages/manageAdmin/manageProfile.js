import { Template } from "@/components/common/Template";
import { Button } from "@/components/input/Button";
import { Profilemanage } from "@/components/manage/Profilemanage";

export default function manageProfile() {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
       <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">Publisher Profile</div>
       <div className="inline-flex">
       <div className=" align-top"><img src="/profileuser.svg" width={"150"} className="mt-10 ml-36 "></img></div>
       <Profilemanage ></Profilemanage>
       </div>
       
    </Template>
  )
}