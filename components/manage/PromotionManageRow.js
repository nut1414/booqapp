import getCurrentDateString from "@/utils/getformattime";
import Link from "next/link"

export function PromotionManageRow({
  promotionManage
}) {


  return (
    <tr className="font-bold border-b border-b-gray-400">
      <td className="py-6">{promotionManage.PromotionID}</td>
      <td>{promotionManage.PromotionDetail}</td>
      <td>{promotionManage.DiscountPercent}</td>
      <td>{getCurrentDateString(promotionManage.StartDate)}</td>
      <td>{getCurrentDateString( promotionManage.EndDate)}</td>
      <td>{promotionManage.Quantity}</td>
      <td>
        <Link
          className="text-[#FF7300] hover:text-amber-400 transition-all text-sm underline w-max text-center"
          href={"/publisher/promotion/" + promotionManage.PromotionID}
        >
          View
        </Link>
      </td>
    </tr>
  );
}
