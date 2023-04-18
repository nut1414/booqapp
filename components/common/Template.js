import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { useAuth } from "@/hooks/useAuth"

export function Template({ children, className, ...props }) {
  const { user, status } = useAuth()
  const role = status == "authenticated" ? user?.role : ""

  return (
    <div
      className={
        'min-h-screen flex flex-col justify-between '
        +className}
      {...props}
    >
      <Navbar role={role}/>
      <div className="grow flex flex-col">
        {children}
      </div>
      <Footer />
    </div>
  )
}