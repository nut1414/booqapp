import { Template } from "@/components/common/Template";
import { Button } from "@/components/input/Button";
import { useRouter } from "next/router";

export default function ManageProfile() {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
 const router = useRouter();
  return (
    <Template>
       <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">Publisher Profile</div>
       <div className="inline-flex">
       <div className=" align-top"><img src="/profileuser.svg" width={"150"} className="mt-10 ml-36 "></img></div>
       <div>
            <div>
            <div className="inline-flex">
                <div className=" text-base font-bold mt-5 ml-32 ">Publisher ID</div>
                <div className=" text-base font-normal mt-5 ml-20">P0000000001</div>
            </div>
            </div>
            <div>
            <div className="inline-flex">
                <div className=" text-base font-bold mt-5 ml-32 ">Publisher Name</div>
                <div className=" text-base font-normal mt-5 ml-[3.24rem]">Publisher1</div>
            </div>
            </div>
            <div>
            <div className="inline-flex">
                <div className=" text-base font-bold mt-5 ml-32 ">Bank</div>
                <div className=" text-base font-normal mt-5 ml-[8.5rem]">Bank Name aka KB</div>
            </div>
            <div className=" text-base font-normal mt-3 ml-[19rem]">Name 000000000000</div>
            </div>
            <div>
            <div className="inline-flex">
                <div className=" text-base font-bold mt-5 ml-32 ">Address</div>
                <div className=" text-base font-normal mt-5 ml-[7rem] whitespace-pre-line break-words w-[30rem]">King Mongkut's University of Technology Thonburi (KMUTT) 126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140, 66 2470 9850</div>
            </div>
            </div>
            <div>
            <div className="inline-flex">
                <div className=" text-base font-bold mt-5 ml-32 ">Verify Status</div>
                <div className=" text-base font-normal mt-5 ml-[4.7rem]">Verified</div>
                <Button text={"Unverify"} className={"mt-3 ml-10"} type={"secondary"} onClick={""}></Button>
            </div>
            <div className=" ml-[19rem] mt-5 mb-10"><img src="/addverify.svg" width={"300"}></img></div>
            <div className="float-right inline-flex">
           <div className="mb-10 "><Button type={"secondary"} onClick={() => router.back()} text={"Back"}></Button></div>
           <div className="mb-10 "><Button text={"Save"} onClick={""}></Button></div>
           </div>
            </div>
            </div>
       </div>
       
    </Template>
  )
}