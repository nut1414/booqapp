import { Template } from "@/components/common/Template";
import { Button } from "@/components/input/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import fetch from "@/utils/fetch";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";




export default function ManageProfile() {
  // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  const router = useRouter();
  const [publisher, setPublisher] = useState([]);

  const { status, user } = useAuth();

  const getPublisher = async () => {
    try {
      const res = await fetch(`/api/managepublishers?PublisherID=${router.query.publisherid}`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data)
        setPublisher(data.publisher[0]);
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };


  const verifystatus = publisher?.verificationstatus?.VerifyStatusID == 1 || publisher?.verificationstatus?.VerifyStatusID == 0 

  const handleSetVerifyStatus = async (status) => {
    Swal.fire({
      title: "Are you sure?",
      // text: "You will not be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/managepublishers`, {
            method: "PUT",
            body: JSON.stringify({
              PublisherID: publisher?.PublisherID,
              verify: status,
            }),
          });
          const data = await res.json();
          if (res.ok) {
            Swal.fire({
              title: "Success",
              text: "Publisher verification status has been changed.",
              icon: "success",
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed) {
                router.reload();
              }
            });
          } else {
            Swal.fire({
              title: "Error",
              text: data.message,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  };



  useEffect(() => {
    if (router.isReady) {
      if (
        (status == "authenticated" && user?.role?.RoleID != 0) 
      ) {
        router.push("/");
      }else if (status == "unauthenticated"){
        router.push("/login");
      }
    }
  }, [status, user, router]);




  useEffect(() => {
    if (router.isReady) {
      getPublisher();
    }
  }, [router]);

  const mainbankinfo = publisher?.publisherbank?.find((bank) => bank.PBankID == publisher?.Mainbank)
  return (
    <Template>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">
        Publisher Profile
      </div>
      <div className="inline-flex">
        <div className=" align-top">
          <img
            src="/profileuser.svg"
            width={"150"}
            className="mt-10 ml-36 "
          ></img>
        </div>
        <div>
          <div>
            <div className="inline-flex">
              <div className=" text-base font-bold mt-5 ml-32 ">
                Publisher ID
              </div>
              <div className=" text-base font-normal mt-5 ml-20">
                { publisher?.PublisherID }
              </div>
            </div>
          </div>
          <div>
            <div className="inline-flex">
              <div className=" text-base font-bold mt-5 ml-32 ">
                Publisher Name
              </div>
              <div className=" text-base font-normal mt-5 ml-[3.24rem]">
                { publisher?.PublisherName }
              </div>
            </div>
          </div>
          <div>
            <div className="inline-flex">
              <div className=" text-base font-bold mt-5 ml-32 ">Bank</div>
              <div className=" text-base font-normal mt-5 ml-[8.5rem]">
                { mainbankinfo?.bank?.BankName }
              </div>
            </div>
            <div className=" text-base font-normal mt-3 ml-[19rem]">
              {mainbankinfo?.BankName } {mainbankinfo?.AccountNumber }
            </div>
          </div>
          <div>
            <div className="inline-flex">
              <div className=" text-base font-bold mt-5 ml-32 ">Address</div>
              {<div className=" text-base flex flex-col font-normal mt-5 ml-[7rem] whitespace-pre-line break-words w-[30rem]">
                { publisher?.publisheraddress?.map((address) => (
                  <div key={address.PAddressID}>
                    {address.Name}{" "} {address.PhoneNumber}{" "}{address.Address}{" "}{address.ZipCode}
                  </div>
                )
                )}
              </div>}
            </div>
          </div>
          <div>
            <div className="inline-flex">
              <div className=" text-base font-bold mt-5 ml-32 ">
                Verify Status
              </div>
              <div className=" text-base font-normal mt-5 ml-[4.7rem]">
                { verifystatus ? "Unverified" :  "Verified"}
              </div>
              <Button
                text={verifystatus ? "Verify" :  "Unverify"}
                className={"mt-3 ml-10"}
                type={"secondary"}
                onClick={() => verifystatus ? handleSetVerifyStatus("true"): handleSetVerifyStatus("false")}
              ></Button>
            </div>
            <div className=" ml-[19rem] mt-5 mb-10">
              <img src={publisher?.VerificationDocument?.length > 0 ? publisher?.VerificationDocument : "/picture/noim.jpg" } width={"300"}></img>
            </div>
            <div className="float-right inline-flex">
              <div className="mb-10 ">
                <Button
                  type={"secondary"}
                  onClick={() => router.back()}
                  text={"Back"}
                ></Button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
}
