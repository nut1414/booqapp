//import './book.css';
import { useRouter } from "next/router";
import Link from "next/link";

export function Binfo({
  picture,
  name,
  price,
  author,
  onClick,
  promotion,
  finalprice,
  bookid
}) {
  const router = useRouter();

  onClick = onClick ? onClick : () => router.push("/order/cart/add?BookID=" + bookid )

  picture = picture?.length < 3 ? "/picture/noim.jpg" : picture;
  let linkname = "/book/" + bookid;
  let linkauthor = "/book/search/author/" + author;

  return (
    <div className="flex flex-col w-max">
      <Link href={linkname}>
        <img
          className={"object-cover m-10 "}
          src={picture}
          width="170"
          height="100"
        />
      </Link>
      <div className="mb-2">
        <Link
          href={linkname}
          className=" text-black  hover:text-spooky-orange transition-all text-2xl w-max p-5 "
        >
          {name}
        </Link>
        <br></br>
      </div>
      <div>
        <Link
          href={linkauthor}
          className="text-black  hover:text-spooky-orange transition-all text-base w-max font-light  p-5"
        >
          {author}
        </Link>
      </div>
      <div className="flex">
        {promotion ? (
          <div className="w-48 flex">
            <p className="text-2xl  py-5 pl-5 object-center  ">
              {finalprice}
            </p>
            <p className="text-2xl py-5 pl-2 object-center  line-through text-red-500">
              {price}
            </p>
          </div>
        ) : (
          <p className="text-2xl  p-5 object-center w-48">{price}</p>
        )}
        <button
          className={"rounded-3xl text-4xl hover:text-yellow-600  "}
          onClick={onClick}
        >
          +
        </button>
      </div>
    </div>
  );
}
