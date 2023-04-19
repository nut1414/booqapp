export function BookItemRow({ book }) {
  return (
    <tr className="align-middle text-center font-bold">
      <td className="px-2 py-2 flex justify-center w-[150px]">
        <img src="https://via.placeholder.com/100x150" alt="Book cover"/>
      </td>
      <td className="px-4 py-2 text-left break-all ">Book title</td>
      <td className="px-4 py-2">10 B</td>
      <td className="px-4 py-2">2</td>
      <td className="px-4 py-2">20 B</td>
    </tr>
    )
}