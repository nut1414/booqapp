
import Link from "next/link"
export function PaymentC({bookcover,booktitle,bookprice,amount,subtotal}) {
         return (
            <div>
            <div className="grid grid-cols-5 ml-44 mt-6 ">
                <div><img src={bookcover} width={"100"}></img></div>
                <div className="font-bold text-xl">{booktitle}</div>
                <div className="font-bold text-xl">{bookprice}</div>
                <div className="font-bold text-xl">{amount+" Units"}</div>
                <div className="font-bold text-xl">{subtotal}</div>
            </div>
             </div>
         )
       }