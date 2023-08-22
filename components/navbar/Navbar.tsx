'use client'

import { Container, Logo, Search, UserMenu, Categories } from '@/components'
import { User } from '@prisma/client'

interface NavbarProps{
    currentUser?: User | null,
}

const Navbar = ({currentUser}: NavbarProps) => {

  
  return (

    <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className="py-6 border-b-[1px]">
            <Container>
                <div
                    className='
                        flex
                        flex-row
                        items-center
                        justify-between
                        gap-3
                        md:gap-0
                    '
                >
                    <Logo/>
                    <Search/>
                    <UserMenu currentUser={currentUser}/>
                </div>
            </Container>
        </div>
        <Categories/>
    </div>
  )
}

export default Navbar