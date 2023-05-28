import { Binfo } from "@/components/book/Binfo";
import { Template } from "@/components/common/Template";
import { useEffect, useState } from "react";
import fetch from "@/utils/fetch";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/input/Button";

const perPage = 20;

export default function BookSearch() {
  const router = useRouter();
  const [genre, setGenre] = useState([]);
  const [books, setBooks] = useState([]);
  const [nextPageBooks, setNextPageBooks] = useState([]);
  const [page, setPage] = useState(1);
  const { genreid, keyword } = router.query;

  const getGenre = async () => {
    const res = await fetch("/api/fetch/genre", {
      method: "GET",
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setGenre(data.genre);
    }
  };

  const getBooks = async () => {
    const url = `/api/booksearch?includeAuthor=true&booklimit=${perPage}${
      genreid < 0 || genreid == undefined ? "" : "&GenreID=" + genreid
    }${
      keyword?.length < 0 || keyword == undefined ? "" : "&BookName=" + keyword + "&AuthorName="+keyword+ "&PublisherName="+keyword
    }&skip=${(page - 1) * perPage}&OrThings=true`;
    const nextPageUrl = `/api/booksearch?includeAuthor=true&booklimit=${perPage}${
      genreid < 0 || genreid == undefined ? "" : "&GenreID=" + genreid
    }${
      keyword?.length < 0 || keyword == undefined ? "" : "&BookName=" + keyword + "&AuthorName="+keyword+ "&PublisherName="+keyword
    }&skip=${page * perPage}&OrThings=true`;
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
  };
  useEffect(() => {
    getGenre();
  }, []);

  useEffect(() => {
    if (router.isReady) getBooks();
  }, [genreid, keyword, page, router]);

  return (
    <Template>
      <div className=" justify-evenly flex">
        <div className="pt-8">
          <h1 className="text-4xl font-bold">Search</h1>
          {genreid != undefined && genreid != -1 ? (
            <h1 className="text-2xl font-bold">
              Genre: {genre?.find((g) => g.GenreID == genreid)?.GenreName}
            </h1>
          ) : (
            ""
          )}
          {keyword != undefined && keyword != "" ? (
            <h1 className="text-2xl font-bold">Keyword: {keyword}</h1>
          ) : (
            ""
          )}
        </div>
        <form>
          <p className="mt-6 font-bold">Genre</p>
          <select
            className="p-2  rounded-full bg-white text-gray-900  mr-5    border border-black "
            name="genreid"
            id="genre"
            defaultValue={genreid}
          >
            <option value="-1">All</option>
            {genre.map((genre) => (
              <option key={"genre" + genre.GenreID} value={genre.GenreID}>
                {genre.GenreName}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="inline-flex mr-12 pl-3 h-10 rounded-full text-gray-900 m-3  border border-black w-256"
            placeholder="Search Keyword"
            name="keyword"
          ></input>
          <Button text="Search"></Button>
        </form>
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
