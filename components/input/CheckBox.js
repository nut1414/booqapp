export function CheckBox({ onChange, checked, defaultChecked, name, className }) {
  return (
    <>
    <form>
    <p>
    <input id={name} type = "checkbox" onChange={onChange} class = " rounded-full text-gray-900 m-3 "></input> 
    <label for={name}>{name}</label> 
    </p>
    </form>
    </>
  )
}