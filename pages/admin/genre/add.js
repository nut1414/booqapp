import { Template } from "@/components/common/Template";
import { ActionTemplate } from "@/components/common/ActionTemplate";
import { Button } from "@/components/input/Button";
import { useState, useEffect } from "react";
import fetch from "@/utils/fetch";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function Addgenre() {
  const [name, setName] = useState("");
  const { status, user } = useAuth();
  const router = useRouter();


  const handleCreate = async () => {
    Swal.fire({
      title: "Are you sure you want to create genre?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, create it!",
      cancelButtonText: "No, keep it.",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/genre`, {
            method: "POST",
            body: JSON.stringify({
              name: name,
            }),
          });
          const data = await res.json();
          if (res.ok) {
            Swal.fire({
              title: "Success!",
              text: "Genre has been created.",
              icon: "success",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                router.push("/admin/genre");
              }
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: data.message,
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  };


  // check if user is admin
  // if not admin -> redirect to home page
  // if admin -> show page
  useEffect(() => {
    if (status == "authenticated" && user.role.RoleID != 0) {
      router.push("/");
    }
  }, [status, user, router]);



  // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <ActionTemplate
        heading={"Add New Genre"}
        sideChildren={
          <div className="mt-10">
            <img src="/psychology.svg"></img>
          </div>
        }
      >
        <div>
          <div className="text-xl font-bold mt-5 ml-28">Genre Name</div>
          <div className="ml-28 mt-3 ">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" p-4 rounded-full text-gray-900 h-12 drop-shadow-sm border border-black w-[30rem] "
            ></input>
          </div>
          <div className="inline-flex float-right mt-32 mr-[19rem]">
            <div className="mb-10 ">
              <Button
                type={"secondary"}
                onClick={() => router.back()}
                text={"Cancel"}
              ></Button>
            </div>
            {name.length>0 && <Button text={"Done"} onClick={() => handleCreate()}></Button>}
          </div>
        </div>
      </ActionTemplate>
    </Template>
  );
}
