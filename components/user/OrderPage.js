import { useState } from "react"

export default function OrderPage() {
  const filter = ['all', 'pay', 'waitship', 'ship', 'complete']
  const [filterOrder, setFilterOrder] = useState('all')

  return (
    <div>
      <h1>History Order Page</h1>
    </div>
  )
}