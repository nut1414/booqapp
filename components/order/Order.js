import { Button } from "../input/Button"
import { BookOrder } from "./BookOrder"

export function Order({status}) {
   // "unpaid" "shipping" "shipped" "recieved" "rated" 
   const statusOrder = status
    const payingText = {
      unpaid: "To Pay",
      shipping: "To Ship",
      shipped: "To Recieve",
      recieved: "To Rate",
      rated: "Complete"
    }
  
    return (
      <>
      <div className="mb-5">
         <div className="inline-flex">Order ID : xxxxxxx</div>
         <div className=" float-right text-[#FF7300] text-sm font-bold ">
         {
        (statusOrder == "unpaid") ? <div>{payingText[status]}</div> 
        :(statusOrder == "shipping") ? <div>{payingText[status]}</div> 
        :(statusOrder == "shipped") ? <div>{payingText[status]}</div> 
        :(statusOrder == "recieved") ? <div>{payingText[status]}</div> 
        :(statusOrder == "rated") ? <div>{payingText[status]}</div> 
        :null
        }
         </div>
      </div>
      <div>
       <BookOrder></BookOrder>
       <BookOrder></BookOrder>
       
      </div>
      <div>
      <div className="font-bold text-xl float-right">Order Total 300</div>
      
      <div className="float-right mt-5 clear-right mb-5">
        {
        (status == "unpaid") ? <Button text={"Pay"}></Button> 
        :(status == "shipping") ? <Button type={"secondary"} text={"Cancle Order"}></Button>
        :(status == "shipped") ? <Button text={"Order Received"}></Button>
        :(status == "recieved") ? <Button text={"Rated"}></Button>
        :(status == "rated") ? <Button text={"Rated"}></Button>
        :null
        }
      </div>
      </div>
      <div className="border-b-2 border-black border-opacity-50 mb-10 clear-both"></div>
      </>
    )
    
  }