export function Review({nameUser,star,comment}) {
    const count = star
    return (
      <div>
        <div className="ml-32 mt-5">
        <p className=" text-lg">{nameUser}</p>
        <div>
        {
        (count == "1") ? 
        <div className="inline-flex mt-2">
            <img src="/starY.svg"></img>
            <img src="/starB.svg"></img>
            <img src="/starB.svg"></img>
            <img src="/starB.svg"></img>
            <img src="/starB.svg"></img>
        </div> 
        :(count == "2") ? 
        <div className="inline-flex mt-2">
            <img src="/starY.svg"></img>
            <img src="/starY.svg"></img>
            <img src="/starB.svg"></img>
            <img src="/starB.svg"></img>
            <img src="/starB.svg"></img>
        </div> 
        :(count == "3") ? 
        <div className="inline-flex mt-2">
            <img src="/starY.svg"></img>
            <img src="/starY.svg"></img>
            <img src="/starY.svg"></img>
            <img src="/starB.svg"></img>
            <img src="/starB.svg"></img>
        </div> 
        :(count == "4") ? 
        <div className="inline-flex mt-2">
            <img src="/starY.svg"></img>
            <img src="/starY.svg"></img>
            <img src="/starY.svg"></img>
            <img src="/starY.svg"></img>
            <img src="/starB.svg"></img>
        </div> 
        :(count == "5") ? 
        <div className="inline-flex mt-2">
            <img src="/starY.svg"></img>
            <img src="/starY.svg"></img>
            <img src="/starY.svg"></img>
            <img src="/starY.svg"></img>
            <img src="/starY.svg"></img>
        </div> 
        :null
        }
        </div>
        <div className="mt-2 mr-36">{comment}</div>
        </div>
        <div className="border-b border-black border-opacity-30 mt-5 mb-10 ml-24 mr-24"></div>
      </div>
      
    )
  }