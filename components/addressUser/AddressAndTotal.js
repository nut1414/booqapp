export function AddressAndTotal({address,total,amountmoney,datetime,verifypic}) {
   
    return (
        <div>
            
        <div className="grid grid-cols-2 ml-44 mt-6 ">
        <div className="inline-flex">
        <div className="font-bold text-xl">Address</div>
            <div className="font-base text-xl ml-10">{address}</div>
        </div>
        <div className="inline-flex">
            <div className="font-bold text-xl ml-32">Total</div>
            <div className="font-bold text-xl ml-52">{total}</div>
        </div>
        </div>
        <div> <div className="border-b border-black border-opacity-30 mt-5 ml-44 mr-32"></div></div>
        <div> <div className="border-b border-black border-opacity-30 mt-[0.5rem] ml-44 mr-32"></div></div>
        <div>
        <div className="inline-flex ml-44 mt-5">
            <div className="font-bold text-xl">Amount of money</div>
            <div className="font-base text-xl ml-16">{amountmoney}</div>
        </div>
        <div className="float-right mt-5 mr-32 mb-10"><img src={verifypic}></img></div>
        </div>
        <div>
        <div className="inline-flex ml-44 mt-5 mb-0">
            <div className="font-bold text-xl">Date and Time</div>
            <div className="font-base text-xl ml-24">{datetime}</div>
        </div>
        
        </div>
       
         </div>
    )
  }