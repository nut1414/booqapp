import { Template } from "@/components/common/Template"
import { Button } from "@/components/input/Button"

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
            <p className="text-4xl font-bold mt-10 m-auto">    Milo</p>
          </div>
          <div>
            <Button color={"bg-[#FF8307]"} text={"Buy now"} onClick={onClickHandle} />
            <Button color={"bg-[#FFFFFF] text-yellow-600 border-2 border-yellow-600"} text={"Add to cart"} onClick={onClickHandle}  />
          </div>
         </div>
       </div>
    </Template>
  )
}