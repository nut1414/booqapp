import { Binfo } from "./Binfo";
import fetch from "@/utils/fetch";
import { useEffect, useState } from "react";

export default function BookShowcase({
  query,
  label
}) {
  const [book, setBook] = useState([]);
  
  const fetchBook = async () => {
    try {
      const res = await fetch(
        "/api/booksearch?includeAuthor=true&booklimit=5&" + query
      );
      const data = await res.json();
      if (res.ok) {
        console.log(data.book)
        setBook(data.book);
      }

    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    fetchBook();
   }, []);


  return (
    <div>
      <div>
        <p className="font-bold text-3xl mt-10 ml-20 ">{label}</p>
      </div>
      <div className="grid grid-cols-5 ml-8 mb-10">
        {book.map((book) => (
          <Binfo
            key={"book" + book.BookID}
            picture={
              book?.BookCover?.length < 5
                ? "/picture/noim.jpg"
                : book.BookCover
            }
            name={book.BookName}
            author={book.bookauthor[0].author.AuthorName}
            price={book.Price}
            promotion={book?.CurrentPromotion}
            finalprice={book?.FinalPrice}
            bookid={book.BookID}
          />
        ))}
      </div>
    </div>
  );
}