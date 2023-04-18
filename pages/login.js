import { AuthTemplate } from "@/components/common/AuthTemplate"
import Link from "next/link";
import { Button } from "@/components/input/Button";
import { TextBox } from "@/components/input/TextBox";
import { CheckBox } from "@/components/input/CheckBox";
import { useRef } from "react";

export default function Signin() {
  const formRef = useRef(null)
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
    <AuthTemplate heading={"Login"} nav={
      <div className="text-right">
        Don’t have an account? <Link href="/signup"><Button type="primary" text={"Sign Up"} /></Link>
      </div>
    }>
      <form ref={formRef} onSubmit={handleSubmit}>
        <TextBox label={"Username"} name={"username"} type={"text"} />
        <TextBox label={"Password"} name={"password"} type={"password"} />
        <CheckBox label={"Remember Password"} name={"rememberPassword"} />
        <Button type="submit" text={"Login"} />
      </form>
      
    </AuthTemplate>
  )
}