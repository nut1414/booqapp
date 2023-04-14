import Link from "next/link"

export function NavLink({ href, children, type, className }) {
  let typeClass = type == "secondary" ? "text-spooky-orange hover:text-orange-600 " : "text-white hover:text-spooky-orange "
  return (
    <Link href={href} className={"transition-all " + typeClass + className}>
      {children}
    </Link>
    )
}