import { Template } from "@/components/common/Template";
import { Button } from "@/components/input/Button";
import { SearchBox } from "@/components/input/SearchBox";
import { GenreManageRow } from "@/components/manage/GenreMangaeRow";
import { useState } from "react";

export default function managepublisher() {
  const [page, setPage] = useState(1);
  // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">
        All Genre
      </div>
      <div className="mx-32 flex justify-end">
        <div className="flex align-middle">
          
        </div>
        <div className="h-6 pt-8 mb-20">
          <SearchBox  placeholder="Search for Genre name" />
        </div>
      </div>

      <div className="min-w-[75vw] mx-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b border-gray-500 text-left">
              <th className=" font-light text-base">Genre ID</th>
              <th className=" font-light text-base">Genre Name</th>
              <th className=" font-light text-base">Book Count</th>
            </tr>
          </thead>
          <tbody>
            <GenreManageRow
              genreManage={{
                genreID: "00000000001",
                genrename: "xxxxxxxxxxxxxx",
                bookcount: "00000",
              }}
            />
           <GenreManageRow
              genreManage={{
                genreID: "00000000001",
                genrename: "xxxxxxxxxxxxxx",
                bookcount: "00000",
              }}
            />
          </tbody>
        </table>
        <div className="ml-[73rem] mt-7"><Button text={"+Add"}></Button></div>
        <div className="flex justify-center text-center">
          <button
            className="bg-transparent cursor-pointer w-32 text-black text-xl font-light py-2 px-4 rounded-full"
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={page == 1}
          >
            {"< Previous"}
          </button>
          <button
            className="mx-4 text-xl font-light py-2 px-4 w-8 flex justify-center rounded-full cursor-pointer"
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={page == 1}
          >
            {page > 1 ? page - 1 : ""}
          </button>
          <button className="mx-4 text-xl font-light py-2 px-4 w-8 flex justify-center  text-spooky-orange rounded-full">
            {page}
          </button>
          <button
            className="mx-4 text-xl font-light py-2 px-4 w-8 flex justify-center  rounded-full cursor-pointer"
            onClick={() => {
              setPage(page + 1);
            }}
            // disabled={nextPageBooks.length == 0}
          >
            {/* {nextPageBooks.length == 0 ? "" : page + 1} */}
            {page + 1}
          </button>

          <button
            className="bg-transparent cursor-pointer w-32 text-black text-xl font-light py-2 px-4 rounded-full"
            onClick={() => {
              setPage(page + 1);
            }}
            // disabled={nextPageBooks.length == 0}
          >
            {"Next >"}
          </button>
        </div>
      </div>
      
    </Template>
  );
}
