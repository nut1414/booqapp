import { Template } from "@/components/common/Template"
import { Button } from "@/components/input/Button"
import Link from "next/link"

const onClickHandle = () => {
  console.log("test")
} 
export default function BookInfo() {
  return (
    <Template>
      <div className=" ml-16">
      <div><img  className ={"object-cover m-10 mr-16 float-left w-1/3 h-1/3 "} src= {"/picture/bookone.png"} /></div>
        <div className="flex box-border">
         <div className="block box-border w-full">
          <div className="ml-3 mb-5">
            <p className="text-4xl font-bold mt-10 m-auto">Milo</p>
          </div>
          <div className="mt-3 pl-10 mb-3 ">
            <ul className="">
              <li className="mb-3">by <Link className="text-black  hover:text-spooky-orange transition-all text-sm w-max  underline" href={"https://www.youtube.com/watch?v=5CKcSFBD9BI"}>กูไงจะใครล่ะ</Link></li>
              <li className="mb-3">Publisher: <Link className="text-black  hover:text-spooky-orange transition-all text-sm w-max  underline" href={"https://www.youtube.com/watch?v=5CKcSFBD9BI"}>สำนักพิมพ์ EIEI</Link></li>
              <li className="mb-3">Genre: <Link className="text-black  hover:text-spooky-orange transition-all text-sm w-max  underline" href={"https://www.youtube.com/watch?v=5CKcSFBD9BI"}>Hentai</Link></li>
              <li className="mb-5">Weight: 14 ounces</li>
            </ul>
          </div>
          <div className="inline-flex mb-5 ml-3">
          <p className="text-red-600 text-4xl font-bold mr-6">200 -.</p>
          <p className="text-black text-2xl font-bold mt-2 line-through text-opacity-60">250</p>
          <div className=" border-black border-l ml-5"></div>
          <p className="text-[#FF8307] text-xl font-bold mt-2 ml-6">Promotion of summer!</p>
          </div>
          <div>
            <Button color={"bg-[#FFFFFF] text-[#FF8307] border-2 border-[#FF8307] text-sm"} text={"Add to cart"} onClick={onClickHandle}  />
            <Button color={"bg-[#FF8307] text-white"} text={"Buy now"} onClick={onClickHandle} />
          </div>
          <div className="mt-5 mr-32">
            <p>Portraying himself as a failure, the protagonist of Osamu Dazai’s No Longer Human narrates a seemingly normal life even while he feels himself incapable of understanding human beings. Oba Yozo’s attempts to reconcile himself to the world around him begin in early childhood, continue through high school, where he becomes a ’clown" to mask his alienation, and eventually lead to a failed suicide attempt as an adult. Without sentimentality, he records the casual cruelties of life and its fleeting moments of human connection and tenderness. Semi-autobiographical, No Longer Human is the final completed work of one of Japan’s most important writers, Osamu Dazai (1909-1948). The novel has come to “echo the sentiments of youth” (Hiroshi Ando, The Mainichi Daily News) from post-war Japan to the postmodern society of technology. Still one of the ten bestselling books in Japan, No Longer Human is a powerful exploration of an individual’s alienation from society.</p>
          </div>
          <div className="mt-3 float-right mr-32 mb-2">
          <Button color={"bg-[#FFFFFF] text-[#FF8307] border-2 border-[#FF8307] text-sm"} text={"Back"} onClick={onClickHandle}  />
          </div>
         </div>
       </div>
       </div>
      
    </Template>
  )
}