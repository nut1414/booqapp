export function ShippingFeeRow({
  shippingFee
}) {


  return (
    <tr className="align-middle text-center font-bold">
      <td className="px-2 py-2 flex justify-center w-[150px]">
        
      </td>
      <td className="px-4 py-2 text-left break-all "></td>
      <td className="px-4 py-2">
    
      </td>
      <td className="px-4 py-2 font-thin">
        Shipping Fee
      </td>
      <td className="px-4 py-2">
        {shippingFee}
      </td>
    </tr>
  );
}
