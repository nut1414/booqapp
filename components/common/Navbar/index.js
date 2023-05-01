import Image from "next/image"
import { NavLink } from "./NavLink"
import Link from "next/link"
import minilogo from "@/public/minilogo.svg"
import { SearchBox } from "@/components/input/SearchBox"
import { CartIcon } from "@/components/common/Navbar/CartIcon"
import { ProfileIcon } from "./ProfileIcon"
import { Button } from "@/components/input/Button"
import { useState } from "react"

export function Navbar({ user }) {
  const isUser = user?.role?.RoleName === "Customer"
  const isAdmin = user?.role?.RoleName === "Admin"
  const isPublisher = user?.role?.RoleName == "Publisher"
  const isLogin = isUser || isAdmin || isPublisher
  const [genreOpen, setGenreOpen] = useState(false)

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
            <NavLink href={"/"}>Sale</NavLink>
          </>}
          {isAdmin && <>
            <NavLink href={"/"}>Manage Publisher</NavLink>
            <NavLink href={"/"}>Edit Genre</NavLink>
          </>}
        </div>}
        <div className="flex items-center  h-full flex-wrap justify-center align-middle grow">
          <NavLink href={"/"} type="secondary">Special Offer</NavLink>
          <NavLink href={"/"}>Best Sellers</NavLink>
          <div onClick={() => setGenreOpen(a=>!a)} className={`h-full group relative hover:text-black hover:bg-white ${genreOpen ? "text-black bg-white" : ""}`}>
            <Link href={"#"} className={`flex justify-center items-center h-full px-2 align-middle transition-all  ${genreOpen ? " text-black hover:text-black bg-white" : "text-white bg-spooky-black group-hover:text-black group-hover:bg-white"}`}>
              <div className="align-middle">
                Genre
              </div>
              {genreOpen && <div className=" text-black absolute p-5 w-fit bg-white rounded-b-xl bottom-[-300px] h-[300px] drop-shadow-sm ">
                <div className="flex gap-4 relative ">
                  <div>
                    <h1 className="text-xl font-bold">
                      Fiction
                    </h1>
                    <ul className="grid grid-cols-2 w-64 lg:w-96 p-2">
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>

                      
                    </ul>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">
                      Non-Fiction
                    </h1>
                    <ul className="grid grid-cols-2 w-64 lg:w-96 p-2">
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                      <Link href="/login" className="hover:text-spooky-orange">Genre 1</Link>
                    </ul>
                  </div>
                
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