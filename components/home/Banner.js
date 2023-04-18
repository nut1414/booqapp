import Image from 'next/image'
import banner from '@/public/welcomebook.svg'
import books from '@/public/books.svg'

export function Banner() {
  return (
    <div className='bg-spooky-black justify-center flex xl:gap-52'>
      <Image src={banner} alt="banner" />
      <Image src={books} alt="banner" className='w-0 xl:w-fit'/>
    </div>
  )
}