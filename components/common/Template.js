import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { useAuth } from "@/hooks/useAuth"

export function Template({ children, className, ...props }) {
  const { user, status } = useAuth()
  console.log(user)

  return (
    <div
      className={
        'min-h-screen flex flex-col justify-between '
        +className}
      {...props}
    >
      <Navbar user={user}/>
      <div className="grow flex flex-col">
        {children}
      </div>
      <Footer />
    </div>
  )
}