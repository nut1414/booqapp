import Link from "next/link"
export function Publisher({publisherID,publishername,order,sales,verifystatus}) {
    
    return (
      <div>
        <div className="grid grid-cols-6  ml-44 mt-3 ">
        <p className=" font-bold text-lg">{publisherID}</p>
        <p className=" font-bold text-lg ">{publishername}</p>
        <p className=" font-bold text-lg ">{order}</p>
        <p className=" font-bold text-lg ">{sales}</p>
        <p className=" font-bold text-lg ">{verifystatus}</p>
        <Link className="text-[#FF7300] hover:text-amber-400 transition-all text-sm mr-52  underline w-max ml-10" href={"#"}>Manage</Link>
        </div>
        <div> <div className="border-b border-black border-opacity-30 mt-2 ml-44 mr-28"></div></div>
     </div>
    )
  }