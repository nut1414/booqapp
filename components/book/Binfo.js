//import './book.css';

import Link from "next/link";

export function Binfo({picture,name,price,author,linkname,linkauthor,onclick}) {
    return (
      <div className="flex flex-col w-max">
     <div>
        <img  className ={"object-cover m-10 "} src= {"picture/"+picture} width="170" height="100" />
     </div>
     <div className="mb-2">
        <Link href={linkname} className = " text-white hover:text-yellow-600 text-2xl w-max p-5 ">{name}</Link><br></br>
     </div>
     <div>
        <Link href={linkauthor} className = "text-white hover:text-yellow-600 text-base w-max font-light underline p-5">{author}</Link>
     </div>
     <div className="flex ">
     <p className = "text-white text-2xl  font-light p-5 object-center w-48">{price}</p>
     <button className = {"rounded-3xl text-4xl hover:text-yellow-600 "} onClick={onclick}>+</button>
     </div>
      </div>
    )
  }