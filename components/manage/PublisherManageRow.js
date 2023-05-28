import Link from "next/link"

export function PublisherManageRow({
  publisherManage
}) {


  return (
    <tr className="font-bold border-b border-b-gray-400">
      <td className="py-6">{publisherManage.PublisherID}</td>
      <td>{publisherManage.PublisherName}</td>
      <td>{publisherManage.BookCount}</td>
      <td>{publisherManage.SalesCount}</td>
      <td>{publisherManage.verificationstatus.Name}</td>
      <td>
        <Link
          className="text-[#FF7300] hover:text-amber-400 transition-all text-sm underline w-max text-center"
          href={"/admin/publisher/" + publisherManage.PublisherID}
        >
          Manage
        </Link>
      </td>
    </tr>
  );
}
