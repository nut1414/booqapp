
import { Binfo } from "@/components/book/Binfo";
import { Template } from "@/components/common/Template";

export default function books() {
  return (
    <Template>
      <Binfo linkname={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} linkauthor={"https://www.youtube.com/watch?v=djV11Xbc914"} picture={"/picture/bookone.png"} name = {"Milo"} author={"กูไงจะใครล่ะ"} price ={250} />
      
    </Template>
  )
}