export function TextBox({ onChange, value, id, name, className ,type, label, readOnly, desorNot, noWidth,max,min, disabled  }) {
  const labelclass =
    desorNot === "Description"
      ? "h-20"
      : type == "date" || type == "datetime-local"
      ? "h-12"
      : "h-7";

  return (
    <div> 
      <label htmlFor={id ? id : name} className="m-3 font-bold">{label}  </label><br></br>
      <input disabled={disabled} id={id ? id : name} name={name} type={type} max={max} min={min} onChange={onChange ? onChange : () => { }} value={value} className={` p-4 rounded-full text-gray-900 m-3 drop-shadow-sm border border-black  ${noWidth ? "" : "w-96"} ` + labelclass}></input>
    </div>
  )
}