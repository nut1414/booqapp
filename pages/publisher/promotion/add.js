import { ActionTemplate } from "@/components/common/ActionTemplate"
import { Template } from "@/components/common/Template"
import promotion from "@/public/promo.svg"
import Image from "next/image"
import { Button } from "@/components/input/Button"
import { TextBox } from "@/components/input/TextBox"


export default function PublisherPromotionAdd() {
  return (
    <Template>
      <ActionTemplate heading={"Create Your Promotion"} sideChildren={
        <div className="pt-8 pb-16">
          <img className=" w-80" src="/promotionlogo.svg" alt="promo" />
        </div>}>
        <div className=" ml-48 mt-10">
          <TextBox id={"a"} name={"Discount percentage"} label={"Discount percentage"}  type={"text"}></TextBox>
          <TextBox id={"b"} name={"Date start"} label={"Date start"}  type={"datetime-local"} ></TextBox>
          <TextBox id={"c"} name={"Date end"} label={"Date end"}  type={"datetime-local"} ></TextBox>
          <TextBox id={"d"} name={"Promotion details"} label={"Promotion details"}  type={"text"}></TextBox>
          <TextBox id={"e"} name={"Select book"} label={"Select book"}  type={"text"}></TextBox>
          <div className="ml-96 mt-10 mb-5">
            <Button className={"w-28"} text={"Cancel"} type={"secondary"}></Button>
            <Button className={"w-28"} text={"Done"}></Button>
          </div>
        </div>

      </ActionTemplate>
    </Template>
  )
}