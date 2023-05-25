import { Template } from "@/components/common/Template";
import { Bookmanage } from "@/components/manage/Bookmanage";

export default function managebook() {
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
       
       <input type="text" className="inline-flex mr-28 pl-3 h-10 rounded-full text-gray-900 m-3 drop-shadow-sm border border-black w-72" placeholder="Search for Book name"></input>
       </div>
       <div className="grid grid-cols-8 ml-44 mt-14 ">
       <p className=" font-light text-base">Book ID</p>
        <p className=" font-light text-base">Book Title</p>
        <p className=" font-light text-base">Release Date</p>
        <p className=" font-light text-base">Price</p>
        <p className=" font-light text-base">Sales</p>
        <p className=" font-light text-base">Sales Counts</p>
        <p className=" font-light text-base">Available Status</p>
      </div>
       <div> <div className="border-b border-black border-opacity-30 mt-3 ml-44 mr-16"></div></div>
      </div>
      <div>
      <Bookmanage bookID={"B0000000001"} booktitle={"Book Title1"} year={"2002"} mouth={"07"} day={"17"} price={"00000"} sales={"00000"} salescount={"00000"} availablestatus={"Not Avilable"}></Bookmanage>
      <Bookmanage bookID={"B0000000001"} booktitle={"Book Title1"} year={"2002"} mouth={"07"} day={"17"} price={"00000"} sales={"00000"} salescount={"00000"} availablestatus={"Not Avilable"}></Bookmanage>
      <Bookmanage bookID={"B0000000001"} booktitle={"Book Title1"} year={"2003"} mouth={"07"} day={"17"} price={"00000"} sales={"00000"} salescount={"00000"} availablestatus={"Not Avilable"}></Bookmanage>
      <Bookmanage bookID={"B0000000001"} booktitle={"Book Title1"} year={"2004"} mouth={"07"} day={"17"} price={"00000"} sales={"00000"} salescount={"00000"} availablestatus={"Not Avilable"}></Bookmanage>
      <Bookmanage bookID={"B0000000001"} booktitle={"Book Title1"} year={"2002"} mouth={"07"} day={"17"} price={"00000"} sales={"00000"} salescount={"00000"} availablestatus={"Not Avilable"}></Bookmanage>
      <Bookmanage bookID={"B0000000001"} booktitle={"Book Title1"} year={"2002"} mouth={"10"} day={"17"} price={"00000"} sales={"00000"} salescount={"00000"} availablestatus={"Not Avilable"}></Bookmanage>
      <Bookmanage bookID={"B0000000001"} booktitle={"Book Title1"} year={"2002"} mouth={"07"} day={"17"} price={"00000"} sales={"00000"} salescount={"00000"} availablestatus={"Not Avilable"}></Bookmanage>
      <Bookmanage bookID={"B0000000001"} booktitle={"Book Title1"} year={"2002"} mouth={"07"} day={"17"} price={"00000"} sales={"00000"} salescount={"00000"} availablestatus={"Not Avilable"}></Bookmanage>
      <Bookmanage bookID={"B0000000001"} booktitle={"Book Title1"} year={"2002"} mouth={"07"} day={"17"} price={"00000"} sales={"00000"} salescount={"00000"} availablestatus={"Not Avilable"}></Bookmanage>
      <Bookmanage bookID={"B0000000001"} booktitle={"Book Title1"} year={"2002"} mouth={"07"} day={"17"} price={"00000"} sales={"00000"} salescount={"00000"} availablestatus={"Not Avilable"}></Bookmanage>
      </div>
    </Template>
  )
}