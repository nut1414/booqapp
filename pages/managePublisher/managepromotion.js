import { Template } from "@/components/common/Template";
import { Promotionmanage } from "@/components/manage/Promotionmanage";

export default function managepromotion() {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <div>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">All Book</div>
      <div className="float-right">
      <p className="mt-6 font-bold">Available Status</p>
        <select className="p-2  rounded-full bg-white text-gray-900  mr-5  drop-shadow-sm  border border-black " name="verification" id="verification">
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="notavailabe">Not Available</option>
       </select> 
       
       <input type="text" className="inline-flex mr-28 pl-3 h-10 rounded-full text-gray-900 m-3 drop-shadow-sm border border-black w-72" placeholder="Search for Promotion name"></input>
       </div>
       <div className="grid grid-cols-7 ml-44 mt-14 ">
       <p className=" font-light text-base">PromotionID</p>
        <p className=" font-light text-base">Promotion Name</p>
        <p className=" font-light text-base">Discount</p>
        <p className=" font-light text-base">Date Start</p>
        <p className=" font-light text-base">Date End</p>
        <p className=" font-light text-base">Sales Counts</p>
      </div>
       <div> <div className="border-b border-black border-opacity-30 mt-3 ml-44 mr-28"></div></div>
      </div>
      <div>
      <Promotionmanage promotionID={"00000000001"} promotionname={"00000"} discount={"00"} yearS={"2023"} mouthS={"05"} dayS={"10"} yearE={"2023"} mouthE={"05"} dayE={"20"} salescount={"00000"}></Promotionmanage>
      <Promotionmanage promotionID={"00000000001"} promotionname={"00000"} discount={"00"} yearS={"2023"} mouthS={"05"} dayS={"10"} yearE={"2023"} mouthE={"05"} dayE={"20"} salescount={"00000"}></Promotionmanage>
      <Promotionmanage promotionID={"00000000001"} promotionname={"00000"} discount={"00"} yearS={"2023"} mouthS={"05"} dayS={"10"} yearE={"2023"} mouthE={"05"} dayE={"20"} salescount={"00000"}></Promotionmanage>
      <Promotionmanage promotionID={"00000000001"} promotionname={"00000"} discount={"00"} yearS={"2023"} mouthS={"05"} dayS={"10"} yearE={"2023"} mouthE={"05"} dayE={"20"} salescount={"00000"}></Promotionmanage>
      <Promotionmanage promotionID={"00000000001"} promotionname={"00000"} discount={"00"} yearS={"2023"} mouthS={"05"} dayS={"10"} yearE={"2023"} mouthE={"05"} dayE={"20"} salescount={"00000"}></Promotionmanage>
      <Promotionmanage promotionID={"00000000001"} promotionname={"00000"} discount={"00"} yearS={"2023"} mouthS={"05"} dayS={"10"} yearE={"2023"} mouthE={"05"} dayE={"20"} salescount={"00000"}></Promotionmanage>
      <Promotionmanage promotionID={"00000000001"} promotionname={"00000"} discount={"00"} yearS={"2023"} mouthS={"05"} dayS={"10"} yearE={"2023"} mouthE={"05"} dayE={"20"} salescount={"00000"}></Promotionmanage>
      <Promotionmanage promotionID={"00000000001"} promotionname={"00000"} discount={"00"} yearS={"2023"} mouthS={"05"} dayS={"10"} yearE={"2023"} mouthE={"05"} dayE={"20"} salescount={"00000"}></Promotionmanage>
      <Promotionmanage promotionID={"00000000001"} promotionname={"00000"} discount={"00"} yearS={"2023"} mouthS={"05"} dayS={"10"} yearE={"2023"} mouthE={"05"} dayE={"20"} salescount={"00000"}></Promotionmanage>
      <Promotionmanage promotionID={"00000000001"} promotionname={"00000"} discount={"00"} yearS={"2023"} mouthS={"05"} dayS={"10"} yearE={"2023"} mouthE={"05"} dayE={"20"} salescount={"00000"}></Promotionmanage>
      </div>
    </Template>
  )
}