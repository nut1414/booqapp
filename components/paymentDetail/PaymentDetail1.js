import Link from "next/link"
export function PaymentDetail1({}) {
    
    return (
        <div className="bg-[#171719] h-screen text-white w-[35rem]">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className=" text-2xl font-bold  ml-20">Payment confirmation</div>
        <div className=" text-xl font-base mt-10 ml-28">Transfer to</div>
        <div className="inline-flex">
        <div className="ml-32 mt-5"><img src="/kasikorn.svg"></img></div>
        <div className="">
        <div className=" text-2xl font-base mt-7 ml-10 ">Kasikorn bank</div>
        <div className="inline-flex mt-2">
        <div className=" text-base font-base ml-10">booqShop</div>
        <div className=" text-base font-base ml-5">000-0-00000-0</div>
        </div>
        </div>   
        </div>
        </div> 
    )
  }
