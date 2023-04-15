//import './book.css';

import Link from "next/link";

export function Binfo({picture,name,price,author,linkname,linkauthor,onclick}) {
    return (
    <div className="flex flex-col w-max">
        <Link href={linkname}>
          <img  className ={"object-cover m-10 "} src= {picture} width="170" height="100" />
      </Link>
      <div className="mb-2">
          <Link href={linkname} className = " text-black  hover:text-spooky-orange transition-all text-2xl w-max p-5 ">{name}</Link><br></br>
      </div>
      <div>
          <Link href={linkauthor} className = "text-black  hover:text-spooky-orange transition-all text-base w-max font-light  p-5">{author}</Link>
      </div>
      <div className="flex">
        <p className = "text-2xl  font-light p-5 object-center w-48">{price}</p>
        <button className = {"rounded-3xl text-4xl hover:text-yellow-600  "} onClick={onclick}>+</button>
      </div>
    </div>
    )
  }