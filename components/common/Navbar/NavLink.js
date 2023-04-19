import Link from "next/link"

export function NavLink({ href, children, type, className }) {
  let typeClass = type == "secondary" ? "text-spooky-orange hover:text-orange-600 hover:bg-white " : "text-white hover:text-black hover:bg-white "
  return (
    <Link href={href} className={"flex justify-center items-center h-full px-2 align-middle transition-all " + typeClass + className}>
      <div className="align-middle">
        {children}
      </div>
    </Link>
    )
}