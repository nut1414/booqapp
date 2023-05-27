import Link from "next/link"

export function PeymentManageRow({
  paymentManage
}) {


  return (
    <tr className="font-bold border-b border-b-gray-400">
      <td className="py-6">{paymentManage.orderID}</td>
      <td>{paymentManage.price}</td>
      <td>{paymentManage.publishername}</td>
      <td>{paymentManage.paymentstatus}</td>
      <td>{paymentManage.paymentconfirm}</td>
      <td>{paymentManage.receivestatus}</td>
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
