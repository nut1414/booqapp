export function BookOrder({book}) {
    
    return (
        <>
        <div className="mt-8">
        <div className="inline-flex">
            <div>
             <img  className="mr-5" src="/addverify.svg" height="300" width="100"></img> {/*Picture*/}
             </div>
             <div>
             <div className="font-bold text-2xl mb-16 pb-2">Title</div> {/*Title*/}
             <div>
                <div className=" font-medium text-base">{"2 "+"Unit"}</div> {/*Count*/}
             </div>
             </div>
        </div>
        <div className="float-right font-medium text-lg mt-24">300</div> {/*Price*/}
        </div>
        
        </>
    )
  }