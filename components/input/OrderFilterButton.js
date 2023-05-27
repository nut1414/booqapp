export default function OrderFilterButton({ children, onClick, active }) {
  const style = active ? "border-b-spooky-orange text-spooky-orange font-bold" : "border-b-slate-950 hover:border-spooky-orange hover:text-spooky-orange font-bold";

  return (
    <button
      className={" border-b p-3 transition-all " + style}
      type="button"
      onClick={onClick}
    >
      { children }
    </button>
  );
}