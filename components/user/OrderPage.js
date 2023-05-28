import { useEffect, useState } from "react";
import { Order } from "../order/Order";

import fetch from "@/utils/fetch";
import Swal from "sweetalert2";
import OrderFilterButton from "../input/OrderFilterButton";

const filter = ["all", "topay", "toship", "toreceive", "complete"];

export default function OrderPage() {
  const [filterOrder, setFilterOrder] = useState("all");
  const [allOrder, setAllOrder] = useState([]);

  const fetchOrder = async () => {
    try {
      const res = await fetch("/api/order/user");
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setAllOrder(data.orders);
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      Swal.fire("Error", e.message, "error");
    }
  };

  const handleCancelOrder = async (orderid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel order!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch("/api/order/orders?orderID=" + orderid, {
            method: "DELETE",
          });
          if (res.ok) {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Order has been cancelled!",
            });
            fetchOrder();
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  const handleConfirmReceive = async (orderid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm receive",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch("/api/order/receivedstatus", {
            method: "PUT",
            body: JSON.stringify({
              OrderID: orderid,
              Received: "true"
            }),
          });
          if (res.ok) {
            fetchOrder();
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Order has been set as received!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const filterOrderCondition = (order) => {
    if (order?.Received == true) return "complete";
    else if (
      order?.TrackingNo?.length > 0 &&
      order?.Received != null &&
      order?.Received == false
    )
      return "toreceive";
    else if (order?.TransactionTime != null || order?.TransactionApprove)
      return "toship";
    else if (!order?.TransactionTime) return "topay";
    else return "all";
  };

  return (
    <div>
      <div className="grid grid-cols-5 mb-4 ">
        <OrderFilterButton
          active={filterOrder == "all"}
          onClick={() => setFilterOrder("all")}
        >
          All
        </OrderFilterButton>
        <OrderFilterButton
          active={filterOrder == "topay"}
          onClick={() => setFilterOrder("topay")}
        >
          To Pay
        </OrderFilterButton>
        <OrderFilterButton
          active={filterOrder == "toship"}
          onClick={() => setFilterOrder("toship")}
        >
          To Ship
        </OrderFilterButton>
        <OrderFilterButton
          active={filterOrder == "toreceive"}
          onClick={() => setFilterOrder("toreceive")}
        >
          To Receive
        </OrderFilterButton>
        <OrderFilterButton
          active={filterOrder == "complete"}
          onClick={() => setFilterOrder("complete")}
        >
          Complete
        </OrderFilterButton>
      </div>
      <div>
        {allOrder.map((order) => {
          const orderCondition = filterOrderCondition(order);
          if (filterOrder != "all" && orderCondition != filterOrder)
            return <></>;
          return (
            <Order
              key={"order" + order.OrderID}
              status={orderCondition}
              onDelete={() => handleCancelOrder(order.OrderID)}
              onReceive={() => handleConfirmReceive(order.OrderID)}
              order={order}
            ></Order>
          );
        })}
      </div>
    </div>
  );
}
