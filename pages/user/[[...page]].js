import { Template } from "@/components/common/Template"
import UserProfileImg from "@/public/profileuser.svg"
import Image from "next/image"
import { TextLink } from "@/components/common/TextLink"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import AddressPage from "@/components/user/AddressPage"
import BankPage from "@/components/user/BankPage"
import ProfilePage from "@/components/user/ProfilePage"
import VerifyPage from "@/components/user/VerifyPage"
import OrderPage from "@/components/user/OrderPage"

export default function UserPage() {
  const router = useRouter()
  const { page } = router.query
  const [currentPage, setCurrentPage] = useState('profile')
  // const { user, status } = useAuth()

  let user = { // temp user for no backend
    "id": 9,
    "name": "test test",
    "email": "test",
    "role": {
      "RoleID": 1,
      "RoleName": "Customer" // or "Publisher" or "Admin"
    },
    "iat": 1682935092,
    "exp": 1683539892
  }


  const pageList = {
    'profile': 'My Profile',
    'address': 'My Address',
    'order': 'My Purchase',
    'bank': 'My Bank Account',
    'verify': 'Verify Shop',
  }

  const pagePermission = {
    'profile': ['Customer', 'Publisher', 'Admin'],
    'address': ['Customer', 'Publisher', 'Admin'],
    'order': ['Customer', 'Publisher', 'Admin'],
    'bank': ['Customer', 'Publisher', 'Admin'],
    'verify': ['Customer', 'Publisher', 'Admin'],
  }


  useEffect(() => {
    if (!router.isReady) return
    if (!Array.isArray(page) || !Object.keys(pageList)?.includes(page[0])) {
      console.log('wrong page')
      router.push('/user/profile')
    } else {
      console.log("current page:", page[0])
      setCurrentPage(page[0])
    }
    
  }, [router.isReady, page])

  useEffect(() => {
    if (pagePermission[currentPage].includes(user?.role?.RoleName)) {
      console.log('access granted')
    } else {
      console.log('access denied')
      router.push('/user/profile')
    }
  }, [pagePermission, currentPage])


  return (
    <Template>
      <div className="flex flex-col md:flex-row w-full grow h-full">
        <div className="flex flex-col p-8 bg-spooky-black md:w-1/4 text-white">
          <div className="h-16 flex justify-around align-middle">  
            <div>
              <Image src={UserProfileImg} alt="userprofile" width={64} height={64} />
            </div>
            <div className="">
              { user?.name }
            </div>
          </div>
          <div className="flex flex-col gap-0.5 justify-start pt-2 font-semibold m-4">
            {
              Object.keys(pageList).map((key, index) => {
                if (pagePermission[key].includes(user?.role?.RoleName)) {
                  return (
                    <TextLink href={`/user/${key}`} key={index} active={key == currentPage}>
                      {pageList[key]}
                    </TextLink>
                  )
                }
              }
              )
            }
            <div onClick={() => { }}>
              <Link href="#" className=" px-2 text-red-600" >
                Log out
              </Link>
            </div>
          </div>
        </div>
        <div className="grow p-8">
          {currentPage == 'profile' && <ProfilePage/>}
          {currentPage == 'address' && <AddressPage/>}
          {currentPage == 'order' && <OrderPage/>}
          {currentPage == 'bank' && <BankPage/>}
          {currentPage == 'verify' && <VerifyPage/>}
        </div>
      </div>
    </Template>
  )
}