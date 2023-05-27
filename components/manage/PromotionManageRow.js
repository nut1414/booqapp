import Link from "next/link"

export function PromotionManageRow({
  promotionManage
}) {


  return (
    <tr className="font-bold border-b border-b-gray-400">
      <td className="py-6">{promotionManage.promotionID}</td>
      <td>{promotionManage.promotionname}</td>
      <td>{promotionManage.discount}</td>
      <td>{promotionManage.datestart}</td>
      <td>{promotionManage.dateend}</td>
      <td>{promotionManage.salescount}</td>
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
