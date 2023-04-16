import { Template } from "@/components/common/Template"
import { Button } from "@/components/input/Button"
import Link from "next/link"

const onClickHandle = () => {
  console.log("test")
} 
export default function BookInfo() {
  return (
    <Template>
      <div><img  className ={"object-cover m-10 mr-16 float-left w-1/3 h-1/3 "} src= {"/picture/bookone.png"} /></div>
        <div className="flex box-border">
         <div className="block box-border w-full">
          <div>
            <p className="text-4xl font-bold mt-10 m-auto">Milo</p>
          </div>
          <div className="mt-3 pl-10 mb-3 ">
            <ul className="">
              <li className="mb-3">by <Link className="text-black  hover:text-spooky-orange transition-all text-sm w-max  underline" href={"https://www.youtube.com/watch?v=5CKcSFBD9BI"}>กูไงจะใครล่ะ</Link></li>
              <li className="mb-3">Publisher: <Link className="text-black  hover:text-spooky-orange transition-all text-sm w-max  underline" href={"https://www.youtube.com/watch?v=5CKcSFBD9BI"}>สำนักพิมพ์ EIEI</Link></li>
              <li className="mb-3">Genre: <Link className="text-black  hover:text-spooky-orange transition-all text-sm w-max  underline" href={"https://www.youtube.com/watch?v=5CKcSFBD9BI"}>Hentai</Link></li>
              <li className="mb-3">Weight: 14 ounces</li>
            </ul>
          </div>
         
          <div>
            <Button color={"bg-[#FFFFFF] text-yellow-600 border-2 border-yellow-600"} text={"Add to cart"} onClick={onClickHandle}  />
            <Button color={"bg-[#FF8307]"} text={"Buy now"} onClick={onClickHandle} />
          </div>
         </div>
       </div>
       <span>
       <div>
              <p className="text-red-600 text-4xl font-bold">200 -.</p> 
       </div>
       <div>
              <p className="text-red-600 text-4xl font-bold">200 -.</p>
      </div>
      </span>
    </Template>
  )
}