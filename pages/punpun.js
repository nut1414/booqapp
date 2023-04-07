import { useState, useEffect } from 'react'

export default function Punpun() {
  const [data, setData] = useState(3)
  
  useEffect(() => {
    fetch('/api/hello', { method: 'POST' ,body: "asdasdasd" }).then((res) => res.json()).then((data) => {
      console.log(data)
    })

    
  }, [])

  return (
    <div onClick={() => {
      setData(6)
     }} className="">
      Abcdefghijklmnopqrstuvwxyz
    </div>
  )
}

