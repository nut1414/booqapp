import { Button } from "@/components/input/Button";
import { TextBox } from "@/components/input/TextBox";
import { AuthTemplate } from "@/components/common/AuthTemplate";
import UserProfile from "@/public/profileuser.svg"
import Image from "next/image";
import { useState, useRef } from "react";
import { PostalPicker } from "@/components/input/PostalPicker";
import { RadioBox } from "@/components/input/RadioBox";
import Link from "next/link";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

export default function SignUp() {
  const { login } = useAuth()
  const router = useRouter()
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
    try {
      fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => {
        if (data.token) {
          Swal.fire({ title: 'Success', text: data.message, icon: 'success' })
          router.push('/login')
        } else {
          Swal.fire({title: 'Error', text: data.message, icon: 'error'})
        }
      })
    } catch (err) {
      console.log(err)
    }
    
    
    
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
            <RadioBox defaultChecked={true} id={"customer"} label={"Customer"} name={"RoleID"} value={"1"} onChange={onClickHandle}  />
            <RadioBox id={"publisher"} label={"Publisher"} name={"RoleID"} value={"2"} onChange={onClickHandle} />
          </div>
        </div>
        <TextBox label={"Username"} name={"UserName"} type={"text"} onChange={handleChange} />
        <TextBox label={"Password"} name={"Password"} type={"password"} onChange={handleChange} />
        <TextBox label={"First Name"} name={"FirstName"} type={"text"} onChange={handleChange} />
        <TextBox label={"Last Name"} name={"LastName"} type={"text"} onChange={handleChange} />
        <TextBox label={"Phone"} name={"PhoneNumber"} type={"text"} onChange={handleChange} />
        <TextBox label={"Email"}name={"Email"} type={"text"} onChange={handleChange} />
        <PostalPicker/>
        <TextBox label={"Address Detail"} name={"Address"} type={"text"} onChange={handleChange} />
        <Button type="submit" text={"Create"} />
      </form>
    </AuthTemplate>

  )
}