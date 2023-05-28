import Link from "next/link"

export function PaymentManageRow({
  paymentManage
}) {


  return (
    <tr className="font-bold border-b border-b-gray-400">
      <td className="py-6">{paymentManage.OrderID}</td>
      <td>{paymentManage.TotalPrice}</td>
      <td>{paymentManage.publisher.PublisherName}</td>
      <td>{paymentManage.Proofoftransfer ?  "Paid" : "Unpaid"}</td>
      <td>{paymentManage.TransactionApprove ? "Confirmed": "Not Confirmed"}</td>
      <td>{paymentManage.Received ? "Received": "Pending"}</td>
      
      <td>{paymentManage.receivestatus}</td>
      <td>
        <Link
          className="text-[#FF7300] hover:text-amber-400 transition-all text-sm underline w-max text-center"
          href={"/admin/payment/" + paymentManage.OrderID}
        >
          View
        </Link>
      </td>
    </tr>
  );
}
