export function TextBox({ onChange, value, id, name, className ,type, label, readOnly }) {
  return (
    <div className={className}>
      <label htmlFor={id ? id : name} className="m-3">{label} : </label><br></br>
      <input id={id ? id : name} name={name} type={type} onChange={onChange ? onChange : () => { }} value={value} className=" p-4 h-7 rounded-full text-gray-900 m-3 drop-shadow-sm border border-black"  ></input>
    </div>
  )
}