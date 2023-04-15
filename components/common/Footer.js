import { NavLink } from "./Navbar/NavLink";

export function Footer() {
  return (
    <footer className="bg-spooky-blue text-white flex flex-wrap justify-around py-2 w-full gap-4">
      <span>© 2023 All Rights Reserved</span>
      <span>Contact: booq@booq.com</span>
      <div className="flex gap-4">
        <NavLink href={"#"}>Term of use</NavLink>
        <NavLink href={"#"}>Privacy Notice</NavLink>
      </div>
    </footer>
  )
}