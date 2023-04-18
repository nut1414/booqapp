export function RadioBox({ onChange, value, name, className, label, id , checked}) {
  return (
    <div className={className}>
      <input id={id ? id : name} type="radio" name={name} onChange={onChange} value={value} className=" rounded-full text-gray-900 m-3 " checked={checked}></input> 
      <label htmlFor={id ? id : name}>{label}</label> 
    </div>
  )
}