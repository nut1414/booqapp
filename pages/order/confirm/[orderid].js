import { Template } from "@/components/common/Template";
import { Button } from "@/components/input/Button";
import { useRouter } from "next/router";
import { ActionTemplate } from "@/components/common/ActionTemplate";
import { useState, useEffect } from "react";
import fetch from "@/utils/fetch";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";
import { TextBox } from "@/components/input/TextBox";
import Resizer from "react-image-file-resizer";
import { useRef } from "react";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      "JPEG",
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64",
      300,
      400
    );
  });

export default function Paymentconfirm() {
  // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  const { status, user } = useAuth();
  const router = useRouter();
  const { orderid } = router.query;
  const imgRef = useRef(null);
  const [img, setImg] = useState(null);
  const formRef = useRef(null);



  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    const data = {
      OrderID: orderid,
      Datetime: e.target[0].value,
      Proof: img,
    }
    console.log(data);
    // validating
    if (data.Date == "" || data.Proof == null) {
      Swal.fire({
        icon: "error",
        title: "Please fill in all the fields",
      });
      return;
    }else {
      // confirming
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch("/api/order/paymentverification", {
            method: "PUT",
            body: JSON.stringify(data),
          });
          if (res.ok) {
            Swal.fire({
              icon: "success",
              title: "Success",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              
              router.push("/user/order");
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Something went wrong",
            });
          }
        }
      })


    }


  }


  useEffect(() => {
    if (router.isReady) {
      if (
        (status == "authenticated" && user?.role?.RoleID != 1) ||
        status == "unauthenticated"
      ) {
        router.push("/");
      }
    }
  }, [status, user, router]);

  useEffect(() => {
    if (router.isReady) {
      // getPublishers();
    }
  }, [router, orderid]);

  useEffect(() => {
    imgRef.current.addEventListener("change", () => {
      console.log("change");
      console.log(imgRef.current.files);
      if (imgRef.current.files[0]) {
        resizeFile(imgRef.current.files[0]).then((res) => {
          setImg(res);
        });
      }
    });
  }, [imgRef]);



  return (
    <Template>
      <ActionTemplate
        heading={"Payment Confirmation"}
        sideChildren={
          <div className="text-white">
            {" "}
            <div className=" text-xl font-base ">Transfer to</div>
            <div className="inline-flex">
              <div className="ml-3 mt-5">
                <img src="/kasikorn.svg"></img>
              </div>
              <div>
                <div className=" text-2xl font-base mt-7 ml-10 ">
                  Kasikorn bank
                </div>
                <div className="inline-flex mt-2">
                  <div className=" text-base font-base ml-10">booqShop</div>
                  <div className=" text-base font-base ml-5">000-0-00000-0</div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <div>
          <div className=" text-2xl font-bold">Payment confirmation Detail</div>
          <div className=" text-xl font-bold mt-10 ml-28">Order ID</div>
          <div className=" text-xl font-bold mt-3 ml-32">{orderid}</div>
          <form method="POST" onSubmit={handleSubmit} ref={formRef}>
            <div className="ml-28 mt-3 ">
              <TextBox type={"datetime-local"} label="Date and Time"></TextBox>
            </div>
            <div className="text-xl font-bold mt-5 ml-28">
              Proof of transaction
            </div>
            <div className="flex flex-col">
              <input
                ref={imgRef}
                type="file"
                id="img"
                name="img"
                accept="image/*"
                className="file:text-spooky-orange pl-16 file:border-none text-black file:bg-transparent hover:file:text-white hover:file:bg-spooky-orange  file:h-10 file:m-2 file:px-6 file:rounded-3xl file:outline file:outline-2 file:outline-spooky-orange file:transition-all "
              />
              <div className="ml-[7.5rem] mt-2 opacity-40 font-bold">
                jpg, jpeg, png (max file size 5MB)
              </div>
            </div>
            <div className="inline-flex float-right mt-20">
              <div className="mb-10 ">
                <Button
                  type={"secondary"}
                  onClick={(e) => {
                    e.preventDefault()
                    router.back()
                  }}
                  text={"Back"}
                ></Button>
              </div>
              <Button text={"Confirm"} onSubmit={handleSubmit}></Button>
            </div>
          </form>
        </div>
      </ActionTemplate>
    </Template>
  );
}
