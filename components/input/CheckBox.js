export function CheckBox({ onChange, checked, defaultChecked, name, className, label, id }) {
  return (
    <div className={className}>
      <input id={id ? id : name} name={name} type="checkbox" onChange={onChange} className=" rounded-full text-gray-900 m-3 " checked={checked} defaultChecked={defaultChecked}></input> 
      <label htmlFor={id ? id : name}>{label}</label> 
    </div>
  )
}