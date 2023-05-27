import Link from "next/link"

export function PublisherManageRow({
  publisherManage
}) {


  return (
    <tr className="font-bold border-b border-b-gray-400">
      <td className="py-6">{publisherManage.publisherID}</td>
      <td>{publisherManage.publishername}</td>
      <td>{publisherManage.order}</td>
      <td>{publisherManage.sales}</td>
      <td>{publisherManage.verifystatus}</td>
      <td>
        <Link
          className="text-[#FF7300] hover:text-amber-400 transition-all text-sm underline w-max text-center"
          href={"#"}
        >
          Manage
        </Link>
      </td>
    </tr>
  );
}
