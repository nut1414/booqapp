import { ActionTemplate } from "@/components/common/ActionTemplate"
import { Template } from "@/components/common/Template"
import { Button } from "@/components/input/Button"
import { TextAreaBox } from "@/components/input/TextAreaBox"
import { TextBox } from "@/components/input/TextBox"



export default function PublisherBookAdd() {
  return (
    <Template>
      <ActionTemplate heading={"Adding Book"} 
        sideChildren={
          <div>
            <img className=" w-80" src="/addbook.svg"></img>
            <p className="text-white mt-5 text-xs text-opacity-60 font-semibold inline-flex">jpg, jpeg, png (max file size 5MB)</p>
            <Button className="ml-11 mt-8" text={"Upload"} type={"secondary"}></Button>
          </div>}> 
        <div className=" ml-48 mt-10">
          <TextBox id={"a"} name={"Book Title"} label={"Book Title"}  type={"text"}></TextBox>
          <TextBox id={"b"} name={"Author"} label={"Author"}  type={"text"}></TextBox>
          <TextBox id={"c"} name={"Genre"} label={"Genre"}  type={"text"}></TextBox>
          <TextBox id={"d"} name={"Format"} label={"Format"} type={"text"}></TextBox>
          <TextAreaBox className={""} id={"e"} name={"Description"} label={"Description"}  />
          {/* <TextBox className={""} id={"e"} name={"Description"} label={"Description"}  type={"text"} desorNot={"Description"}></TextBox> */}
          <TextBox id={"f"} name={"Release Date"} label={"Release Date"}  type={"datetime-local"} ></TextBox>
          <TextBox id={"g"} name={"Price"} label={"Price"}  type={"number"}></TextBox>
          <TextBox id={"h"} name={"Weight"} label={"Weight"}  type={"number"}></TextBox>
          <div className="ml-96 mt-10 mb-5">
            <Button className={"w-28"} text={"Cancel"} type={"secondary"}></Button>
            <Button className={"w-28"} text={"Done"}></Button>
          </div>
        </div>
      </ActionTemplate>
      
    </Template>
  )
}