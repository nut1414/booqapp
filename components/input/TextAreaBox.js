export function TextAreaBox({ onChange, value, id, name, className ,type, label, readOnly, desorNot }) {

  return (
    <div> 
      <label htmlFor={id ? id : name} className="m-3 font-bold">{label}  </label><br></br>
      <textarea id={id ? id : name} name={name} type={type} onChange={onChange ? onChange : () => { }} value={value} className={" p-4 overflow-auto rounded-[2rem] text-gray-900 m-3 drop-shadow-sm border border-black w-96  min-h-25"}></textarea>
    </div>
  )
}