import { useState } from "react"
import { TextBoxLbInline } from "../input/TextBox"
import Link from "next/link"
import { TextBoxInline } from "../input/TextBoxInline"
import { Button } from "../input/Button"

export default function ProfilePage() {
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  return (
    <>
      {
        isChangingPassword ? (
          <div>
          <div>
              <div className="text-2xl font-bold mb-10">My Profile</div>
          </div>
          <div>
          <div>
            <form className="ml-7">
              <TextBoxInline classNamebox={"ml-28"} classNamelb={"mr-2"} label={"Old Password"} name={"Old Password"} type={"password"}></TextBoxInline>
              <TextBoxInline classNamebox={"ml-28"} label={"New Passowrd"} name={"New Passowrd"} type={"password"}></TextBoxInline>
              <TextBoxInline classNamebox={"ml-8"} label={"Confirm New password"} name={"Confirm New password"} type={"password"}></TextBoxInline>
            </form>
          </div>
          <div className="float-right mt-10">
          <Button type="submit" text={"Save"} />
          </div>
          </div>
        </div>
        ) : (
          <div>
            <div>
                <div className="text-2xl font-bold mb-10">My Profile</div>
            </div>
            <div>
              <div className="inline-flex">
              <div className="text-xl font-bold mb-10 ml-10">Username</div>
              <div className="text-xl  ml-9">TestUsername</div>
              </div>  
              <div className="mb-5">
                <div className="text-xl font-bold ml-10 inline-flex">Password</div>
                <Link className="text-black  hover:text-spooky-orange transition-all text-xl  underline w-max ml-10" href={"https://www.youtube.com/watch?v=5CKcSFBD9BI"}>Change</Link>
              </div>
            <div>
              <form className="ml-7">
                <TextBoxInline classNamebox={"ml-36"} classNamelb={"mr-1"} label={"Name"} name={"Name"} type={"text"}></TextBoxInline>
                <TextBoxInline classNamebox={"ml-36"} label={"Phone"} name={"Phone"} type={"text"}></TextBoxInline>
                <TextBoxInline classNamebox={"ml-36"} label={"E-mail"} name={"E-mail"} type={"text"}></TextBoxInline>
                <TextBoxInline classNamebox={"ml-8"} label={"Confirm password"} name={"Confirm password"} type={"password"}></TextBoxInline>
              </form>
            </div>
            <div className="float-right mt-10">
            <Button type="submit" text={"Save"} />
            </div>
            </div>
          </div>
          )
      }
    </>
  )
}