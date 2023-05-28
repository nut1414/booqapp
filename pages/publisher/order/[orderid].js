import { PublisherGroupRow } from "@/components/book/CartBookTable/PublisherGroupRow";
import { ShippingFeeRow } from "@/components/book/CartBookTable/ShippingFeeRow";
import { BookItemRow } from "@/components/book/CartBookTable/BookItemRow";
import { Button } from "@/components/input/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetch from "@/utils/fetch";
import { Template } from "@/components/common/Template";
import shippingaddresstostring from "@/utils/shippingaddresstostring";
import { TextBox } from "@/components/input/TextBox";
import { TextBoxInline } from "@/components/input/TextBoxInline";
import Swal from "sweetalert2";

export default function Orderid() {
  const router = useRouter();
  const { orderid } = router.query;
  const [orderSummarize, setOrderSummarize] = useState([]);
  const [trackingNo, setTrackingNo] = useState("");

  const getOrder = async (orderid) => {
    try {
      const res = await fetch(`/api/order/publisher?OrderID=${orderid}`);
      const data = await res.json();
      if (res.ok) {
        if (data?.orders?.length > 0) {
          console.log(data.orders);
          setOrderSummarize(data.orders);
        }
      } else {
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleShippingSubmit = async (e) => {
    e.preventDefault();
    if (trackingNo === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter tracking no!",
      });
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm shipped with tracking no: " +trackingNo,
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed){
        try{
          const res = await fetch("/api/order/shippingstatus", {
            method: "PUT",
            body: JSON.stringify({
              OrderID: orderid,
              TrackingNo: trackingNo,
            }),
          });
          if (res.ok) {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Order has been set as shipped!",
            });
            getOrder(orderid);
          }


        }catch(e){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });

          console.log(e)
        }


      }

    })

    
  };

  useEffect(() => {
    if (router.isReady) {
      if (orderid) getOrder(orderid);
      else router.push("/publisher/order");
    }
  }, [router]);

  return (
    <Template>
      <div className=" text-2xl font-bold mt-10 mb-4 ml-32 inline-flex">
        Order Detail
      </div>
      <div className=" min-w-[75vw] mx-auto">
        <table className={"table-auto  w-full "}>
          <thead>
            <tr>
              <th className="px-4 py-2 w-1/6">Book Cover</th>
              <th className="px-4 py-2 w-2/6 text-left">Title</th>
              <th className="px-4 py-2 w-1/6">Price</th>
              <th className="px-4 py-2 w-1/6">Amount</th>
              <th className="px-4 py-2 w-1/6">Subtotal</th>
            </tr>
          </thead>
          <tbody className="border-b">
            {orderSummarize?.map((ordergroup, index) => {
              return (
                <>
                  <PublisherGroupRow
                    key={index + "publishergroup"}
                    publisher={{
                      PublisherName: "Order ID: " + ordergroup.OrderID,
                    }}
                  />
                  {ordergroup.orderbook.map((item, index) => {
                    return (
                      <BookItemRow
                        isSummarize={true}
                        key={index + item.BookID + "itembook"}
                        item={item}
                      />
                    );
                  })}
                  <ShippingFeeRow
                    key={index + "shippingfee"}
                    shippingFee={ordergroup.totalShipping}
                  />
                </>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="font-bold">
              <td className="p-4" colspan="1">
                Address
              </td>
              <td className=" flex flex-col p-4">
                {orderSummarize[0]?.shippingaddress &&
                  shippingaddresstostring(orderSummarize[0]?.shippingaddress)}
              </td>
              <td className=" p-4 text-right" colspan="2">
                Total
              </td>
              <td className=" p-4 text-right">
                {orderSummarize[0]?.totalPrice}
              </td>
            </tr>
            <tr className="font-bold">
              <td className="border-b p-4" colspan="1">
                Shipping Number
              </td>
              <td className="border-b flex ">
                {orderSummarize[0]?.TrackingNo?.length > 0 ? (
                  <div className="p-4">{orderSummarize[0]?.TrackingNo}</div>
                ) : (
                  <>
                    <TextBoxInline
                      value={trackingNo}
                      onChange={(e) => setTrackingNo(e.target.value)}
                    />
                    <Button text={"Confirm Shipping"} onClick={handleShippingSubmit} className={"w-48"} />
                  </>
                )}
              </td>
              <td className="border-b">

              </td>
              <td className="border-b">

              </td>
              <td className="border-b">

              </td>
            </tr>
          </tfoot>
        </table>
        <div className="p-8 flex justify-end">
          <Button text={"Back"} onClick={() => router.back()} />
        </div>
      </div>
    </Template>
  );
}
