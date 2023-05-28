import { useRouter } from "next/router";
import { Button } from "../input/Button";
import { BookOrder } from "./BookOrder";
import Swal from "sweetalert2";

export function Order({ order, status, Class, onDelete }) {
  const router = useRouter()
  // "unpaid" "shipping" "shipped" "recieved" "rated"
  const payingText = {
    topay: "To Pay",
    torecieve: "To Ship",
    toship: "To Recieve",
    complete: "Complete",
  };

  


  return (
    <div className={Class}>
      <div className="mb-5">
        <div className="inline-flex">
          {"Order ID : "}
          {order.OrderID}{" "}
          <div className="px-5">{order.publisher.PublisherName}</div>
        </div>
        <div className=" float-right flex text-sm font-bold ">
          {order?.TrackingNo?.length > 0 ? (
            <div className=" pr-8">
              {"Tracking No.: "} {order.TrackingNo}{" "}
            </div>
          ) : (
            <></>
          )}
          <div className="text-[#FF7300]">{payingText[status]}</div>
        </div>
      </div>
      <div>
        {order.orderbook.map((orderbookitem) => (
          <BookOrder
            orderbook={orderbookitem}
            key={orderbookitem.OrderBookID + "orderbook"}
          ></BookOrder>
        ))}
      </div>
      <div>
        <div className="flex flex-col align-bottom text-right">
          <div className="text-md ">
            {"Shipping Total "}
            {order.totalShipping}
          </div>

          <div className="font-bold text-xl ">
            {"Order Total  "}
            {order.TotalPrice + order.totalShipping}
          </div>
        </div>

        <div className="float-right mt-5 clear-right mb-5">
          {status == "topay" ? (
            <>
              <Button text={"Cancel"} type="secondary" onClick={onDelete} ></Button>
              <Button text={"Pay"} onClick={() => router.push("/order/confirm/"+ order.OrderID)}></Button>
            </>
          ) : status == "toship" ? (
            <Button type={"secondary"} text={"Cancel Order"}></Button>
          ) : status == "toreceive" ? (
            <Button text={"Order Received"}></Button>
          ) : status == "complete" ? (
            <Button type={"secondary"} text={"Review"}></Button>
          ) : null}
        </div>
      </div>
      <div className="border-b-2 border-black border-opacity-50 mb-10 clear-both"></div>
    </div>
  );
}
