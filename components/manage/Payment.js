import Link from "next/link"
export function Payment({orderID,price,publishername,paymentstatus,paymentconfirm,receivestatus}) {
    
    return (
      <div>
        <div className="grid grid-cols-7  ml-44 mt-3 ">
        <p className=" font-bold text-lg">{orderID}</p>
        <p className=" font-bold text-lg ">{price}</p>
        <p className=" font-bold text-lg ">{publishername}</p>
        <p className=" font-bold text-lg ">{paymentstatus}</p>
        <p className=" font-bold text-lg ">{paymentconfirm}</p>
        <p className=" font-bold text-lg ">{receivestatus}</p>
        <Link className="text-[#FF7300] hover:text-amber-400 transition-all text-sm mr-52  underline w-max ml-10" href={"#"}>View</Link>
        </div>
        <div> <div className="border-b border-black border-opacity-30 mt-2 ml-44 mr-28"></div></div>
     </div>
    )
  }