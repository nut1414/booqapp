import Image from "next/image"
import { NavLink } from "./NavLink"
import Link from "next/link"
import minilogo from "@/public/minilogo.svg"
import { SearchBox } from "@/components/input/SearchBox"
import { CartIcon } from "@/components/common/Navbar/CartIcon"
import { ProfileIcon } from "./ProfileIcon"
import { Button } from "@/components/input/Button"
import { useEffect, useState } from "react"
import { defaultGenre } from "@/config/default"

export function Navbar({ user }) {
  const isUser = user?.role?.RoleName === "Customer"
  const isAdmin = user?.role?.RoleName === "Admin"
  const isPublisher = user?.role?.RoleName == "Publisher"
  const isLogin = isUser || isAdmin || isPublisher
  const [genreOpen, setGenreOpen] = useState(false)
  const [genre, setGenre] = useState([])

  const fetchGenre = async () => {
    try {
      const res = await fetch(`/api/fetch/genre`)
      const data = await res.json()
      if (res.ok) {
        console.log(data.genre)
        setGenre(data.genre)
      } else {
        throw new Error(data.message)
      }
      
    } catch (e) {
      console.log(e)
      setGenre(defaultGenre)
    }
  }

  useEffect(() => {
    fetchGenre()
  }, [])

  return (
    <nav className="sticky text-white w-full h-fit flex bg-spooky-black justify-around flex-wrap">
      <Link href={"/"} className="items-center flex-col justify-center">
        <Image src={minilogo} alt="booq" />
      </Link>
      <div className="flex gap-4 flex-wrap justify-center items-center">
        { (isAdmin || isPublisher) &&
          <div className="flex items-center h-full flex-wrap justify-center align-middle grow md:border-r-2 border-white md:pr-4">
          {isPublisher && <>
            <NavLink href={"/"}>Order</NavLink>
            <NavLink href={"/"}>Manage Book</NavLink>
            <NavLink href={"/"}>Promotion</NavLink>
          </>}
          {isAdmin && <>
            <NavLink href={"/"}>Manage Publisher</NavLink>
            <NavLink href={"/"}>Edit Genre</NavLink>
          </>}
        </div>}
        <div className="flex items-center  h-full flex-wrap justify-center align-middle grow">
          <NavLink href={"/book/specialoffer"} type="secondary">Special Offer</NavLink>
          <NavLink href={"/book/bestseller"}>Best Sellers</NavLink>
          <div onClick={() => setGenreOpen(a=>!a)} className={`h-full group relative hover:text-black hover:bg-white ${genreOpen ? "text-black bg-white" : ""}`}>
            <Link href={"#"} className={`flex justify-center items-center h-full px-2 align-middle transition-all  ${genreOpen ? " text-black hover:text-black bg-white" : "text-white bg-spooky-black group-hover:text-black group-hover:bg-white"}`}>
              <div className="align-middle">
                Genre
              </div>
              {genreOpen && <div className=" text-black absolute p-5 w-[900px] bg-white rounded-b-xl bottom-[-350px] h-[350px] drop-shadow-sm ">
                <div className="flex gap-4 relative w-fit ">
                    <ul className="flex flex-col flex-wrap h-[300px] w-fit gap-y-1.5 lg:w-128 p-0">
                      {genre.map((item, index) => (<Link href={`/book/search/genre/${item.GenreName}`} className="w-32 text-wrap" key={index}>{ item.GenreName }</Link>))}
                      
                      
                    </ul>
                  
                
              </div>
              
            </div>}
            </Link>
            

          </div>
        </div>
          <SearchBox />
          <div className="flex w-128 flex-wrap justify-center gap-4" >
            {isLogin ? <>
              {isUser &&
                <Link href={"/order/cart"}>
                  <CartIcon />
                </Link>
              }
              <Link href={"/user/profile"}>
                <ProfileIcon/>
              </Link>
            </> : <>
              <Link href={"/login"}>
                <Button text="Login" />
              </Link>
            </>}
          </div>
        <div>

        </div>

      </div>

    </nav>
  )
}