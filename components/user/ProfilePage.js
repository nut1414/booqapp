import { useState } from "react"

export default function ProfilePage() {
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  return (
    <>
      {
        isChangingPassword ? (
          <div>
            <h1>Change Password Page</h1>
          </div>
        ) : (
          <div>
            <h1>Profile Page</h1>
          </div>
          )
      }
    </>
  )
}