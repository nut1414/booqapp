import Link from "next/link"
export function Publisher({publisherid,publishername,order,sale,verifystatus}) {
    
    return (
      <div>
        <div className="grid grid-cols-6  ml-32 mt-3 ">
        <p className=" font-bold text-lg">{publisherid}</p>
        <p className=" font-bold text-lg ">{publishername}</p>
        <p className=" font-bold text-lg ">{order}</p>
        <p className=" font-bold text-lg ">{sale}</p>
        <p className=" font-bold text-lg ">{verifystatus}</p>
        <Link className="text-[#FF7300] hover:text-amber-400 transition-all text-sm mr-52  underline w-max ml-10" href={"#"}>Manage</Link>
        </div>
        <div> <div className="border-b border-black border-opacity-30 mt-2 ml-32 mr-32"></div></div>
     </div>
    )
  }