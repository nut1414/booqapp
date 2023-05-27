import { Template } from "@/components/common/Template";
import { SearchBox } from "@/components/input/SearchBox";
import { SelectBox } from "@/components/input/SelectBox";
import { useState } from "react";
import { PeymentManageRow } from "@/components/manage/PaymentMangaeRow";

export default function managepayment() {
  const [page, setPage] = useState(1);
 // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">
        All Payment Verification
      </div>
      <div className="mx-32 flex justify-end">
        <div className="flex align-middle">
          <SelectBox noWidth={true} label={"Payment Status"} className="">
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </SelectBox>
          <SelectBox noWidth={true} label={"Payment confirm"} className="">
            <option value="all">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="notconfirm">Not Confirm</option>
          </SelectBox>
          <SelectBox noWidth={true} label={"Receive Status"} className="">
            <option value="all">All</option>
            <option value="received">Received</option>
            <option value="pending">Pending</option>
          </SelectBox>
        </div>
        <div className="h-6 pt-8 ">
          <SearchBox  placeholder="Search for Publisher name" />
        </div>
      </div>

      <div className="min-w-[75vw] mx-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b border-gray-500 text-left">
              <th className=" font-light text-base">Order ID</th>
              <th className=" font-light text-base">Price</th>
              <th className=" font-light text-base">Publisher Name</th>
              <th className=" font-light text-base">Payment Status</th>
              <th className=" font-light text-base">Payment Confiem</th>
              <th className=" font-light text-base">Received Status</th>
            </tr>
          </thead>
          <tbody>
            <PeymentManageRow
              paymentManage={{
                orderID: "00000000001",
                price: "00000",
                publishername: "Publisher1",
                paymentstatus: "Paid",
                paymentconfirm: "Confimed",
                receivestatus: "Received",
              }}
            />
            <PeymentManageRow
              paymentManage={{
                orderID: "00000000001",
                price: "00000",
                publishername: "Publisher1",
                paymentstatus: "Paid",
                paymentconfirm: "Confimed",
                receivestatus: "Received",
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
  )
}