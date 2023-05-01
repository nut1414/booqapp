import { useState } from 'react'

export default function BankPage() {
  const [addingBank, setAddingBank] = useState(false)

  return (
    <>
      {
        addingBank ? (
          <div>
            <h1>Add Bank Page</h1>
          </div>
        ) : (
          <div>
            <h1>Bank Page</h1>
          </div>
        )
      }
    </>
  )
}