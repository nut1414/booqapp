export function Button({ onClick, text, type, className, onSubmit }) {
  const typeClass = type === "secondary" ? "text-spooky-orange bg-transparent hover:text-white hover:bg-spooky-orange " : "bg-spooky-orange text-white hover:text-spooky-orange hover:bg-white "

  return (
     <button className = {"min-w-28 h-10 m-2 px-6 rounded-3xl outline outline-2 outline-spooky-orange  transition-all " + typeClass + className} onClick={onClick} onSubmit={onSubmit}>{text}</button>
  )
}