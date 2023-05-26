import { Button } from "../input/Button";

export function Profilemanage() {
 
  return (
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
           <div className=" float-right mb-10 ml-32"><Button text={"Save"}></Button></div>
            </div>
            </div>
  )
}