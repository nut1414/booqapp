import { Button } from "@/components/input/Button";
import { TextBox } from "@/components/input/TextBox";
import { CheckBox } from "@/components/input/CheckBox";
export default function SignUp() {
  const onClickHandle = () => {
    console.log("test")
  } 
  function handleChange(event) {
    console.log(event.target.value);
  }
  

  
  return (
    <div>
      <Button color={"bg-[#FF8307]"} text={"Login"} onClick={onClickHandle} />
      <TextBox name={"Username"} type={"text"} value={"username"} onChange={handleChange} />
      <TextBox name={"Password"} type={"password"} value={"password"} onChange={handleChange} />
      <CheckBox name={"Customer"}onChange={onClickHandle} />
      <CheckBox name={"Publisher"} onChange={onClickHandle} />
    </div>
  )
}