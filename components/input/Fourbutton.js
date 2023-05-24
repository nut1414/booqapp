export function Fourbutton({  }) {
    function onclickToValue(event){
      console.log(event.target.value);
    }
    return (
        <div className="grid grid-cols-5 mb-10 ">
        <button className=" border-b p-3 border-b-slate-950 hover:border-spooky-orange hover:text-spooky-orange font-bold" type="button" value="All"  name="All" onClick={onclickToValue}>All</button>
        <button className=" border-b p-3 border-b-slate-950 hover:border-spooky-orange hover:text-spooky-orange font-bold" type="button" value="ToPay" name="ToPay" onClick={onclickToValue}>To Pay</button>
        <button className=" border-b p-3 border-b-slate-950 hover:border-spooky-orange hover:text-spooky-orange font-bold" type="button" value="ToShip" name="ToShip" onClick={onclickToValue}>To Ship</button>
        <button className=" border-b p-3 border-b-slate-950 hover:border-spooky-orange hover:text-spooky-orange font-bold" type="button" value="ToReceive" name="ToReceive" onClick={onclickToValue}>To Receive</button>
        <button className=" border-b p-3 border-b-slate-950 hover:border-spooky-orange hover:text-spooky-orange font-bold" type="button" value="Complete" name="Complete" onClick={onclickToValue}>Complete</button>
      </div>
    )
  }