import { useState } from "react";
import Link from "next/link";
import { TextBoxInline } from "../input/TextBoxInline";
import { Button } from "../input/Button";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import fetch from "@/utils/fetch";


export default function ProfilePage() {
  const router = useRouter();
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    let oldPassword = e.target[0].value;
    let newPassword = e.target[1].value;
    let confirmNewPassword = e.target[2].value;
    console.log(oldPassword, newPassword, confirmNewPassword);
    try {
      if (newPassword !== confirmNewPassword) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "New password and confirm new password does not match",
        })
      } else if (newPassword.length < 8) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "New password must be at least 8 characters",
        })
      } else {
        const res = await fetch("/api/profile/changepass", {
          method: "POST",
          body: JSON.stringify({
            oldpass: oldPassword,
            newpass: newPassword,
          }),
        });
        console.log (res)
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        Swal.fire({
          icon: "success",
          title: "Success",       
          text: "Password changed",
        }).then(() => {
          router.push("/logout");
        });
      }

    } catch (e){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! " + e?.message,
      }).then(() => {
      })
    }
  }

  return (
    <>
      {isChangingPassword ? (
        <div>
          <div>
            <div className="text-2xl font-bold mb-10 border-b-2">
              My Profile
            </div>
          </div>
          <div>
            <div>
              <form method="POST" className="ml-7" onSubmit={handleChangePassword}>
                <TextBoxInline
                  classNamebox={"ml-28"}
                  classNamelb={"mr-2"}
                  label={"Old Password"}
                  name={"Old Password"}
                  type={"password"}
                ></TextBoxInline>
                <TextBoxInline
                  classNamebox={"ml-28"}
                  label={"New Password"}
                  name={"New Password"}
                  type={"password"}
                ></TextBoxInline>
                <TextBoxInline
                  classNamebox={"ml-8"}
                  label={"Confirm New password"}
                  name={"Confirm New password"}
                  type={"password"}
                ></TextBoxInline>
                <div className="float-right mt-10">
                  <Button type="secondary" text={"Cancel"} onClick={() => setIsChangingPassword(false)} />
                  <Button type="primary" text={"Save"} onSubmit={(e) => { e.preventDefault() }}/>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div className="text-2xl font-bold mb-4 ">My Profile</div>
            <div className="border-b-2 border-black border-opacity-50 mb-10"></div>
          </div>
          <div>
            <div className="inline-flex">
              <div className="text-xl font-bold mb-10 ml-10">Username</div>
              <div className="text-xl  ml-9">TestUsername</div>
            </div>
            <div className="mb-5">
              <div className="text-xl font-bold ml-10 inline-flex">
                Password
              </div>
              <Link
                className="text-black  hover:text-spooky-orange transition-all text-xl  underline w-max ml-10"
                href={"#"}
                onClick={() => setIsChangingPassword(true)}
              >
                Change
              </Link>
            </div>
            <div>
              <form className="ml-7">
                <TextBoxInline
                  classNamebox={"ml-36"}
                  classNamelb={"mr-1"}
                  label={"Name"}
                  name={"Name"}
                  type={"text"}
                ></TextBoxInline>
                <TextBoxInline
                  classNamebox={"ml-36"}
                  label={"Phone"}
                  name={"Phone"}
                  type={"text"}
                ></TextBoxInline>
                <TextBoxInline
                  classNamebox={"ml-36"}
                  label={"E-mail"}
                  name={"E-mail"}
                  type={"text"}
                ></TextBoxInline>
                <TextBoxInline
                  classNamebox={"ml-8"}
                  label={"Confirm password"}
                  name={"Confirm password"}
                  type={"password"}
                ></TextBoxInline>
              </form>
            </div>
            <div className="float-right mt-10">
              <Button type="submit" text={"Save"} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
