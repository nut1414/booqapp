export function TextBox({ onChange, value, id, name, className ,type, label, readOnly, desorNot, noWidth }) {
  const labelclass = desorNot === "Description" ? "h-20" : type == 'date' ? "h-12" : "h-7"

  return (
    <div> 
      <label htmlFor={id ? id : name} className="m-3 font-bold">{label}  </label><br></br>
      <input id={id ? id : name} name={name} type={type} onChange={onChange ? onChange : () => { }} value={value} className={" p-4 rounded-full text-gray-900 m-3 drop-shadow-sm border border-black  "+ noWidth ? " " : "w-96" + labelclass}></input>
    </div>
  )
}