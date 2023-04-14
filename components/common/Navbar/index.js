import Image from "next/image"
import { NavLink } from "./NavLink"
import Link from "next/link"
import minilogo from "@/public/minilogo.svg"
import { SearchBox } from "@/components/input/SearchBox"
import { Cart } from "@/components/common/Navbar/Cart"

export function Navbar() {
  return (
    <nav className="sticky text-white w-full flex bg-spooky-black justify-around flex-wrap">
      <Link href={"/"} className="items-center flex-col justify-center">
        <Image src={minilogo} alt="booq" />
      </Link>
      <div className="flex gap-8 flex-wrap justify-center items-center">
        <div className="flex items-center gap-4 flex-wrap justify-center align-middle grow">
          <NavLink href={"/"} type="secondary">Special Offer</NavLink>
          <NavLink href={"/"}>Best Sellers</NavLink>
          <NavLink href={"#"}>
            Genre
          </NavLink>
        </div>
        <SearchBox />
        <NavLink href={"/cart"}>
          <Cart />
        </NavLink>
        <div>

        </div>

      </div>

    </nav>
  )
}