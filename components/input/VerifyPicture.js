import { Button } from "./Button"
export function VerifyPicture({onclick}) {
   
    return (
        <div>
             <div>
            <img className=" w-80" src="/addverify.svg"></img>
            <p className="text-black mt-5 text-xs text-opacity-60 font-semibold inline-flex">jpg, jpeg, png (max file size 5MB)</p>
            <Button className="ml-11 mt-8" text={"Upload"} type={"secondary"} onClick={onclick}></Button>
          </div>
        </div>
    )
  }