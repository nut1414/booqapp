export function PaymentConfirm({}) {
    return (
        <div className="mt-6 ml-2">
         <p className="mb-3 mr-3 font-bold">Payment confirm</p>
        <select className="p-2  rounded-full bg-white text-gray-900  mr-5  drop-shadow-sm  border border-black " name="PaymentConfirm" id="PaymentConfirm">
              <option value="all">All</option>
              <option value="notconfirm">Not Confirm</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
       </select> 
      </div>
    )
  }