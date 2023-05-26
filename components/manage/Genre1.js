import Link from "next/link"
export function Genre1({genreID,genrename,bookcount}) {
    
    return (
      <div>
        <div className="grid grid-cols-4  ml-48 mt-3 ">
        <p className=" font-bold ml- text-lg">{genreID}</p>
        <p className=" font-bold text-lg ">{genrename}</p>
        <p className=" font-bold text-lg ">{bookcount}</p>
        <Link className="text-[#FF7300] hover:text-amber-400 transition-all text-sm mr-52  underline w-max ml-10" href={"#"}>Delete</Link>
        </div>
        <div> <div className="border-b border-black border-opacity-30 mt-2 ml-48 mr-48"></div></div>
     </div>
    )
  }