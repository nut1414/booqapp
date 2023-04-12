import { Button } from "@/components/input/Button";
import { TextBox } from "@/components/input/TextBox";

export default function SignUp() {
  const onClickHandle = () => {
    console.log("test")
  } 
  return (
    <div>
      <Button onClick={onClickHandle} />
      <TextBox />
    </div>
  )
}