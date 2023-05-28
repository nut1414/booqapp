import { Template } from "@/components/common/Template";
import { SearchBox } from "@/components/input/SearchBox";
import { SelectBox } from "@/components/input/SelectBox";
import { useState, useEffect } from "react";
import { PaymentManageRow } from "@/components/manage/PaymentManageRow";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import fetch from "@/utils/fetch";

export default function Managepayment() {
  const [page, setPage] = useState(1);
  const [payFilter, setPayFilter] = useState("all");
  const [confirmFilter, setConfirmFilter] = useState("all");
  const [receiveFilter, setReceiveFilter] = useState("all");

  const [nameFilter, setNameFilter] = useState("");
  const [payments, setPayments] = useState([]);
  const { status, user } = useAuth();
  const router = useRouter();

  const perPage = 10;
  const indexOfLast = page * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const totalPages = Math.ceil(payments.length / perPage);

  const getPayment = async () => {
    try {
      const res = await fetch(
        `/api/order/adminverify?Receivestatus=${receiveFilter}&PaymentStatus=${payFilter}&TransactionApprove=${confirmFilter}${
          nameFilter.length > 0 ? "&PublisherName=" + nameFilter : ""
        }`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setPage(1);
        setPayments(data.orders);
        console.log(data);
      } else {
        console.log(data);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      if (
        (status == "authenticated" && user?.role?.RoleID != 0) ||
        status == "unauthenticated"
      ) {
        router.push("/");
      }
    }
  }, [status, user, router]);

  useEffect(() => {
    if (router.isReady) {
      getPayment();
    }
  }, [router, receiveFilter, confirmFilter, payFilter, nameFilter]);

  // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">
        All Payment Verification
      </div>
      <div className="mx-32 flex justify-end">
        <div className="flex align-middle">
          <SelectBox
            noWidth={true}
            label={"Payment Status"}
            className=""
            value={payFilter}
            onChange={(e) => setPayFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="true">Paid</option>
            <option value="false">Unpaid</option>
          </SelectBox>
          <SelectBox
            noWidth={true}
            label={"Payment confirm"}
            className=""
            value={confirmFilter}
            onChange={(e) => setConfirmFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="true">Confirmed</option>
            <option value="false">Not Confirm</option>
          </SelectBox>
          <SelectBox
            noWidth={true}
            label={"Receive Status"}
            className=""
            value={receiveFilter}
            onChange={(e) => setReceiveFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="true">Received</option>
            <option value="false">Pending</option>
          </SelectBox>
        </div>
        <div className="h-6 pt-8 ">
          <SearchBox
            placeholder="Search for Publisher name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
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
              <th className=" font-light text-base">Payment Confirm</th>
              <th className=" font-light text-base">Received Status</th>
            </tr>
          </thead>
          <tbody>
            {payments?.slice(indexOfFirst, indexOfLast)?.map((payment) => (
              <PaymentManageRow key={payment.OrderID} paymentManage={payment} />
            ))}
          </tbody>
        </table>
        <div className="flex justify-center text-center">
          <button
            className="bg-transparent cursor-pointer w-32 text-black text-xl font-light py-2 px-4 rounded-full"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            {"< Previous"}
          </button>
          <button
            className="mx-4 text-xl font-light py-2 px-4 w-8 flex justify-center rounded-full cursor-pointer"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            {page > 1 ? page - 1 : ""}
          </button>
          <button className="mx-4 text-xl font-light py-2 px-4 w-8 flex justify-center text-spooky-orange rounded-full">
            {page}
          </button>
          <button
            className="mx-4 text-xl font-light py-2 px-4 w-8 flex justify-center rounded-full cursor-pointer"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
          >
            {page < totalPages ? page + 1 : ""}
          </button>
          <button
            className="bg-transparent cursor-pointer w-32 text-black text-xl font-light py-2 px-4 rounded-full"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
          >
            {"Next >"}
          </button>
        </div>
      </div>
    </Template>
  );
}
