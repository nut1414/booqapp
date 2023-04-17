import { Button } from "@/components/input/Button";
import { TextBox } from "@/components/input/TextBox";
import { AuthTemplate } from "@/components/common/AuthTemplate";
import UserProfile from "@/public/profileuser.svg"
import Image from "next/image";
import { useState, useRef } from "react";
import { PostalPicker } from "@/components/input/PostalPicker";
import { RadioBox } from "@/components/input/RadioBox";
import Link from "next/link";

export default function SignUp() {
  const [userData, setUserData] = useState({
    UserName: '',
    PhoneNumber: '',
    name: '',
    phone: '',
    Email: '',
  })
  const formRef = useRef(null)
  const onClickHandle = () => {
  } 
  function handleChange(event) {
  }

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(formRef.current);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    console.log(data);
  }



  return (
    <AuthTemplate heading={"Create your free account"} nav={
      <div className="text-right">
        Already have an account? <Link href="/login"><Button type="primary" text={"Login"} /></Link>
      </div>
    }>
      <form ref={formRef} onSubmit={handleSubmit} id="signup">
        <div className="flex gap-4 p-4">
          <Image src={UserProfile} alt="userprofile" />
          <div className="flex flex-col justify-center">
            <RadioBox id={"customer"} label={"Customer"} name={"roletype"} onChange={onClickHandle} />
            <RadioBox id={"publisher"} label={"Publisher"} name={"roletype"} onChange={onClickHandle} />
          </div>
        </div>
        <TextBox label={"Username"} name={"username"} type={"text"} onChange={handleChange} />
        <TextBox label={"Password"} name={"password"} type={"password"} onChange={handleChange} />
        <TextBox label={"First Name"} name={"firstname"} type={"text"} onChange={handleChange} />
        <TextBox label={"Last Name"} name={"lastname"} type={"text"} onChange={handleChange} />
        <TextBox label={"Phone"} name={"phone"} type={"text"} onChange={handleChange} />
        <TextBox label={"Email"}name={"email"} type={"text"} onChange={handleChange} />
        <PostalPicker/>
        <TextBox label={"Address Detail"} name={"addressdetail"} type={"text"} onChange={handleChange} />
        <Button type="submit" text={"Create"} />
      </form>
    </AuthTemplate>

  )
}