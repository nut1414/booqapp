import Link from "next/link"
export function Promotionmanage({promotionID,promotionname,discount,yearS,mouthS,dayS,yearE,mouthE,dayE,salescount}) {
    return (
      <div>
        <div className="grid grid-cols-7 ml-44 mt-3 ">
        <p className=" font-bold text-lg">{promotionID}</p>
        <p className=" font-bold text-lg ">{promotionname}</p>
        <p className=" font-bold text-lg ">{discount+"%"}</p>
        <p className=" font-bold text-lg ">{yearS+ "/" + mouthS + "/" + dayS}</p>
        <p className=" font-bold text-lg ">{yearE+ "/" + mouthE + "/" + dayE}</p>
        <p className=" font-bold text-lg ">{salescount}</p>
        <Link className="text-[#FF7300] hover:text-amber-400 transition-all text-sm mr-52  underline w-max ml-10" href={"#"}>View</Link>
        </div>
        <div> <div className="border-b border-black border-opacity-30 mt-2 ml-44 mr-28"></div></div>
     </div>
    )
  }