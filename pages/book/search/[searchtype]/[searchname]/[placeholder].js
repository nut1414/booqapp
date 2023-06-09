import { Template } from "@/components/common/Template";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Binfo } from "@/components/book/Binfo";

export default function SearchEntity() {
  const router = useRouter();
  const { searchtype, searchname, placeholder } = router.query;
  const querytype =
    searchtype == "author"
      ? "AuthorName"
      : searchtype == "publisher"
      ? "PublisherName"
      : searchtype == "genre"
      ? "GenreName"
      : null;
  const [books, setBooks] = useState([]);
  const [nextPageBooks, setNextPageBooks] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (router.isReady && (querytype == null || searchname == null)) {
      router.push("/");
    }
  }, [searchtype, router]);

  useEffect(() => {
    if (router.isReady) {
      const url = `/api/booksearch?includeAuthor=true&booklimit=20&${querytype}=${searchname}&skip=${
        (page - 1) * 20
      }`;
      const nextPageUrl = `/api/booksearch?includeAuthor=true&booklimit=20&${querytype}=${searchname}&skip=${
        page * 20
      }`;
      const opts = {
        method: "GET",
      };
      fetch(url, opts)
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setBooks(result.book);
        })
        .catch(console.error);
      fetch(nextPageUrl, opts)
        .then((res) => res.json())
        .then((result) => {
          setNextPageBooks(result.book);
        })
        .catch(console.error);
    }
  }, [searchtype, searchname, router, page]);

  return (
    <Template>
      <div className="ml-24  text-2xl font-bold mt-14">
        Book by {searchtype + ": " + searchname + "/" + placeholder}
      </div>
      <div className="grid grid-cols-1 sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 xl:grid xl:grid-cols-5 m-28 mt-8 gap-10 ">
        {books.map((book) => (
          <Binfo
            key={"book" + book.BookID}
            picture={
              book?.BookCover?.length < 10
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
      <div className="flex justify-center text-center">
        <button
          className="bg-transparent cursor-pointer w-32 text-black text-xl font-light py-2 px-4 rounded-full"
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page == 1}
        >
          {"< Previous"}
        </button>
        <button
          className="mx-4 text-xl font-light py-2 px-4 w-8 flex justify-center rounded-full cursor-pointer"
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page == 1}
        >
          {page > 1 ? page - 1 : ""}
        </button>
        <button className="mx-4 text-xl font-light py-2 px-4 w-8 flex justify-center  text-spooky-orange rounded-full">
          {page}
        </button>
        <button
          className="mx-4 text-xl font-light py-2 px-4 w-8 flex justify-center  rounded-full cursor-pointer"
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={nextPageBooks.length == 0}
        >
          {nextPageBooks.length == 0 ? "" : page + 1}
        </button>

        <button
          className="bg-transparent cursor-pointer w-32 text-black text-xl font-light py-2 px-4 rounded-full"
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={nextPageBooks.length == 0}
        >
          {"Next >"}
        </button>
      </div>
    </Template>
  );
}
