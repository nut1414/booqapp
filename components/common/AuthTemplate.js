import logo from "@/public/logo.svg"
import Image from "next/image"
import Link from "next/link"

export function AuthTemplate({ children, heading, nav }) {
  return (
    <div className="flex flex-col md:flex-row min-w-full min-h-screen">
      <div className="bg-spooky-black md:w-1/3  flex flex-col items-center text-center justify-center text-white p-2">
        <Link href={"/"}>
          <Image src={logo} alt="booq" />
        </Link>
        <p>
          the wellspring of infinite knowledge, 
        </p>
        <p>
          where each page is a portal to new worlds of understanding.
        </p>
      </div> 
      <div className="md:w-2/3 px-8 py-2 flex flex-col">
        <nav className="sticky">
          { nav }
        </nav>
        <div className="flex flex-col align-middle grow justify-center">
          <h1 className="text-spooky-orange text-2xl font-bold p-2 pb-4">{heading}</h1>
          <div >
            { children }
          </div>
        </div>
      </div>
    </div>
  )
}