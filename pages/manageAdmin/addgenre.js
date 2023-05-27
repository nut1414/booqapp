import { Template } from "@/components/common/Template";
import { Addgenre1 } from "@/components/addgenre/Addgenre1";
import { Addgenre2 } from "@/components/addgenre/Addgenre2";
export default function addgenre() {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <div className="inline-flex">
      <Addgenre1></Addgenre1>
      <div className=" ml-20"><Addgenre2></Addgenre2></div>
      </div>
    </Template>
  )
}