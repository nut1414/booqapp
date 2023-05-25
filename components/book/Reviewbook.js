import { ReviewWithComment } from "./ReviewWithComment"
export function Reviewbook({imgbook,title,star}) {
    
    return (
      <div>
        <div className="inline-flex mb-10">
             <div><img className="ml-44" src={imgbook} width={125} ></img></div>
             <div><ReviewWithComment  title={title} star={star}></ReviewWithComment></div>
        </div>
     </div>
    )
  }