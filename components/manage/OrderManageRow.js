import Link from "next/link"

export function OrderManageRow({
  orderManage
}) {


  return (
    <tr className="font-bold border-b border-b-gray-400">
      <td className="py-6">{orderManage.orderID}</td>
      <td>{orderManage.bookcount}</td>
      <td>{orderManage.totalprice}</td>
      <td>{orderManage.shippingstatus}</td>
      <td>{orderManage.receivestatus}</td>
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
