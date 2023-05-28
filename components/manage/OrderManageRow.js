import Link from "next/link"

export function OrderManageRow({
  orderManage
}) {
  return (
    <tr className="font-bold border-b border-b-gray-400">
      <td className="py-6">{orderManage.OrderID}</td>
      <td>{orderManage.orderbook.reduce((acc, cur)=> {
        return acc + cur.Quantity
      }, 0   )}</td>
      <td>{orderManage.TotalPrice}</td>
      <td>{orderManage?.TrackingNo?.length > 0 ? "Shipped" : "Not Shipped"}</td>
      <td>{orderManage?.receivestatus == true ? "Received" : "Not Received"}</td>
      <td>
        <Link
          className="text-[#FF7300] hover:text-amber-400 transition-all text-sm underline w-max text-center"
          href={"/publisher/order/"+ orderManage?.OrderID}
          >
          View
        </Link>
      </td>
    </tr>
  );
}
