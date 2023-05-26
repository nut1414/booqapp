import { Template } from "@/components/common/Template";
import { Button } from "@/components/input/Button";
import { Genre1 } from "@/components/manage/Genre1";
import { Genre2 } from "@/components/manage/Genre2";

export default function managegenre() {
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <div>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">All Genre</div>
      <div className="float-right mt-6">
       <input type="text" className="inline-flex mr-28 pl-3 h-10 rounded-full text-gray-900 m-3 drop-shadow-sm border border-black w-72" placeholder="Search for Publisher name"></input>
       </div>
       </div>
       <div className=" grid grid-cols-2">
       <div> 
       <div>
       <div className="grid grid-cols-3 ml-48 mt-6 ">
       <p className=" font-light text-base">Genre ID</p>
        <p className=" font-light text-base">Genre Name</p>
        <p className=" font-light text-base">Book Count</p>
      </div>
       <div> <div className="border-b border-black border-opacity-30 mt-3 ml-48 mr-20"></div></div>
      </div>
      <div>
      <Genre1 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre1>
      <Genre1 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre1>
      <Genre1 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre1>
      <Genre1 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre1>
      <Genre1 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre1>
      <Genre1 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre1>
      <Genre1 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre1>
      <Genre1 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre1>
      <Genre1 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre1>
      <Genre1 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre1>
      </div>
      </div>
      
      <div>
      <div>
       <div className="grid grid-cols-3 mr-48 mt-6">
       <p className=" font-light text-base">Genre ID</p>
        <p className=" font-light text-base">Genre Name</p>
        <p className=" font-light text-base">Book Count</p>
      </div>
       <div> <div className="border-b border-black border-opacity-30 mt-3 mr-[17rem]"></div></div>
      </div>
      <div>
      <Genre2 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre2>
      <Genre2 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre2>
      <Genre2 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre2>
      <Genre2 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre2>
      <Genre2 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre2>
      <Genre2 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre2>
      <Genre2 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre2>
      <Genre2 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre2>
      <Genre2 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre2>
      <Genre2 genreID={"00000000001"} genrename={"Eieieieeieeiie"} bookcount={"00000"}></Genre2>
      </div>
      </div>
      </div>
      <div><Button text={"+Add"} className={"float-right mr-[17rem] mt-8"} onClick={""}></Button></div>
    </Template>
  )
}