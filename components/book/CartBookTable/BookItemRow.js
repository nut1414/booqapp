export function BookItemRow({
  item,
  selectitems,
  setselectitems,
  updateaction,
  deleteaction,
  isSummarize,
}) {
  const addone = () => {
    if (item.book.Available) updateaction(item.ItemID, item.Quantity + 1);
  };
  const minusone = () => {
    if (item.Quantity > 1 && item.book.Available) {
      updateaction(item.ItemID, item.Quantity - 1);
    }
  };
  const deleteitem = () => {
    deleteaction(item.ItemID);
  };

  return (
    <tr className="align-middle text-center font-bold">
      <td className="px-2 py-2 flex justify-center w-[150px]">
        <label className="flex">
          {!isSummarize && (
            <input
              type="checkbox"
              className="mr-2"
              checked={selectitems.includes(item.ItemID)}
              disabled={!item.book.Available}
              onChange={() => {
                if (selectitems.includes(item.ItemID)) {
                  setselectitems(
                    selectitems.filter((id) => id !== item.ItemID)
                  );
                } else {
                  if (item.book.Available)
                    setselectitems([...selectitems, item.ItemID]);
                }
              }}
            />
          )}
          <span>
            <img
              src={
                item.book?.BookCover?.length > 5
                  ? item.book.BookCover
                  : "/picture/noim.jpg"
              }
              alt="Book cover"
            />
          </span>
        </label>
      </td>
      <td className="px-4 py-2 text-left break-all ">{item.book.BookName}</td>
      <td className="px-4 py-2">
        {item.book.FinalPrice ? item.book.FinalPrice : item.book.Price}
      </td>
      <td className="px-4 py-2">
        {!isSummarize && <button onClick={minusone}>-</button>}
        <span className="p-4">{item.book.Available ? item.Quantity : 0}</span>
        {!isSummarize && <button onClick={addone}>+</button>}
      </td>
      <td className="px-4 py-2">
        <span>
          {(item.book.FinalPrice ? item.book.FinalPrice : item.book.Price) *
            item.Quantity}
        </span>
        {!isSummarize && (
          <button onClick={deleteitem} className="absolute pl-2 text-gray-400">
            x
          </button>
        )}
      </td>
    </tr>
  );
}
