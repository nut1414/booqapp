import getCurrentDateString from "@/utils/getformattime";
import Link from "next/link"

export function BookManageRow({
  bookManage
}) {
  console.log


  return (
    <tr className="font-bold border-b border-b-gray-400">
      <td className="py-6">{bookManage.BookID}</td>
      <td>{bookManage.BookName}</td>
      <td>{getCurrentDateString(bookManage.ReleaseDate)}</td>
      <td>{bookManage.Price}</td>
      <td>{bookManage.sales}</td>
      <td>{bookManage?.Quantity ? bookManage.Quantity : 0}</td>
      <td>{bookManage?.Available ? "Available" : "Not Available"  }</td>
      <td>
        <Link
          className="text-[#FF7300] hover:text-amber-400 transition-all text-sm underline w-max text-center"
          href={"/publisher/book/" + bookManage.BookID}
        >
          View
        </Link>
      </td>
    </tr>
  );
}
