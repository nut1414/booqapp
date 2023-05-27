import Link from "next/link"

export function BookManageRow({
  bookManage
}) {


  return (
    <tr className="font-bold border-b border-b-gray-400">
      <td className="py-6">{bookManage.bookID}</td>
      <td>{bookManage.booktitle}</td>
      <td>{bookManage.date}</td>
      <td>{bookManage.price}</td>
      <td>{bookManage.sales}</td>
      <td>{bookManage.salescount}</td>
      <td>{bookManage.availablestatus}</td>
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
