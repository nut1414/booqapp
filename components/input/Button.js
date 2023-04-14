export function Button({ onClick, text ,color}) {
  return (
    
     <button className = {"w-28 h-10 m-8 rounded-3xl " + color} onClick={onClick}>{text}</button>

  )
}