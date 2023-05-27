import Link from "next/link"

export function GenreManageRow({
  genreManage
}) {


  return (
    <tr className="font-bold border-b border-b-gray-400">
      <td className="py-6">{genreManage.genreID}</td>
      <td>{genreManage.genrename}</td>
      <td>{genreManage.bookcount}</td>
      <td>
        <Link
          className="text-[#FF7300] hover:text-amber-400 transition-all text-sm underline w-max text-center"
          href={"#"}
        >
          View
        </Link>
      </td>
    </tr>
  );
}
