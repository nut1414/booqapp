export function RecieveStatus({}) {
    return (
      <div>
         <p className="mt-6 ml-2 mb-3 font-bold">Recieve status</p>
        <select className="p-2  rounded-full bg-white text-gray-900  mr-5  drop-shadow-sm  border border-black " name="verification" id="verification">
              <option value="all">All</option>
              <option value="received">Received</option>
              <option value="pending">Pending</option>
       </select> 
      </div>
    )
  }