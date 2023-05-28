import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { TextBoxInline } from "../input/TextBoxInline";
import { Button } from "../input/Button";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import fetch from "@/utils/fetch";
import { useAuth } from "@/hooks/useAuth";
import { TextAreaBox } from "../input/TextAreaBox";

export default function ProfilePage() {
  const router = useRouter();
  const { status, user } = useAuth();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [userData, setUserData] = useState({
    UserName: "",
    Email: "",
    Name: "",
    PhoneNumber: "",
    Password: "",
    Phone: "", //pub
    PublisherName: "", //pub
    Description: "", //pub
  });

  const isUser = status === "authenticated" && user?.role?.RoleID === 1;
  const isPublisher = status === "authenticated" && user?.role?.RoleID === 2;
  const isAdmin = status === "authenticated" && user?.role?.RoleID === 3;

  const onInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const fetchUserData = async () => {
    let data = {
      UserName: "",
      Email: "",
      Name: "",
      PhoneNumber: "",
      Password: "",
      Phone: "", //pub
      PublisherName: "", //pub
      Description: "", //pub
    };
    const res = await fetch(isPublisher ? "/api/profile/publisher/info" : "/api/profile/info");
    try {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const resdata = await res.json();

      if(isPublisher){
        resdata.publisher.Phone = resdata.publisher.PhoneNumber;
        data = {
          ...data,
          ...resdata.publisher,
          ...resdata.publisher.user,
        }
        console.log(data)
      }else {
        data = resdata.user;
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while fetching user data",
      });
    }
    setUserData(data);
  };

  const handleChangeUserInfo = async (e) => {
    e.preventDefault();
    console.log("change user info");
    let name = e.target[0].value;
    let email = e.target[1].value;
    let phone = e.target[2].value;
    try {
      if (name.length > 3 && email.length > 5 && phone.length > 4) {
        const res = await fetch(isPublisher ? "/api/profile/publisher/info" : "/api/profile/info", {
          method: "PUT",
          body: JSON.stringify(userData),
        });
        if (!res.ok) {
          const a = await res.json();

          throw new Error(a?.message ? a.message : res.statusText);
        }
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User info changed",
        }).then(() => {
          router.push("/user/");
        });
        console.log(name, email, phone);
      }else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Input",
        });
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! " + e?.message,
      }).then(() => {});
    }
  };

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
        });
      } else if (newPassword.length < 8) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "New password must be at least 8 characters",
        });
      } else {
        const res = await fetch("/api/profile/changepass", {
          method: "POST",
          body: JSON.stringify({
            oldpass: oldPassword,
            newpass: newPassword,
          }),
        });
        console.log(res);
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
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! " + e?.message,
      }).then(() => {});
    }
  };

  useEffect(() => {
    if(status === "authenticated")
      fetchUserData();
  }, [status]);

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
              <form
                method="POST"
                className="ml-7"
                onSubmit={handleChangePassword}
              >
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
                  <Button
                    type="secondary"
                    text={"Cancel"}
                    onClick={() => setIsChangingPassword(false)}
                  />
                  <Button
                    type="primary"
                    text={"Save"}
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  />
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
              <div className="text-xl  ml-9">{userData.UserName}</div>
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
              <form
                method="POST"
                className="ml-7"
                onSubmit={handleChangeUserInfo}
              >
                <TextBoxInline
                  classNamebox={"ml-36"}
                  classNamelb={"mr-1"}
                  label={"Name"}
                  name={"Name"}
                  type={"text"}
                  value={userData.Name}
                  onChange={onInputChange}
                ></TextBoxInline>
                <TextBoxInline
                  classNamebox={"ml-36"}
                  label={"Phone"}
                  name={"PhoneNumber"}
                  type={"tel"}
                  value={userData.PhoneNumber}
                  onChange={onInputChange}
                ></TextBoxInline>
                <TextBoxInline
                  classNamebox={"ml-36"}
                  label={"E-mail"}
                  name={"Email"}
                  type={"text"}
                  value={userData.Email}
                  onChange={onInputChange}
                ></TextBoxInline>
                {isPublisher && (
                  <>
                    <TextBoxInline
                      classNamebox={"ml-36"}
                      label={"Publisher Name"}
                      name={"PublisherName"}
                      type={"text"}
                      value={userData.PublisherName}
                      onChange={onInputChange}
                    ></TextBoxInline>
                    <TextBoxInline
                      classNamebox={"ml-36"}
                      label={"Publisher Phone"}
                      name={"Phone"}
                      type={"text"}
                      value={userData.Phone}
                      onChange={onInputChange}
                    ></TextBoxInline>
                    <TextBoxInline
                      classNamebox={"ml-36"}
                      label={"Description"}
                      name={"Description"}
                      type={"text"}
                      value={userData.Description}
                      onChange={onInputChange}
                    ></TextBoxInline>
                  </>
                )}
                <TextBoxInline
                  classNamebox={"ml-8"}
                  label={"Confirm password"}
                  name={"Password"}
                  type={"password"}
                  value={userData.Password}
                  onChange={onInputChange}
                ></TextBoxInline>
                <div className="float-right mt-10">
                  <Button
                    type={"secondary"}
                    onClick={() => router.back()}
                    text={"Back"}
                  ></Button>
                  <Button
                    type="submit"
                    text={"Save"}
                    onSubmit={(e) => e.preventDefault()}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
