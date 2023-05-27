import { Template } from "@/components/common/Template";
import { SearchBox } from "@/components/input/SearchBox";
import { SelectBox } from "@/components/input/SelectBox";
import { PromotionManageRow } from "@/components/manage/PromotionManageRow";
import { useState } from "react";

export default function managepromotion() {
  const [page, setPage] = useState(1);
  // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">
        All Promotion
      </div>
      <div className="mx-32 flex justify-end">
        <div className="flex align-middle">
          <SelectBox noWidth={true} label={"Available Status"} className="">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="notactive">Not Active</option>
          </SelectBox>
        </div>
        <div className="h-6 pt-8 ">
          <SearchBox  placeholder="Search for Promotion name" />
        </div>
      </div>

      <div className="min-w-[75vw] mx-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b border-gray-500 text-left">
              <th className=" font-light text-base">Promotion ID</th>
              <th className=" font-light text-base">Promotion Name</th>
              <th className=" font-light text-base">Discount</th>
              <th className=" font-light text-base">Date Start</th>
              <th className=" font-light text-base">Date End</th>
              <th className=" font-light text-base">Sales Counts</th>
            </tr>
          </thead>
          <tbody>
            <PromotionManageRow
              promotionManage={{
                promotionID: "00000000001",
                promotionname: "00000",
                discount: "00%",
                datestart: "2002/20/02",
                dateend: "2002/25/02",
                salescount: "00000",
              }}
            />
            <PromotionManageRow
              promotionManage={{
                promotionID: "00000000001",
                promotionname: "00000",
                discount: "00%",
                datestart: "2002/20/02",
                dateend: "2002/25/02",
                salescount: "00000",
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
