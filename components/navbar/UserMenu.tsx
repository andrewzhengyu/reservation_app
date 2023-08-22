'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import { Avatar } from '@/components'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { MenuItem } from '@/components'
import useRegisterModal from '@/utils/hooks/useRegisterModal'
import useLoginModal from '@/utils/hooks/useLoginModal'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import useRentModal from '@/utils/hooks/useRentModal'

interface UserMenuProps{
    currentUser?: User | null,
}

const UserMenu = ({currentUser}:UserMenuProps) => {

  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();
  
  const toggleOpen = useCallback(()=>{
    setIsOpen((value) => (!value))
  },[])
  
  const onRent = useCallback(() => {

    if(!currentUser) return loginModal.onOpen();
    rentModal.onOpen();

  },[currentUser, loginModal, rentModal])

  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div

                className="
                    hidden
                    sm:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                "
                onClick={onRent}
            >
                Airbnb your home
            </div>
            <div
                className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-netural-200
                    rounded-full
                    flex
                    flex-row
                    items-center
                    gap-3
                    hover:shadow-md
                    transition
                    cursor-pointer
                "
                onClick={toggleOpen}
            >
                <AiOutlineMenu/>
                <div className='hidden sm:block' >
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
        </div>
        
        {isOpen && (
            <div
                className='
                    absolute
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow:hidden
                    shadow-md
                    rounded-xl
                    right-0
                    top-12
                    text-sm
                '
            >
                <div className='flex flex-col cursor-pointer'>
                    {currentUser ? (
                        <>
                            <MenuItem onClick={() => router.push('/trips')} label='My trips'/>
                            <MenuItem onClick={() => {}} label='My favorites'/>
                            <MenuItem onClick={() => router.push('/reservations')} label='My reservations'/>
                            <MenuItem onClick={() => {}} label='My properties'/>
                            <MenuItem onClick={rentModal.onOpen} label='Airbnb my home'/>
                            <hr />
                            <MenuItem onClick={() => signOut()} label='Log out'/>
                        </>
                    ): (
                        <>
                            <MenuItem onClick={loginModal.onOpen} label='Log in'/>
                            <MenuItem onClick={registerModal.onOpen} label='Sign up'/>
                        </>
                    )}
                </div>
                
            </div>
        )}
    </div>
  )
}

export default UserMenu