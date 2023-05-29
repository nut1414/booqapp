import { Binfo } from "@/components/book/Binfo";
import { Template } from "@/components/common/Template";
import { useEffect, useState } from "react";
import fetch from "@/utils/fetch";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/input/Button";
import getCurrentDateString from "@/utils/getformattime";

const perPage = 20;

export default function PromotionBookSearch() {
  const router = useRouter();
  const [genre, setGenre] = useState([]);
  const [books, setBooks] = useState([]);
  const [nextPageBooks, setNextPageBooks] = useState([]);
  const [page, setPage] = useState(1);
  const { promotionid } = router.query;

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
    const res = await fetch(`/api/promotion?PromotionID=${promotionid}`);
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setBooks(data[0]);
    }
  };

  useEffect(() => {
    getGenre();
  }, []);

  useEffect(() => {
    if (router.isReady) getBooks();
  }, [page, router]);

  return (
    <Template>
      <div className="ml-16 flex">
        <div className="pt-8">
          <h1 className="text-4xl font-bold">{books?.PromotionDetail}</h1>
          <p>
            {books?.DiscountPercent}% {"     "}
          </p>
          <div>
            {getCurrentDateString(books?.StartDate)} {"-"}{" "}
            {getCurrentDateString(books?.EndDate)}
          </div>

          {/* <h1 className="text-4xl font-bold">Search</h1>
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
          )} */}
        </div>
        {/* <form>
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
        </form> */}
      </div>
      <div className="grid grid-cols-1 sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 xl:grid xl:grid-cols-5 m-28 mt-8 gap-10 ">
        {books?.promotionbook?.map((book) => (
          <Binfo
            key={"book" + book.bookdetails.BookID}
            picture={
              book?.bookdetails?.BookCover?.length < 10
                ? "/picture/noim.jpg"
                : book.BookCover
            }
            name={book?.bookdetails?.BookName}
            author={book?.bookdetails?.bookauthor[0]?.author?.AuthorName}
            price={book?.bookdetails?.Price}
            promotion={book?.bookdetails?.CurrentPromotion}
            finalprice={book?.bookdetails?.FinalPrice}
            quantity={book?.Quantity ? book?.Quantity : 0}
            bookid={book?.bookdetails.BookID}
          />
        ))}
      </div>
    </Template>
  );
}
