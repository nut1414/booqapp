export function AddressU({ name, addressDetail, onclick }) {
   
    return (
        <div>
            <div>    
                {/* <pre className="text-xl font-bold inline-flex font-serif">{name}    {lastname}</pre> */}
                <div className="inline-flex gap-5 text-xl font-bold mb-2 ml-10"><p>{name}</p></div>
                <button className = {"text-xl font-light  text-spooky-orange underline  transition-all float-right mr-32"}onClick={onclick}>Delete</button>
                <h1 className=" max-w-2xl break-words mb-10 ml-10">{addressDetail}</h1>
                <div className="border-b-2 border-black border-opacity-50 mb-10"></div>
           </div>
        </div>
    )
  }