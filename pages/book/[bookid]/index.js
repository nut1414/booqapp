import { Template } from "@/components/common/Template";
import { Button } from "@/components/input/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { SelectBox } from "@/components/input/SelectBox";
import { Review } from "@/components/book/Review";
import { useEffect, useState } from "react";
import { BookTagLink } from "@/components/book/BookTagLink";
import { useAuth } from "@/hooks/useAuth";

export default function BookInfo() {
  const router = useRouter();
  const { bookid } = router.query;
  const [book, setBook] = useState(null);
  const { user, status } = useAuth();
  const [starFilter, setStarFilter] = useState(-1);

  const [reviews, setReviews] = useState([]);

  const addToCartAvailable =
    status == "unauthenticated"
      ? true
      : status == "authenticated"
      ? user.role.RoleID == 1
      : true;

  const handleAddCart = () => {
    router.push("/order/cart/add?BookID=" + bookid);
  };
  const handleBuy = () => {};

  const getBook = async () => {
    const res = await fetch(`/api/bookdetail/?BookID=${bookid}`, {
      method: "GET",
    });
    if (res.ok) {
      const data = await res.json();
      setBook(data.bookdetail);
      console.log(data);
    } else {
      router.push("/");
      setBook(null);
    }
  };

  const getReviews = async () => {
    const res = await fetch(
      `/api/review?BookID=${bookid}${
        starFilter != "-1" ? "&Rating=" + starFilter : ""
      }`,
      {
        method: "GET",
      }
    );
    if (res.ok) {
      const data = await res.json();
      setReviews(data.getbookreview);
      console.log(data);
    } else {
      setReviews([]);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getBook();
      getReviews();
    }
  }, [bookid, router]);

  useEffect(() => {
    if (router.isReady) {
      getReviews();
    }
  }, [starFilter]);

  const CurrentPromotion = book?.CurrentPromotion;
  return (
    <Template>
      {book && (
        <div className="flex flex-col md:flex-row mx-4 md:mx-16">
          <div className="grow md:w-[30vw] p-2">
            <img
              className={"object-cover md:p-10 float-left "}
              src={
                book?.BookCover?.length > 10
                  ? book?.BookCover
                  : "/picture/noim.jpg"
              }
            />
          </div>
          <div className="flex box-border md:w-[60vw]">
            <div className="block box-border w-full">
              <div className="ml-3 mb-5">
                <h1 className="text-4xl font-bold mt-10 m-auto">
                  {book?.BookName}
                </h1>
              </div>
              <div className="mt-3 pl-10 mb-3 w-1/2">
                <ul className="">
                  <li className="mb-3 flex flex-wrap gap-2">
                    by
                    {book?.bookauthor?.map((author) => (
                      <BookTagLink
                        key={author?.author?.AuthorID}
                        type="author"
                        tagID={author?.author?.AuthorName}
                        tagLabel={author?.author?.AuthorName}
                      />
                    ))}
                  </li>
                  <li className="mb-3 flex gap-2">
                    Publisher:
                    {
                      <BookTagLink
                        type="publisher"
                        tagID={book?.publisher?.PublisherName}
                        tagLabel={book?.publisher?.PublisherName}
                      />
                    }
                  </li>
                  <li className="mb-3 flex flex-wrap gap-2">
                    Genre:{" "}
                    {book?.bookgenre?.map((genre) => (
                      <BookTagLink
                        key={genre?.genre?.GenreID}
                        type="genre"
                        tagID={genre?.genre?.GenreName}
                        tagLabel={genre?.genre?.GenreName}
                      />
                    ))}
                  </li>
                  <li className="mb-5">Weight: {book?.Weight} kg</li>
                </ul>
              </div>
              {CurrentPromotion ? (
                <div className="inline-flex mb-5 ml-3">
                  <p className="text-red-600 text-4xl font-bold mr-6">
                    {book?.FinalPrice}
                    {".- "}
                  </p>
                  <p className="text-black text-2xl font-bold mt-2 line-through text-opacity-60">
                    {book?.Price}
                  </p>
                  <div className=" border-black border-l ml-5"></div>
                  <p className="text-[#FF8307] text-xl font-bold mt-2 ml-6">
                    {CurrentPromotion?.PromotionDetail}
                  </p>
                </div>
              ) : (
                <div className="inline-flex mb-5 ml-3">
                  <p className="text-black text-4xl font-bold mr-6">
                    {book?.Price}
                    {".-"}
                  </p>
                </div>
              )}
              <div>
                {book.Available && addToCartAvailable && (
                  <>
                    {" "}
                    <Button
                      type="secondary"
                      text={"Add to cart"}
                      onClick={handleAddCart}
                    />
                    {/* <Button
                      type="primary"
                      text={"Buy now"}
                      onClick={handleBuy}
                    /> */}
                  </>
                )}
              </div>
              <div className="mt-5 md:mr-24">
                <p>{book?.Description}</p>
              </div>
              <div className="mt-3 float-right md:mr-16 mb-2">
                <Button
                  type={"secondary"}
                  text={"Back"}
                  onClick={() => router.back()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="border-b-2 border-black border-opacity-30 mt-5 mb-10 ml-20 mr-20"></div>

      <div>
        <div className="flex">
          <div className="ml-20  mt-5 font-bold text-2xl">Review</div>
          <div className="ml-auto">
            <div>
              <select
                className="p-2 pl-4 pr-4  rounded-full bg-white text-gray-900 m-5 drop-shadow-sm  border border-black mr-32 "
                name="star"
                id="star"
                value={starFilter}
                onChange={(e) => setStarFilter(e.target.value)}
              >
                <option value="-1">All</option>
                <option value="1">1 Star</option>
                <option value="2">2 Star</option>
                <option value="3">3 Star</option>
                <option value="4">4 Star</option>
                <option value="5">5 Star</option>
              </select>
            </div>
          </div>
        </div>
        {reviews?.map((review) => (
          <Review
            key={review?.OrderID + "review"}
            nameUser={review?.user?.UserName}
            star={review?.Rate}
            comment={review?.Comment}
          />
        ))}
      </div>
    </Template>
  );
}
