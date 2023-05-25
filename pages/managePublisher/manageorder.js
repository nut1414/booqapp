import { Template } from "@/components/common/Template";
import { Ordermanage } from "@/components/manage/Ordermanage";

export default function manageorder() {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <div>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">All Order</div>
      <div className="float-right">
        <p className="mt-6 font-bold">Shipping Status</p>
        <select className="p-2  rounded-full bg-white text-gray-900  mr-5  drop-shadow-sm  border border-black " name="verification" id="verification">
              <option value="all">All</option>
              <option value="shipped">Shipped</option>
              <option value="notship">Not Ship</option>
       </select> 
       
       <input type="text" className="inline-flex mr-28 pl-3 h-10 rounded-full text-gray-900 m-3 drop-shadow-sm border border-black w-72" placeholder="Search for Order ID"></input>
       </div>
       <div className="grid grid-cols-6 ml-44 mt-14 ">
       <p className=" font-light text-base">Order ID</p>
        <p className=" font-light text-base">Book Count</p>
        <p className=" font-light text-base">Total Price</p>
        <p className=" font-light text-base">Shipping Status</p>
        <p className=" font-light text-base">Receive Status</p>
      </div>
       <div> <div className="border-b border-black border-opacity-30 mt-3 ml-44 mr-32"></div></div>
      </div>
      <div>
       <Ordermanage orderID={"P0000000001"} bookcount={"00000"} totalprice={"00000"} shippingstatus={"Shipped"} receivestatus={"Received"}></Ordermanage>
       <Ordermanage orderID={"P0000000001"} bookcount={"00000"} totalprice={"00000"} shippingstatus={"Shipped"} receivestatus={"Received"}></Ordermanage>
       <Ordermanage orderID={"P0000000001"} bookcount={"00000"} totalprice={"00000"} shippingstatus={"Shipped"} receivestatus={"Received"}></Ordermanage>
       <Ordermanage orderID={"P0000000001"} bookcount={"00000"} totalprice={"00000"} shippingstatus={"Shipped"} receivestatus={"Received"}></Ordermanage>
       <Ordermanage orderID={"P0000000001"} bookcount={"00000"} totalprice={"00000"} shippingstatus={"Shipped"} receivestatus={"Received"}></Ordermanage>
       <Ordermanage orderID={"P0000000001"} bookcount={"00000"} totalprice={"00000"} shippingstatus={"Shipped"} receivestatus={"Received"}></Ordermanage>
       <Ordermanage orderID={"P0000000001"} bookcount={"00000"} totalprice={"00000"} shippingstatus={"Shipped"} receivestatus={"Received"}></Ordermanage>
       <Ordermanage orderID={"P0000000001"} bookcount={"00000"} totalprice={"00000"} shippingstatus={"Shipped"} receivestatus={"Received"}></Ordermanage>
       <Ordermanage orderID={"P0000000001"} bookcount={"00000"} totalprice={"00000"} shippingstatus={"Shipped"} receivestatus={"Received"}></Ordermanage>
       <Ordermanage orderID={"P0000000001"} bookcount={"00000"} totalprice={"00000"} shippingstatus={"Shipped"} receivestatus={"Received"}></Ordermanage>
      </div>
    </Template>
  )
}