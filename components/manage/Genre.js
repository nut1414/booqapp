import Link from "next/link"
export function Genre({genreID,genrename,bookcount}) {
    
    return (
      <div>
        <div className="grid grid-cols-3  ml-32 mt-3 ">
        <p className=" font-bold text-lg">{genreID}</p>
        <p className=" font-bold text-lg ">{genrename}</p>
        <p className=" font-bold text-lg ">{bookcount}</p>
        </div>
        <div> <div className="border-b border-black border-opacity-30 mt-2 ml-32 mr-24"></div></div>
     </div>
    )
  }