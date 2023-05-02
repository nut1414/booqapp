import { useState } from 'react'
import { AddressU } from '../addressUser/addressU'
import { Button } from '../input/Button'

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
           <div className="font-bold text-2xl mb-5">My Address</div>
           <div className="border-b-2 border-black border-opacity-50 mb-10"></div>
           <div>
           <AddressU name={"Nithikorn"} lastname={"Komonsutthi"} adrressDetail={"King Mongkut's University of Technology Thonburi (KMUTT) 126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140, 66 2470 9850"}></AddressU>
           <AddressU name={"Nithikorn"} lastname={"Komonsutthi"} adrressDetail={"sdfsdfsdfasdfsafsdfjjskldfjklsajdflksadflksadjflksajdfklasjdflkajdlfkjaslkfjlksadfjlksadfjlksadfjsalkdfjklasdfsafasdfsadfsdfsd"}></AddressU>
           </div>
           <div>
            <Button className={"float-right"} text={"+Add"}></Button>
           </div>
          </div>
          
        )
      }
    </>
  )
}