import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "../input/Button"
import { useRouter } from "next/router"

export function Template({ children, className, noBack, ...props }) {
  const { user, status } = useAuth()
  const router = useRouter()
  console.log(user)

  return (
    <div
      className={
        'min-h-screen flex flex-col justify-between '
        +className}
      {...props}
    >
      <Navbar user={user}/>
      <div className="grow flex flex-col min-h-[80vh]">
        {children}
        {/* {!noBack && <div className="px-[10vw]">
          <Button type={"secondary"} onClick={() => router.back()} text={"Back"}></Button>
        </div>} */}
      </div>
      <Footer />
    </div>
  )
}