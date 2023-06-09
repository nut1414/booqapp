import { Template } from "@/components/common/Template";
import { Button } from "@/components/input/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { SelectBox } from "@/components/input/SelectBox";
import { Review } from "@/components/book/Review";
import { useEffect, useState } from "react";
import { BookTagLink } from "@/components/book/BookTagLink";
import { useAuth } from "@/hooks/useAuth";
import fetch from "@/utils/fetch";
import Swal from "sweetalert2";
import getCurrentDateString from "@/utils/getformattime";

export default function BookInfo() {
  const router = useRouter();
  const { bookid } = router.query;
  const [book, setBook] = useState(null);
  const [book2, setBook2] = useState(null);

  const { user, status } = useAuth();

  const addToCartAvailable =
    status == "unauthenticated"
      ? true
      : status == "authenticated"
      ? user.role.RoleID == 1
      : true;

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/book?BookID=${bookid}`, {
            method: "DELETE",
          });
          if (res.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "Your book has been deleted.",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                router.push("/publisher/book");
              }
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const getBook2 = async () => {
    const res = await fetch(`/api/bookdetail/?BookID=${bookid}&PublisherID=${user?.id}`, {
      method: "GET",
    });
    if (res.ok) {
      const data = await res.json();
      setBook2(data.bookdetail);
      console.log(data);
    } else {
      router.push("/");
      setBook(null);
    }
  };

  const getBook = async () => {
    const res = await fetch(`/api/getpublisherbook?BookID=${bookid}`, {
      method: "GET",
    });
    if (res.ok) {
      const data = await res.json();
      if (data.length >0)
      setBook(data[0]);
      else router.push("/")
      console.log(data);
    } else {
      // router.push("/")
      setBook(null);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      
      getBook()
      getBook2()
    };
  }, [bookid, router,user]);

  useEffect(() => {
    if (router.isReady) {
      if (status == "authenticated" && user?.role?.RoleID != 2) {
        router.push("/");
      }
    }
  }, [status,user,router])

  const CurrentPromotion = book?.CurrentPromotion;
  return (
    <Template>
      {book && (
        <div className="flex flex-col md:flex-row mx-4 md:mx-16">
          <div className="grow md:w-[30vw] p-2">
            <img
              className={"object-cover md:p-10 float-left "}
              src={
                book2?.BookCover?.length > 10
                  ? book2?.BookCover
                  : "/picture/noim.jpg"
              }
            />
          </div>
          <div className="flex box-border md:w-[60vw]">
            <div className="block box-border w-full">
              <div className="ml-3 mb-5 mt-10 flex justify-between">
                <h1 className="text-4xl font-bold ">{book?.BookName}</h1>
                <Button
                  className={"hover:bg-red-600 text-red-600 outline-red-600"}
                  type={"secondary"}
                  text={"Delete"}
                  onClick={handleDelete}
                />
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
                    {""}
                    {book?.FinalPrice}
                    {".- "}
                  </p>
                  <p className="text-black text-2xl font-bold mt-2 line-through text-opacity-60">
                    {""}
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
                <div className="text-xl">Release Date: {getCurrentDateString(book?.ReleaseDate)}</div>
                <div className="text-xl">Sales Count: {book?.Quantity ? book?.Quantity : 0}</div>
              </div>
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
                  type={"Primary"}
                  text={"Edit"}
                  onClick={() => router.push("/publisher/book/" + bookid + "/edit")}
                />
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
    </Template>
  );
}
