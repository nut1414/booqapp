import { Template } from '@/components/common/Template'
import { Banner } from '@/components/home/Banner'
import { Binfo } from "@/components/book/Binfo";

export default function Home() {
  return (
      <Template>
        <Banner/>
        <div>
          <div>
          <p className='font-bold text-3xl mt-10 ml-20 '>Best Sellers</p>
          </div>
          <div className='grid grid-cols-5 ml-8 mb-10'>
          <Binfo linkname={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} linkauthor={"https://www.youtube.com/watch?v=djV11Xbc914"} picture={"/bookone.png"} name = {"Milo"} author={"กูไงจะใครล่ะ"} price ={250} />
          <Binfo linkname={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} linkauthor={"https://www.youtube.com/watch?v=djV11Xbc914"} picture={"/bookone.png"} name = {"Milo"} author={"กูไงจะใครล่ะ"} price ={250} />
          <Binfo linkname={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} linkauthor={"https://www.youtube.com/watch?v=djV11Xbc914"} picture={"/bookone.png"} name = {"Milo"} author={"กูไงจะใครล่ะ"} price ={250} />
          <Binfo linkname={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} linkauthor={"https://www.youtube.com/watch?v=djV11Xbc914"} picture={"/bookone.png"} name = {"Milo"} author={"กูไงจะใครล่ะ"} price ={250} />
          <Binfo linkname={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} linkauthor={"https://www.youtube.com/watch?v=djV11Xbc914"} picture={"/bookone.png"} name = {"Milo"} author={"กูไงจะใครล่ะ"} price ={250} />
          </div>
          <div>
          <p className='font-bold text-3xl mt-10 ml-20 '>Special offers</p>
          </div>
          <div className='grid grid-cols-5 ml-8 mb-10'>
          <Binfo linkname={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} linkauthor={"https://www.youtube.com/watch?v=djV11Xbc914"} picture={"/bookone.png"} name = {"Milo"} author={"กูไงจะใครล่ะ"} price ={250} />
          <Binfo linkname={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} linkauthor={"https://www.youtube.com/watch?v=djV11Xbc914"} picture={"/bookone.png"} name = {"Milo"} author={"กูไงจะใครล่ะ"} price ={250} />
          <Binfo linkname={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} linkauthor={"https://www.youtube.com/watch?v=djV11Xbc914"} picture={"/bookone.png"} name = {"Milo"} author={"กูไงจะใครล่ะ"} price ={250} />
          <Binfo linkname={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} linkauthor={"https://www.youtube.com/watch?v=djV11Xbc914"} picture={"/bookone.png"} name = {"Milo"} author={"กูไงจะใครล่ะ"} price ={250} />
          <Binfo linkname={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} linkauthor={"https://www.youtube.com/watch?v=djV11Xbc914"} picture={"/bookone.png"} name = {"Milo"} author={"กูไงจะใครล่ะ"} price ={250} />
          </div>
        </div>
      </Template>
  )
}
