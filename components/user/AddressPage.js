import { useState } from 'react'

export default function AddressPage() {
  const [addingAddress, setAddingAddress] = useState(false)

  return (
    <>
      {
        addingAddress ? (
          <div>
            <h1>Add Address Page</h1>
          </div>
        ) : (
          <div>
            <h1>Address Page</h1>
          </div>
        )
      }
    </>
  )
}