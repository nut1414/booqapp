import Link from "next/link"
export function Bookmanage({bookID,booktitle,year,mouth,day,price,sales,salescount,availablestatus}) {
    return (
      <div>
        <div className="grid grid-cols-8 ml-44 mt-3 ">
        <p className=" font-bold text-lg">{bookID}</p>
        <p className=" font-bold text-lg ">{booktitle}</p>
        <p className=" font-bold text-lg ">{year+ "/" + mouth + "/" + day}</p>
        <p className=" font-bold text-lg ">{price}</p>
        <p className=" font-bold text-lg ">{sales}</p>
        <p className=" font-bold text-lg ">{salescount}</p>
        <p className=" font-bold text-lg ">{availablestatus}</p>
        <Link className="text-[#FF7300] hover:text-amber-400 transition-all text-sm mr-52  underline w-max ml-10" href={"#"}>View</Link>
        </div>
        <div> <div className="border-b border-black border-opacity-30 mt-2 ml-44 mr-16"></div></div>
     </div>
    )
  }