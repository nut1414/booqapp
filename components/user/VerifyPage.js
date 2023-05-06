import { useEffect, useState } from "react"
import { VerifyPicture } from "../input/VerifyPicture"


export default function VerifyPage() {
  const [isVerifed, setIsVerifed] = useState(false)

  // useEffect(() => {
  //   //fetch logic verified later
  // }, [])

  return (
    <>
      {isVerifed ? 
      (<div> 
          <div className="font-bold text-2xl mb-5">Verify Shop</div>
          <div className="border-b-2 border-black border-opacity-50"></div>
          <div className="w-full flex flex-col place-items-center">
              <img className=" w-96" src="/verifypic.svg"></img>
              <div className="text-[#FF7300] font-bold text-xl">Your shop has been verified</div>
          </div>
      </div>) 
      : 
      (<div>
          <div className="font-bold text-2xl mb-5">Verify Shop</div>
          <div className="border-b-2 border-black border-opacity-50 mb-10 "></div>
          <div className="inline-flex ml-10">
             <div className="font-bold text-xl">Attach a copy of real</div>
             <div className="text-[#FF7300] ml-3 font-bold text-xl">Company certificate</div>
             <div className="ml-3 font-bold text-xl mb-5">to verify your shop</div>
          </div>
          <div className="ml-10"><VerifyPicture></VerifyPicture></div>
      </div>)}
    </>
  )
}