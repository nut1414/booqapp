import { useEffect, useState, useRef } from "react";
import Resizer from "react-image-file-resizer";
import { Button } from "../input/Button";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import fetch from "@/utils/fetch";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1500,
      2000,
      "JPEG",
      95,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64",
      300,
      400
    );
  });

export default function VerifyPage() {
  const [verifyStatus, setVerifyStatus] = useState("Unverified");
  const [img, setImg] = useState(null);
  const imgRef = useRef(null);
  const router = useRouter();

  const fetchVerifyStatus = async () => {
    const res = await fetch("/api/profile/publisher/verificationstatus");
    try {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const resdata = await res.json();
      setVerifyStatus(resdata.verificationstatus.Name);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while fetching user data",
      });
    }
  };

  const handleVerify = async (e) => {
    try { 
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, verify it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await fetch(
              "/api/profile/publisher/verificationstatus",
              {
                method: "PUT",
                body: JSON.stringify({
                  Document: img,
                }),
              }
            );
            if (!res.ok) {
              throw new Error(res.statusText);
            }
            const resdata = await res.json();
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Document has been submitted.",
            });
            router.push("/user/profile");
            
          }catch(e){
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong while fetching user data",
            });
          }
        }
      });

      
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while fetching submiting data",
      });
    }
  }

  useEffect(() => {
    fetchVerifyStatus();
  }, []);

  useEffect(() => {
    imgRef?.current?.addEventListener("change", () => {
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
    <>
      {verifyStatus == "Verified" ? (
        <div>
          <div className="font-bold text-2xl mb-5">Verify Shop</div>
          <div className="border-b-2 border-black border-opacity-50"></div>
          <div className="w-full flex flex-col place-items-center">
            <img className=" w-96" src="/verifypic.svg"></img>
            <div className="text-[#FF7300] font-bold text-xl">
              Your shop has been verified
            </div>
          </div>
        </div>
      ) : verifyStatus == "Unverified" ? (
        <div>
          <div className="font-bold text-2xl mb-5">Verify Shop</div>
          <div className="border-b-2 border-black border-opacity-50 mb-10 "></div>
          <div className="inline-flex ml-10">
            <div className="font-bold text-xl">Attach a copy of real</div>
            <div className="text-[#FF7300] ml-3 font-bold text-xl">
              Company certificate
            </div>
            <div className="ml-3 font-bold text-xl mb-5">
              to verify your shop
            </div>
          </div>
          <div className="ml-10">
            <div className="flex " onClick={() => imgRef.current.click()}>
              <img className=" w-80" src={img ? img : "/addverify.svg"}></img>
            </div>
            <p className="text-black mt-5 text-xs text-opacity-60 font-semibold inline-flex">
              jpg, jpeg, png (max file size 5MB)
            </p>
            <input
              ref={imgRef}
              type="file"
              id="img"
              name="img"
              accept="image/*"
              className="file:text-spooky-orange file:border-none text-white file:bg-transparent hover:file:text-white hover:file:bg-spooky-orange file:min-w-28 file:h-10 file:m-2 file:px-6 file:rounded-3xl file:outline file:outline-2 file:outline-spooky-orange file:transition-all "
            />
          </div>
          <div>
            <Button
              type="primary"
              text="Submit"
              className="float-right"
              onClick={handleVerify}
            />
            <Button
              type="secondary"
              text="Back"
              className="float-right"
              onClick={() => router.back()}
            />
          </div>
        </div>
      ) : (
        <>
          <div>
            <div className="font-bold text-2xl mb-5">Verify Shop</div>
            <div className="border-b-2 border-black border-opacity-50"></div>
            <div className="w-full flex flex-col place-items-center">
              <img className=" w-96" src="/waitforverify.svg"></img>
              <div className="text-[#FF7300] font-bold text-xl">
                Wait for verify
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
