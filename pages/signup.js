import { Button } from "@/components/input/Button";
import { TextBox } from "@/components/input/TextBox";
import { CheckBox } from "@/components/input/CheckBox";
export default function SignUp() {
  const onClickHandle = () => {
    console.log("test")
  } 
  return (
    <div>
      <Button onClick={onClickHandle} />
      <TextBox />
      <CheckBox />
    </div>
  )
}