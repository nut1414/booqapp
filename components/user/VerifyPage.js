import { useEffect, useState } from "react"

export default function VerifyPage() {
  const [isVerifed, setIsVerifed] = useState(false)

  // useEffect(() => {
  //   //fetch logic verified later
  // }, [])

  return (
    <>
      {isVerifed ? (<div>Verified page, already submit and checked</div>) : (<div>Verifying Page, Submit Data Form</div>)}
    </>
  )
}