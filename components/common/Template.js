import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"

export function Template({ children, className, ...props }) {
  return (
    <div
      className={
        'min-h-screen flex flex-col justify-between'
        +className}
      {...props}
    >
      <Navbar />
      <div className="grow">
        {children}
      </div>
      <Footer />
    </div>
  )
}