import { Button } from "@/components/input/Button";

export default function SignUp() {
  const onClickHandle = () => {
    console.log("test")
  }
  
  return (
    <div>
      <Button onClick={onClickHandle} />

    </div>
  )
}