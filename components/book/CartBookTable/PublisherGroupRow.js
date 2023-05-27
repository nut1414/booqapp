export function PublisherGroupRow({ publisher }) {
  return (
    <tr>
      <td className="border-t px-4 py-2 pt-4 h-10 align-middle " colspan="5">
        {publisher.PublisherName}
      </td>
    </tr>
  );
}