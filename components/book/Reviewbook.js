import { useState } from "react";
import { Button } from "../input/Button";
import Swal from "sweetalert2";
import fetch from "@/utils/fetch";

export function Reviewbook({ imgbook, title, reviewed, orderbook, fetchnewBook }) {
  const [star, setStar] = useState(5);
  const [comment, setComment] = useState("");
  const handleClick = (value) => {
    setStar(value);
  };

  const handleComment = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
          
          fetch(`/api/review`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Review: comment,
              Rating: star,
              BookID: orderbook?.book?.BookID,
              OrderID: orderbook?.OrderID,
            }),
          }).then((res) => {
            if (res.ok) {
              Swal.fire({
                title: "Review Success",
                icon: "success",
                confirmButtonColor: "#3085d6",
              }).then((result) => {
                if (result.isConfirmed) {
                  fetchnewBook()
                }
              });
            } else {
              Swal.fire({
                title: "Review Failed",
                icon: "error",
                confirmButtonColor: "#3085d6",
              });
            }
          });

      }
    }
    )




  }

  return (
    <div>
      <div className="inline-flex mb-10">
        <div>
          <img className="ml-44" src={orderbook?.book?.BookCover ? orderbook?.book?.BookCover : "/picture/noim.jpg"} width={125}></img>
        </div>
        <div>
          {!reviewed? <div>
            <div className=" ml-32">
              <p className=" text-xl font-bold">{orderbook?.book?.BookName}</p>
              <div className="mt-3">
                <button onClick={() => handleClick(1)}>
                  <img src={star >= 1 ? "/starY.svg" : "/starB.svg"}></img>
                </button>
                <button onClick={() => handleClick(2)}>
                  <img src={star >= 2 ? "/starY.svg" : "/starB.svg"}></img>
                </button>
                <button onClick={() => handleClick(3)}>
                  <img src={star >= 3 ? "/starY.svg" : "/starB.svg"}></img>
                </button>
                <button onClick={() => handleClick(4)}>
                  <img src={star >= 4 ? "/starY.svg" : "/starB.svg"}></img>
                </button>
                <button onClick={() => handleClick(5)}>
                  <img src={star >= 5 ? "/starY.svg" : "/starB.svg"}></img>
                </button>
              </div>
              <input
                type="text"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment Here"
                className="mt-3 pl-3 rounded-lg w-[56rem] h-20 border border-black"
              ></input>
            </div>
            <Button className={"float-right"} text={"Review"}  onClick={() => handleComment()}>

            </Button>
          </div> : "You have reviewed this book"}
        </div>
      </div>
    </div>
  );
}
