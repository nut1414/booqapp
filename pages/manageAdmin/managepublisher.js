import { Template } from "@/components/common/Template";
import { Publisher } from "@/components/manage/Publisher";

export default function managepublisher() {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <div>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">All Publisher</div>
      <div className="float-right">
        <p className="mt-6 ml-2 font-bold">verification</p>
        <select className="p-2  rounded-full bg-white text-gray-900  mr-5  drop-shadow-sm  border border-black " name="verification" id="verification">
              <option value="all">All</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="notverified">Not verified</option>
       </select> 
       
       <input type="text" className="inline-flex mr-28 pl-3 h-10 rounded-full text-gray-900 m-3 drop-shadow-sm border border-black w-72" placeholder="Search for Publisher name"></input>
       </div>
       <div className="grid grid-cols-6 ml-44 mt-14 ">
       <p className=" font-light text-base">Publisher ID</p>
        <p className=" font-light text-base">Publisher Name</p>
        <p className=" font-light text-base">Order</p>
        <p className=" font-light text-base">Sales</p>
        <p className=" font-light text-base">Verify Status</p>
      </div>
       <div> <div className="border-b border-black border-opacity-30 mt-3 ml-44 mr-32"></div></div>
      </div>
      <div>
      <Publisher publisherID={"P0000000001"} publishername={"Publisher1"} order={"00000"} sales={"00000"} verifystatus={"Verified"}></Publisher>
      <Publisher publisherID={"P0000000002"} publishername={"Publisher2"} order={"00000"} sales={"00000"} verifystatus={"Verified"}></Publisher>
      <Publisher publisherID={"P0000000003"} publishername={"Publisher3"} order={"00000"} sales={"00000"} verifystatus={"Verified"}></Publisher>
      <Publisher publisherID={"P0000000004"} publishername={"Publisher4"} order={"00000"} sales={"00000"} verifystatus={"Verified"}></Publisher>
      <Publisher publisherID={"P0000000005"} publishername={"Publisher5"} order={"00000"} sales={"00000"} verifystatus={"Verified"}></Publisher>
      <Publisher publisherID={"P0000000006"} publishername={"Publisher6"} order={"00000"} sales={"00000"} verifystatus={"Verified"}></Publisher>
      <Publisher publisherID={"P0000000007"} publishername={"Publisher7"} order={"00000"} sales={"00000"} verifystatus={"Verified"}></Publisher>
      <Publisher publisherID={"P0000000008"} publishername={"Publisher8"} order={"00000"} sales={"00000"} verifystatus={"Verified"}></Publisher>
      <Publisher publisherID={"P0000000009"} publishername={"Publisher9"} order={"00000"} sales={"00000"} verifystatus={"Verified"}></Publisher>
      <Publisher publisherID={"P0000000010"} publishername={"Publisher10"} order={"00000"} sales={"00000"} verifystatus={"Verified"}></Publisher>
      </div>
    </Template>
  )
}