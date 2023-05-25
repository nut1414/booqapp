export function PaymentStatus({}) {
    return (
        <div className="mt-6 ml-2">
          <p className="mb-3 mr-3 font-bold">Payment status</p>
          <select className="p-2  rounded-full bg-white text-gray-900  mr-5  drop-shadow-sm  border border-black " name="PaymentStatus" id="PaymentStatus">
                <option value="all">All</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
        </select> 
        </div>
    )
  }