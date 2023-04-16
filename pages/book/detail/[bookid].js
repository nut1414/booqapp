import { Template } from "@/components/common/Template"
import { Button } from "@/components/input/Button"

const onClickHandle = () => {
  console.log("test")
} 
export default function BookInfo() {
  return (
    <Template>
      <div><img  className ={"object-cover m-10 float-left w-1/3 h-1/3 "} src= {"/picture/bookone.png"} /></div>
        <div>
          <div>
        <h1 className="text-3xl font-bold">Milo</h1>
        </div>
        <div>
       <Button color={"bg-[#FF8307]"} text={"Buy now"} onClick={onClickHandle} />
       <Button color={"bg-[#FFFFFF] text-yellow-600 border-2 border-yellow-600"} text={"Add to cart"} onClick={onClickHandle}  />
       </div>
       </div>
    </Template>
  )
}