export function CheckBox({ onChange, checked, defaultChecked, name, className }) {
  return (
    <>
    <form>
    <input type = "checkbox" name="customher" class = " rounded-full text-gray-900 m-3 "></input> 
    <label>Customer  </label> 
    <br></br>
    <input type = "checkbox" name="publisher" class = " rounded-full text-gray-900 m-3 "></input> 
    <label>Publisher  </label> 
    </form>
    </>
  )
}