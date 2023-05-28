export function BookOrder({ orderbook }) {
  const book = orderbook.book


  return (
    <>
      <div className="mt-8">
        <div className="inline-flex">
          <div>
            <img className="mr-5" src={book?.BookCover?.length > 5 ? book.BookCover : '/picture/noim.jpg'} height="300" width="100"></img>{" "}
            {/*Picture*/}
          </div>
          <div>
            <div className="font-bold text-2xl mb-16 pb-2">{book?.BookName ? book?.BookName: "[DELETED TITLE]"  }</div>{" "}
            {/*Title*/}
            <div>
              <div className=" font-medium text-base">{orderbook.Quantity + " Unit"}</div>{" "}
              {/*Count*/}
            </div>
          </div>
        </div>
        <div className="float-right font-medium text-lg mt-24">{book?.FinalPrice ? book.FinalPrice * orderbook.Quantity : book.Price * orderbook.Quantity }</div>{" "}
        {/*Price*/}
      </div>
    </>
  );
}