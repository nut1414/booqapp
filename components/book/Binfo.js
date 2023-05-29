//import './book.css';
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import addToCart from "@/utils/addtocart";

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
  const { user, status } = useAuth();
  const addToCartAvailable =
    status == "unauthenticated"
      ? true
      : status == "authenticated"
      ? user.role.RoleID == 1
      : true;


  onClick = onClick ? onClick : async () => {
    await addToCart(bookid).then(
      () =>
      router.push("/order/cart")
    )
  }

  picture = picture?.length > 5 ? picture : "/picture/noim.jpg";
  let linkname = "/book/" + bookid;
  let linkauthor = "/book/search/author/" + encodeURIComponent(author);

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
      <div className="mb-2 w-72">
        <Link
          href={linkname}
          className=" text-black  hover:text-spooky-orange transition-all  text-2xl w-32 p-5  break-words "
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
        { addToCartAvailable && <button
          className={"rounded-3xl text-4xl hover:text-yellow-600  "}
          onClick={onClick}
        >
          +
        </button>}
      </div>
    </div>
  );
}
