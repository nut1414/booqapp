export function TextBoxInline({ onChange, value, id, name, className ,type, label, readOnly, desorNot ,classNamelb ,classNamebox }) {

    return (
      <div> 
        <label htmlFor={id ? id : name} className={"font-bold text-xl ml-3 " + classNamelb}>{label}  </label>
        <input id={id ? id : name} name={name} type={type} onChange={onChange ? onChange : () => { }} value={value} className={" p-4 rounded-full text-gray-900 m-3 drop-shadow-sm border border-black w-128  h-10 "+classNamebox}></input>
      </div>
    )
  }