import Image from "next/image"
import Link from "next/link"

export function ActionTemplate({ children, heading, sideChildren }) {
  return (
    <div className="flex flex-col md:flex-row min-w-full h-full grow">
      <div className="bg-[#E2DCC8] md:w-1/3  flex flex-col items-center text-left justify-center text-black p-2">
        <h1 className="text-2xl w-full px-16 font-bold">{ heading }</h1>
        <div>
          { sideChildren }
        </div>
      </div> 
      <div className="md:w-2/3 px-8 py-2 flex flex-col">
        <div className="flex flex-col align-middle grow justify-center">
          <div >
            { children }
          </div>
        </div>
      </div>
    </div>
  )
}