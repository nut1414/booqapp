
import { Template } from "@/components/common/Template";
import { Reviewbook } from "@/components/book/Reviewbook";
import { Button } from "@/components/input/Button";

export default function review() {
  const orderID ="B0000001"
  const publishing ="sdafsfdfsad fsadf sd "
  const imgbook = "/bookone.png"
  const title = "Eiei"
  const star =""
  return (
    <Template>
      <div>
       <div className=" text-2xl font-bold mt-10 ml-32">Review</div>
       <div className="ml-44 mt-5 inline-flex mb-5">
            <p>{"Order Id:  "+orderID}</p>
            <p className="ml-5">{publishing}</p>
        </div>
       <div>
       <Reviewbook imgbook={imgbook} title={title} star={star}></Reviewbook>
       <Reviewbook imgbook={imgbook} title={title} star={star}></Reviewbook>
       </div>
       <Button className="float-right mr-28" text={"Sent"} onClick={""}></Button>
      </div>
    </Template>
  )
}