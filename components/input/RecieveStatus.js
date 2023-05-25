export function RecieveStatus({}) {
    return (
      <div className="mt-6 ml-2">
         <p className="mb-3 mr-3 font-bold">Recieve status</p>
        <select className="p-2  rounded-full bg-white text-gray-900  mr-5  drop-shadow-sm  border border-black " name="RecieveStatus" id="RecieveStatus">
              <option value="all">All</option>
              <option value="received">Received</option>
              <option value="pending">Pending</option>
       </select> 
      </div>
    )
  }