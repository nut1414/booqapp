import { ActionTemplate } from "@/components/common/ActionTemplate"
import { Template } from "@/components/common/Template"
import promotion from "@/public/promo.svg"
import Image from "next/image"
import { Button } from "@/components/input/Button"

export default function PublisherPromotionAdd() {
  return (
    <Template>
      <ActionTemplate heading={"Create Your Promotion"} sideChildren={
        <div className="pt-8 pb-16">
          <Image src={promotion} alt="promo" />
        </div>}>

      </ActionTemplate>
    </Template>
  )
}