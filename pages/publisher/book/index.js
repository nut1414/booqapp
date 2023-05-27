import { Template } from "@/components/common/Template";
import { SearchBox } from "@/components/input/SearchBox";
import { SelectBox } from "@/components/input/SelectBox";
import { BookManageRow } from "@/components/manage/BookManageRow";
import { useState } from "react";

export default function ManageBook() {
  const [page, setPage] = useState(1);
  // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">
        All Book
      </div>
      <div className="mx-32 flex justify-end">
        <div className="flex align-middle">
          <SelectBox noWidth={true} label={"Available Status"} className="">
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="notavailabe">Not Available</option>
          </SelectBox>
        </div>
        <div className="h-6 pt-8">
          <SearchBox placeholder="Search for Book name" />
        </div>
      </div>

      <div className="min-w-[75vw] mx-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b border-gray-500 text-left">
              <th className=" font-light text-base">Book ID</th>
              <th className=" font-light text-base">Book Title</th>
              <th className=" font-light text-base">Release Date</th>
              <th className=" font-light text-base">Price</th>
              <th className=" font-light text-base">Sales</th>
              <th className=" font-light text-base">Sales Counts</th>
              <th className=" font-light text-base">Available Status</th>
            </tr>
          </thead>
          <tbody>
            <BookManageRow
              bookManage={{
                bookID: "B0000000001",
                booktitle: "Book Title1",
                date: "2002/20/02",
                price: "00000",
                sales: "00000",
                salescount: "00000",
                availablestatus: "Not Avilable",
              }}
            />
            <BookManageRow
              bookManage={{
                bookID: "B0000000001",
                booktitle: "Book Title1",
                date: "2002/20/02",
                price: "00000",
                sales: "00000",
                salescount: "00000",
                availablestatus: "Not Avilable",
              }}
            />
          </tbody>
        </table>
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
