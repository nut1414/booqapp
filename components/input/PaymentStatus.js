export function PaymentStatus({}) {
    return (
      <div className="mt-6 ml-2">
         <p className="font-bold mb-3">Payment status</p>
        <select className="p-2  rounded-full bg-white text-gray-900  mr-5  drop-shadow-sm  border border-black " name="verification" id="verification">
              <option value="all">All</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
       </select> 
      </div>
    )
  }