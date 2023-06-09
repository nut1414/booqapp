import { Template } from "@/components/common/Template";
import { SearchBox } from "@/components/input/SearchBox";
import { SelectBox } from "@/components/input/SelectBox";
import { OrderManageRow } from "@/components/manage/OrderManageRow";
import { useEffect, useState } from "react";
import fetch from "@/utils/fetch";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function Manageorder() {
  const [page, setPage] = useState(1);
  const [shippingFilter, setShippingFilter] = useState("all");
  const [receiveFilter, setReceiveFilter] = useState("all");
  const [nameFilter, setNameFilter] = useState("");
  const [orders, setOrders] = useState([]);

  const { status, user } = useAuth();
  const router = useRouter();

  const perPage = 10;
  const indexOfLast = page * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const totalPages = Math.ceil(orders.length / perPage);

  const getOrders = async () => {
    try {
      const res = await fetch(
        `/api/order/publisher?shippingstatus=${shippingFilter}&receivedstatus=${receiveFilter}${nameFilter.length > 0 ? "&OrderID=" + nameFilter : ""}`,
        {
          method: "GET",
        }
        );
        const data = await res.json();
        if (res.ok) {
          setPage(1)
          setOrders(data.orders)
          console.log("ok",data);
        } else {
          console.log(data);
        }
        console.log(res);
      } catch (e) { console.log(e) }
  }

  useEffect(() => {
    if (router.isReady) {
      if (
        (status == "authenticated" && user?.role?.RoleID != 2) ||
        status == "unauthenticated"
      ) {
        router.push("/");
      }
    }
  }, [status, user, router]);

  useEffect(() => {
    getOrders()
  }, [nameFilter, shippingFilter, receiveFilter])


  // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">
        All Order
      </div>
      <div className="mx-32 flex justify-end">
        <div className="flex align-middle">
          <SelectBox noWidth={true} label={"Receive Status"}  value={receiveFilter} onChange={(e) => setReceiveFilter(e.target.value)}  className="">
            <option value="all">All</option>
            <option value="true">Received</option>
            <option value="false">Not Received</option>
          </SelectBox>
          <SelectBox noWidth={true} label={"Shipping Status"}  value={shippingFilter} onChange={(e) => setShippingFilter(e.target.value)}  className="">
            <option value="all">All</option>
            <option value="Shipped">Shipped</option>
            <option value="Not Shipped">Not Ship</option>
          </SelectBox>
        </div>
        <div className="h-6 pt-8 ">
          <SearchBox  placeholder="Search for Order ID"  value={nameFilter} onChange={(e) => setNameFilter(e.target.value)}/>
        </div>
      </div>

      <div className="min-w-[75vw] mx-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b border-gray-500 text-left">
              <th className=" font-light text-base">Order ID</th>
              <th className=" font-light text-base">Book Count</th>
              <th className=" font-light text-base">Total Price</th>
              <th className=" font-light text-base">Shipping Status</th>
              <th className=" font-light text-base">Receive Status</th>
            </tr>
          </thead>
          <tbody>
            {
              orders?.slice(indexOfFirst, indexOfLast)?.map((order) => 
                (<OrderManageRow key={order.OrderID+ "order"} orderManage={order} />)
              )
            }
            
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
