export function TextBox({ onChange, value, name, className ,type }) {
  return (
    <>
    <form>
    <p>
    <label for={name} class = "m-3">{name} : </label><br></br>
    <input id={name} type = {type} onChange={onChange} class = " p-4 w-4/12 h-7 rounded-full text-gray-900 m-3"></input><br></br>  
    </p>
    </form>
    </> 
  )
}