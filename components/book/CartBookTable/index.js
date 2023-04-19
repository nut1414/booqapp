import { BookItemRow } from "@/components/book/CartBookTable/BookItemRow";
import { PublisherGroupRow } from "./PublisherGroupRow";

export function CartBookTable({ className }) {
  return (
    <table className={ "table-auto  w-full " + className }>
      <thead>
        <tr>
          <th className="px-4 py-2 w-12">Book Cover</th>
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Amount</th>
          <th className="px-4 py-2">Subtotal</th>
        </tr>
      </thead>
      <tbody className="border-b">
        <PublisherGroupRow/>
        <BookItemRow />
        <BookItemRow />
        <BookItemRow />
        <BookItemRow />
      </tbody>
      <tfoot>
        <tr className="font-bold">
          <td className="border-b p-4" colspan="2">Total:</td>
          <td className="border-b p-4" colspan="2">4 Units</td>
          <td className="border-b p-4">
            <div >
              All Order
            </div>
            <div>
              Delivery Fee
            </div>
            <div>
              Total
            </div>
          </td>
        </tr>
      </tfoot>
    </table>

  )
}