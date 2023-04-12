export function TextBox({ onChange, value, name, className }) {
  return (
    <>
    <form>
    <label>Username : </label><br></br>
    <input type = "text" name="username" class = "w-4/12 h-7 rounded-full text-gray-900 m-3"></input><br></br>  
    <label>Password : </label><br></br>
    <input type = "password" name="password" class = "w-4/12 h-7 rounded-full text-gray-900 m-3"></input>
    <br></br><label>Frist Name : </label><br></br>  
    <input type = "text" name="Fname" class = "w-4/12 h-7 rounded-full text-gray-900 m-3"></input>
    <br></br><label>Last Name : </label><br></br>
    <input type = "text" name="Lname" class = "w-4/12 h-7 rounded-full text-gray-900 m-3"></input>
    <br></br><label>Phone : </label><br></br>
    <input type = "tel" name="tel" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required class = "w-4/12 h-7 rounded-full text-gray-900 m-3"></input>
    <br></br><label>E-mail : </label><br></br>
    <input type = "email" name="email"  class = "w-4/12 h-7 rounded-full text-gray-900 m-3"></input> 
    </form>
    </> 
  )
}