import Link from "next/link"

export function GenreManageRow({
  genreManage,
  onClick
}) {


  return (
    <tr className="font-bold border-b border-b-gray-400">
      <td className="py-6">{genreManage.GenreID}</td>
      <td>{genreManage.GenreName}</td>
      <td>{genreManage.BookCount}</td>
      <td>{genreManage.Quantity}</td>
      <td>
        <Link
          className="text-[#FF7300] hover:text-amber-400 transition-all text-sm underline w-max text-center"
          href={"#"}
          onClick={onClick}
        >
          Delete
        </Link>
      </td>
    </tr>
  );
}
