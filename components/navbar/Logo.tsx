'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter();
  return (
    <Image
        src='/assets/logo.png'
        alt='logo'
        width={100}
        height={100}
        className='hidden md:block cursor-pointer'
        onClick={() => router.push('/')}
    />
  )
}

export default Logo