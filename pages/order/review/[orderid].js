
import { Template } from "@/components/common/Template";
import { Reviewbook } from "@/components/book/Reviewbook";
import { Button } from "@/components/input/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import fetch from "@/utils/fetch";
import { useAuth } from "@/hooks/useAuth";

export default function Review() {
  const router = useRouter();
  const { user, status } = useAuth();
  const { orderid } = router.query;

  const [orders, setOrders] = useState([]);

  const getReview = async () => {
    try {
      const res = await fetch(`/api/order/getreview?OrderID=${orderid}`, {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data.orders);
        setOrders(data.orders);
      }
    } catch (err) {
      console.log(err);
    }
  };


  // check if roleId is 1
  useEffect(() => {
    if (router.isReady) {
      if (status == "authenticated" && user?.role?.RoleID != 1) {
        router.push("/");
      }else if (status == "unauthenticated") {
        router.push("/login");
      }
    }
  }, [status, user, router]);

  useEffect(() => {
    if (router.isReady)
    getReview();
  }, [status, orderid, router ]);

  const reviewedBookID = orders?.map((order) => order.review.map((review) => review.BookID))[0];
  console.log(reviewedBookID)
  

  return (
    <Template>
      <div>
       <div className=" text-2xl font-bold mt-10 ml-32">Review</div>
       <div className="ml-44 mt-5 inline-flex mb-5">
            <p className=" font-light">{"Order Id:  "+orderid}</p>
            <p className="font-light ml-5">{orders[0]?.publisher?.PublisherName}</p>
        </div>
       <div>
        {
          orders?.map ((order) => 
            order.orderbook.map((orderbook) => {
              console.log("reviewedBookID", reviewedBookID)
              console.log("orderbook", orderbook)
            if (reviewedBookID?.find((s) => s == orderbook?.BookID)) 
              return <Reviewbook key={orderbook.OrderBookID + "orderbook"} orderbook={orderbook} reviewed={true}></Reviewbook>;
              else if(orderbook?.book?.BookID)
            return (
              <Reviewbook key={orderbook.OrderBookID + "orderbook"} orderbook={orderbook} fetchnewBook={() =>getReview()}></Reviewbook>
            );
          }))
        }
       {/* <Reviewbook imgbook={imgbook} title={title} star={star}></Reviewbook>
       <Reviewbook imgbook={imgbook} title={title} star={star}></Reviewbook> */}
       </div>
       <Button className="float-right mr-28" text={"Back"} onClick={() => router.back()}></Button>
      </div>
    </Template>
  )
}