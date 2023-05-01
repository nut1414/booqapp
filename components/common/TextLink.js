import Link from "next/link"

export function TextLink({ href, children, type, className, active }) {
  let typeClass = type == "secondary" ? `${active ? "text-white" : "text-spooky-orange"} hover:text-white ` : `${!active ? "text-white" : "text-spooky-orange"} hover:text-spooky-orange `
  return (
    <Link href={href} className={"flex h-full px-2 transition-all " + typeClass + className}>
      <div className="">
        {children}
      </div>
    </Link>
    )
}